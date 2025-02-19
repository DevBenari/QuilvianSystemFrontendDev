"use client";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button } from "react-bootstrap";
import ModalInsurance from "./modal-insurance";

const PendaftaranLayananPoliPage = () => {
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);

  // Dummy data dokter
  const dummyDokterOptions = [
    { label: "Dr. Andi", value: "dr_andi" },
    { label: "Dr. Budi", value: "dr_budi" },
  ];

  const handleOpenModal = () => setShowInsuranceModal(true);
  const handleCloseModal = () => setShowInsuranceModal(false);

  const handleInsuranceSubmit = (insuranceData) => {
    setInsuranceList((prevList) => [...prevList, insuranceData]);
    console.log("Insurance Data Submitted:", insuranceData);
  };

  // Dummy data pasien berdasarkan NIK
  const dummyPatients = [
    { nik: "1234567890123456", id: 1, name: "John Doe", address: "Jl. Merdeka 10" },
    { nik: "9876543210987654", id: 2, name: "Jane Doe", address: "Jl. Sudirman 20" },
  ];

  // Simulasi pengambilan data pasien berdasarkan NIK
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
              id:"layanan",
              name: "layanan",
              label: "Jenis Layanan Kesehatan",
              type: "select",
              options: [
                { label: "Rawat Inap", value: "rawat_inap" },
                { label: "Layanan Poliklinik", value: "layananPoliklinik" },
                { label: "Laboratorium", value: "laboratorium" },
                { label: "Radiologi", value: "radiologi" },
                { label: "Medical Check Up", value: "medicalCheckUp" },
                { label: "Optik", value: "optik" }
              ],
              colSize: 12
            },
            {
              id: "jenisPemeriksaan",
              name: "jenisPemeriksaan",
              label: "Jenis Pemeriksaan",
              type: "select",
              options: (watchValues) => {
                if(watchValues.layanan === "layananPoliklinik") {
                  return [
                    { label: "Poli Anak", value: "poli_anak" },
                    { label: "Poli Bedah", value: "poli_bedah" },
                    { label: "Poli Saraf", value: "poli_saraf" },
                    { label: "Poli Gigi", value: "poli_gigi"}
                  ]
                }else if(watchValues.layanan === "laboratorium") {
                  return [
                    {label: "tes darah lengkap(CBC)" , value: "tesDarah"},
                    {label: "tes darah hematologi", value: "tesDarahHematologi"},
                    {label: "Tes Gula Dan Kolesterol", value: "tesGulaKolesterol"},
                    {label: "Tes Urin", value: "tesUrin"},
                  ]
                }else if(watchValues.layanan === "radiologi") {
                  return [
                    {label: "Rontgen (X-Ray)" , value: "rontgen"},
                    {label: "CT Scan", value: "CtScan"},
                    {label: "MRI", value: "MRI"},
                    {label: "USG", value: "usg"},
                    {label: "Mamografi", value: "mamografi"},
                    {label: "Lainnya...", value: "lainnya"},
                  ]
                }
                return [];
              },
              colSize: 6,
              // hide: (watchValues) => watchValues.layanan !== "layananPoliklinik"
            },

            // {
            //     id: "poli",
            //     name: "poli",
            //     label: "Poli Tujuan",
            //     type: "select",
            //     options: [
            //         { label: "Poli Anak", value: "poli_anak" },
            //         { label: "Poli Bedah", value: "poli_bedah" },
            //         { label: "Poli Saraf", value: "poli_saraf" },
            //         { label: "Poli Gigi", value: "poli_gigi"}
            //     ],
            //     rules: { required: true },
            //     colSize: 6,
                
            // },
            // {
            //   id: "laboratorium",
            //   name: "laboratorium",
            //   label: "Laboratorium", 
            //   type: "select",
            //   options: [
            //     { label: "Patologi Anatomi", value: "patologiAnatomi" },
            //     { label: "Patologi Klinik", value: "patologiKlinik"},
            //   ],
            //   colSize: 6,
            //   hide: (watchValues) => watchValues.layanan !== "laboratorium"
            // },
            {
                id: "dokter",
                name: "dokter",
                label: "Dokter",
                type: "select",
                options: dummyDokterOptions,
                rules: { required: true },
                colSize: 6,
            },
            {
                id: "appointment_date",
                name: "appointment_date",
                label: "Tanggal Janji",
                type: "date",
                colSize: 6,
            },
            {
                id: "keluhanPasien",
                name:"keluhan",
                label: "Keluhan Utama Pasien",
                type: "textarea",
                colSize: 6
            },
            {
                id:"pasienRujukan",
                name:"pasienRujukan",
                label: "Apakah Pasien Rujukan",
                type:"select",
                options: [
                    {label: "Ya", value:"Ya"},
                    {label: "Tidak", value:"Tidak"}
                ],
                colSize:6
            },
            {
                id:"nomorRujukan",
                name:"nomorRujukan",
                label: " Nomor Rujukan Pasien",
                type: "number",
                colSize:6,
                hide: (watchValues) => watchValues.pasienRujukan !== "Ya"
            },
            {
                id:"asalRujukan",
                name:"asalRujukan",
                label:"Asal Fasilitas Kesehatan Rujukan",
                type:"text",
                colSize:6,
                hide: (watchValues) => watchValues.pasienRujukan !== "Ya"
            }
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

    <Fragment >
      <DynamicStepForm
        title="Pendaftaran Layanan Poli"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        onFormSubmited={(data) => console.log("Form Submitted:", data)}
        backPath="/kiosk"
        isAddMode={true}
      />
      <ModalInsurance
        onOpen={showInsuranceModal}
        onClose={handleCloseModal}
        onSubmit={handleInsuranceSubmit}
        formConfig={formConfig}
      />

    </Fragment>

    
  );
};

export default PendaftaranLayananPoliPage;
