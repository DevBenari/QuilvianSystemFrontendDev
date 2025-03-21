"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "@/components/view/kiosk/add-guest-layanan/modal-insurance";
import KioskScreeningCard from "@/components/features/screeningCardKiosk/ScreeningCard";
import PatientInfoCard from "@/components/features/screeningCardKiosk/InformationScreening";
import { fetchPoliKlinik } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import { fetchDokterPoliWithFilters } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import { fetchDokterAsuransiWithFilters } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterAsuransiSlice";
import useRegistration from "@/lib/hooks/kiosk/useRegistration";
import { useRouter } from "next/navigation";

const PatientRegistrationPage = () => {
  const dispatch = useDispatch();
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
  const [currentView, setCurrentView] = useState('screening'); // 'screening', 'info', 'registration'
  const [screeningError, setScreeningError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  
  // Get relevant patient ID (may be stored in different properties depending on API)
  const getPatientId = () => {
    if (!patientData) return null;
    
    // Try all possible ID fields from the patientData
    const patientId = patientData.pasienId || 
                      patientData.pendaftaranPasienBaruId || 
                      patientData.id;
    
    return patientId;
  };

  const { data: lisPoli, page, totalPages, loading: poliLoading } = useSelector((state) => state.PoliKlinik);

  // Fungsi untuk memproses fetch dokter berdasarkan filter
  const fetchDoctorsWithFilters = async (filters) => {
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Gunakan action dari Redux untuk fetch data dokter berdasarkan filter
      let result;
      if (filters.asuransiId) {
        // Jika ada filter asuransi, ambil dokter berdasarkan asuransi dan poli
        const dokterAsuransiResult = await dispatch(fetchDokterAsuransiWithFilters({ 
          asuransiId: filters.asuransiId,
          page: 1,
          perPage: 100
        })).unwrap();
        
        const dokterPoliResult = await dispatch(fetchDokterPoliWithFilters({ 
          poliId: filters.poliId,
          page: 1,
          perPage: 100
        })).unwrap();
        
        // Process results to find doctors that exist in both results
        const dokterInAsuransi = dokterAsuransiResult.data?.rows || [];
        const dokterInPoli = dokterPoliResult.data?.rows || [];
        
        // Get doctors that exist in both poli and asuransi
        const dokterIds = new Set();
        dokterInPoli.forEach(doc => dokterIds.add(doc.dokterId));
        
        const matchingDoctors = dokterInAsuransi
          .filter(doc => dokterIds.has(doc.dokterId))
          .map(doc => {
            const poliDoc = dokterInPoli.find(d => d.dokterId === doc.dokterId);
            return {
              id: doc.dokterId,
              nama: doc.namaDokter || poliDoc?.namaDokter || "Dokter",
              jadwal: poliDoc?.jadwal || "Jadwal tidak tersedia",
              poli: filters.poliId
            };
          });
          
        result = { data: matchingDoctors };
      } else {
        // Jika hanya filter poli, ambil dokter berdasarkan poli saja
        const dokterPoliResult = await dispatch(fetchDokterPoliWithFilters({ 
          poliId: filters.poliId,
          page: 1,
          perPage: 100
        })).unwrap();
        
        const doctors = (dokterPoliResult.data?.rows || []).map(doc => ({
          id: doc.dokterId,
          nama: doc.namaDokter || "Dokter",
          jadwal: doc.jadwal || "Jadwal tidak tersedia",
          poli: filters.poliId
        }));
        
        result = { data: doctors };
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return { data: [] };
    }
  };

  // Important: Initialize hook with null patientId to prevent immediate re-renders
  const registration = useRegistration({
    fetchDoctorsAction: fetchDoctorsWithFilters,
    initialDoctorsData: {},
    pasienId: null // Start with null, we'll update after patientData is stable
  });

  // Fetch poli data once on component mount
  useEffect(() => {
    dispatch(fetchPoliKlinik({page: 1, perPage: 100}));
  }, [dispatch]);

  // Update patient ID only once when patientData changes and becomes available
  useEffect(() => {
    const patientId = getPatientId();
    if (patientId && registration.updatePatientId) {
      registration.updatePatientId(patientId);
    }
  }, [patientData]); 

  const handlePatientFound = (data) => {
    setPatientData(data);
    setCurrentView('info');
    setScreeningError(null);
  };

  // Handle screening error
  const handleScreeningError = (error) => {
    console.error("Screening error:", error);
    setScreeningError(error.message || "Pasien tidak ditemukan. Silakan periksa data yang dimasukkan atau daftar sebagai pasien baru.");
  };

  // Kembali ke screening
  const handleBackToScreening = () => {
    setCurrentView('screening');
    setPatientData(null);
    setScreeningError(null);
  };
  
  const handleContinueToRegistration = () => {
    setCurrentView('registration');
    
    // Isi form dengan data pasien yang sudah ada
    if (registration.formMethodsRef && registration.formMethodsRef.current) {
      const form = registration.formMethodsRef.current; 
      form.setValue("namaLengkap", patientData.namaLengkap || "");
      form.setValue("noIdentitas", patientData.noIdentitas || "");
      form.setValue("tanggalLahir", patientData.tanggalLahir ? new Date(patientData.tanggalLahir).toISOString().split('T')[0] : "");
      form.setValue("jenisKelamin", patientData.jenisKelamin ? patientData.jenisKelamin.toLowerCase() : "");
      form.setValue("noTelepon1", patientData.noTelepon1 || "");
      form.setValue("email", patientData.email || "");
      form.setValue("alamatIndetitas", patientData.alamatIdentitas || "");
      
      // Trigger validasi
      form.trigger(["namaLengkap", "noIdentitas", "tanggalLahir", "jenisKelamin", "noTelepon1", "email", "alamatIndetitas"]);
    } else {
      console.warn("Form methods ref is not available yet");
    }
  };

  const router = useRouter();
  // Handle daftar sebagai pasien baru
  const handleRegisterAsNewPatient = () => {
    router.push("/kiosk/kiosk-pendaftaran-pasien")
    setPatientData(null);
  };

  // Handle form submission
  const onSubmitSuccess = (data) => {
    console.log("Form Submitted Successfully:", data);
    setRegistrationCompleted(true);
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
    setTimeout(() => {
      setCurrentView('screening');
      setPatientData(null);
      setRegistrationCompleted(false);
    }, 5000);
  };
  
  // Wrap handleSubmit untuk tambahkan data pasien dan callback sukses
  const handleSubmit = (data) => {
    // Add patient ID if patient data exists
    const submissionData = { ...data };
    if (patientData && patientData.pasienId) {
      submissionData.pasienId = patientData.pasienId;
      submissionData.isExistingPatient = true;
    } else {
      submissionData.isExistingPatient = false;
    }
    
    registration.handleSubmit(submissionData, onSubmitSuccess);
  };

  // Konfigurasi input untuk form multi-step
  const formConfig = [
    {
      section: "Data Diri",
      icon: "👤",
      description: patientData ? "Data diri Anda telah terisi otomatis" : "Isi informasi pribadi Anda",
      fields: [
        {
          name: "namaLengkap",
          label: "Nama Lengkap",
          type: "text",
          value: patientData ? patientData.namaLengkap : "",
          placeholder: "Masukkan nama lengkap sesuai KTP",
          colSize: 6,
          readOnly: !!patientData // Set readonly jika ada data pasien
        },
        {
          name: "noIdentitas",
          label: "NIK",
          type: "text",
          value: patientData ? patientData.noIdentitas : "",
          placeholder: "Masukkan 16 digit NIK",
          colSize: 6,
          readOnly: !!patientData
        },
        {
          name: "tanggalLahir",
          label: "Tanggal Lahir",
          value: patientData ? patientData.tanggalLahir : "",
          type: "date",
          colSize: 6,
          readOnly: !!patientData
        },
        {
          name: "jenisKelamin",
          label: "Jenis Kelamin",
          type: "select",
          value: patientData ? patientData.jenisKelamin : "",
          colSize: 6,
          options: patientData ? [{ label: patientData.jenisKelamin, value: patientData.jenisKelamin }] : [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" }
          ],
          readOnly: !!patientData
        },
        {
          name: "noTelepon1",
          label: "No. Telepon",
          type: "text",
          value: patientData ? patientData.noTelepon : "",
          placeholder: "Contoh: 08123456789",
          colSize: 6,
          readOnly: !!patientData
        },
        {
          name: "email",
          label: "Email",
          type: "text",
          value: patientData ? patientData.email : "",
          placeholder: "Contoh: email@domain.com",
          colSize: 6,
          readOnly: !!patientData
        },
        {
          name: "alamatIndetitas",
          label: "Alamat",
          type: "textarea",
          placeholder: "Masukkan alamat lengkap",
          value: patientData ? patientData.alamatIdentitas : "",
          colSize: 12,
          readOnly: !!patientData
        }
      ]
    },
    {
      section: "Pasien Rujukan",
      icon: "🏥",
      description: "Pilih tipe kunjungan pasien",
      cards: [
        {
          name: "tipeKunjungan",
          type: "radio",
          title: "Pilih Tipe Kunjungan",
          options: [
            {
              value: "umum",
              label: "Pasien Umum",
              description: "Kunjungan langsung tanpa rujukan"
            },
            {
              value: "rujukan",
              label: "Pasien Rujukan",
              description: "Kunjungan dengan rujukan dari fasilitas kesehatan lain"
            }
          ],
          hide: (watchValues) => {
            // Sembunyikan card jika tipeKunjungan sudah 'rujukan' dan tipeRujukan sudah dipilih
            return watchValues === "rujukan" && watchValues.tipeRujukan;
          }
        }
      ],
      fields: [
        {
          name: "tipeRujukan",
          id: "tipeRujukan",
          label: "Tipe Rujukan",
          type: "select",
          placeholder: "Pilih tipe rujukan",
          colSize: 12,
          options: [
            { label: "Rujukan Internal", value: "internal" },
            { label: "Rujukan Eksternal", value: "external" },
          ],
          hide: (watchValues) => watchValues.tipeKunjungan !== "rujukan"
        },
        {
          name: "nomorRujukan",
          label: "Nomor Rujukan",
          type: "text",
          placeholder: "Masukkan nomor rujukan",
          value: "",
          colSize: 6,
          hide: (watchValues) => 
            watchValues.tipeKunjungan !== "rujukan" || 
            watchValues.tipeRujukan !== "external"
        },
        {
          name: "asalRujukan",
          id: "asalRujukan",
          label: "Asal Fasilitas Rujukan Pasien",
          type: "select",
          placeholder: "Pilih asal fasilitas rujukan pasien",
          options: [
            { label: "Rumah Sakit", value: "rumah_sakit" },
            { label: "Klinik", value: "klinik" },
            { label: "Puskesmas", value: "puskesmas" },
          ],
          value: "",
          colSize: 6,
          hide: (watchValues) => 
            watchValues.tipeKunjungan !== "rujukan" || 
            watchValues.tipeRujukan !== "external"
        }
      ]
    },
    {
      section: "Asuransi",
      icon: "📋",
      description: "Pilih metode pembayaran Anda",
      cards: registration.getPaymentMethodCards(),
      fields: registration.getInsuranceFields()
    },
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
    {
      section: "Pilih Dokter",
      icon: "👨‍⚕️",
      description: "Pilih dokter yang tersedia pada poliklinik",
      fields: [],
      cards: [
        registration.getDoctorSelectionCard()
      ],
      customRender: registration.loadingDoctors ? () => (
        <div className="alert alert-info">
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span>Sedang memuat data dokter...</span>
          </div>
        </div>
      ) : null
    },
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      fields: [],
      customRender: ({ methods }) => registration.renderConfirmationSection(
        methods, 
        registration.filteredDoctorsByInsurance, 
        poliNameMap,
        patientData // Pass patientData to highlight that this is an existing patient
      )
    }
  ];

  // Render tampilan berdasarkan current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'screening':
        return (
          <div className="row justify-content-center " style={{marginTop: '100px'}}>
            <div className="col-md-8">
              <KioskScreeningCard 
                onPatientFound={handlePatientFound}
                onError={handleScreeningError}  
              />
              
              {screeningError && (
                <Alert variant="info" className="mb-4">
                  <hr />
                  <p className="mb-0 text-center">
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
          <div className="row justify-content-center" style={{marginTop: '100px'}}>
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
                        Melanjutkan pendaftaran untuk: <strong>{patientData.namaLengkap}</strong> 
                        (No. RM: {patientData.noRekamMedis || 'N/A'})
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
            
            {registrationCompleted ? (
              <Card className="shadow border-0 mb-4">
                <Card.Body className="text-center p-5">
                  <div className="mb-4">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3>Pendaftaran Berhasil!</h3>
                  <p className="lead">Terima kasih telah mendaftar di layanan poliklinik kami.</p>
                  <p>Detail konfirmasi telah dikirim ke email Anda.</p>
                  <Button 
                    variant="primary" 
                    className="mt-3"
                    onClick={handleBackToScreening}
                  >
                    Kembali ke Screening
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <DynamicStepCardForm
                key={`registration-form-${patientData ? 'existing' : 'new'}`} 
                title={patientData ? "Lanjutkan Pendaftaran Pasien" : ""}
                formConfig={formConfig}
                onSubmit={handleSubmit}
                isAddMode={true}
                backPath="/kiosk"
                onFormMethodsReady={registration.handleFormMethodReady}
              />
            )}

            {/* Pass the patient ID directly to the modal */}
            <ModalInsurance
              onOpen={registration.showInsuranceModal}
              onClose={registration.handleCloseModal}
              onSubmit={registration.handleInsuranceSubmit}
              pasienId={getPatientId()} // Pass the correct patient ID here
            />
          </div>
        );
        
      default:
        return null;
    }   
  };

  return (
    <div className="container py-4">
      {renderCurrentView()}
    </div>
  );
};

export default PatientRegistrationPage;