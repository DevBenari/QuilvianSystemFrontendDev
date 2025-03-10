'use client';
import React, { useState, useRef } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "@/components/view/kiosk/add-guest-layanan/modal-insurance";

const PatientOpRegistrationPage = () => {
  // Blood types data
  const bloodTypes = [
    { id: 'a_positive', name: 'A+' },
    { id: 'a_negative', name: 'A-' },
    { id: 'b_positive', name: 'B+' },
    { id: 'b_negative', name: 'B-' },
    { id: 'ab_positive', name: 'AB+' },
    { id: 'ab_negative', name: 'AB-' },
    { id: 'o_positive', name: 'O+' },
    { id: 'o_negative', name: 'O-' },
    { id: 'unknown', name: 'Tidak Tahu' }
  ];

  // Clinic/Department data
  const clinics = [
    { 
      id: 'internal_medicine', 
      name: 'Poli Penyakit Dalam', 
      description: 'Untuk konsultasi kesehatan organ dalam tubuh',
      schedule: 'Senin-Jumat, 08.00-14.00'
    },
    { 
      id: 'cardiology', 
      name: 'Poli Jantung', 
      description: 'Untuk masalah kesehatan jantung dan pembuluh darah',
      schedule: 'Selasa & Kamis, 08.00-14.00'
    },
    { 
      id: 'pediatrics', 
      name: 'Poli Anak', 
      description: 'Untuk kesehatan anak dari bayi hingga remaja',
      schedule: 'Senin-Jumat, 08.00-14.00'
    },
    { 
      id: 'obstetrics', 
      name: 'Poli Kebidanan & Kandungan', 
      description: 'Untuk kesehatan reproduksi wanita dan kehamilan',
      schedule: 'Senin, Rabu, Jumat, 08.00-14.00'
    },
    { 
      id: 'orthopedics', 
      name: 'Poli Ortopedi', 
      description: 'Untuk masalah tulang, sendi, dan otot',
      schedule: 'Selasa & Kamis, 08.00-14.00'
    },
    { 
      id: 'neurology', 
      name: 'Poli Saraf', 
      description: 'Untuk masalah sistem saraf dan otak',
      schedule: 'Selasa & Kamis, 08.00-14.00'
    }
  ];

  // Doctors data
  const doctors = {
    internal_medicine: [
      {
        id: 'dr-rahmat',
        name: 'Dr. Rahmat Setiawan, Sp.PD',
        description: 'Spesialis Penyakit Dalam',
        schedule: 'Senin-Rabu, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      },
      {
        id: 'dr-maya',
        name: 'Dr. Maya Indrawati, Sp.PD',
        description: 'Spesialis Penyakit Dalam',
        schedule: 'Kamis-Jumat, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Allianz']
      }
    ],
    cardiology: [
      {
        id: 'dr-anton',
        name: 'Dr. Anton Wijaya, Sp.JP',
        description: 'Spesialis Jantung dan Pembuluh Darah',
        schedule: 'Selasa, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential']
      },
      {
        id: 'dr-linda',
        name: 'Dr. Linda Wijaya, Sp.JP',
        description: 'Spesialis Jantung dan Pembuluh Darah',
        schedule: 'Kamis, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Allianz']
      }
    ],
    pediatrics: [
      {
        id: 'dr-rini',
        name: 'Dr. Rini Mulyani, Sp.A',
        description: 'Spesialis Anak',
        schedule: 'Senin, Rabu, Jumat, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'AXA Mandiri']
      },
      {
        id: 'dr-budi',
        name: 'Dr. Budi Santoso, Sp.A',
        description: 'Spesialis Anak',
        schedule: 'Selasa & Kamis, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Allianz']
      }
    ],
    obstetrics: [
      {
        id: 'dr-siti',
        name: 'Dr. Siti Rahmawati, Sp.OG',
        description: 'Spesialis Kebidanan dan Kandungan',
        schedule: 'Senin & Rabu, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'AXA Mandiri']
      },
      {
        id: 'dr-hendra',
        name: 'Dr. Hendra Kusuma, Sp.OG',
        description: 'Spesialis Kebidanan dan Kandungan',
        schedule: 'Jumat, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Allianz']
      }
    ],
    orthopedics: [
      {
        id: 'dr-deni',
        name: 'Dr. Deni Pratama, Sp.OT',
        description: 'Spesialis Ortopedi dan Traumatologi',
        schedule: 'Selasa, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential']
      },
      {
        id: 'dr-ratna',
        name: 'Dr. Ratna Dewi, Sp.OT',
        description: 'Spesialis Ortopedi dan Traumatologi',
        schedule: 'Kamis, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri', 'Allianz']
      }
    ],
    neurology: [
      {
        id: 'dr-eko',
        name: 'Dr. Eko Prasetyo, Sp.S',
        description: 'Spesialis Saraf',
        schedule: 'Selasa, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
      },
      {
        id: 'dr-anita',
        name: 'Dr. Anita Sari, Sp.S',
        description: 'Spesialis Saraf',
        schedule: 'Kamis, 08.00-14.00',
        acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri']
      }
    ]
  };

  // Insurance data
  const insurances = [
    { id: 'bpjs', name: 'BPJS Kesehatan', type: 'Asuransi Kesehatan Nasional' },
    { id: 'prudential', name: 'Prudential', type: 'Asuransi Swasta' },
    { id: 'allianz', name: 'Allianz', type: 'Asuransi Swasta' },
    { id: 'axa', name: 'AXA Mandiri', type: 'Asuransi Swasta' },
    { id: 'other', name: 'Lainnya', type: 'Asuransi Lainnya' },
    { id: 'none', name: 'Tidak Ada', type: 'Bayar Mandiri' }
  ];

  // States
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
      formMethodRef.setValue("asuransiPasien", insuranceData.provider);
      formMethodRef.trigger(["nomorAsuransi", "asuransiPasien"]);
    }

    updateDoctorsByInsurance([...insuranceList, insuranceData]);
  };

  const updateDoctorsByInsurance = (insurances) => {
    const filteredDoctors = {};

    Object.keys(doctors).forEach(clinicKey => {
      filteredDoctors[clinicKey] = doctors[clinicKey].filter(doctor => {
        if (insurances.length === 0 || insurances.some(ins => ins.provider === 'Tidak Ada')) {
          return true;
        }
        
        if (insurances.some(ins => !ins.isPKS)) {
          return true;
        }
        
        return doctor.acceptedInsurances.some(acceptedIns => 
          insurances.some(selectedIns => selectedIns.provider === acceptedIns)
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
      description: "Isi informasi pribadi pasien",
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
          name: "tempatLahir",
          label: "Tempat Lahir",
          type: "text",
          placeholder: "Masukkan kota tempat lahir",
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
          name: "bloodType",
          label: "Golongan Darah",
          type: "select",
          colSize: 6,
          options: bloodTypes.map(type => ({
            value: type.id,
            label: type.name
          }))
        },
        {
          name: "religion",
          label: "Agama",
          type: "select",
          colSize: 6,
          options: [
            { value: "islam", label: "Islam" },
            { value: "kristen", label: "Kristen" },
            { value: "katolik", label: "Katolik" },
            { value: "hindu", label: "Hindu" },
            { value: "buddha", label: "Buddha" },
            { value: "khonghucu", label: "Khonghucu" },
            { value: "lainnya", label: "Lainnya" }
          ]
        },
        {
          name: "maritalStatus",
          label: "Status Pernikahan",
          type: "select",
          colSize: 6,
          options: [
            { value: "belum_menikah", label: "Belum Menikah" },
            { value: "menikah", label: "Menikah" },
            { value: "cerai_hidup", label: "Cerai Hidup" },
            { value: "cerai_mati", label: "Cerai Mati" }
          ]
        }
      ]
    },
    {
      section: "Informasi Keluarga",
      icon: "👨‍👩‍👧",
      description: "Isi informasi keluarga terdekat yang dapat dihubungi",
      fields: [
        {
          name: "emergencyContactName",
          label: "Nama Kontak Darurat",
          type: "text",
          placeholder: "Nama keluarga yang dapat dihubungi",
          colSize: 6,
          
        },
        {
          name: "emergencyContactRelation",
          label: "Hubungan",
          type: "select",
          colSize: 6,
          options: [
            { value: "suami", label: "Suami" },
            { value: "istri", label: "Istri" },
            { value: "anak", label: "Anak" },
            { value: "orang_tua", label: "Orang Tua" },
            { value: "saudara", label: "Saudara" },
            { value: "lainnya", label: "Lainnya" }
          ],
          
        },
        {
          name: "emergencyContactPhone",
          label: "No. Telepon Kontak Darurat",
          type: "text",
          placeholder: "Contoh: 08123456789",
          colSize: 6,
        },
        {
          name: "emergencyContactAddress",
          label: "Alamat Kontak Darurat",
          type: "textarea",
          placeholder: "Alamat kontak darurat",
          colSize: 12
        }
      ]
    },
    {
      section: "Pembayaran",
      icon: "💳",
      description: "Pilih metode pembayaran untuk layanan kesehatan",
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
                          } else {
                            setSelectedPaymentMethod("tunai");
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
      section: "Pilih Poli",
      icon: "🏥",
      description: "Pilih poli yang sesuai dengan kebutuhan pemeriksaan Anda",
      cards: [
        {
          name: "selectedClinic",
          title: "Poli Tujuan",
          description: "Silakan pilih poli tujuan untuk pemeriksaan Anda:",
          colSize: 3,
          required: true,
          rules: { required: "Silakan pilih poli tujuan" },
          options: clinics.map(clinic => ({
            value: clinic.id,
            label: clinic.name,
            icon: "🏥",
            subtitle: clinic.schedule,
            description: clinic.description
          }))
        }
      ]
    },
    {
      section: "Pilih Dokter",
      icon: "👨‍⚕️",
      description: "Pilih dokter untuk pemeriksaan Anda",
      cards: [
        {
          name: "selectedDoctor",
          title: "Pilih Dokter",
          description: "Silakan pilih dokter yang akan melakukan pemeriksaan:",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih dokter" },
          options: [],
          customRender: ({methods}) => {
            const selectedClinic = methods.watch("selectedClinic");
            const asuransiPasien = methods.watch("asuransiPasien");
            const pembayaran =  methods.watch("pembayaran");

            const selectedInsurance = insuranceList.find(ins => ins.provider === asuransiPasien);
            const isNonPKS = selectedInsurance && !selectedInsurance.isPKS;

            if(!selectedClinic){
              return (
                <div className="alert alert-warning">
                  Silakan pilih poli terlebih dahulu pada langkah sebelumnya.
                </div>
              )
            }

            let availableDoctors = [];

            // ...previous code continues...

// Inside the customRender function for the selectedDoctor card
if(selectedPaymentMethod === "asuransi" && isNonPKS){
    availableDoctors = doctors[selectedClinic] || [];
    return (
      <>
        <div className="alert alert-info mb-4">
          <p className="mb-1"><strong>Informasi Pembayaran:</strong></p>
          <p>
            Karena Anda menggunakan asuransi non-PKS, pembayaran akan dilakukan secara Tunai, 
            tetapi Anda dapat mengajukan reimbursement ke pihak asuransi setelah layanan selesai.
          </p>
        </div>
        <Row>
          {availableDoctors.map((doctor) => {
            const isSelected = methods.watch("selectedDoctor") === doctor.id;
            
            return (
              <Col md={6} key={doctor.id}>
                <Card 
                  className={`selection-card mb-3 ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                  onClick={() => methods.setValue("selectedDoctor", doctor.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="p-4">
                    <Card.Title>{doctor.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{doctor.description}</Card.Subtitle>
                    <Card.Text>
                      <strong>Jadwal:</strong> {doctor.schedule}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  } else if (selectedPaymentMethod === "asuransi") {
    // Filter doctors based on insurance
    const filteredDoctors = (filteredDoctorsByInsurance[selectedClinic] || []).length > 0 ? 
      filteredDoctorsByInsurance[selectedClinic] : 
      doctors[selectedClinic] || [];
    
    if (filteredDoctors.length === 0) {
      return (
        <div className="alert alert-warning">
          Tidak ada dokter yang tersedia untuk poli dan asuransi yang dipilih.
        </div>
      );
    }
    
    return (
      <Row>
        {filteredDoctors.map((doctor) => {
          const isSelected = methods.watch("selectedDoctor") === doctor.id;
          const isAcceptedInsurance = selectedInsurance && 
            doctor.acceptedInsurances.includes(selectedInsurance.provider);
          
          return (
            <Col md={6} key={doctor.id}>
              <Card 
                className={`selection-card mb-3 ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                onClick={() => methods.setValue("selectedDoctor", doctor.id)}
                style={{ 
                  cursor: 'pointer',
                  opacity: isAcceptedInsurance ? 1 : 0.7 
                }}
              >
                <Card.Body className="p-4">
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doctor.description}</Card.Subtitle>
                  <Card.Text>
                    <strong>Jadwal:</strong> {doctor.schedule}
                  </Card.Text>
                  {isAcceptedInsurance ? (
                    <div className="mt-2 text-success">
                      <i className="bi bi-check-circle-fill me-1"></i> Menerima asuransi {selectedInsurance.provider}
                    </div>
                  ) : (
                    <div className="mt-2 text-danger">
                      <i className="bi bi-x-circle-fill me-1"></i> Tidak menerima asuransi {selectedInsurance.provider}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  } else {
    // If payment method is "tunai"
    availableDoctors = doctors[selectedClinic] || [];
    
    if (availableDoctors.length === 0) {
      return (
        <div className="alert alert-warning">
          Tidak ada dokter yang tersedia untuk poli yang dipilih.
        </div>
      );
    }
    
    return (
      <Row>
        {availableDoctors.map((doctor) => {
          const isSelected = methods.watch("selectedDoctor") === doctor.id;
          
          return (
            <Col md={6} key={doctor.id}>
              <Card 
                className={`selection-card mb-3 ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                onClick={() => methods.setValue("selectedDoctor", doctor.id)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="p-4">
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doctor.description}</Card.Subtitle>
                  <Card.Text>
                    <strong>Jadwal:</strong> {doctor.schedule}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
            }
          }
        ]
      },
      {
        section: "Jadwal Kunjungan",
        icon: "📅",
        description: "Pilih tanggal dan waktu kunjungan",
        fields: [
          {
            name: "appointmentDate",
            label: "Tanggal Kunjungan",
            type: "date",
            colSize: 6,
            rules: { required: "Tanggal kunjungan wajib diisi" }
          },
          {
            name: "appointmentTime",
            label: "Waktu Kunjungan",
            type: "select",
            colSize: 6,
            options: [
              { value: "08:00", label: "08:00" },
              { value: "09:00", label: "09:00" },
              { value: "10:00", label: "10:00" },
              { value: "11:00", label: "11:00" },
              { value: "13:00", label: "13:00" },
              { value: "14:00", label: "14:00" }
            ],
            rules: { required: "Waktu kunjungan wajib diisi" }
          },
          {
            name: "appointmentNotes",
            label: "Catatan Tambahan",
            type: "textarea",
            placeholder: "Tuliskan keluhan utama atau informasi penting lainnya",
            colSize: 12
          }
        ]
      },
      {
        section: "Konfirmasi Pendaftaran",
        icon: "✅",
        description: "Periksa kembali data yang telah diisi",
        fields: [
          {
            name: "confirmationCheck",
            label: "Saya menyatakan bahwa data yang saya isi adalah benar dan saya bertanggung jawab atas kebenaran data tersebut",
            type: "checkbox",
            colSize: 12,
            rules: { required: "Anda harus menyetujui pernyataan ini" }
          }
        ],
        customRender: ({ methods }) => {
          const watchAllFields = methods.watch();
          
          return (
            <Card className="mb-4">
              <Card.Body>
                <h5>Ringkasan Pendaftaran</h5>
                <Row>
                  <Col md={6}>
                    <p><strong>Nama:</strong> {watchAllFields.name || "-"}</p>
                    <p><strong>NIK:</strong> {watchAllFields.nik || "-"}</p>
                    <p><strong>Tanggal Lahir:</strong> {watchAllFields.dob || "-"}</p>
                    <p><strong>Jenis Kelamin:</strong> {watchAllFields.gender || "-"}</p>
                    <p><strong>No. Telepon:</strong> {watchAllFields.phone || "-"}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Poli:</strong> {
                      watchAllFields.selectedClinic ? 
                      clinics.find(c => c.id === watchAllFields.selectedClinic)?.name || "-" : 
                      "-"
                    }</p>
                    <p><strong>Dokter:</strong> {
                      watchAllFields.selectedDoctor && watchAllFields.selectedClinic ?
                      doctors[watchAllFields.selectedClinic]?.find(d => d.id === watchAllFields.selectedDoctor)?.name || "-" :
                      "-"
                    }</p>
                    <p><strong>Tanggal Kunjungan:</strong> {watchAllFields.appointmentDate || "-"}</p>
                    <p><strong>Waktu Kunjungan:</strong> {watchAllFields.appointmentTime || "-"}</p>
                    <p><strong>Metode Pembayaran:</strong> {
                      watchAllFields.pembayaran === "tunai" ? "Tunai" : 
                      watchAllFields.pembayaran === "asuransi" ? 
                      `Asuransi (${watchAllFields.asuransiPasien || "-"})` : 
                      "-"
                    }</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        }
      }
    ];
  
    const handleSubmit = (formData) => {
      console.log("Form submitted with data:", formData);
      // Here you would typically send the data to your backend
      alert("Pendaftaran berhasil! Silakan datang sesuai jadwal yang telah ditentukan.");
    };
  
    return (
      <div className="patient-registration-page py-4">
        <DynamicStepCardForm
        key={currentStep}
        title="Pendaftaran Pasien"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/kiosk"
        doctorsData={filteredDoctorsByInsurance.length > 0 ? filteredDoctorsByInsurance : doctors}
        onFormMethodsReady={handleFormMethodReady} 
      />
        
        {/* Modal Insurance */}
        <ModalInsurance
            onOpen={showInsuranceModal}
            onClose={handleCloseModal}
            onSubmit={handleInsuranceSubmit}
            formConfig={formConfig}
        />
      </div>
    );
  };
  
  export default PatientOpRegistrationPage;