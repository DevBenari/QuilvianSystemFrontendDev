"use client";
import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "../../add-guest-layanan/modal-insurance";

const PatientRegistrationPage = () => {
  // Dokter data berdasarkan poli
  const doctors = {
    umum: [
      { id: 'dr-budi', name: 'dr. Budi Santoso', schedule: 'Senin-Jumat, 08.00-14.00' },
      { id: 'dr-ani', name: 'dr. Ani Wijaya', schedule: 'Senin-Sabtu, 14.00-20.00' }
    ],
    gigi: [
      { id: 'drg-maya', name: 'drg. Maya Putri', schedule: 'Senin, Rabu, Jumat, 09.00-15.00' },
      { id: 'drg-rudi', name: 'drg. Rudi Hermawan', schedule: 'Selasa, Kamis, Sabtu, 10.00-16.00' }
    ],
    mata: [
      { id: 'dr-dina', name: 'dr. Dina Setiawan, Sp.M', schedule: 'Senin, Kamis, 08.00-12.00' },
      { id: 'dr-hadi', name: 'dr. Hadi Pratama, Sp.M', schedule: 'Selasa, Jumat, 13.00-17.00' }
    ],
    kandungan: [
      { id: 'dr-ratna', name: 'dr. Ratna Dewi, Sp.OG', schedule: 'Senin, Rabu, Jumat, 09.00-15.00' },
      { id: 'dr-sinta', name: 'dr. Sinta Permata, Sp.OG', schedule: 'Selasa, Kamis, Sabtu, 10.00-16.00' }
    ],
    anak: [
      { id: 'dr-ahmad', name: 'dr. Ahmad Ridwan, Sp.A', schedule: 'Senin-Rabu, 08.00-14.00' },
      { id: 'dr-lisa', name: 'dr. Lisa Kusuma, Sp.A', schedule: 'Kamis-Sabtu, 09.00-15.00' }
    ],
    jantung: [
      { id: 'dr-hartono', name: 'dr. Hartono, Sp.JP', schedule: 'Senin, Rabu, Jumat, 08.00-12.00' },
      { id: 'dr-mira', name: 'dr. Mira Susanti, Sp.JP', schedule: 'Selasa, Kamis, 13.00-17.00' }
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
  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
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
        //   rules: { required: "Nama lengkap wajib diisi" }
        },
        {
          name: "nik",
          label: "NIK",
          type: "text",
          placeholder: "Masukkan 16 digit NIK",
          colSize: 6,
        //   rules: { 
        //     required: "NIK wajib diisi",
        //     pattern: {
        //       value: /^\d{16}$/,
        //       message: "NIK harus 16 digit angka"
        //     }
        //   }
        },
        {
          name: "dob",
          label: "Tanggal Lahir",
          type: "date",
          colSize: 6,
        //   rules: { required: "Tanggal lahir wajib diisi" }
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
        //   rules: { required: "Jenis kelamin wajib dipilih" }
        },
        {
          name: "phone",
          label: "No. Telepon",
          type: "text",
          placeholder: "Contoh: 08123456789",
          colSize: 6,
        //   rules: { 
        //     required: "No. telepon wajib diisi",
        //     pattern: {
        //       value: /^08\d{8,11}$/,
        //       message: "Format nomor telepon tidak valid"
        //     }
        //   }
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Contoh: email@domain.com",
          colSize: 6,
        //   rules: {
        //     pattern: {
        //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        //       message: "Format email tidak valid"
        //     }
        //   }
        },
        {
          name: "address",
          label: "Alamat",
          type: "textarea",
          placeholder: "Masukkan alamat lengkap",
          colSize: 12,
        //   rules: { required: "Alamat wajib diisi" }
        }
      ]
    },
    {
        section: "Asuransi",
        icon: "📋",
        description: "Pilih asuransi kesehatan Anda",
        fields: 
        [
            {
                id:"pembayaran",
                name:"pembayaran",
                label: "Metode Pembayaran",
                type: "select",
                options: [
                    {label: "Tunai", value: "tunai"},
                    {label: "Asuransi", value:"asuransi"}
                ],
                colsize:6,
            },
            {
              id:"asuransiPasien",
              name:"asuransiPasien",
              label: "Asuransi yang digunakan pasien",
              type: "select",
              options: insuranceList.map((item) => ({ label: item.provider, value: item.provider})),
              colSize:6,
              hide: (watchValues) => watchValues.pembayaran !== "asuransi"
            },
            {
                id:"nomorAsuransi",
                name:"nomorAsuransi",
                label: "Nomor Kartu Asuransi",
                type: "number",
                colsize:6,
                placeholder:"masukkan nomor asuransi",
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
              icon: "❤️", 
              subtitle: "Untuk masalah Saraf Kejepit"
            },
            { 
                value: "kulit", 
                label: "Poli Kulit", 
                icon: "❤️", 
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
        //   customRender: ({ field, methods }) => {
        //     const selectedPoli = methods.watch("selectedPoli");
        //     const options = selectedPoli ? 
        //       doctors[selectedPoli]?.map(doc => ({
        //         value: doc.id,
        //         label: doc.name,
        //         icon: "👨‍⚕️",
        //         subtitle: "Jadwal Praktik:",
        //         description: doc.schedule
        //       })) : [];
          
        //     console.log("Dokter yang tersedia untuk poli", selectedPoli, options);
        //     console.log("Selected Poli Value:", selectedPoli);
        //     console.log("Doctors object:", doctors);
            
        //     return (
        //       <>
        //         <h5 className="mb-3">{field.title}</h5>
        //         <p className="mb-3">{field.description}</p>
        //         {!selectedPoli ? (
        //           <div className="alert alert-warning">
        //             Silakan pilih poli terlebih dahulu pada langkah sebelumnya.
        //           </div>
        //         ) : options.length === 0 ? (
        //           <div className="alert alert-danger">
        //             Tidak ada dokter yang tersedia untuk poli ini.
        //           </div>
        //         ) : (
        //           <Row>
        //             {options.map((option) => (
        //               <Col xs={12} md={6} key={`doctor-${option.value}`} className="mb-3">
        //                 <Card 
        //                   className={`selection-card ${methods.watch("selectedDoctor") === option.value ? 'selected shadow-lg border-primary' : ''}`}
        //                   onClick={() => methods.setValue("selectedDoctor", option.value, { shouldValidate: true })}
        //                   style={{ cursor: 'pointer' }}
        //                 >
        //                   <Card.Body className="text-center p-4">
        //                     <div className="card-icon mb-3">{option.icon}</div>
        //                     <Card.Title>{option.label}</Card.Title>
        //                     <Card.Subtitle className="mb-2 text-muted">{option.subtitle}</Card.Subtitle>
        //                     <Card.Text>{option.description}</Card.Text>
        //                   </Card.Body>
        //                 </Card>
        //               </Col>
        //             ))}
        //           </Row>
        //         )}
        //         {field.required && !methods.watch("selectedDoctor") && methods.formState.errors.selectedDoctor && (
        //           <div className="text-danger mt-2">Silakan pilih dokter</div>
        //         )}
        //       </>
        //     );
        //   }
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
        const selectedInsurance = formData.selectedInsurance;
        
        // Get doctor name and schedule
        const doctor = selectedPoli && selectedDoctor ? 
          doctors[selectedPoli].find(d => d.id === selectedDoctor) : null;
        
        // Get insurance name
        const insurance = selectedInsurance ? 
          insurances.find(i => i.id === selectedInsurance) : null;
        
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
                        'jantung': 'Poli Jantung'
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
                <h5 className="m-0">Data Asuransi</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Asuransi:</strong> {insurance ? insurance.name : '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Jenis:</strong> {insurance ? insurance.type : '-'}
                  </Col>
                  {selectedInsurance && selectedInsurance !== 'none' && (
                    <Col xs={12} className="mb-3">
                      <strong>Nomor Kartu:</strong> {formData.insuranceNumber || '-'}
                    </Col>
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
        doctorsData={doctors}
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