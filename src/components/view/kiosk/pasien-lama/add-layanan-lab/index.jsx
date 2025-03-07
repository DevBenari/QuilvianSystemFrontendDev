'use client';
import React, { useState } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "../../add-guest-layanan/modal-insurance";

const LaboratoryRegistrationPage = () => {
  // Layanan Laboratorium data

  // Dokter Patologi Klinik
  const laboratoryDoctors = {
    basicblood: [
    
        { 
          id: 'dr-budi', 
          name: 'dr. Budi Santoso, Sp.PK', 
          specialization: 'Patologi Klinik Umum', 
          schedule: 'Senin-Jumat, 08.00-16.00',
          acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
        },
        { 
          id: 'dr-siti', 
          name: 'dr. Siti Rahmawati, Sp.PK', 
          specialization: 'Patologi Klinik Khusus', 
          schedule: 'Selasa-Sabtu, 09.00-17.00',
          acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Prudential']
        },
        { 
          id: 'dr-hadi', 
          name: 'dr. Hadi Wijaya, Sp.PK', 
          specialization: 'Hematologi', 
          schedule: 'Senin, Rabu, Jumat, 10.00-18.00',
          acceptedInsurances: ['BPJS Kesehatan', 'Allianz']
        }
    ],
    lipidProfile: [
      {
        id: 'dr-Mulyono', 
        name: 'dr. Mulyono, Sp.PK', 
        specialization: 'Patologi Klinik Khusus', 
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      },
      {
        id: 'dr-Indah',
        name: 'dr. Indah Sari, Sp.PK',
        specialization: 'Patologi Klinik Umum',
        schedule: 'Selasa-Sabtu, 09.00-17.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Prudential']
      },
      {
        id: 'dr-Rahmad',
        name: 'dr. Rahmad, Sp.PK',
        specialization: 'Hematologi',
        schedule: 'Senin, Rabu, Jumat, 10.00-18.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Allianz']
      }
    ],
    liverFunction: [
      {
        id: 'dr-Siti',
        name: 'dr. Siti Rahmawati, Sp.PK',
        specialization: 'Patologi Klinik Khusus',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      },
      {
        id: 'dr-Hadi',
        name: 'dr. Hadi Wijaya, Sp.PK',
        specialization: 'Hematologi',
        schedule: 'Selasa-Sabtu, 09.00-17.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Prudential']
      },
      {
        id: 'dr-Bayu',
        name: 'dr. Bayu, Sp.PK',
        specialization: 'Patologi Klinik Umum',
        schedule: 'Senin, Rabu, Jumat, 10.00-18.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Allianz']
      },
      {
        id: 'dr-Saiful',
        name: 'dr. Saiful, Sp.PK',
        specialization: 'Patologi Klinik Khusus',
        schedule: 'Senin-Jumat, 08.00-16.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      }
    ]

  };

  // Insurances
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

  const handleFormMethodReady = (methods) => {
    setFormMethodRef(methods);
    // formMethodsRef.current = methods;
  }

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
    
    if (!insuranceData.isPKS) {
      setNonPKSInsuranceSelected(true);
    }
    
    if (formMethodRef) {
      formMethodRef.setValue("nomorAsuransi", insuranceData.policyNumber);
      formMethodRef.setValue("asuransiPasien", insuranceData.provider);
      formMethodRef.trigger(["nomorAsuransi", "asuransiPasien"])
    }

    updateDoctorsByInsurance([...insuranceList, insuranceData]);
  };

  const updateDoctorsByInsurance = (insurances) => {
    const filteredDoctors = {};

    Object.keys(laboratoryDoctors).forEach(labKey => {
      filteredDoctors[labKey] = laboratoryDoctors[labKey].filter(doctor => {
        if(insurances.length === 0 || insurances.some(ins => ins.provider === 'Tidak Ada')) {
          return true;
        }
        if(insurances.some(ins => !ins.isPKS)) {
          return true;
        }
        return doctor.acceptedInsurances.some(acceptedIns => insurances.some(selectedIns => selectedIns.provider === acceptedIns));
      });
    })
    setFilteredDoctorsByInsurance(filteredDoctors);
  }

  // Paket pemeriksaan laboratorium
  // const laboratoryPackages = [
  //   {
  //     id: 'basic',
  //     name: 'Paket Pemeriksaan Dasar',
  //     description: 'Pemeriksaan darah rutin, gula darah, dan urinalisis',
  //     price: 'Rp 350.000',
  //     tests: ['basic-blood', 'blood-glucose', 'urinalysis']
  //   },
  //   {
  //     id: 'comprehensive',
  //     name: 'Paket Pemeriksaan Komprehensif',
  //     description: 'Pemeriksaan darah lengkap, profil lipid, fungsi hati, dan fungsi ginjal',
  //     price: 'Rp 850.000',
  //     tests: ['basic-blood', 'lipid-profile', 'liver-function', 'kidney-function']
  //   },
  //   {
  //     id: 'diabetes',
  //     name: 'Paket Pemantauan Diabetes',
  //     description: 'Gula darah, HbA1c, profil lipid, dan fungsi ginjal',
  //     price: 'Rp 750.000',
  //     tests: ['blood-glucose', 'hba1c', 'lipid-profile', 'kidney-function']
  //   }
  // ];

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
              label: `${item.provider} - ${item.policyNumber}`, 
              value: item.provider,
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
              const selectedInsurance = insuranceList.find(ins => ins.provider === asuransiPasien);
              
              if (selectedInsurance && !selectedInsurance.isPKS) {
                return (
                  <Alert variant="warning" className="mt-3">
                    <Alert.Heading>Asuransi Non-PKS</Alert.Heading>
                    <p>
                      Asuransi <strong>{selectedInsurance.provider}</strong> tidak bekerja sama dengan rumah sakit (Non-PKS).
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
      section: "Pilih Layanan Laboratorium",
      icon: "🧪",
      description: "Pilih jenis pemeriksaan laboratorium yang Anda butuhkan",
      cards: [
        {
          name: "selectedLaboratory",
          title: "Pemeriksaan Individual",
          description: "Silakan pilih pemeriksaan laboratorium yang Anda butuhkan:",
          colSize: 3,
          required: true,
          rules: { required: "Silakan pilih pemeriksaan laboratorium" },
          options: [
            { 
              value: 'basicBlood', 
              label: 'Pemeriksaan Darah Rutin', 
              description: 'Pemeriksaan komponen darah dasar termasuk hemoglobin, sel darah merah dan putih',
              price: 'Rp 150.000 - Rp 300.000',
              duration: '10-20 menit'
            },
            { 
              value: 'lipidProfile', 
              label: 'Profil Lipid', 
              description: 'Mengukur kolesterol total, HDL, LDL, dan trigliserida dalam darah',
              price: 'Rp 250.000 - Rp 450.000',
              duration: '15-30 menit'
            },
            { 
              value: 'liverFunction', 
              label: 'Fungsi Hati', 
              description: 'Memeriksa enzim dan protein yang terkait dengan fungsi hati',
              price: 'Rp 350.000 - Rp 650.000',
              duration: '20-30 menit'
            },
            { 
              value: 'kidney-function', 
              label: 'Fungsi Ginjal', 
              description: 'Mengukur kadar elektrolit, urea, dan kreatinin dalam darah',
              price: 'Rp 300.000 - Rp 550.000',
              duration: '20-30 menit'
            },
            { 
              value: 'thyroid-function', 
              label: 'Fungsi Tiroid', 
              description: 'Memeriksa kadar hormon tiroid termasuk TSH, T3, dan T4',
              price: 'Rp 400.000 - Rp 750.000',
              duration: '25-35 menit'
            },
            { 
              value: 'urinalysis', 
              label: 'Urinalisis', 
              description: 'Analisis komponen urin untuk mendeteksi masalah kesehatan',
              price: 'Rp 150.000 - Rp 300.000',
              duration: '15-25 menit'
            },
            { 
              value: 'blood-glucose', 
              label: 'Gula Darah', 
              description: 'Mengukur kadar glukosa dalam darah untuk memantau diabetes',
              price: 'Rp 100.000 - Rp 200.000',
              duration: '10-15 menit'
            },
            { 
              value : 'hba1c', 
              label: 'HbA1c', 
              description: 'Mengukur kadar gula darah rata-rata selama 2-3 bulan terakhir',
              price: 'Rp 250.000 - Rp 450.000',
              duration: '15-20 menit'
            }
          ]
        }
      ]
    },
    {
      section: "Pilih Dokter Patologi Klinik",
      icon: "👨‍⚕️",
      description: "Pilih dokter patologi klinik untuk pemeriksaan Anda",
      cards: [
        {
          name: "selectedDoctor",
          title: "Pilih Dokter Patologi Klinik",
          description: "Silakan pilih dokter yang akan menginterpretasi hasil pemeriksaan:",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih dokter patologi klinik" },
          options: [],
          customRender: ({methods}) => {
            const selectLaboratory = methods.watch("selectedLaboratory");
            const asuransiPasien = methods.watch("asuransiPasien");
            const pembayaran = methods.watch("pembayaran");

            const selectedInsurance = insuranceList.find(ins => ins.provider === asuransiPasien);
            const isNonPks = selectedInsurance && !selectedInsurance.isPKS;

            if(!selectLaboratory){
              return (
                <div className="alert alert-warning">
                  Silakan pilih Lab terlebih dahulu pada langkah sebelumnya.
                </div>
              )
            }

            let availableDoctors = [];

            if(selectedPaymentMethod === "asuransi" && isNonPks){
              availableDoctors = laboratoryDoctors[selectLaboratory] || [];
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
              )
            }

            if(selectedPaymentMethod === "asuransi" && asuransiPasien){
              availableDoctors = laboratoryDoctors[selectLaboratory]?.filter(doctor => 
                doctor.acceptedInsurances.includes(asuransiPasien)
              ) || [];

              if(availableDoctors.length === 0) {
                return (
                  <div className="alert alert-danger">
                    <p>Tidak ada dokter yang tersedia untuk poli <strong>{selectLaboratory}</strong> yang menerima asuransi <strong>{asuransiPasien}</strong>.</p>
                    <p>Silakan pilih poli lain atau metode pembayaran lain.</p>
                  </div>
                )
              }
            }else if(selectedPaymentMethod === "asuransi" && !asuransiPasien){
              return (
                <div className="alert alert-warning">
                  Silakan pilih asuransi terlebih dahulu atau tambahkan asuransi baru.
                </div>
              );
            }else {
              availableDoctors = laboratoryDoctors(selectLaboratory) || [];

              if(availableDoctors.length === 0) {
                return (
                  <div className="alert alert-danger">
                    Tidak ada dokter yang tersedia untuk poli ini.
                  </div>
                )
              }
            }

            const doctorOptions = availableDoctors.map((doctor) => ({
              value: doctor.id,
              label: doctor.name,
              icon: "👨‍⚕️",
              subtitle: "Jadwal Praktik: " + doctor.schedule,
              asuransi: doctor.acceptedInsurances.join(", ")
            }));

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
            )
          }
        }
      ]
    },
    {
      section: "Jadwal Pengambilan Sampel",
      icon: "📅",
      description: "Pilih jadwal untuk pengambilan sampel darah atau spesimen lainnya",
      fields: [
        {
          name: "appointmentDate",
          label: "Tanggal Pengambilan Sampel",
          type: "date",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih tanggal pengambilan sampel" },
        },
        {
          name: "appointmentTime",
          label: "Waktu Pengambilan Sampel",
          type: "select",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih waktu pengambilan sampel" },
          options: [
            { value: "08:00", label: "08:00 - 09:00" },
            { value: "09:00", label: "09:00 - 10:00" },
            { value: "10:00", label: "10:00 - 11:00" },
            { value: "11:00", label: "11:00 - 12:00" },
            { value: "13:00", label: "13:00 - 14:00" },
            { value: "14:00", label: "14:00 - 15:00" },
            { value: "15:00", label: "15:00 - 16:00" }
          ]
        },
        {
          name: "fastingRequired",
          label: "Apakah Anda sudah berpuasa (untuk pemeriksaan yang memerlukan puasa)?",
          type: "radio",
          colSize: 12,
          options: [
            { value: "yes", label: "Ya, saya sudah berpuasa" },
            { value: "no", label: "Tidak, saya belum berpuasa" },
            { value: "not-required", label: "Pemeriksaan saya tidak memerlukan puasa" }
          ]
        },
        {
          name: "specialPreparation",
          label: "Catatan Khusus",
          type: "textarea",
          placeholder: "Apakah ada kondisi medis atau persiapan khusus yang perlu disampaikan?",
          colSize: 12
        }
      ]
    },
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      customRender: ({ methods }) => {
        const formData = methods.getValues();
        let selectedServices = [];
        
        // Determine which services to display based on service type
        if (formData.serviceType === "package") {
          const selectedPackage = laboratoryPackages.find(pkg => pkg.id === formData.selectedPackage);
          if (selectedPackage) {
            selectedServices = selectedPackage.tests.map(testId => 
              laboratoryServices.find(svc => svc.id === testId)
            ).filter(Boolean);
          }
        } else if (formData.serviceType === "individual" && Array.isArray(formData.selectedLaboratory)) {
          selectedServices = formData.selectedLaboratory.map(id => 
            laboratoryServices.find(svc => svc.id === id)
          ).filter(Boolean);
        } else if (formData.serviceType === "individual" && formData.selectedLaboratory) {
          const service = laboratoryServices.find(svc => svc.id === formData.selectedLaboratory);
          if (service) selectedServices = [service];
        }
        
        const selectedDoctor = laboratoryDoctors.find(d => d.id === formData.selectedDoctor);
        
        // Calculate total price range
        let minTotal = 0;
        let maxTotal = 0;
        if (formData.serviceType === "package") {
          const pkg = laboratoryPackages.find(p => p.id === formData.selectedPackage);
          if (pkg) {
            const priceStr = pkg.price.replace('Rp ', '').replace('.', '');
            minTotal = parseInt(priceStr, 10);
            maxTotal = minTotal;
          }
        } else {
          selectedServices.forEach(service => {
            if (service) {
              const priceRange = service.price.replace('Rp ', '').split(' - ');
              minTotal += parseInt(priceRange[0].replace('.', ''), 10);
              maxTotal += parseInt(priceRange[1].replace('.', ''), 10);
            }
          });
        }

        return (
          <div className="confirmation-section">
            <h4 className="mb-4">Konfirmasi Pendaftaran Laboratorium</h4>
            
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
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Tanggal Lahir:</strong> {formData.dob || '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Jenis Kelamin:</strong> {formData.gender === 'laki-laki' ? 'Laki-laki' : 'Perempuan' || '-'}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Detail Layanan Laboratorium</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} className="mb-3">
                    <strong>Jenis Layanan:</strong> {formData.serviceType === 'package' ? 'Paket Pemeriksaan' : 'Pemeriksaan Individual'}
                  </Col>
                  
                  {formData.serviceType === 'package' && (
                    <Col xs={12} className="mb-3">
                      <strong>Paket:</strong> {laboratoryPackages.find(p => p.id === formData.selectedPackage)?.name || '-'}
                    </Col>
                  )}
                  
                  <Col xs={12} className="mb-3">
                    <strong>Pemeriksaan yang Dipilih:</strong>
                    <ul className="mt-2">
                      {selectedServices.length > 0 ? 
                        selectedServices.map((service, idx) => (
                          <li key={idx}>{service.name} - {service.price}</li>
                        )) : 
                        <li>Tidak ada pemeriksaan yang dipilih</li>
                      }
                    </ul>
                  </Col>
                  
                  <Col xs={12} className="mb-3">
                    <strong>Estimasi Biaya Total:</strong>{' '}
                    {formData.serviceType === 'package' 
                      ? laboratoryPackages.find(p => p.id === formData.selectedPackage)?.price || '-'
                      : `Rp ${minTotal.toLocaleString()} - Rp ${maxTotal.toLocaleString()}`
                    }
                  </Col>
                  
                  <Col xs={12} className="mb-3">
                    <strong>Dokter:</strong> {selectedDoctor ? selectedDoctor.name : '-'}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Jadwal Pengambilan Sampel</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Tanggal:</strong> {formData.appointmentDate || '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Waktu:</strong> {formData.appointmentTime || '-'}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <strong>Status Puasa:</strong> {
                      formData.fastingRequired === 'yes' ? 'Sudah berpuasa' : 
                      formData.fastingRequired === 'no' ? 'Belum berpuasa' : 
                      'Tidak memerlukan puasa'
                    }
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
                <li>Harap bawa kartu identitas dan kartu asuransi (jika menggunakan asuransi).</li>
                <li>Untuk pemeriksaan yang memerlukan puasa, pastikan Anda berpuasa 10-12 jam sebelum pengambilan sampel.</li>
                <li>Hasil pemeriksaan umumnya dapat diambil 1-3 hari kerja setelah pengambilan sampel.</li>
                <li>Konsumsilah air putih yang cukup sebelum pengambilan sampel darah.</li>
              </ul>
            </div>
          </div>
        );
      }
    }
  ];

  // Handle form submission
  const handleSubmit = (data) => {
    console.log("Pendaftaran Laboratorium:", data);
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
  };

  return (
    <div className="laboratory-registration-page">
      <DynamicStepCardForm
        key={currentStep}
        title="Pendaftaran Layanan Laboratorium"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/kiosk"
        doctorsData={filteredDoctorsByInsurance.length > 0 ? filteredDoctorsByInsurance : laboratoryDoctors}
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

export default LaboratoryRegistrationPage;