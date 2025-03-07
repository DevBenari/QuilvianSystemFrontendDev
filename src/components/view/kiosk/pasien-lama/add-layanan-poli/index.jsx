"use client";
import React from "react";
import { useSelector } from "react-redux";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "@/components/view/kiosk/add-guest-layanan/modal-insurance";
import { fetchPoliKlinik } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import useRegistration from "@/lib/hooks/kiosk/useRegistration";

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
  
  // Mapping for more readable poli names
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

  // Fetch poli data from Redux store
  const {data: lisPoli, page, totalPages } = useSelector((state) => state.PoliKlinik);

  // Use the registration hook
  const registration = useRegistration({
    fetchMasterDataAction: () => fetchPoliKlinik({page, totalPages}),
    initialDoctorsData: doctors
  });
  
  // Handle form submission
  const onSubmitSuccess = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi.");
    // Redirect to success page or dashboard
    // window.location.href = "/registration-success";
  };
  
  // Wrap the handleSubmit function to include success callback
  const handleSubmit = (data) => {
    registration.handleSubmit(data, onSubmitSuccess);
  };

  // Build form configuration with sections and fields
  const formConfig = [
    // Section 1: Personal Information
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
    // Section 2: Insurance and Payment Method
    {
      section: "Asuransi",
      icon: "📋",
      description: "Pilih metode pembayaran Anda",
      cards: registration.getPaymentMethodCards(),
      fields: registration.getInsuranceFields()
    },
    // Section 3: Select Clinic
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
          options: lisPoli.map((item) => ({ label: item.namaPoli, value: item.poliId })),
        }
      ]
    },
    // Section 4: Select Doctor
    {
      section: "Pilih Dokter",
      icon: "👨‍⚕️",
      description: "Pilih dokter yang tersedia pada poliklinik ",
      fields: [],
      cards: [
        registration.getDoctorSelectionCard(registration.filteredDoctorsByInsurance)
      ]
    },
    // Section 5: Confirmation
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      fields: [],
      customRender: ({ methods }) => registration.renderConfirmationSection(methods, doctors, poliNameMap)
    }
  ];

  return (
    <div className="patient-registration-page">
      <DynamicStepCardForm
        key={registration.currentStep}
        title="Pendaftaran Pasien"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        isAddMode={true}
        backPath="/kiosk"
        doctorsData={registration.filteredDoctorsByInsurance}
        onFormMethodsReady={registration.handleFormMethodReady} 
      />

      <ModalInsurance
        onOpen={registration.showInsuranceModal}
        onClose={registration.handleCloseModal}
        onSubmit={registration.handleInsuranceSubmit}
        formConfig={formConfig}
      />
    </div>
  );
};

export default PatientRegistrationPage;