"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DynamicStepCardForm from "@/components/features/dynamic-form/dynamicForm/DynamicStepCardForm";
import ModalInsurance from "@/components/view/kiosk/add-guest-layanan/modal-insurance";
import { fetchPoliKlinik } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import useRegistration from "@/lib/hooks/kiosk/useRegistration";

// Mock doctor API fetching function (replace with your actual API call)
const fetchDoctors = async () => {
  // This would be replaced with your actual API call
  console.log("Fetching doctors data from API...");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the mock data in the format your API would return

};

const PatientRegistrationPage = () => {
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
  
  // Use the registration hook with doctor API fetching
  const registration = useRegistration({
    fetchMasterDataAction: () => fetchPoliKlinik({page, totalPages}),
    fetchDoctorsAction: fetchDoctors, // Pass the doctor API fetching function
    initialDoctorsData: {} // Start with empty data and let the API populate it
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
          options: lisPoli.map((item) => ({ 
            label: item.namaPoliklinik, 
            value: item.poliklinikId,
            description: item.deskripsi
          })),
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
        registration.getDoctorSelectionCard()
      ]
    },
    // Section 5: Confirmation
    {
      section: "Konfirmasi",
      icon: "✅",
      description: "Periksa dan konfirmasi data pendaftaran Anda",
      fields: [],
      customRender: ({ methods }) => registration.renderConfirmationSection(
        methods, 
        registration.filteredDoctorsByInsurance, 
        poliNameMap
      )
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