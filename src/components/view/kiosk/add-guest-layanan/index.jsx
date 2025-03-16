"use client";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button, Image, Modal } from "react-bootstrap";
import ModalInsurance from "./modal-insurance";
import DokterSelector from "@/components/ui/select-field-card";

const PendaftaranLayananPoliPage = () => {
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Dummy data dokter
  const handleOpenDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleCloseDoctorModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
  };

  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);
  

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
  };

  useEffect(() => {
    const storedPatientData = localStorage.getItem("patientData");
    if (storedPatientData) {
      setPatientData(JSON.parse(storedPatientData));
    }
  }, []);

  // Dummy data pasien berdasarkan NIK
  const dummyPatients = [
    { nik: "1234567890123456", id: 1, name: "John Doe", address: "Jl. Merdeka 10" },
    { nik: "9876543210987654", id: 2, name: "Jane Doe", address: "Jl. Sudirman 20" },
  ];
 
  const fetchPatientData = async (nik) => {
    try {
      setIsLoading(true);

      // Dummy: Ambil data pasien dari array dummy
      const patient = dummyPatients.find((p) => p.nik === nik);
      if (patient) {
        setPatientData(patient);
      } else {
        alert("Data pasien tidak ditemukan!");
      }

      // Uncomment untuk API call
      /*
      const response = await axios.get(`/api/patients?nik=${nik}`);
      setPatientData(response.data);
      */
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data pasien dari LocalStorage
useEffect(() => {
    const storedPatientData = localStorage.getItem("patientData");
    if (storedPatientData) {
        setPatientData(JSON.parse(storedPatientData));
    }
}, []);

const formConfig = [
    {
        section: "Informasi Pasien",
        fields: [
            {
                id: "name",
                name: "name",
                label: "Nama Pasien",
                type: "text",
                value: patientData?.name || "",
                readOnly: true,
                colSize: 6,
            },
            {
                id: "nik",
                name: "nik",
                label: "NIK",
                type: "text",
                value: patientData?.nik || "",
                readOnly: true,
                colSize: 6,
            },
            {
                id: "address",
                name: "address",
                label: "Alamat",
                type: "text",
                value: patientData?.address || "",
                readOnly: true,
                colSize: 6,
            },
        ],
    },
    {
        section: "Pendaftaran Layanan Poli",
        fields: [
            {
                id: "poli",
                name: "poli",
                label: "Poli Tujuan",
                type: "select",
                options: [
                    { label: "Poli Anak", value: "poli_anak" },
                    { label: "Poli Bedah", value: "poli_bedah" },
                    { label: "Poli Saraf", value: "poli_saraf" },
                    { label: "Poli Gigi", value: "poli_gigi"}
                ],
                rules: { required: true },
                colSize: 6,
                
            },
            {
              id: "dokter",
              name: "dokter",
              label: "Dokter",
              type: "custom",
              customRender: () => (
                <DokterSelector onSelectDoctor={handleOpenDoctorModal} />
              ), // Menggunakan DokterSelector sebagai komponen custom
              colSize: 6,
            },
        ],
      },
      {
        section: "Informasi Pembayaran",
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
    }
];

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    handleCloseModal(false)
  };

  return (

    <Fragment className>
      <DynamicStepForm
        title="Pendaftaran Layanan Poli"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        onFormSubmited={(data) => console.log("Form Submitted:", data)}
        backPath="/kiosk"
        isAddMode={true}
      />
      {/* MODAL PROFIL DOKTER */}
      <Modal show={showDoctorModal} onHide={handleCloseDoctorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profil Dokter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor ? (
            <div className="text-center">
              <Image
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <h4 className="mt-3">{selectedDoctor.name}</h4>
              <p className="text-blue-600">{selectedDoctor.specialty}</p>
              <p><strong>Rumah Sakit:</strong> {selectedDoctor.hospital}</p>
              <p><strong>Pengalaman:</strong> {selectedDoctor.experience}</p>
              <p><strong>Pendidikan:</strong> {selectedDoctor.education}</p>
            </div>
          ) : (
            <p>Data dokter tidak tersedia</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDoctorModal}>
            Tutup
          </Button>
          <Button variant="primary">Buat Janji</Button>
        </Modal.Footer>
      </Modal>

    </Fragment>

    
  );
};

export default PendaftaranLayananPoliPage;
