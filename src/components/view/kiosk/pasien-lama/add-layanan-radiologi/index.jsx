'use client';
import React, { useState } from "react";
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
      id: 'ct-scan', 
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
  const radiologiDoctors = [
    { 
      id: 'dr-wahyu', 
      name: 'dr. Wahyu Setiawan, Sp.Rad', 
      specialization: 'Radiologi Umum', 
      schedule: 'Senin-Jumat, 08.00-16.00',
      acceptedInsurances: ['BPJS Kesehatan', 'Prudential', 'Allianz']
    },
    { 
      id: 'dr-dewi', 
      name: 'dr. Dewi Pratiwi, Sp.Rad', 
      specialization: 'Radiologi Khusus', 
      schedule: 'Selasa-Sabtu, 09.00-17.00',
      acceptedInsurances: ['BPJS Kesehatan', 'AXA Mandiri']
    }
  ];

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
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    handleCloseModal();
  };

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
              description: "Pembayaran dilakukan langsung di kasir rumah sakit setelah selesai layanan."
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
          options: radiologiDoctors.map(doctor => ({
            value: doctor.id,
            label: doctor.name,
            icon: "👨‍⚕️",
            subtitle: doctor.specialization,
            description: `Jadwal: ${doctor.schedule}`
          }))
        }
      ]
    },
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      customRender: ({ methods }) => {
        const formData = methods.getValues();
        const selectedService = radiologyServices.find(s => s.id === formData.selectedRadiology);
        const selectedDoctor = radiologiDoctors.find(d => d.id === formData.selectedDoctor);

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
                    <strong>Jenis Pemeriksaan:</strong> {selectedService ? selectedService.name : '-'}
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <strong>Perkiraan Biaya:</strong> {selectedService ? selectedService.price : '-'}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <strong>Dokter:</strong> {selectedDoctor ? selectedDoctor.name : '-'}
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
    console.log("Pendaftaran Radiologi:", data);
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
  };

  return (
    <div className="radiology-registration-page">
      <DynamicStepCardForm
        key={currentStep}
        title="Pendaftaran Layanan Radiologi"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/layanan"
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