import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useInsuranceManagement } from "@/lib/hooks/kiosk/useInsuranceHandler";
import useDoctorFilter from "@/lib/hooks/useDoctorsFilter";

/**
 * Custom hook untuk menangani alur pendaftaran pasien
 * 
 * @param {Object} config - Opsi konfigurasi
 * @param {Function} config.fetchDoctorsAction - Fungsi untuk fetch data dokter (deprecated)
 * @param {Object} config.initialDoctorsData - Data awal dokter
 * @param {string|null} config.pasienId - ID pasien
 * @returns {Object} - State dan metode pendaftaran
 */
export default function useRegistration({
  fetchMasterDataAction,
  fetchDoctorsAction,
  initialDoctorsData = {},
  pasienId = null
}) {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPoli, setSelectedPoli] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("tunai");
  const [internalPasienId, setInternalPasienId] = useState(pasienId);
  const [selectedAsuransiId, setSelectedAsuransiId] = useState(null);
  const formMethodsRef = useRef(null);
  const initialSetupDone = useRef(false);
  
  // Load insurance management with the patient ID
  const insuranceManagement = useInsuranceManagement({
    initialInsuranceList: [],
    formMethodsRef,
    pasienId: internalPasienId
  });

  // Use the doctor filter hook to handle filtering based on poli and asuransi
  const doctorFilter = useDoctorFilter({
    initialPoliId: selectedPoli,
    initialAsuransiId: selectedAsuransiId,
    paymentMethod
  });

  // Memoize updatePatientId to prevent recreation on each render
  const updatePatientId = useCallback((newPasienId) => {
    setInternalPasienId(newPasienId);
  }, []);

  // Initialize with pasienId from props
  useEffect(() => {
    if (pasienId && pasienId !== internalPasienId) {
      updatePatientId(pasienId);
    }
  }, [pasienId, internalPasienId, updatePatientId]);

  // Load master data on mount - only run once
  useEffect(() => {
    if (fetchMasterDataAction) {
      dispatch(fetchMasterDataAction());
    }
  }, [dispatch, fetchMasterDataAction]);

  // Handle form methods initialization
  const handleFormMethodReady = useCallback((methods) => {
    if (!methods) return;
    
    formMethodsRef.current = methods;
    
    // Jika sudah disetup dan form values sudah ada, tidak perlu setup ulang watch
    if (initialSetupDone.current) {
      // Periksa nilai paymentMethod saat ini dalam form
      const currentPaymentMethod = methods.getValues("paymentMethod");
      if (currentPaymentMethod && currentPaymentMethod !== paymentMethod) {
        setPaymentMethod(currentPaymentMethod);
      }
      return;
    }
    
    // Watch untuk perubahan metode pembayaran
    methods.watch("paymentMethod", (value) => {
      if (value && value !== paymentMethod) {
        setPaymentMethod(value);
        
        // Reset dokter yang dipilih ketika metode pembayaran berubah
        methods.setValue("selectedDoctor", "");
        setSelectedDoctor(null);
      }
    });
    
    // Watch untuk selectedPoli changes
    methods.watch("selectedPoli", (value) => {
      if (value && value !== selectedPoli) {
        setSelectedPoli(value);
        // Update filter poli di doctorFilter
        doctorFilter.updateSelectedPoli(value);
        
        // Reset selected doctor when poli changes
        methods.setValue("selectedDoctor", "");
        setSelectedDoctor(null);
      }
    });
    
    // Watch untuk selectedDoctor changes
    methods.watch("selectedDoctor", (value) => {
      if (value && value !== selectedDoctor) {
        setSelectedDoctor(value);
      }
    });
    
    // Watch untuk asuransiPasien changes - hanya jika metode pembayaran adalah asuransi
    methods.watch("asuransiPasien", (value) => {
      if (value && paymentMethod === "asuransi" && value !== selectedAsuransiId) {
        setSelectedAsuransiId(value);
        // Update filter asuransi di doctorFilter
        doctorFilter.updateSelectedAsuransi(value);
        
        // Reset selected doctor when asuransi changes
        methods.setValue("selectedDoctor", "");
        setSelectedDoctor(null);
      }
    });
    
    // Set the reference to prevent future re-setup
    initialSetupDone.current = true;

    // Cleanup function untuk unsubscribe watch
    return () => {
      methods.unregister(["paymentMethod", "selectedPoli", "selectedDoctor", "asuransiPasien"], { 
        keepValue: true 
      });
    };
  }, [paymentMethod, selectedPoli, selectedDoctor, selectedAsuransiId, doctorFilter]);

  // Fungsi untuk mengubah metode pembayaran
  const changePaymentMethod = useCallback((method) => {
    setPaymentMethod(method);
    
    // Juga update form jika ada form methods
    if (formMethodsRef.current) {
      formMethodsRef.current.setValue("paymentMethod", method, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      
      // Trigger manual untuk memastikan perubahan dideteksi
      formMethodsRef.current.trigger("paymentMethod");
      
      // Reset selected doctor when payment method changes
      formMethodsRef.current.setValue("selectedDoctor", "");
      setSelectedDoctor(null);
    }
  }, []);

  // Memoize payment method cards to prevent recreating on each render
  const paymentMethodCards = useMemo(() => [
    {
      name: "paymentMethod",
      type: "radio",
      title: "Pilih Metode Pembayaran",
      options: [
        {
          value: "tunai",
          label: "Tunai",
          description: "Pembayaran langsung di kasir"
        },
        {
          value: "asuransi",
          label: "Asuransi",
          description: "Pembayaran menggunakan asuransi"
        }
      ]
    }
  ], []);

  // Get payment method cards
  const getPaymentMethodCards = useCallback(() => paymentMethodCards, [paymentMethodCards]);

  // Get doctor selection card
  const getDoctorSelectionCard = useCallback(() => {
    // Menggunakan dokter yang telah difilter dari useDoctorFilter hook
    const doctorOptions = doctorFilter.doctors.map(doctor => ({
      value: doctor.id,
      label: doctor.nama,
      description: doctor.jadwal || "Jadwal tidak tersedia"
    }));
    
    const doctorCard = {
      name: "selectedDoctor",
      title: "Pilih Dokter",
      description: doctorFilter.loading 
        ? "Memuat data dokter..." 
        : (doctorOptions.length === 0 
          ? "Tidak ada dokter yang tersedia untuk poli dan/atau asuransi yang dipilih" 
          : "Pilih dokter yang tersedia pada poliklinik ini:"),
      colSize: 3,
      options: doctorOptions,
      disabled: doctorFilter.loading || doctorOptions.length === 0
    };
    
    return doctorCard;
  }, [doctorFilter.doctors, doctorFilter.loading]);

  // Dapatkan field asuransi berdasarkan metode pembayaran
  const getInsuranceFields = useCallback(() => {
    return insuranceManagement.getInsuranceFields(paymentMethod);
  }, [insuranceManagement, paymentMethod]);

  // Effect untuk memperbarui formulir saat paymentMethod berubah
  useEffect(() => {
    // Jika form sudah siap, perbarui nilai paymentMethod
    if (formMethodsRef.current) {
      const currentValue = formMethodsRef.current.getValues("paymentMethod");
      
      // Hanya update jika nilai berbeda
      if (currentValue !== paymentMethod) {
        formMethodsRef.current.setValue("paymentMethod", paymentMethod, {
          shouldValidate: true,
          shouldDirty: true
        });
      }
    }
  }, [paymentMethod]);

  // Handle form submission
  const handleSubmit = useCallback((data, onSuccess) => {
    // Tambahkan data dokter yang dipilih, termasuk informasi tentang poli dan asuransi
    const selectedDoctorData = doctorFilter.doctors.find(doc => doc.id === data.selectedDoctor);
    
    const enhancedData = {
      ...data,
      dokterDetail: selectedDoctorData ? {
        dokterId: selectedDoctorData.id,
        namaDokter: selectedDoctorData.nama,
        poliId: selectedDoctorData.poliId,
        jadwal: selectedDoctorData.jadwal,
        ...((paymentMethod === "asuransi") ? { asuransiId: selectedAsuransiId } : {})
      } : null
    };
    
    if (typeof onSuccess === 'function') {
      onSuccess(enhancedData);
    }
  }, [doctorFilter.doctors, paymentMethod, selectedAsuransiId]);

  // Memoize the render function to prevent recreation on each render
  const renderConfirmationSection = useCallback((methods, doctors, poliMap, patientData) => {
    const values = methods.getValues();
    // Ambil dokter yang dipilih dari dokter yang sudah difilter
    const doctor = doctorFilter.doctors.find(d => d.id === values.selectedDoctor);
    const poliName = poliMap[values.selectedPoli] || values.selectedPoli;
    const paymentInfo = values.paymentMethod === "asuransi" 
      ? `Asuransi: ${values.asuransiPasien || "Tidak dipilih"} (${values.nomorAsuransi || "No nomor polis"})`
      : "Tunai";
    
    return (
      <div className="confirmation-section">
        <div className="alert alert-info mb-4">
          <p className="mb-0">
            <strong>Perhatian:</strong> Harap periksa kembali informasi pendaftaran Anda sebelum melanjutkan.
          </p>
        </div> 
        
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h5 className="mb-0">Informasi Pasien</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Nama:</strong> {values.namaLengkap}</p>
                <p><strong>NIK:</strong> {values.noIdentitas}</p>
                <p><strong>Tanggal Lahir:</strong> {values.tanggalLahir}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Jenis Kelamin:</strong> {values.jenisKelamin}</p>
                <p><strong>No. Telepon:</strong> {values.noTelepon1}</p>
                <p><strong>Email:</strong> {values.email}</p>
              </div>
              <div className="col-12">
                <p><strong>Alamat:</strong> {values.alamatIndetitas}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-header bg-light">
            <h5 className="mb-0">Informasi Layanan</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Poliklinik:</strong> {poliName}</p>
                <p><strong>Dokter:</strong> {doctor ? doctor.nama : "Tidak dipilih"}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Jadwal:</strong> {doctor ? doctor.jadwal : "Tidak tersedia"}</p>
                <p><strong>Metode Pembayaran:</strong> {paymentInfo}</p>
              </div>
            </div>
          </div>
        </div>
        
        {patientData && (
          <div className="alert alert-success">
            <p className="mb-0">
              <strong>Info:</strong> Anda melakukan pendaftaran sebagai pasien yang sudah terdaftar dengan No. RM: {patientData.noRekamMedis || 'N/A'}
            </p>
          </div>
        )}
      </div>
    );
  }, [doctorFilter.doctors]);

  return {
    currentStep,
    formMethodsRef,
    doctors: doctorFilter.doctors,
    selectedPoli,
    selectedDoctor,
    paymentMethod,
    filteredDoctorsByInsurance: doctorFilter.doctors,
    loadingDoctors: doctorFilter.loading,
    handleFormMethodReady,
    getPaymentMethodCards,
    getInsuranceFields,
    getDoctorSelectionCard,
    handleSubmit,
    renderConfirmationSection,
    updatePatientId, // Export this function to be used by parent component
    showInsuranceModal: insuranceManagement.showInsuranceModal,
    handleCloseModal: insuranceManagement.handleCloseModal,
    handleInsuranceSubmit: insuranceManagement.handleInsuranceSubmit
  };
}