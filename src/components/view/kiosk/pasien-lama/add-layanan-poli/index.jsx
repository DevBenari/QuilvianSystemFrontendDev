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

    const { data: lisPoli, page, totalPages, loading: poliLoading } = useSelector((state) => state.PoliKlinik);

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

    const registration = useRegistration({
      fetchMasterDataAction: () => fetchPoliKlinik({page, totalPages}),
      fetchDoctorsAction: fetchDoctors,
      initialDoctorsData: {}
    });

    useEffect(() => {
      dispatch(fetchPoliKlinik({page: 1, perPage: 100}));
    }, [dispatch]);

    const handlePatientFound = (data) => {
      console.log("Patient data found:", data);
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
        
        // Log untuk debugging
        console.log("Setting form values with patient data:", patientData);
        
        // Mapping field dari data pasien ke form fields
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
      // You could add an API call here to register the appointment
      
      // Show success message to user
      alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
      
      // Option to reset the flow after a short delay
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
      
      console.log("Submitting registration with data:", submissionData);
      registration.handleSubmit(submissionData, onSubmitSuccess);
    };

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
            options: [
              { value: "laki-laki", label: "Laki-laki" },
              { value: "perempuan", label: "Perempuan" }
            ],
            
            readOnly: !!patientData
          },
          {
            name: "noTelepon1",
            label: "No. Telepon",
            type: "text",
            value: patientData ? patientData.noTelepon1 : "",
            placeholder: "Contoh: 08123456789",
            colSize: 6,
            
            readOnly: !!patientData
          },
          {
            name: "email",
            label: "Email",
            type: "email",
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
                    {/* <Alert.Heading>Pasien tidak ditemukan</Alert.Heading> */}
                    {/* <p>{screeningError}</p> */}
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
                  key={`${registration.currentStep}-${patientData ? 'existing' : 'new'}`}
                  title={patientData ? "Lanjutkan Pendaftaran Pasien" : ""}
                  formConfig={formConfig}
                  onSubmit={handleSubmit}
                  isAddMode={true}
                  backPath="/kiosk"
                  onFormMethodsReady={registration.handleFormMethodReady}
                />
              )}

              <ModalInsurance
                onOpen={registration.showInsuranceModal}
                onClose={registration.handleCloseModal}
                onSubmit={registration.handleInsuranceSubmit}
                pasienId={patientData?.pendaftaranPasienBaruId}
              />
            </div>
          );
          
        default:
          return null;
      }   
    };

    return (
      <div className="container py-4 mt-5 ">
        {renderCurrentView()}
      </div>
    );
  };

  export default PatientRegistrationPage;