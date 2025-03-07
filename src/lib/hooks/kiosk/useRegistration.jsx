// hooks/useRegistration.js
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook for handling registration functionality
 * Reusable for patient, lab, operation, radiology registration
 * 
 * @param {Object} config - Configuration options
 * @param {Function} fetchMasterDataAction - Redux action to fetch master data
 * @param {Object} initialDoctorsData - Initial doctors data with their accepted insurances
 * @returns {Object} - Registration state and methods
 */
const useRegistration = ({
  fetchMasterDataAction,
  initialDoctorsData = {},
  initialInsuranceList = [],
  initialStep = 0
}) => {
  // State for insurance modal
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState(initialInsuranceList);
  const [filteredDoctorsByInsurance, setFilteredDoctorsByInsurance] = useState({});
  const [nonPKSInsuranceSelected, setNonPKSInsuranceSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const formMethodsRef = useRef(null);
  const dispatch = useDispatch();

  // Modal handlers
  const handleOpenModal = (e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowInsuranceModal(true);
  };

  const handleCloseModal = () => setShowInsuranceModal(false);

  // Save form methods for later use
  const handleFormMethodReady = (methods) => {
    formMethodsRef.current = methods;
  };

  // Fetch master data on component mount if action is provided
  useEffect(() => {
    if (fetchMasterDataAction) {
      dispatch(fetchMasterDataAction());
    }
  }, [dispatch, fetchMasterDataAction]);

  // Handle insurance submission from modal
  const handleInsuranceSubmit = (insuranceData) => {
    // Map API response format to component format
    const formattedInsurance = {
      namaAsuransi: insuranceData.NamaAsuransi || insuranceData.namaAsuransi,
      nomorPolis: insuranceData.NomorPolis || insuranceData.nomorPolis,
      isPKS: insuranceData.IsPKS || insuranceData.isPKS
    };

    setInsuranceList((prevList) => [...prevList, formattedInsurance]);

    if (!formattedInsurance.isPKS) {
      setNonPKSInsuranceSelected(true);
    }

    if (formMethodsRef.current) {
      formMethodsRef.current.setValue("nomorAsuransi", formattedInsurance.nomorPolis);
      formMethodsRef.current.setValue("asuransiPasien", formattedInsurance.namaAsuransi);
      formMethodsRef.current.trigger(["nomorAsuransi", "asuransiPasien"]);
    }

    updateDoctorsByInsurance([...insuranceList, formattedInsurance], initialDoctorsData);
    handleCloseModal();
  };

  // Function to update doctors based on selected insurances
  const updateDoctorsByInsurance = (insurances, doctorsData = initialDoctorsData) => {
    const filteredDoctors = {};

    Object.keys(doctorsData).forEach(poliKey => {
      filteredDoctors[poliKey] = doctorsData[poliKey].filter(doctor => {
        if (insurances.length === 0 || insurances.some(ins => ins.namaAsuransi === 'Tidak Ada')) {
          return true;
        }

        if (insurances.some(ins => !ins.isPKS)) {
          return true;
        }

        return doctor.acceptedInsurances.some(acceptedIns =>
          insurances.some(selectedIns => selectedIns.namaAsuransi === acceptedIns)
        );
      });
    });

    setFilteredDoctorsByInsurance(filteredDoctors);
  };

  // Handle form submission
  const handleSubmit = (data, onSuccess) => {
    console.log("Form Data:", data);

    // Call onSuccess callback if provided
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  };

  // Generate insurance form fields based on payment method
  const getInsuranceFields = () => {
    return [
      {
        id: "asuransiPasien",
        name: "asuransiPasien",
        label: "Asuransi yang digunakan pasien",
        type: "select",
        options: insuranceList.map((item) => ({
          label: `${item.namaAsuransi} - ${item.nomorPolis}`,
          value: item.namaAsuransi,
          isPKS: item.isPKS
        })),
        colSize: 6,
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      },
      {
        id: "nomorAsuransi",
        name: "nomorAsuransi",
        label: "Nomor Kartu Asuransi",
        type: "number",
        colSize: 6,
        placeholder: "masukkan nomor asuransi",
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      },
      {
        id: "tambahAsuransi",
        name: "tambahAsuransi",
        label: "",
        type: "custom",
        customRender: ({ methods }) => (
          <button
            type="button"
            className="btn btn-info"
            onClick={handleOpenModal}
            style={{ marginTop: "30px" }}
          >
            Tambah Asuransi
          </button>
        ),
        colSize: 6,
        className: "mt-2",
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      },
      {
        id: "nonPKSNotification",
        name: "nonPKSNotification",
        label: "",
        type: "custom",
        customRender: ({ methods }) => {
          const asuransiPasien = methods.watch("asuransiPasien");
          const selectedInsurance = insuranceList.find(ins => ins.namaAsuransi === asuransiPasien);

          if (selectedInsurance && !selectedInsurance.isPKS) {
            return (
              <div className="alert alert-warning mt-3">
                <h4 className="alert-heading">Asuransi Non-PKS</h4>
                <p>
                  Asuransi <strong>{selectedInsurance.namaAsuransi}</strong> tidak bekerja sama dengan rumah sakit (Non-PKS).
                  Pembayaran akan diatur sebagai Tunai, tetapi Anda tetap bisa mengajukan reimbursement ke pihak asuransi setelah layanan selesai.
                </p>
              </div>
            );
          }
          return null;
        },
        colSize: 12,
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      }
    ];
  };

  // Generate payment method cards
  const getPaymentMethodCards = () => {
    return [
      {
        name: "pembayaran",
        title: "Metode Pembayaran",
        description: "Silakan pilih metode pembayaran yang akan Anda gunakan:",
        colSize: 4,
        className: "d-flex align-items-center justify-content-center",
        required: true,
        rules: { required: "Silakan pilih metode pembayaran" },
        options: [
          {
            value: "tunai",
            label: "Tunai",
            icon: "💵",
            subtitle: "Bayar langsung",
            description: "Pembayaran dilakukan langsung di kasir rumah sakit setelah selesai pelayanan."
          },
          {
            value: "asuransi",
            label: "Asuransi",
            icon: "🔒",
            subtitle: "Klaim asuransi",
            description: "Gunakan asuransi kesehatan Anda untuk pembayaran layanan."
          }
        ],
        customRender: ({ methods }) => {
          // Payment method selection UI renderer
          return renderPaymentMethodSelection(methods);
        }
      }
    ];
  };

  // Helper to render payment method selection UI
  const renderPaymentMethodSelection = (methods) => {
    const pembayaran = methods.watch("pembayaran");

    // If payment method already selected and it's insurance, just show info
    if (selectedPaymentMethod === "asuransi") {
      return (
        <div className="mb-3">
          <h5>Metode Pembayaran: Asuransi</h5>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              setSelectedPaymentMethod(null);
              methods.setValue("pembayaran", "");
            }}
          >
            Ubah Metode Pembayaran
          </button>
        </div>
      );
    }

    // Render payment method cards
    return (
      <div className="row">
        {[
          {
            value: "tunai",
            label: "Tunai",
            icon: "💵",
            subtitle: "Bayar langsung",
            description: "Pembayaran dilakukan langsung di kasir rumah sakit setelah selesai pelayanan."
          },
          {
            value: "asuransi",
            label: "Asuransi",
            icon: "🔒",
            subtitle: "Klaim asuransi",
            description: "Gunakan asuransi kesehatan Anda untuk pembayaran layanan."
          }
        ].map((option) => {
          const isSelected = methods.watch("pembayaran") === option.value;

          return (
            <div className="col-md-6" key={option.value}>
              <div
                className={`card selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                onClick={() => {
                  methods.setValue("pembayaran", option.value);
                  // If insurance is selected, set state
                  if (option.value === "asuransi") {
                    setSelectedPaymentMethod("asuransi");
                  } else {
                    setSelectedPaymentMethod("tunai");
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-4">
                  <div className="card-icon mb-3">{option.icon}</div>
                  <h5 className="card-title">{option.label}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{option.subtitle}</h6>
                  <p className="card-text">{option.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Function to render doctor selection cards
  const renderDoctorSelection = (methods, doctors, selectedPoli) => {
    const asuransiPasien = methods.watch("asuransiPasien");
    const pembayaran = methods.watch("pembayaran");

    // Find the selected insurance to check if it's PKS or non-PKS
    const selectedInsurance = insuranceList.find(ins => ins.namaAsuransi === asuransiPasien);
    const isNonPKS = selectedInsurance && !selectedInsurance.isPKS;

    // No poli selected yet
    if (!selectedPoli) {
      return (
        <div className="alert alert-warning">
          Silakan pilih poli terlebih dahulu pada langkah sebelumnya.
        </div>
      );
    }

    // Get doctors for the selected poli
    let availableDoctors = [];

    // Special case: If non-PKS insurance is selected, show all doctors
    if (selectedPaymentMethod === "asuransi" && isNonPKS) {
      availableDoctors = doctors[selectedPoli] || [];

      // Show information about non-PKS reimbursement
      return (
        <>
          <div className="alert alert-info mb-4">
            <p className="mb-1"><strong>Informasi Pembayaran:</strong></p>
            <p>
              Karena Anda menggunakan asuransi non-PKS, pembayaran akan dilakukan secara Tunai,
              tetapi Anda dapat mengajukan reimbursement ke pihak asuransi setelah layanan selesai.
            </p>
          </div>

          <h5 className="mb-3">Pilih Dokter</h5>
          {availableDoctors.length === 0 ? (
            <div className="alert alert-danger">
              Tidak ada dokter yang tersedia untuk poli ini.
            </div>
          ) : (
            <div className="row">
              {availableDoctors.map((doctor) => {
                const isSelected = methods.watch("selectedDoctor") === doctor.id;
                return (
                  <div className="col-12 col-md-6" key={doctor.id}>
                    <div
                      className={`card selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                      onClick={() => methods.setValue("selectedDoctor", doctor.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center p-4">
                        <div className="card-icon mb-3">👨‍⚕️</div>
                        <h5 className="card-title">{doctor.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Jadwal Praktik:</h6>
                        <p className="card-text">{doctor.schedule}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      );
    }

    // Regular flow - if paying with insurance, filter by insurance
    if (selectedPaymentMethod === "asuransi" && asuransiPasien) {
      // Get doctors that accept this specific insurance
      availableDoctors = doctors[selectedPoli]?.filter(doctor =>
        doctor.acceptedInsurances.includes(asuransiPasien)
      ) || [];

      if (availableDoctors.length === 0) {
        return (
          <div className="alert alert-danger">
            <p>Tidak ada dokter yang tersedia untuk poli <strong>{selectedPoli}</strong> yang menerima asuransi <strong>{asuransiPasien}</strong>.</p>
            <p>Silakan pilih poli lain atau metode pembayaran lain.</p>
          </div>
        );
      }
    } else if (selectedPaymentMethod === "asuransi" && !asuransiPasien) {
      return (
        <div className="alert alert-warning">
          Silakan pilih asuransi terlebih dahulu atau tambahkan asuransi baru.
        </div>
      );
    } else {
      // For cash payment, show all doctors
      availableDoctors = doctors[selectedPoli] || [];

      if (availableDoctors.length === 0) {
        return (
          <div className="alert alert-danger">
            Tidak ada dokter yang tersedia untuk poli ini.
          </div>
        );
      }
    }

    // Convert to options format
    const doctorOptions = availableDoctors.map(doctor => ({
      value: doctor.id,
      label: doctor.name,
      icon: "👨‍⚕️",
      subtitle: "Jadwal Praktik:",
      description: doctor.schedule,
      asuransi: doctor.acceptedInsurances.join(", ")
    }));

    // Render cards
    return (
      <>
        <h5 className="mb-3">Pilih Dokter</h5>
        <p className="mb-3">Silakan pilih dokter yang tersedia pada poli yang Anda pilih:</p>

        <div className="row">
          {doctorOptions.map((option) => {
            const isSelected = methods.watch("selectedDoctor") === option.value;

            return (
              <div className="col-12 col-md-6" key={option.value}>
                <div
                  className={`card selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                  onClick={() => methods.setValue("selectedDoctor", option.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body text-center p-4">
                    <div className="card-icon mb-3">{option.icon}</div>
                    <h5 className="card-title">{option.label}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{option.subtitle}</h6>
                    <p className="card-text">{option.description}</p>
                    <div className="mt-2 badge bg-info text-white">
                      Menerima: {option.asuransi}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {methods.formState.errors.selectedDoctor && (
          <div className="text-danger mb-3">
            {methods.formState.errors.selectedDoctor.message}
          </div>
        )}
      </>
    );
  };

  // Generate doctor selection card configuration
  const getDoctorSelectionCard = (doctors) => {
    return {
      name: "selectedDoctor",
      title: "Pilih Dokter",
      description: "Silakan pilih dokter yang tersedia pada poli yang Anda pilih:",
      colSize: 6,
      required: true,
      rules: { required: "Silakan pilih dokter" },
      options: [], // Will be dynamically populated
      customRender: ({ methods }) => {
        const selectedPoli = methods.watch("selectedPoli");
        return renderDoctorSelection(methods, doctors, selectedPoli);
      }
    };
  };

  // Render confirmation section with all collected data
  const renderConfirmationSection = (methods, doctorsData, poliNameMap) => {
    // Safely get form values
    const formData = methods.getValues();

    // Safely get selected poli and doctor
    const selectedPoli = formData.selectedPoli;
    const selectedDoctor = formData.selectedDoctor;

    // Find the doctor details
    const doctor = selectedPoli && selectedDoctor
      ? doctorsData[selectedPoli]?.find(d => d.id === selectedDoctor)
      : null;

    return (
      <div className="confirmation-section">
        <h4 className="mb-4">Konfirmasi Data Pendaftaran</h4>

        {/* Personal Data Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Data Pribadi</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Nama Lengkap:</strong> {formData.name || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>NIK:</strong> {formData.nik || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Tanggal Lahir:</strong> {formData.dob || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Jenis Kelamin:</strong> {formData.gender || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Service Details Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Detail Layanan</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Poli:</strong> {selectedPoli ? poliNameMap[selectedPoli] : '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Dokter:</strong> {doctor ? doctor.name : '-'}
              </div>
              {doctor && (
                <div className="col-12 mb-3">
                  <strong>Jadwal Praktik:</strong> {doctor.schedule}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Detail Pembayaran</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Metode Pembayaran:</strong>
                {selectedPaymentMethod === 'asuransi' ? 'Asuransi' : 'Tunai'}
              </div>
              {selectedPaymentMethod === 'asuransi' && (
                <>
                  <div className="col-12 col-md-6 mb-3">
                    <strong>Asuransi:</strong> {formData.asuransiPasien || '-'}
                  </div>
                  <div className="col-12 mb-3">
                    <strong>Nomor Kartu:</strong> {formData.nomorAsuransi || '-'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="alert alert-info">
          <p className="mb-1"><strong>Catatan Penting:</strong></p>
          <ul className="mb-0">
            <li>Hadir 30 menit sebelum jadwal untuk keperluan administrasi.</li>
            <li>Bawa kartu identitas (KTP) dan kartu asuransi (jika ada).</li>
            <li>Pendaftaran ini dapat dibatalkan maksimal 24 jam sebelum jadwal.</li>
          </ul>
        </div>
      </div>
    );
  };

  // Return state and functions
  return {
    // State
    showInsuranceModal,
    insuranceList,
    filteredDoctorsByInsurance: filteredDoctorsByInsurance.length > 0 ? filteredDoctorsByInsurance : initialDoctorsData,
    nonPKSInsuranceSelected,
    currentStep,
    selectedPaymentMethod,
    formMethodsRef,

    // Methods
    handleOpenModal,
    handleCloseModal,
    handleFormMethodReady,
    handleInsuranceSubmit,
    updateDoctorsByInsurance,
    handleSubmit,
    setCurrentStep,
    setSelectedPaymentMethod,

    // Utility functions
    getInsuranceFields,
    getPaymentMethodCards,
    getDoctorSelectionCard,
    renderDoctorSelection,
    renderPaymentMethodSelection,
    renderConfirmationSection
  };
};

export default useRegistration;