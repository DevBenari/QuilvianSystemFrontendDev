"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button, Card, Col, Image, Row, Alert } from "react-bootstrap";
import ButtonNav from "@/components/ui/button-navigation";
// import { CreditCard } from "react-feather"; // Import CreditCard icon

// Import the CardScannerModal component
import CardScannerModal from "@/components/ui/modal-scanCard";

import { useDispatch, useSelector } from "react-redux";
import { AddPasienSlice } from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import { fetchPendidikan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import { fetchTitle } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import { fetchPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import { fetchNegara } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { fetchGolongan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { fetchIdentitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import { useRouter } from "next/navigation";
import useAgamaData from "@/lib/hooks/useAgamaData";
import useSelectWilayah from "@/lib/hooks/useSelectWilayah";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import PrintPatientCard from "../../kiosk/add-guest-kiosk/patientCard";
import PrintableQueueNumber from "../../kiosk/add-guest-kiosk/patientAntrian";
import { pemeriksaRadiologi } from "@/utils/dataTindakan";

const PendaftaranPasienRadiologi = memo(() => {
  const { setValue, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedPrintType, setSelectedPrintType] = useState(null);
  const router = useRouter();
  const [selectImage, setSelectImage] = useState(null);
  
  // Scanner modal state
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // Function to handle opening the scanner modal
  const handleOpenScanner = () => {
    setShowScannerModal(true);
  };

  // Function to handle scanner modal close
  const handleCloseScanner = () => {
    setShowScannerModal(false);
  };

  // Function to handle scan completion and populate form
  const handleScanComplete = (patientData) => {
    // Update form fields with scanned data
    Object.entries(patientData).forEach(([field, value]) => {
      setValue(field, value);
    });
    
    // If we have a province ID, update the selected province state
    if (patientData.ProvinsiId) {
      setSelectedProvinsi(patientData.ProvinsiId);
    }
    
    // If we have a country ID, update the selected country state
    if (patientData.NegaraId) {
      setSelectedNegara(patientData.NegaraId);
    }
    
    // If we have a kabupaten ID, update the selected kabupaten state
    if (patientData.kabupatenKotaId) {
      setSelectedKabupaten(patientData.kabupatenKotaId);
    }
    
    // Show success message
    setScanSuccess(true);
    setScanMessage(`Data pasien berhasil dipindai untuk ${patientData.namaPasien || 'NIK: ' + patientData.noIdentitas}`);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setScanSuccess(false);
    }, 5000);
  };

  // Function to handle printing
  const handlePrint = (type) => {
    setSelectedPrintType(type);
    setTimeout(() => {
      window.print();
      setSelectedPrintType(null);
    }, 100);
  };

  // fungsi untuk melakukan select provinsi
  const {
    selectedNegara,
    setSelectedNegara,
    selectedProvinsi,
    setSelectedProvinsi,
    selectedKabupaten,
    setSelectedKabupaten,
    selectedKecamatan,
    setSelectedKecamatan,
    selectedKelurahan,
    setSelectedKelurahan,
    negaraOptions,
    provinsiOptions,
    kabupatenOptions,
    kecamatanOptions,
    kelurahanOptions,
    negaraLoading,
    provinsiLoading,
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupaten,
    handleLoadMoreKecamatan,
    handleLoadMoreKelurahan,
  } = useSelectWilayah();

  useEffect(() => {
    if (selectedNegara) {
      const isIndonesia =
        negaraOptions.find((opt) => opt.value === selectedNegara)?.label ===
        "Indonesia";
      if (!isIndonesia) {
        // Reset nilai provinsi dan kabupaten jika bukan Indonesia
        setValue("provinsiId", null);
        setValue("kabupatenKotaId", null);
      }
    }
  }, [selectedNegara, setValue, negaraOptions]);

  const {
    agamaOptions,
    loading: agamaLoading,
    handleLoadMore: handleLoadMoreAgama,
  } = useAgamaData();
  const dispatch = useDispatch();

  const {
    data: pendidikanData,
    error,
    loading,
    totalPage,
  } = useSelector((state) => state.pendidikan);
  const { data: titles } = useSelector((state) => state.titles);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPendidikan({ page, totalPage }));
    dispatch(fetchTitle({ page, totalPage }));
    dispatch(fetchPekerjaan({ page, totalPage }));
    dispatch(fetchGolongan({ page, totalPage }));
    dispatch(AddPasienSlice());
    dispatch(fetchIdentitas({ page, totalPage }));
  }, [dispatch, page, totalPage]);

  const titlesOptions =
    titles.map((item) => ({
      label: item.namaTitle, // Label seperti "Tn", "Ny", "Mr"
      value: item.titleId, // ID untuk value
    })) || [];

  if (loading) {
    return <div>Loading data pasien...</div>;
  }

  const formFields = [
    {
      section: "Informasi Pasien",
      fields: [
        // Add a custom component for the scan card button at the top of the form
        {
          type: "custom",
          customRender: () => (
            <div className="mb-4">
              <Button 
                variant="primary" 
                onClick={handleOpenScanner}
                className="d-flex align-items-center gap-2 w-100"
              >
                {/* <CreditCard size={18} /> */}
                <span>Scan Kartu Pasien / E-KTP</span>
              </Button>
              
              {scanSuccess && (
                <Alert variant="success" className="mt-3">
                  {scanMessage}
                </Alert>
              )}
            </div>
          ),
          colSize: 12,
        },
        {
          type: "text",
          id: "noRegistrasi",
          label: "No Registrasi",
          name: "noRegistrasi",
          placeholder: "No Registrasi",
 
          colSize: 6,
        },

        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          colSize: 6,
        },
        {
          type: "text",
          id: "noIdentitas",
          label: "No. Identitas (NIK/Passport)",
          name: "noIdentitas",
          placeholder: "No. Identitas",
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Nama Pasien",
          colSize: 6,
        },
        {
          type: "select",
          id: "titlesId",
          label: "Title",
          name: "TitlesId",
          placeholder: "Title",
          options: titlesOptions,
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "JenisKelamin",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorHP",
          label: "Nomor HP",
          name: "nomorHP",
          placeholder: "Nomor HP",
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          colSize: 6,
        },

        {
          type: "email",
          id: "email",
          label: "Email",
          name: "Email",
          placeholder: "Email",
          colSize: 6,
        },
      ],
    },
    
    // Rest of the form sections remain the same
    {
      section: "Informasi Demografis",
      fields: [
        {
          type: "select",
          id: "negaraId",
          label: "Negara",
          name: "NegaraId",
          placeholder: "Pilih Negara",
          options: negaraOptions,
          isLoading: negaraLoading,
          onChange: (selected) => {
            setSelectedNegara(selected?.value);
            // Reset nilai provinsi dan kabupaten
            setValue("provinsiId", null);
            setValue("kabupatenKotaId", null);
          },
          onMenuScrollToBottom: handleLoadMoreNegara,
          colSize: 6,
        },
        {
          type: "select",
          id: "provinsiId",
          label: "Provinsi",
          name: "ProvinsiId",
          placeholder: "Pilih Provinsi",
          options: provinsiOptions,
          isLoading: provinsiLoading,
          onChange: (selected) => {
            setSelectedProvinsi(selected?.value);
            // Reset nilai kabupaten ketika provinsi berubah
            setValue("kabupatenKotaId", null);
          },
          onMenuScrollToBottom: handleLoadMoreProvinsi,
          disabled:
            !selectedNegara ||
            negaraOptions.find((opt) => opt.value === selectedNegara)?.label !==
              "Indonesia",
          colSize: 6,
        },
        // Rest of demographic fields remain the same
        {
          type: "select",
          id: "kabupatenKotaId",
          label: "Kabupaten/Kota",
          name: "kabupatenKotaId",
          placeholder: "Pilih Kabupaten/Kota",
          options: kabupatenOptions,
          onChange: (selected) => setSelectedKabupaten(selected?.value),
          onMenuScrollToBottom: handleLoadMoreKabupaten,
          disabled: !selectedProvinsi,
          rules: {
            required: {
              value:
                selectedNegara &&
                negaraOptions.find((opt) => opt.value === selectedNegara)
                  ?.label === "Indonesia",
              message: "Kabupaten/Kota harus dipilih untuk warga Indonesia",
            },
          },
          colSize: 6,
        },
        {
          type: "select",
          id: "kecamatanId",
          label: "Kecamatan",
          name: "kecamatanId",
          placeholder: "Pilih Kecamatan",
          options: kecamatanOptions,
          onChange: (selected) => setSelectedKecamatan(selected?.value),
          onMenuScrollToBottom: handleLoadMoreKecamatan,
          disabled: !selectedKabupaten,
          rules: {
            required: {
              value:
                selectedNegara &&
                negaraOptions.find((opt) => opt.value === selectedNegara)
                  ?.label === "Indonesia",
              message: "Kecamatan harus dipilih untuk warga Indonesia",
            },
          },
          colSize: 6,
        },
        {
          type: "select",
          id: "kelurahanId",
          label: "Kelurahan",
          name: "kelurahanId",
          placeholder: "Pilih Kelurahan",
          options: kelurahanOptions,
          onChange: (selected) => setSelectedKelurahan(selected?.value),
          onMenuScrollToBottom: handleLoadMoreKelurahan,
          disabled: !selectedKecamatan,
          rules: {
            required: {
              value:
                selectedNegara &&
                negaraOptions.find((opt) => opt.value === selectedNegara)
                  ?.label === "Indonesia",
              message: "Kelurahan harus dipilih untuk warga Indonesia",
            },
          },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamatRumah",
          label: "Alamat Rumah",
          name: "alamatRumah",
          placeholder: "Alamat Rumah",
          rules: { required: "Alamat Rumah is required" },
          colSize: 12,
        },
      ],
    },
    // Include the rest of your form sections here
    {
      section: "Detail Konsultasi",
      fields: [
        {
          type: "select",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 8,
        },
        {
          type: "select",
          id: "tipepenjamin",
          name: "tipePenjamin",
          hide: (watchValues) => watchValues.penjamin !== "penjamin",

          label: "Tipe penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "BPJS", value: "bpjs" },
            { label: "Non BPJS", value: "non-bpjs" },
          ],

          rules: { required: "Penjamin is required" },
          colSize: 8,
        },
        {
          type: "date",
          id: "tglRegistrasi",
          label: "Tanggal Registrasi",
          name: "tglRegistrasi",
          rules: { required: "Tanggal Registrasi is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Rujukan",
      fields: [
        {
          type: "select",
          id: "dirujuk",
          name: "dirujuk",
          placeholder: "Pilih Rujukan",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          rules: { required: "Dirujuk is required" },
          colSize: 8,
          className: "mb-3",
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          name: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "konsul", // Tampilkan hanya untuk "konsul"
          colSize: 6,

          className: "mb-3",
        },
        {
          type: "select",
          id: "tipeRs",
          name: "tipeRs",
          label: "Tipe RSU/RS/RB",
          placeholder: "Pilih Tipe RSU/RS/RB",
          options: [
            { label: "Puskesmas", value: "puskesmas" },
            { label: "Dr/Drg", value: "dr_drg" },
            { label: "Maramedik", value: "maramedik" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "namaLuarRs",
          name: "namaLuarRs",
          label: "Nama",
          placeholder: "Masukkan Nama",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "teleponLuarRs",
          name: "teleponLuarRs",
          label: "Nomor Telepon",
          placeholder: "Masukkan Nomor Telepon",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
          className: "mb-3",
        },
      ],
    },
    {
      section: "Promo Kode Member",
      fields: [
        {
          type: "select",
          id: "pilihPromoo",
          label: "Pilih Promo",
          name: "pilihPromoo",
          placeholder: "Pilih Promo",
          options: [
            { label: "Voucher Potongan", value: "voucher_potongan" },
            { label: "RS MMC Dokter", value: "rs_mmc_dokter" },
            { label: "RS MMC Tunai (10%)", value: "rs_mmc_tunai" },
            { label: "VIP BKM Tanpa Part", value: "vip_bkm" },
          ],
          rules: { required: "Pilih Promo is required" },
          colSize: 6,
        },

        {
          type: "select",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          placeholder: "Pilih Surat Rujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },

        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Diagnosa Awal",
          rules: { required: "Diagnosa Awal is required" },
          colSize: 12,
        },
      ],
    },
    {
      section: "Pemeriksaan Radiologi",
      fields: [
        {
          type: "custom",
          customRender: () => (
            <TindakanTableHarga
              tindakan={pemeriksaRadiologi}
              placeholder="Masukkan Nama Pemeriksaan"
              label="Pemeriksaan Radiologi"
              labelKey="pemeriksaanRadiologi"
              ValueKey="id"
              hargaKey="harga"
              rules={{ required: "Pemeriksaan Radiologi is required" }}
            />
          ),
          colSize: 12,
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          rules: { required: "Dokter Pemeriksa is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "pemeriksaanTestCito",
          label: "Pemeriksaan Test Cito",
          name: "pemeriksaanTestCito",
          placeholder: "Pilih Pemeriksaan Test Cito",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "pemeriksaan Test Cito is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    // Create a new FormData object
    const formData = new FormData();

    // Add all text fields to FormData
    Object.keys(data).forEach((key) => {
      // Skip the file field, we'll handle it separately
      if (key !== "foto" && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    // Add the "vm" field which seems to be required according to the error
    formData.append("vm", "true"); // Adjust the value as needed for your API

    // Add the file if it exists
    if (data.foto instanceof File) {
      formData.append("fotoPasien", data.foto);
    }

    console.log("Data yang dikirim ke backend:", Object.fromEntries(formData));

    // Dispatch the action with FormData
    dispatch(AddPasienSlice(formData))
      .then((result) => {
        if (AddPasienSlice.fulfilled.match(result)) {
          console.log("Data pasien berhasil dikirim:", result.payload);
          alert("Data pasien berhasil dikirim!");

          const enhancedData = {
            ...data,
            provinsiId: data.provinsiId || null,
            noRekamMedis: `RM-${new Date().getTime()}`,
            queueNumber: `A-${Math.floor(Math.random() * 100)}`,
            registrationDate: new Date().toLocaleDateString("id-ID"),
            noIdentitas: `${data.noIdentitas}`,
            qrCodeUrl: result.payload.qrCodeUrl || null,
            fotoPasienUrl: result.payload.uploadFotoUrl || null,
          };

          setSubmittedData(enhancedData);
          setIsSubmitted(true);
        } else {
          console.error("Gagal mengirim data:", result.error?.message);
          alert("Gagal mengirim data pasien!");
        }
      })
      .catch((error) => {
        console.error("Error saat dispatch:", error);
        alert("Terjadi kesalahan saat mengirim data pasien!");
      });
  };

  if (isSubmitted && submittedData) {
    return (
      <Card className="m-4">
        <Card.Body>
          <div className="kiosk-logo mb-4">
            <Image src="/Images/pngwing-com.png" fluid alt="logo" />
          </div>
          <h4 className="text-success text-center mt-4">
            Data Pendaftaran Pasien Berhasil Disimpan
          </h4>

          <Row className="no-print">
            <Col lg={12}>
              <Card className="d-flex justify-content-center align-items-center">
                <Card.Body>
                  <PrintPatientCard patientData={submittedData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {selectedPrintType === "card" && (
            <div className="print-only">
              <PrintPatientCard patientData={submittedData} />
            </div>
          )}
          {selectedPrintType === "queue" && (
            <div className="print-only">
              <PrintableQueueNumber
                queueData={{
                  queueNumber: submittedData.queueNumber,
                  service: "Poli Umum",
                  date: submittedData.registrationDate,
                  patientName: submittedData.namaPasien,
                }}
              />
            </div>
          )}

          <div className="d-flex justify-content-between mt-4 no-print">
            <ButtonNav
              label="Kembali ke Halaman Utama"
              variant="primary"
              path="/kiosk"
            />
            <Button
              variant="primary"
              onClick={() => handlePrint("card")}
              className="text-center mt-3 ml-5"
            >
              {/* <Printer className="me-2" size={20} /> */}
              Cetak Kartu Pasien
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  const handleFormSubmit = (data) => {
    setIsSubmitted(true);
    setSubmittedData(data);
  };

  const handleSubmitWithConsole = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      {/* Render the CardScannerModal */}
      <CardScannerModal
        show={showScannerModal}
        onHide={handleCloseScanner}
        onScanComplete={handleScanComplete}
      />
      
      <DynamicStepForm
        title="Pendaftaran Pasien Radiologi"
        formConfig={formFields}
        onSubmit={handleSubmitWithConsole}
        onFormSubmit={handleFormSubmit}
        externalOptions={{ titles: titlesOptions }}
        backPath="/pendaftaran/pendaftaran-pasien-radiologi"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranPasienRadiologi.displayName = "PendaftaranPasienRadiologi";
export default PendaftaranPasienRadiologi;

