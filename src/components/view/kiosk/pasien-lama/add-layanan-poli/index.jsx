"use client";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "../../add-guest-layanan/modal-insurance";

const PatientRegistrationPage = () => {
  // Dokter data berdasarkan poli dengan penambahan daftar asuransi yang diterima
  const doctors = {
    umum: [
      { id: 'dr-budi', name: 'dr. Budi Santoso', schedule: 'Senin-Jumat, 08.00-14.00', acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz'] },
      { id: 'dr-ani', name: 'dr. Ani Wijaya', schedule: 'Senin-Sabtu, 14.00-20.00', acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri'] }
    ],
    gigi: [
      { id: 'drg-maya', name: 'drg. Maya Putri', schedule: 'Senin, Rabu, Jumat, 09.00-15.00', acceptedInsurances: ['Prudential', 'Allianz', 'AXA Mandiri'] },
      { id: 'drg-rudi', name: 'drg. Rudi Hermawan', schedule: 'Selasa, Kamis, Sabtu, 10.00-16.00', acceptedInsurances: ['BPJS Kesehatan'] }
    ],
    mata: [
      { id: 'dr-dina', name: 'dr. Dina Setiawan, Sp.M', schedule: 'Senin, Kamis, 08.00-12.00', acceptedInsurances: ['BPJS Kesehatan', 'Prudential'] },
      { id: 'dr-hadi', name: 'dr. Hadi Pratama, Sp.M', schedule: 'Selasa, Jumat, 13.00-17.00', acceptedInsurances: ['Allianz', 'AXA Mandiri'] }
    ],
    kandungan: [
      { id: 'dr-ratna', name: 'dr. Ratna Dewi, Sp.OG', schedule: 'Senin, Rabu, Jumat, 09.00-15.00', acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'AXA Mandiri'] },
      { id: 'dr-sinta', name: 'dr. Sinta Permata, Sp.OG', schedule: 'Selasa, Kamis, Sabtu, 10.00-16.00', acceptedInsurances: ['Allianz'] }
    ],
    anak: [
      { id: 'dr-ahmad', name: 'dr. Ahmad Ridwan, Sp.A', schedule: 'Senin-Rabu, 08.00-14.00', acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz', 'AXA Mandiri'] },
      { id: 'dr-lisa', name: 'dr. Lisa Kusuma, Sp.A', schedule: 'Kamis-Sabtu, 09.00-15.00', acceptedInsurances: ['BPJS Kesehatan'] }
    ],
    jantung: [
      { id: 'dr-hartono', name: 'dr. Hartono, Sp.JP', schedule: 'Senin, Rabu, Jumat, 08.00-12.00', acceptedInsurances: ['Prudential', 'Allianz'] },
      { id: 'dr-mira', name: 'dr. Mira Susanti, Sp.JP', schedule: 'Selasa, Kamis, 13.00-17.00', acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri'] }
    ]
  };

  // Asuransi data
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
  
  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
    
    // Check if the insurance is non-PKS
    if (!insuranceData.isPKS) {
      setNonPKSInsuranceSelected(true);
    }
    
    // Filter doctors based on the newly added insurance
    updateDoctorsByInsurance([...insuranceList, insuranceData]);
  };

  // Function to update doctors based on selected insurances
  const updateDoctorsByInsurance = (insurances) => {
    const filteredDoctors = {};
    
    // For each specialty (poli)
    Object.keys(doctors).forEach(poliKey => {
      // Filter doctors who accept at least one of the selected insurances
      filteredDoctors[poliKey] = doctors[poliKey].filter(doctor => {
        // If no insurance or 'Tidak Ada' (self-pay) is selected, show all doctors
        if (insurances.length === 0 || insurances.some(ins => ins.provider === 'Tidak Ada')) {
          return true;
        }
        
        // For non-PKS insurances, show all doctors since payment will be cash
        if (insurances.some(ins => !ins.isPKS)) {
          return true;
        }
        
        // Check if the doctor accepts any of the selected insurances
        return doctor.acceptedInsurances.some(acceptedIns => 
          insurances.some(selectedIns => selectedIns.provider === acceptedIns)
        );
      });
    });
    
    setFilteredDoctorsByInsurance(filteredDoctors);
  };

  // Form config
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
        },
        {
          name: "address",
          label: "Alamat",
          type: "textarea",
          placeholder: "Masukkan alamat lengkap",
          colSize: 12,
        }
      ]
    },
    {
      section: "Asuransi",
      icon: "📋",
      description: "Pilih metode pembayaran Anda",
      fields: [],
      cards: [
        {
          name: "pembayaran",
          title: "Metode Pembayaran",
          description: "Silakan pilih metode pembayaran yang akan Anda gunakan:",
          colSize: 6,
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
          ]
        }
      ],
      fields: [
        {
          id: "asuransiPasien",
          name: "asuransiPasien",
          label: "Asuransi yang digunakan pasien",
          type: "select",
          options: insuranceList.map((item) => ({ 
            label: item.provider, 
            value: item.provider,
            isPKS: item.isPKS
          })),
          colSize: 6,
          hide: (watchValues) => watchValues.pembayaran !== "asuransi"
        },
        {
          id: "nomorAsuransi",
          name: "nomorAsuransi",
          label: "Nomor Kartu Asuransi",
          type: "number",
          colSize: 6,
          placeholder: "masukkan nomor asuransi",
          hide: (watchValues) => watchValues.pembayaran !== "asuransi"
        },
        {
          id: "tambahAsuransi",
          name: "tambahAsuransi",
          label: "",
          type: "custom",
          customRender: () => (
            <Button variant="info" onClick={handleOpenModal} style={{ marginTop: "30px"}}>
              Tambah Asuransi
            </Button>
          ),
          colSize: 6,
          className: "mt-2",
          hide: (watchValues) => watchValues.pembayaran !== "asuransi"
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
          hide: (watchValues) => watchValues.pembayaran !== "asuransi"
        }
      ]
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
          options: [
            { 
              value: "umum", 
              label: "Poli Umum", 
              icon: "🩺", 
              subtitle: "Untuk pemeriksaan kesehatan umum"
            },
            { 
              value: "gigi", 
              label: "Poli Gigi", 
              icon: "🦷", 
              subtitle: "Untuk masalah kesehatan gigi dan mulut"
            },
            { 
              value: "mata", 
              label: "Poli Mata", 
              icon: "👁️", 
              subtitle: "Untuk masalah penglihatan dan kesehatan mata"
            },
            { 
              value: "kandungan", 
              label: "Poli Kandungan", 
              icon: "🤰", 
              subtitle: "Untuk ibu hamil dan masalah kewanitaan"
            },
            { 
              value: "anak", 
              label: "Poli Anak", 
              icon: "👶", 
              subtitle: "Untuk anak usia 0-18 tahun"
            },
            { 
              value: "jantung", 
              label: "Poli Jantung", 
              icon: "❤️", 
              subtitle: "Untuk masalah kardiovaskular"
            },
            { 
              value: "saraf", 
              label: "Poli Saraf", 
              icon: "🧠", 
              subtitle: "Untuk masalah Saraf Kejepit"
            },
            {
              value: "kulit", 
              label: "Poli Kulit", 
              icon: "🧴", 
              subtitle: "Untuk masalah Kulit"
            },
          ]
        }
      ]
    },
    {
      section: "Pilih Dokter",
      icon: "👨‍⚕️",
      description: "Pilih dokter yang tersedia pada poliklinik ",
      fields: [],
      cards: [
        {
          name: "selectedDoctor",
          title: "Pilih Dokter",
          description: "Silakan pilih dokter yang tersedia pada poli yang Anda pilih:",
          colSize: 6,
          required: true,
          rules: { required: "Silakan pilih dokter" },
          options: [], // Will be dynamically populated
          customRender: ({ methods }) => {
            const selectedPoli = methods.watch("selectedPoli");
            const asuransiPasien = methods.watch("asuransiPasien");
            const pembayaran = methods.watch("pembayaran");
            
            // Find the selected insurance to check if it's PKS or non-PKS
            const selectedInsurance = insuranceList.find(ins => ins.provider === asuransiPasien);
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
            if (pembayaran === "asuransi" && isNonPKS) {
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
            
            // Regular flow - if paying with insurance, filter by insurance
            if (pembayaran === "asuransi" && asuransiPasien) {
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
            } else if (pembayaran === "asuransi" && !asuransiPasien) {
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
      fields: [],
      customRender: ({ methods }) => {
        const formData = methods.getValues();
        const selectedPoli = formData.selectedPoli;
        const selectedDoctor = formData.selectedDoctor;
        const pembayaran = formData.pembayaran;
        const asuransiPasien = formData.asuransiPasien;
        
        // Get doctor name and schedule
        const doctor = selectedPoli && selectedDoctor ? 
          doctors[selectedPoli].find(d => d.id === selectedDoctor) : null;
        
        return (
          <div className="confirmation-section">
            <h4 className="mb-4">Konfirmasi Data Pendaftaran</h4>
            <p>Silakan periksa kembali data pendaftaran Anda:</p>
            
            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Data Pribadi</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Nama Lengkap:</strong> {formData.name}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>NIK:</strong> {formData.nik}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Tanggal Lahir:</strong> {formData.dob}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Jenis Kelamin:</strong> {formData.gender}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>No. Telepon:</strong> {formData.phone}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Email:</strong> {formData.email || '-'}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <strong>Alamat:</strong> {formData.address}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Data Layanan</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Poli:</strong> {selectedPoli ? 
                      {
                        'umum': 'Poli Umum', 
                        'gigi': 'Poli Gigi', 
                        'mata': 'Poli Mata',
                        'kandungan': 'Poli Kandungan',
                        'anak': 'Poli Anak',
                        'jantung': 'Poli Jantung',
                        'saraf': 'Poli Saraf',
                        'kulit': 'Poli Kulit'
                      }[selectedPoli] : '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Dokter:</strong> {doctor ? doctor.name : '-'}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <strong>Jadwal Praktik:</strong> {doctor ? doctor.schedule : '-'}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header>
                <h5 className="m-0">Data Pembayaran</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Metode Pembayaran:</strong> {pembayaran === 'tunai' ? 'Tunai' : 'Asuransi'}
                  </Col>
                  {pembayaran === 'asuransi' && (
                    <>
                      <Col xs={12} md={6} className="mb-3">
                        <strong>Asuransi:</strong> {asuransiPasien || '-'}
                      </Col>
                      <Col xs={12} className="mb-3">
                        <strong>Nomor Kartu:</strong> {formData.nomorAsuransi || '-'}
                      </Col>
                    </>
                  )}
                </Row>
              </Card.Body>
            </Card>
            
            <div className="alert alert-info">
              <p className="mb-1">
                <strong>Catatan Penting:</strong>
              </p>
              <ul className="mb-0">
                <li>Hadir 30 menit sebelum jadwal untuk keperluan administrasi.</li>
                <li>Bawa kartu identitas (KTP) dan kartu asuransi (jika ada).</li>
                <li>Pendaftaran ini dapat dibatalkan maksimal 24 jam sebelum jadwal.</li>
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
    <div className="patient-registration-page">
      <DynamicStepCardForm
        title="Pendaftaran Pasien"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/kiosk"
        doctorsData={filteredDoctorsByInsurance.length > 0 ? filteredDoctorsByInsurance : doctors}
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

export default PatientRegistrationPage;