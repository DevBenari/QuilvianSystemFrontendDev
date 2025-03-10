import { useState, useEffect } from "react";

/**
 * Enhanced custom hook for managing doctor selection functionality
 * with improved filtering by poli and insurance
 * 
 * @param {Object} config - Configuration options
 * @returns {Object} - Doctor selection state and methods
 */
export const useDoctorSelection = ({
  initialDoctorsData = {},
  fetchDoctorsAction = null
}) => {
  const [doctorsData, setDoctorsData] = useState(initialDoctorsData);
  const [filteredDoctorsByInsurance, setFilteredDoctorsByInsurance] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with initial data
  useEffect(() => {
    if (Object.keys(initialDoctorsData).length > 0) {
      setDoctorsData(initialDoctorsData);
      setFilteredDoctorsByInsurance(initialDoctorsData);
    }
  }, [initialDoctorsData]);

  // Fetch doctors data if fetchDoctorsAction is provided
  useEffect(() => {
    const fetchDoctors = async () => {
      if (fetchDoctorsAction) {
        setIsLoading(true);
        try {
          const response = await fetchDoctorsAction();
          // Structure doctors by poli
          const doctorsByPoli = structureDoctorsByPoli(response.data);
          setDoctorsData(doctorsByPoli);
          setFilteredDoctorsByInsurance(doctorsByPoli);
        } catch (err) {
          setError(err.message || 'Error fetching doctors');
          console.error('Error fetching doctors:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDoctors();
  }, [fetchDoctorsAction]);

  // Function to structure doctors by poli
  const structureDoctorsByPoli = (doctors) => {
    const result = {};
    
    // Group doctors by poliId
    doctors.forEach(doctor => {
      if (!doctor.poliId) return;
      
      if (!result[doctor.poliId]) {
        result[doctor.poliId] = [];
      }
      
      // Check if doctor already exists in the array
      const existingDoctor = result[doctor.poliId].find(d => d.id === doctor.doctorId);
      
      if (existingDoctor) {
        // If doctor exists, just add the insurance to their accepted insurances if provided
        if (doctor.asuransiId && !existingDoctor.acceptedInsurances.includes(doctor.asuransiId)) {
          existingDoctor.acceptedInsurances.push(doctor.asuransiId);
        }
      } else {
        // Add new doctor entry
        result[doctor.poliId].push({
          id: doctor.doctorId,
          name: doctor.doctorName || doctor.namaDokter,
          schedule: doctor.schedule || 'Jadwal tidak tersedia',
          acceptedInsurances: doctor.asuransiId ? [doctor.asuransiId] : []
        });
      }
    });
    
    return result;
  };

  // Function to update doctors based on selected insurances and poli
  const updateDoctorsByInsurance = (insurances, doctorsDataParam = null) => {
    const dataToFilter = doctorsDataParam || doctorsData;
    const filteredDoctors = {};

    Object.keys(dataToFilter).forEach(poliKey => {
      filteredDoctors[poliKey] = dataToFilter[poliKey].filter(doctor => {
        // If no insurance selected or "Tidak Ada" is selected, show all doctors
        if (insurances.length === 0 || insurances.some(ins => ins.namaAsuransi === 'Tidak Ada')) {
          return true;
        }

        // If any non-PKS insurance is selected, show all doctors
        if (insurances.some(ins => !ins.isPKS)) {
          return true;
        }

        // Check if doctor accepts any of the selected insurances
        return doctor.acceptedInsurances.some(acceptedIns =>
          insurances.some(selectedIns => selectedIns.namaAsuransi === acceptedIns || selectedIns.asuransiId === acceptedIns)
        );
      });
    });

    setFilteredDoctorsByInsurance(filteredDoctors);
    return filteredDoctors;
  };

  // Function to filter doctors by poli ID
  const getDoctorsByPoli = (poliId) => {
    return filteredDoctorsByInsurance[poliId] || [];
  };

  // Function to render doctor selection cards
  const renderDoctorSelection = (methods, doctors, selectedPoli, selectedPaymentMethod, insuranceList) => {
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

    // Show loading state
    if (isLoading) {
      return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Mengambil data dokter...</p>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="alert alert-danger">
          Terjadi kesalahan: {error}. Silakan coba lagi nanti.
        </div>
      );
    }

    // Get doctors for the selected poli
    let availableDoctors = getDoctorsByPoli(selectedPoli);

    // Special case: If non-PKS insurance is selected, show all doctors
    if (selectedPaymentMethod === "asuransi" && isNonPKS) {
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
      asuransi: doctor.acceptedInsurances.join(", ") || "Tidak ada informasi asuransi"
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
  const getDoctorSelectionCard = (selectedPaymentMethod, insuranceList) => {
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
        return renderDoctorSelection(
          methods, 
          filteredDoctorsByInsurance, 
          selectedPoli, 
          selectedPaymentMethod, 
          insuranceList
        );
      }
    };
  };

  return {
    doctorsData,
    filteredDoctorsByInsurance,
    updateDoctorsByInsurance,
    renderDoctorSelection,
    getDoctorSelectionCard,
    isLoading,
    error,
    getDoctorsByPoli,
    structureDoctorsByPoli
  };
};