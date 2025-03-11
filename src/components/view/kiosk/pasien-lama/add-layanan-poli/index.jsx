"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "@/components/view/kiosk/add-guest-layanan/modal-insurance";
import KioskScreeningCard from "@/components/features/screeningCardKiosk/ScreeningCard";
import PatientInfoCard from "@/components/features/screeningCardKiosk/InformationScreening";
import { fetchPoliKlinik } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import useRegistration from "@/lib/hooks/kiosk/useRegistration";

const PatientRegistrationPage = () => {
  const dispatch = useDispatch();
  
  // Mapping untuk nama poli yang lebih mudah dibaca
  const poliNameMap = {
    'umum': 'Poli Umum', 
    'gigi': 'Poli Gigi', 
    'mata': 'Poli Mata',
    'kandungan': 'Poli Kandungan',
    'anak': 'Poli Anak',
    'jantung': 'Poli Jantung',
    'saraf': 'Poli Saraf',
    'kulit': 'Poli Kulit'
  };

  // State untuk screening
  const [currentView, setCurrentView] = useState('screening'); // 'screening', 'info', 'registration'
  const [screeningError, setScreeningError] = useState(null);
  const [patientData, setPatientData] = useState(null);

  // Data poli dari Redux store
  const { data: lisPoli, page, totalPages, loading: poliLoading } = useSelector((state) => state.PoliKlinik);
  
  // Fungsi untuk fetch dokter (mock untuk contoh ini)
  const fetchDoctors = async (poliId) => {
    console.log("Fetching doctors for poli:", poliId);
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return mock data
    return {
      data: [
        { id: "doc1", nama: "dr. Ahmad Suherman, Sp.A", poli: poliId, jadwal: "Senin-Jumat, 08:00-14:00" },
        { id: "doc2", nama: "dr. Budi Santoso, Sp.A", poli: poliId, jadwal: "Senin-Rabu, 14:00-20:00" },
        { id: "doc3", nama: "dr. Citra Dewi, Sp.A", poli: poliId, jadwal: "Kamis-Sabtu, 08:00-14:00" }
      ]
    };
  };

  // Gunakan registration hook
  const registration = useRegistration({
    fetchMasterDataAction: () => fetchPoliKlinik({page, totalPages}),
    fetchDoctorsAction: fetchDoctors,
    initialDoctorsData: {}
  });

  // Load poli data saat komponen di-mount
  useEffect(() => {
    dispatch(fetchPoliKlinik({page: 1, perPage: 100}));
  }, [dispatch]);

  // Handle ketika pasien ditemukan dari screening
  const handlePatientFound = (data) => {
    setPatientData(data);
    setCurrentView('info');
    setScreeningError(null);
  };

  // Handle screening error
  const handleScreeningError = (error) => {
    setScreeningError(error.message || "Pasien tidak ditemukan. Silakan periksa data yang dimasukkan atau daftar sebagai pasien baru.");
  };

  // Kembali ke screening
  const handleBackToScreening = () => {
    setCurrentView('screening');
    setPatientData(null);
    setScreeningError(null);
  };

  // Lanjut ke pendaftaran
  const handleContinueToRegistration = () => {
    setCurrentView('registration');
    
    // Isi form dengan data pasien yang sudah ada
    if (registration.formMethodsRef && registration.formMethodsRef.current) {
      const form = registration.formMethodsRef.current;
      
      // Mapping field dari data pasien ke form fields
      form.setValue("name", patientData.nama || "");
      form.setValue("nik", patientData.nik || "");
      form.setValue("dob", patientData.tanggalLahir ? new Date(patientData.tanggalLahir).toISOString().split('T')[0] : "");
      form.setValue("gender", patientData.jenisKelamin ? patientData.jenisKelamin.toLowerCase() : "");
      form.setValue("phone", patientData.noTelepon || "");
      form.setValue("email", patientData.email || "");
      form.setValue("address", patientData.alamat || "");
      
      // Trigger validasi
      form.trigger(["name", "nik", "dob", "gender", "phone", "email", "address"]);
    }
  };

  // Handle daftar sebagai pasien baru
  const handleRegisterAsNewPatient = () => {
    setCurrentView('registration');
    setPatientData(null);
  };

  // Handle form submission
  const onSubmitSuccess = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
  };
  
  // Wrap handleSubmit untuk tambahkan data pasien dan callback sukses
  const handleSubmit = (data) => {
    if (patientData && patientData.pasienId) {
      data.pasienId = patientData.pasienId;
    }
    
    registration.handleSubmit(data, onSubmitSuccess);
  };

  const formConfig = [
    {
      section: "Data Diri",
      icon: "👤",
      description: "Isi informasi pribadi Anda",
      fields: [
        {
          name: "name",
          label: "Nama Lengkap",
          type: "text",
          placeholder: "Masukkan nama lengkap sesuai KTP",
          colSize: 6,
          rules: { required: "Nama lengkap harus diisi" }
        },
        {
          name: "nik",
          label: "NIK",
          type: "text",
          placeholder: "Masukkan 16 digit NIK",
          colSize: 6,
          rules: { 
            required: "NIK harus diisi",
            minLength: { value: 16, message: "NIK harus 16 digit" },
            maxLength: { value: 16, message: "NIK harus 16 digit" },
          }
        },
        {
          name: "dob",
          label: "Tanggal Lahir",
          type: "date",
          colSize: 6,
          rules: { required: "Tanggal lahir harus diisi" }
        },
        {
          name: "gender",
          label: "Jenis Kelamin",
          type: "select",
          colSize: 6,
          options: [
            { value: "laki-laki", label: "Laki-laki" },
            { value: "perempuan", label: "Perempuan" }
          ],
          rules: { required: "Jenis kelamin harus dipilih" }
        },
        {
          name: "phone",
          label: "No. Telepon",
          type: "text",
          placeholder: "Contoh: 08123456789",
          colSize: 6,
          rules: { required: "Nomor telepon harus diisi" }
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Contoh: email@domain.com",
          colSize: 6,
          rules: { 
            required: "Email harus diisi",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Format email tidak valid"
            }
          }
        },
        {
          name: "address",
          label: "Alamat",
          type: "textarea",
          placeholder: "Masukkan alamat lengkap",
          colSize: 12,
          rules: { required: "Alamat harus diisi" }
        }
      ]
    },
    // Section 2: Asuransi dan Metode Pembayaran
    {
      section: "Asuransi",
      icon: "📋",
      description: "Pilih metode pembayaran Anda",
      cards: registration.getPaymentMethodCards(),
      fields: registration.getInsuranceFields()
    },
    // Section 3: Pilih Poli
    {
      section: "Pilih Poli",
      icon: "🏥",
      description: "Pilih layanan kesehatan yang Anda butuhkan",
      cards: [
        {
          name: "selectedPoli",
          title: "Pilih Layanan Poli",
          description: "Silakan pilih poli yang sesuai dengan kebutuhan Anda:",
          colSize: 3,
          required: true,
          rules: { required: "Silakan pilih poli" },
          options: lisPoli.map((item) => ({ 
            label: item.namaPoliklinik, 
            value: item.poliklinikId,
            description: item.deskripsi
          })),
        }
      ]
    },
    // Section 4: Pilih Dokter
    {
      section: "Pilih Dokter",
      icon: "👨‍⚕️",
      description: "Pilih dokter yang tersedia pada poliklinik",
      fields: [],
      cards: [
        registration.getDoctorSelectionCard()
      ]
    },
    // Section 5: Konfirmasi
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      fields: [],
      customRender: ({ methods }) => registration.renderConfirmationSection(
        methods, 
        registration.filteredDoctorsByInsurance, 
        poliNameMap
      )
    }
  ];

  // Render tampilan berdasarkan current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'screening':
        return (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <KioskScreeningCard 
                onPatientFound={handlePatientFound}
                onError={handleScreeningError}
              />
              
              {screeningError && (
                <Alert variant="info" className="mb-4">
                  <Alert.Heading>Pasien tidak ditemukan</Alert.Heading>
                  <p>{screeningError}</p>
                  <hr />
                  <p className="mb-0">
                    <Button 
                      variant="primary"
                      onClick={handleRegisterAsNewPatient}
                    >
                      Daftar sebagai pasien baru
                    </Button>
                  </p>
                </Alert>
              )}
            </div>
          </div>
        );
        
      case 'info':
        return (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <PatientInfoCard 
                patientData={patientData}
                onContinue={handleContinueToRegistration}
                onBack={handleBackToScreening}
              />
            </div>
          </div>
        );
        
      case 'registration':
        return (
          <div className="patient-registration-page">
            {patientData && (
              <Card className="mb-4 bg-light">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">Data pasien ditemukan</h5>
                      <p className="text-muted mb-0">
                        Melanjutkan pendaftaran untuk: <strong>{patientData.nama}</strong> 
                        (No. RM: {patientData.noRm || 'N/A'})
                      </p>
                    </div>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={handleBackToScreening}
                    >
                      Kembali ke Screening
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
            
            <DynamicStepCardForm
              key={registration.currentStep}
              title={patientData ? "Lanjutkan Pendaftaran" : "Pendaftaran Pasien Baru"}
              formConfig={formConfig}
              onSubmit={handleSubmit}
              isAddMode={true}
              backPath="/kiosk"
              onFormMethodsReady={registration.handleFormMethodReady}
            />

            <ModalInsurance
              onOpen={registration.showInsuranceModal}
              onClose={registration.handleCloseModal}
              onSubmit={registration.handleInsuranceSubmit}
              pasienId={patientData?.pasienId}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container py-4 my-5">
      <h1 className="text-center mb-4 font-widest">Pendaftaran Layanan Poliklinik</h1>
      {renderCurrentView()}
    </div>
  );
};

export default PatientRegistrationPage;