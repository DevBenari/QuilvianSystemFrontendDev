"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import { useRouter } from "next/navigation";

const LabRegistrationPage = () => {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Sample patient data (in a real app, this would come from an API or context)
  const patientData = {
    patientId: "P12345",
    name: "John Doe",
    gender: "Laki-laki",
    birthDate: "1990-05-15",
    address: "Jl. Merdeka No. 123, Jakarta",
    phone: "08123456789",
    email: "john.doe@example.com",
    nik: "3201234567890001",
    insurances: [
      { provider: 'BPJS Kesehatan', policyNumber: '0001122334455', isPKS: true },
      { provider: 'Prudential', policyNumber: 'PRU88776655', isPKS: true }
    ]
  };

  // Sample lab tests data organized by category
  const labTestsData = {
    darah: [
      { id: 'lab-1', name: 'Hemoglobin (Hb)', processingTime: '1 jam', price: 50000, requiresFasting: false, urgentAvailable: true, category: 'darah' },
      { id: 'lab-2', name: 'Hematokrit', processingTime: '1 jam', price: 50000, requiresFasting: false, urgentAvailable: true, category: 'darah' },
      { id: 'lab-3', name: 'Leukosit', processingTime: '1 jam', price: 65000, requiresFasting: false, urgentAvailable: true, category: 'darah' },
      { id: 'lab-4', name: 'Trombosit', processingTime: '1 jam', price: 65000, requiresFasting: false, urgentAvailable: true, category: 'darah' },
      { id: 'lab-5', name: 'Gula Darah Puasa', processingTime: '2 jam', price: 75000, requiresFasting: true, urgentAvailable: false, category: 'darah' }
    ],
    urine: [
      { id: 'lab-6', name: 'Urinalisis Lengkap', processingTime: '2 jam', price: 100000, requiresFasting: false, urgentAvailable: true, category: 'urine' },
      { id: 'lab-7', name: 'Protein Urine', processingTime: '1 jam', price: 75000, requiresFasting: false, urgentAvailable: true, category: 'urine' },
      { id: 'lab-8', name: 'Sedimen Urine', processingTime: '2 jam', price: 90000, requiresFasting: false, urgentAvailable: false, category: 'urine' }
    ],
    kimia: [
      { id: 'lab-9', name: 'Fungsi Hati (SGOT, SGPT)', processingTime: '3 jam', price: 150000, requiresFasting: true, urgentAvailable: true, category: 'kimia' },
      { id: 'lab-10', name: 'Fungsi Ginjal (Ureum, Kreatinin)', processingTime: '3 jam', price: 150000, requiresFasting: true, urgentAvailable: true, category: 'kimia' },
      { id: 'lab-11', name: 'Profil Lipid', processingTime: '4 jam', price: 200000, requiresFasting: true, urgentAvailable: false, category: 'kimia' }
    ],
    mikrobiologi: [
      { id: 'lab-12', name: 'Kultur Dahak', processingTime: '5-7 hari', price: 350000, requiresFasting: false, urgentAvailable: false, category: 'mikrobiologi' },
      { id: 'lab-13', name: 'Kultur Urine', processingTime: '3-5 hari', price: 300000, requiresFasting: false, urgentAvailable: false, category: 'mikrobiologi' }
    ]
  };

  // Insurance data
  const insurances = [
    { id: 'bpjs', name: 'BPJS Kesehatan', type: 'Asuransi Kesehatan Nasional', isPKS: true },
    { id: 'prudential', name: 'Prudential', type: 'Asuransi Swasta', isPKS: true },
    { id: 'allianz', name: 'Allianz', type: 'Asuransi Swasta', isPKS: true },
    { id: 'axa', name: 'AXA Mandiri', type: 'Asuransi Swasta', isPKS: false },
    { id: 'other', name: 'Lainnya', type: 'Asuransi Lainnya', isPKS: false },
    { id: 'none', name: 'Tidak Ada', type: 'Bayar Mandiri', isPKS: false }
  ];

  // Payment methods
  const paymentMethods = [
    { value: 'tunai', label: 'Tunai' },
    { value: 'debit', label: 'Kartu Debit' },
    { value: 'kredit', label: 'Kartu Kredit' },
    { value: 'qris', label: 'QRIS' },
    { value: 'asuransi', label: 'Asuransi' }
  ];

  // Available appointment slots (in a real app, this would be dynamic)
  const appointmentSlots = [
    { date: '2025-03-04', slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'] },
    { date: '2025-03-05', slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'] },
    { date: '2025-03-06', slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'] }
  ];

  // Prepare the flattened lab tests for the form
  const [filteredLabTests, setFilteredLabTests] = useState([]);
  
  // Form configuration for lab registration
  const formConfig = [
    {
      section: "Data Diri",
      icon: "👤",
      description: "Isi informasi pribadi Anda",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Nama Lengkap",
          type: "text",
          placeholder: "Masukkan nama lengkap",
          rules: { required: "Nama lengkap wajib diisi" },
          value: patientData.name,
          readOnly: true,
          colSize: 6
        },
        {
          id: "gender",
          name: "gender",
          label: "Jenis Kelamin",
          type: "select",
          options: [
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" }
          ],
          rules: { required: "Jenis kelamin wajib dipilih" },
          value: patientData.gender,
          readOnly: true,
          colSize: 6
        },
        {
          id: "birthDate",
          name: "birthDate",
          label: "Tanggal Lahir",
          type: "date",
          rules: { required: "Tanggal lahir wajib diisi" },
          value: patientData.birthDate,
          readOnly: true,
          colSize: 6
        },
        {
          id: "phone",
          name: "phone",
          label: "Nomor Telepon",
          type: "text",
          placeholder: "Masukkan nomor telepon",
          rules: { required: "Nomor telepon wajib diisi" },
          value: patientData.phone,
          colSize: 6
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Masukkan email",
          rules: { 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email tidak valid"
            }
          },
          value: patientData.email,
          colSize: 6
        },
        {
          id: "nik",
          name: "nik",
          label: "NIK",
          type: "text",
          placeholder: "Masukkan NIK",
          rules: { required: "NIK wajib diisi" },
          value: patientData.nik,
          readOnly: true,
          colSize: 6
        }
      ]
    },
    {
      section: "Jenis Tes",
      icon: "🧪",
      description: "Pilih kategori dan tes laboratorium",
      fields: [
        {
          id: "labCategory",
          name: "labCategory",
          label: "Kategori Pemeriksaan",
          type: "select",
          options: [
            { value: "", label: "-- Pilih Kategori --" },
            { value: "darah", label: "Tes Darah" },
            { value: "urine", label: "Tes Urine" },
            { value: "kimia", label: "Kimia Klinik" },
            { value: "mikrobiologi", label: "Mikrobiologi" }
          ],
          rules: { required: "Kategori pemeriksaan wajib dipilih" },
          colSize: 6
        },
        {
          id: "isUrgent",
          name: "isUrgent",
          label: "Pemeriksaan Cepat (Urgent)",
          type: "toggle",
          description: "Hasil akan diproses lebih cepat dengan biaya tambahan",
          colSize: 6,
          hide: (values) => !values.labCategory || values.labCategory === ""
        },
        {
          id: "fastingRequired",
          name: "fastingRequired",
          label: "Butuh Puasa",
          type: "text",
          readOnly: true,
          hide: (values) => !values.selectedLabTest,
          colSize: 6
        },
        {
          id: "estimatedTime",
          name: "estimatedTime",
          label: "Estimasi Waktu",
          type: "text",
          readOnly: true,
          hide: (values) => !values.selectedLabTest,
          colSize: 6
        }
      ],
      cards: [
        {
          name: "selectedLabTest",
          title: "Pilih Pemeriksaan",
          description: "Silakan pilih jenis pemeriksaan laboratorium yang diinginkan",
          filterSource: "labTests",
          required: true,
          colSize: 4
        }
      ]
    },
    {
      section: "Jadwal",
      icon: "📅",
      description: "Pilih jadwal pemeriksaan",
      fields: [
        {
          id: "appointmentDate",
          name: "appointmentDate",
          label: "Tanggal Pemeriksaan",
          type: "date",
          rules: { required: "Tanggal pemeriksaan wajib dipilih" },
          colSize: 6,
          min: new Date().toISOString().split('T')[0]
        },
        {
          id: "appointmentTime",
          name: "appointmentTime",
          label: "Waktu Pemeriksaan",
          type: "select",
          options: [
            { value: "", label: "-- Pilih Waktu --" },
            { value: "08:00", label: "08:00" },
            { value: "09:00", label: "09:00" },
            { value: "10:00", label: "10:00" },
            { value: "11:00", label: "11:00" },
            { value: "13:00", label: "13:00" },
            { value: "14:00", label: "14:00" },
            { value: "15:00", label: "15:00" }
          ],
          rules: { required: "Waktu pemeriksaan wajib dipilih" },
          colSize: 6
        },
        {
          id: "additionalNotes",
          name: "additionalNotes",
          label: "Catatan Tambahan",
          type: "textarea",
          placeholder: "Masukkan catatan tambahan jika ada",
          rows: 3,
          colSize: 12
        }
      ]
    },
    {
      section: "Pembayaran",
      icon: "💳",
      description: "Pilih metode pembayaran",
      fields: [
        {
          id: "pembayaran",
          name: "pembayaran",
          label: "Metode Pembayaran",
          type: "radio",
          options: paymentMethods,
          rules: { required: "Metode pembayaran wajib dipilih" },
          colSize: 12
        },
        {
          id: "asuransiPasien",
          name: "asuransiPasien",
          label: "Asuransi",
          type: "select",
          options: [
            { value: "", label: "-- Pilih Asuransi --" },
            ...patientData.insurances.map(insurance => ({ 
              value: insurance.provider, 
              label: `${insurance.provider} (${insurance.policyNumber})` 
            }))
          ],
          rules: { required: "Asuransi wajib dipilih" },
          colSize: 6,
          hide: (values) => values.pembayaran !== "asuransi"
        },
        {
          id: "totalPrice",
          name: "totalPrice",
          label: "Total Biaya",
          type: "text",
          readOnly: true,
          colSize: 6
        }
      ]
    },
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Konfirmasi dan selesaikan pendaftaran",
      customStepRender: ({ methods, filteredItems, step }) => {
        const values = methods.getValues();
        const selectedTest = filteredItems.labTests?.find(test => test.id === values.selectedLabTest);
        
        return (
          <Card className="mb-4">
            <Card.Header as="h5">Ringkasan Pemeriksaan</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Data Pasien</h6>
                  <p><strong>Nama:</strong> {values.name}</p>
                  <p><strong>Jenis Kelamin:</strong> {values.gender}</p>
                  <p><strong>Tanggal Lahir:</strong> {values.birthDate}</p>
                  <p><strong>NIK:</strong> {values.nik}</p>
                  <p><strong>Telepon:</strong> {values.phone}</p>
                  <p><strong>Email:</strong> {values.email}</p>
                </Col>
                <Col md={6}>
                  <h6>Detail Pemeriksaan</h6>
                  <p><strong>Kategori:</strong> {values.labCategory ? {
                    'darah': 'Tes Darah',
                    'urine': 'Tes Urine',
                    'kimia': 'Kimia Klinik',
                    'mikrobiologi': 'Mikrobiologi'
                  }[values.labCategory] : '-'}</p>
                  <p><strong>Jenis Pemeriksaan:</strong> {selectedTest?.name || '-'}</p>
                  <p><strong>Pemeriksaan Cepat:</strong> {values.isUrgent ? 'Ya' : 'Tidak'}</p>
                  <p><strong>Perlu Puasa:</strong> {values.fastingRequired || (selectedTest?.requiresFasting ? 'Ya' : 'Tidak')}</p>
                  <p><strong>Estimasi Waktu:</strong> {values.estimatedTime || selectedTest?.processingTime || '-'}</p>
                  <p><strong>Jadwal:</strong> {values.appointmentDate ? `${values.appointmentDate} ${values.appointmentTime}` : '-'}</p>
                  <p><strong>Metode Pembayaran:</strong> {values.pembayaran ? {
                    'tunai': 'Tunai',
                    'debit': 'Kartu Debit',
                    'kredit': 'Kartu Kredit',
                    'qris': 'QRIS',
                    'asuransi': `Asuransi (${values.asuransiPasien})`
                  }[values.pembayaran] : '-'}</p>
                  <p><strong>Total Biaya:</strong> {values.totalPrice || 
                    (selectedTest ? `Rp ${selectedTest.price.toLocaleString('id-ID')}${values.isUrgent ? ' + Rp 50.000 (biaya urgent)' : ''}` : '-')}</p>
                </Col>
              </Row>
              {values.additionalNotes && (
                <Row className="mt-3">
                  <Col md={12}>
                    <h6>Catatan Tambahan</h6>
                    <p>{values.additionalNotes}</p>
                  </Col>
                </Row>
              )}
              <Alert variant="info" className="mt-3">
                <p className="mb-0">Dengan melanjutkan, saya menyetujui seluruh syarat dan ketentuan pemeriksaan laboratorium.</p>
              </Alert>
            </Card.Body>
          </Card>
        );
      }
    }
  ];

  // Custom validators for the lab form
  const customValidators = {
    lab: {
      1: async ({ values, showAlertMessage }) => {
        // Validate lab category and test selection
        if (!values.labCategory) {
          showAlertMessage("Silakan pilih kategori pemeriksaan terlebih dahulu.");
          return false;
        }
        
        if (!values.selectedLabTest) {
          showAlertMessage("Silakan pilih jenis pemeriksaan.");
          return false;
        }
        
        return true;
      },
      3: async ({ values, showAlertMessage }) => {
        // Validate payment method
        if (values.pembayaran === "asuransi" && !values.asuransiPasien) {
          showAlertMessage("Silakan pilih asuransi yang akan digunakan.");
          return false;
        }
        
        return true;
      }
    }
  };

  // Custom handler for when a lab test card is selected
  const handleCardSelect = ({ cardGroupName, cardValue, additionalData, setValues }) => {
    if (cardGroupName === "selectedLabTest") {
      // Find the selected test
      let selectedTest = null;
      for (const category in labTestsData) {
        const test = labTestsData[category].find(t => t.id === cardValue);
        if (test) {
          selectedTest = test;
          break;
        }
      }
      
      if (selectedTest) {
        // Update form fields based on the selected test
        const fastingText = selectedTest.requiresFasting ? "Ya (puasa 8-10 jam sebelum tes)" : "Tidak perlu puasa";
        setValues("fastingRequired", fastingText);
        setValues("estimatedTime", selectedTest.processingTime);
        
        // Calculate price based on urgency
        const urgentFee = 50000;
        const totalPrice = `Rp ${(selectedTest.price + (watchIsUrgent ? urgentFee : 0)).toLocaleString('id-ID')}`;
        setValues("totalPrice", totalPrice);
      }
    }
  };

  // Watch for changes in the urgent toggle to update the price
  const [watchIsUrgent, setWatchIsUrgent] = useState(false);

  // Effect to update filtered lab tests when category changes
  useEffect(() => {
    // Map lab tests data to a format compatible with the form
    const mapLabTests = (category) => {
      if (!category || !labTestsData[category]) {
        setFilteredLabTests([]);
        return;
      }
      
      const tests = labTestsData[category].map(test => ({
        id: test.id,
        name: test.name,
        processingTime: test.processingTime,
        price: test.price,
        requiresFasting: test.requiresFasting,
        urgentAvailable: test.urgentAvailable,
        category: test.category
      }));
      
      setFilteredLabTests(tests);
    };
  }, [labTestsData]);

  // Handle form submission
  const handleSubmit = (data) => {
    // In a real app, you'd send this data to your API
    setSubmittedData(data);
    setFormSubmitted(true);
    setShowSuccessMessage(true);
    
    // Simulate API call
    console.log("Form submitted:", data);
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push("/appointments");
    }, 3000);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Pendaftaran Pemeriksaan Laboratorium</h2>
          <p className="text-muted">Silakan lengkapi formulir untuk mendaftar pemeriksaan laboratorium</p>
        </Col>
      </Row>
      
      {showSuccessMessage && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" dismissible onClose={() => setShowSuccessMessage(false)}>
              <Alert.Heading>Pendaftaran Berhasil!</Alert.Heading>
              <p>
                Pemeriksaan laboratorium Anda telah berhasil didaftarkan. 
                Detail jadwal dan instruksi persiapan akan dikirimkan ke email Anda.
              </p>
            </Alert>
          </Col>
        </Row>
      )}
      
      {!formSubmitted ? (
        <DynamicStepCardForm
          title="Pendaftaran Pemeriksaan Laboratorium"
          formConfig={formConfig}
          onSubmit={handleSubmit}
          backPath="/appointments"
          isAddMode={true}
          sourceData={{
            labTests: filteredLabTests
          }}
          externalOptions={{
            insurances: insurances
          }}
          formType="lab"
          defaultValues={{
            name: patientData.name,
            gender: patientData.gender,
            birthDate: patientData.birthDate,
            phone: patientData.phone,
            email: patientData.email,
            nik: patientData.nik
          }}
          onCardSelect={handleCardSelect}
          customValidators={customValidators}
        />
      ) : (
        <Card>
          <Card.Header>
            <h4>Pendaftaran Selesai</h4>
          </Card.Header>
          <Card.Body>
            <p>Terima kasih telah mendaftar untuk pemeriksaan laboratorium.</p>
            <p>ID Pendaftaran: <strong>LAB-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</strong></p>
            <Button variant="primary" onClick={() => router.push("/appointments")}>
              Lihat Jadwal Saya
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default LabRegistrationPage;