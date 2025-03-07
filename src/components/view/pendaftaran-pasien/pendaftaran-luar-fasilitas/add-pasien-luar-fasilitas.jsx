"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import ButtonNav from "@/components/ui/button-navigation";

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
import ImageUploader from "@/components/ui/uploadPhoto-field";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import PrintPatientCard from "../../kiosk/add-guest-kiosk/patientCard";
import PrintableQueueNumber from "../../kiosk/add-guest-kiosk/patientAntrian";
import { dataFasilitas } from "@/utils/dataTindakan";

const PendaftaranPasienFasilitas = memo(() => {
  const { setValue } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedPrintType, setSelectedPrintType] = useState(null);
  const router = useRouter();
  const [selectImage, setSelectImage] = useState(null);
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
    kabupatenLoading,
    kecamatanLoading,
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

  // const {provinsiOptions, loading: provinsiLoading, handleLoadMore } = UseProvinsiData();
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
  const { data: pekerjaanData } = useSelector((state) => state.pekerjaan);
  const { data: GolonganDarah } = useSelector((state) => state.golongan);
  const { data: identitas } = useSelector((state) => state.identitas);
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

  // useEffect(() => {
  //     if (error) {
  //         router.push("/error-page");
  //     }
  // }, [error, router]);

  if (loading) {
    return <div>Loading data pasien...</div>;
  }

  const formFields = [
    {
      section: "Informasi Pasien",
      fields: [
        {
          type: "text",
          id: "noRegistrasi",
          label: "No Registrasi",
          name: "noRegistrasi",
          placeholder: "No Registrasi",
          rules: { required: "No Registrasi is required" },
          colSize: 6,
        },

        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          rules: { required: "No Rekam Medis is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Nama Pasien",
          rules: { required: "Nama Pasien is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "titlesId",
          label: "Title",
          name: "titlesId",
          placeholder: "Title",
          options: titlesOptions,
          rules: { required: "Title is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorHP",
          label: "Nomor HP",
          name: "nomorHP",
          placeholder: "Nomor HP",
          rules: { required: "Nomor HP is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },

        {
          type: "email",
          id: "email",
          label: "Email",
          name: "email",
          placeholder: "Email",
          rules: {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Masukkan email yang valid",
            },
          },
          colSize: 6,
        },
      ],
    },
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
      section: "Penyedia Fasilitas",
      fields: [
        {
          type: "custom",
          label: "Fasilitas",
          customRender: () => (
            <TindakanTableHarga
              title="Fasilitas"
              tindakan={dataFasilitas}
              label="Fasilitas"
              rules={{ required: "Fasilitas is required" }}
              ValueKey="id"
              labelKey="tindakan"
              hargaKey="harga"
              placeholder="masukkan Nama Fasilitas"
            />
          ),
          colSize: 12,
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
      <DynamicStepForm
        title="Pendaftaran Pasien Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmitWithConsole}
        onFormSubmit={handleFormSubmit}
        externalOptions={{ titles: titlesOptions }}
        backPath="/pendaftaran/pendaftaran-pasien-fasilitas"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranPasienFasilitas.displayName = "PendaftaranPasienFasilitas";
export default PendaftaranPasienFasilitas;
