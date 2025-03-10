'use client';
import React, { useState, useRef } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "../../add-guest-layanan/modal-insurance";

const RadiologyRegistrationPage = () => {
  // Radiologi services data
  const radiologyServices = [
    { 
      id: 'xray', 
      name: 'Rontgen (X-Ray)', 
      description: 'Pemeriksaan menggunakan sinar-X untuk melihat struktur tulang dan organ internal',
      price: 'Rp 250.000 - Rp 500.000',
      duration: '15-30 menit'
    },
    { 
      id: 'ct_scan', 
      name: 'CT Scan', 
      description: 'Pencitraan detail menggunakan sinar-X untuk melihat struktur internal tubuh',
      price: 'Rp 1.500.000 - Rp 3.000.000',
      duration: '30-60 menit'
    },
    { 
      id: 'mri', 
      name: 'MRI (Magnetic Resonance Imaging)', 
      description: 'Pencitraan menggunakan medan magnet untuk melihat detail jaringan lunak',
      price: 'Rp 2.000.000 - Rp 4.000.000',
      duration: '45-90 menit'
    },
    { 
      id: 'ultrasound', 
      name: 'Ultrasonografi (USG)', 
      description: 'Pemeriksaan menggunakan gelombang suara untuk melihat organ internal',
      price: 'Rp 350.000 - Rp 800.000',
      duration: '20-45 menit'
    },
    { 
      id: 'mammography', 
      name: 'Mammografi', 
      description: 'Pemeriksaan khusus payudara untuk deteksi dini kanker',
      price: 'Rp 800.000 - Rp 1.500.000',
      duration: '30-45 menit'
    },
    { 
      id: 'bone-density', 
      name: 'Densitometri Tulang', 
      description: 'Pemeriksaan kepadatan tulang untuk mendeteksi risiko osteoporosis',
      price: 'Rp 500.000 - Rp 1.000.000',
      duration: '20-30 menit'
    }
  ];

  // Dokter radiologi
  const radiologiDoctors = {
    ct_Scan: [
      {
        id: 'dr-ahmad',
        name: 'Dr. Ahmad',
        description: 'Spesialis CT Scan dan Radiologi',
        schedule: 'Selasa-Sabtu, 09.00-17.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Prudential']
      },
      {
        id: 'dr-budi',
        name: 'Dr. Budi',
        description: 'Spesialis Radiologi',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      },
      {
        id: 'dr-rita',
        name: 'Dr. Rita',
        description: 'Spesialis Radiologis dan CT Scan',
        schedule: 'Senin-Sabtu, 09.00-18.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri']
      }
    ],
    xray: [
      {
        id: 'dr-Jono',
        name: 'Dr. Jono',
        description: 'Spesialis Radiologi dan X-Ray',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential']
      },
      {
        id: 'dr-Lina',
        name: 'Dr. Lina',
        description: 'Spesialis Radiologi dan X-Ray',
        schedule: 'Senin-Sabtu, 09.00-18.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri']
      }
    ],
    ultrasound: [
      {
        id: 'dr-Kiki',
        name: 'Dr. Kiki',
        description: 'Spesialis Radiologi dan USG',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential']
      },
      {
        id: 'dr-Dewi',
        name: 'Dr. Dewi',
        description: 'Spesialis Radiologi dan USG',
        schedule: 'Senin-Sabtu, 09.00-18.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri']
      },
      {
        id: 'dr-Yono',
        name: 'Dr. Yono',
        description: 'Spesialis Radiologi dan USG',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['Allianz', 'Prudential']
      }
    ],

  };

  // Insurances same as previous example
  const insurances = [
    { id: 'bpjs', name: 'BPJS Kesehatan', type: 'Asuransi Kesehatan Nasional' },
    { id: 'prudential', name: 'Prudential', type: 'Asuransi Swasta' },
    { id: 'allianz', name: 'Allianz', type: 'Asuransi Swasta' },
    { id: 'axa', name: 'AXA Mandiri', type: 'Asuransi Swasta' },
    { id: 'other', name: 'Lainnya', type: 'Asuransi Lainnya' },
    { id: 'none', name: 'Tidak Ada', type: 'Bayar Mandiri' }
  ];

  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);
  const [filteredDoctorsByInsurance, setFilteredDoctorsByInsurance] = useState({});
  const [nonPKSInsuranceSelected, setNonPKSInsuranceSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [formMethodRef, setFormMethodRef] = useState(null);
  
  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);
  const formMethodsRef = useRef(null);

  const handleFormMethodReady = (methods) => {
    setFormMethodRef(methods);
    formMethodsRef.current = methods;
  }
  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
    
    if (!insuranceData.isPKS) {
      setNonPKSInsuranceSelected(true);
    }
    
    if (formMethodRef) {
      formMethodRef.setValue("nomorAsuransi", insuranceData.policyNumber);
      formMethodRef.setValue("asuransiPasien", insuranceData.namaAsuransi);
      formMethodRef.trigger(["nomorAsuransi", "asuransiPasien"])
    }

    updateDoctorsByInsurance([...insuranceList, insuranceData]);
  };

  const updateDoctorsByInsurance = (insurances) => {
    const filteredDoctors = {};

    Object.keys(radiologiDoctors).forEach(radiologiKey => {
      filteredDoctors[radiologiKey] = radiologiDoctors[radiologiKey].filter(doctor => {
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
  }

  // Form configuration
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
        },
        {
          name: "nik",
          label: "NIK",
          type: "text",
          placeholder: "Masukkan 16 digit NIK",
          colSize: 6,
        },
        {
          name: "dob",
          label: "Tanggal Lahir",
          type: "date",
          colSize: 6,
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
        },
        {
          name: "phone",
          label: "No. Telepon",
          type: "text",
          placeholder: "Contoh: 08123456789",
          colSize: 6,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Contoh: email@domain.com",
          colSize: 6,
        }
      ]
    },
    {
      section: "Asuransi",
      icon: "📋",
      description: "Pilih metode pembayaran Anda",
      cards: [
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
            const pembayaran = methods.watch("pembayaran");
            const asuransiSelected = pembayaran === "asuransi";
            
            // Jika pembayaran sudah dipilih dan itu adalah asuransi, maka kita hanya menampilkan info
            if (selectedPaymentMethod === "asuransi") {
              return (
                <div className="mb-3">
                  <h5>Metode Pembayaran: Asuransi</h5>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setSelectedPaymentMethod(null);
                      methods.setValue("pembayaran", "");
                    }}
                  >
                    Ubah Metode Pembayaran
                  </Button>
                </div>
              );
            }
            
            // Render kartu metode pembayaran normal
            return (
              <Row>
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
                    <Col md={6} key={option.value}>
                      <Card 
                        className={`selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                        onClick={() => {
                          methods.setValue("pembayaran", option.value);
                          // Jika asuransi dipilih, set state
                          if (option.value === "asuransi") {
                            setSelectedPaymentMethod("asuransi");
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Body className="text-center p-4">
                          <div className="card-icon mb-3">{option.icon}</div>
                          <Card.Title>{option.label}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{option.subtitle}</Card.Subtitle>
                          <Card.Text>{option.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          }
        }
      ],
      fields: [
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
            <Button variant="info" onClick={handleOpenModal} style={{ marginTop: "30px"}}>
              Tambah Asuransi
            </Button>
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
                <Alert variant="warning" className="mt-3">
                  <Alert.Heading>Asuransi Non-PKS</Alert.Heading>
                  <p>
                    Asuransi <strong>{selectedInsurance.namaAsuransi}</strong> tidak bekerja sama dengan rumah sakit (Non-PKS).
                    Pembayaran akan diatur sebagai Tunai, tetapi Anda tetap bisa mengajukan reimbursement ke pihak asuransi setelah layanan selesai.
                  </p>
                </Alert>
              );
            }
            return null;
          },
          colSize: 12,
          hide: (watchValues) => selectedPaymentMethod !== "asuransi"
        }
      ]
    },
    {
      section: "Pilih Layanan Radiologi",
      icon: "🩻",
      description: "Pilih jenis pemeriksaan radiologi yang Anda butuhkan",
      cards: [
        {
          name: "selectedRadiology",
          title: "Layanan Radiologi",
          description: "Silakan pilih pemeriksaan radiologi yang Anda butuhkan:",
          colSize: 3,
          required: true,
          rules: { required: "Silakan pilih layanan radiologi" },
          options: radiologyServices.map(service => ({
            value: service.id,
            label: service.name,
            icon: "🩻",
            subtitle: service.price,
            description: service.description
          }))
        }
      ]
    },
    {
      section: "Pilih Dokter Radiologi",
      icon: "👨‍⚕️",
      description: "Pilih dokter radiologi untuk pemeriksaan Anda",
      cards: [
        {
          name: "selectedDoctor",
          title: "Pilih Dokter Radiologi",
          description: "Silakan pilih dokter yang akan melakukan pemeriksaan:",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih dokter radiologi" },
          options: [],
          customRender: ({methods}) => {
            const selectedradiology = methods.watch("selectedRadiology");
            const asuransiPasien = methods.watch("asuransiPasien");
            const pembayaran =  methods.watch("pembayaran");

            const selectedInsurance = insuranceList.find(ins => ins.namaAsuransi === asuransiPasien);
            const isNonPKS = selectedInsurance && !selectedInsurance.isPKS;

            if(!selectedradiology){
              return (
                <div className="alert alert-warning">
                  Silakan pilih poli terlebih dahulu pada langkah sebelumnya.
                </div>
              )
            }

            let availableDoctors = [];

            if(selectedPaymentMethod === "asuransi" && isNonPKS){
              availableDoctors = radiologiDoctors[selectedradiology] || [];
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
                    <Row>
                      {availableDoctors.map((doctor) => {
                        const isSelected = methods.watch("selectedDoctor") === doctor.id;
                        return (
                          <Col xs={12} md={6} key={doctor.id}>
                            <Card 
                              className={`selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                              onClick={() => methods.setValue("selectedDoctor", doctor.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Card.Body className="text-center p-4">
                                <div className="card-icon mb-3">👨‍⚕️</div>
                                <Card.Title>{doctor.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Jadwal Praktik:</Card.Subtitle>
                                <Card.Text>{doctor.schedule}</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </>
              );
            }

            if(selectedPaymentMethod === "asuransi" && asuransiPasien){
              availableDoctors = radiologiDoctors[selectedradiology]?.filter(doctor => 
                doctor.acceptedInsurances.includes(asuransiPasien)
              ) || [];

              if(availableDoctors.length === 0){
                return (
                  <div className="alert alert-danger">
                    <p>Tidak ada dokter yang tersedia untuk poli <strong>{selectedradiology}</strong> yang menerima asuransi <strong>{asuransiPasien}</strong>.</p>
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
            }
            else {
              availableDoctors = radiologiDoctors[selectedradiology] || [];
              if(availableDoctors.length === 0) {
                return (
                  <div className="alert alert-danger">
                    Tidak ada dokter yang tersedia untuk poli ini.
                  </div>
                );
              }
            }

            const doctorOptions = availableDoctors.map(doctor => ({
              value: doctor.id,
              label: doctor.name,
              icon: "👨‍⚕️",
              subtitle: "Jadwal Praktik" + doctor.schedule,
              asuransi: doctor.acceptedInsurances.join(", ")
            }))

            return (
              <>
                <h5 className="mb-3">Pilih Dokter</h5>
                <p className="mb-3">Silakan pilih dokter yang tersedia pada poli yang Anda pilih:</p>
                
                <Row>
                  {doctorOptions.map((option) => {
                    const isSelected = methods.watch("selectedDoctor") === option.value;
                    
                    return (
                      <Col xs={12} md={6} key={option.value}>
                        <Card 
                          className={`selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                          onClick={() => methods.setValue("selectedDoctor", option.value)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Card.Body className="text-center p-4">
                            <div className="card-icon mb-3">{option.icon}</div>
                            <Card.Title>{option.label}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{option.subtitle}</Card.Subtitle>
                            <Card.Text>{option.description}</Card.Text>
                            <div className="mt-2 badge bg-info text-white">
                              Menerima: {option.asuransi}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
                
                {methods.formState.errors.selectedDoctor && (
                  <div className="text-danger mb-3">
                    {methods.formState.errors.selectedDoctor.message}
                  </div>
                )}
              </>
            );
          }
        }
      ]
    },
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      customRender: ({ methods }) => {
        const formData = methods.getValues();
        
        const selectedRadiology = formData.selectedRadiology;
        const selectedDoctor = formData.selectedDoctor;

        const layananMap = {
          'ct_scan': 'CT Scan',
          'mammography': 'Mammography',
          'ultrasound': 'USG',
          'xray': 'X-Ray(Rontgen)',
          'mri': "MRI (Magnetic Resonance Imaging)"
        }

        const doctor = selectedRadiology && selectedDoctor 
          ? radiologiDoctors[selectedRadiology].find(d => d.id === selectedDoctor)
          : null ; 

        return (
          <div className="confirmation-section">
            <h4 className="mb-4">Konfirmasi Pendaftaran Radiologi</h4>
            
            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Data Pribadi</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Nama Lengkap:</strong> {formData.name || '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>NIK:</strong> {formData.nik || '-'}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Detail Layanan Radiologi</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Jenis Pemeriksaan:</strong> {selectedRadiology ? layananMap[selectedRadiology] : '-'}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <strong>Dokter:</strong> {doctor ? doctor.name : '-'}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Detail Pembayaran</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Metode Pembayaran:</strong> 
                    {formData.pembayaran === 'tunai' ? 'Tunai' : 'Asuransi'}
                  </Col>
                  {formData.pembayaran === 'asuransi' && (
                    <Col xs={12} md={6} className="mb-3">
                      <strong>Asuransi:</strong> {formData.asuransiPasien || '-'}
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>

            <div className="alert alert-info">
              <p className="mb-1"><strong>Catatan Penting:</strong></p>
              <ul className="mb-0">
                <li>Harap bawa surat rujukan (jika ada).</li>
                <li>Datang 30 menit sebelum jadwal untuk persiapan.</li>
                <li>Kenakan pakaian yang nyaman dan mudah dilepas.</li>
              </ul>
            </div>
          </div>
        );
      }
    }
  ];

  // Handle form submission
  const handleSubmit = (data) => {
    console.log("Form Data:", data);
    // Here you would typically send the data to your backend API
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
    handleCloseModal(false)
    // Redirect to success page or dashboard
    // window.location.href = "/registration-success";
  };

  return (
    <div className="radiology-registration-page">
      <DynamicStepCardForm
        key={currentStep}
        title="Pendaftaran Layanan Radiologi"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/kiosk"
        doctorsData={filteredDoctorsByInsurance.length > 0 ? filteredDoctorsByInsurance : radiologiDoctors}
        onFormMethodsReady={handleFormMethodReady} 
      />

      <ModalInsurance
        onOpen={showInsuranceModal}
        onClose={handleCloseModal}
        onSubmit={handleInsuranceSubmit}
        formConfig={formConfig}
      />
    </div>
  );
};

export default RadiologyRegistrationPage;