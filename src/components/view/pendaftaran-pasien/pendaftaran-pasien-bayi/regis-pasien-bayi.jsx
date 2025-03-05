"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import ButtonNav from "@/components/ui/button-navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchPendidikan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import { fetchTitle } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import { fetchPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import { fetchGolongan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { fetchIdentitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import { useRouter, useSearchParams } from "next/navigation";
import useAgamaData from "@/lib/hooks/useAgamaData";
import useSelectWilayah from "@/lib/hooks/useSelectWilayah";

import { dataKelas } from "@/utils/dataKelas";
import useSelectKelas from "@/lib/hooks/useSelectKelas";
import { dataDokter } from "@/utils/SearchSelect";

const AddPasienBayi = memo(() => {
  const { setValue } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedPrintType, setSelectedPrintType] = useState(null);
  const router = useRouter();
  const [selectImage, setSelectImage] = useState(null);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const {
    selectedKelas,
    selectedRuang,
    filteredRuang,
    filteredTempatTidur,
    handleChange,
  } = useSelectKelas();

  // Debugging: log perubahan data filtering
  useEffect(() => {
    console.log("Selected Kelas:", selectedKelas);
    console.log("Filtered Ruang:", filteredRuang);
    console.log("Filtered Tempat Tidur:", filteredTempatTidur);
  }, [selectedKelas, filteredRuang, filteredTempatTidur]);

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
      section: "Informasi Bayi",
      fields: [
        {
          type: "text",
          id: "namaBayi",
          label: "Nama Bayi",
          name: "namaPasienMelahirkan",

          colSize: 6,
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama keluarga",

          colSize: 6,
        },
        {
          type: "select",
          id: "dokter",
          label: "Pilih Dokter Penanggung Jawab",
          name: "dokter",

          options: dataDokter,

          rules: { required: "Pilih Dokter Penanggung Jawab is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Masukkan tempat lahir...",

          rules: { required: "Tempat Lahir is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalLahir",
          label: "Tanggal Lahir",
          placeholder: "Masukkan tanggal lahir...",
          name: "tanggalLahir",

          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Jenis kelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],

          rules: { required: "Jenis Kelamin is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "keadaanBayi",
          label: "Bayi Terlahir Dalam Keadaan",
          name: "keadaanBayi",
          placeholder: "Bayi Terlahir Dalam Keadaan",
          options: [
            { label: "Hidup", value: "Hidup" },
            { label: "Meninggal", value: "Meninggal" },
          ],

          rules: { required: "Keadaan Bayi is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Ruangan",
      fields: [
        {
          type: "select",
          id: "kelas",
          label: "Pilih Kelas Rawat Bayi",
          name: "kelas",

          options: dataKelas.map((item) => ({
            label: item.kelas,
            value: item.kelas,
          })),

          onChangeCallback: (value) => handleChange("kelas", value),
          rules: { required: "Pilih Kelas Rawat Bayi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "ruang",
          label: "Pilih Ruang Rawat Bayi",
          name: "ruang",

          options: filteredRuang.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),

          onChangeCallback: (value) => handleChange("ruang", value),
          rules: { required: "Pilih Ruang Rawat Bayi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tempatTidur",
          label: "Pilih Tempat Tidur Rawat Bayi",
          name: "tempatTidur",

          options: filteredTempatTidur.map((item) => ({
            label: item,
            value: item,
          })),

          onChangeCallback: (value) => handleChange("tempatTidur", value),
          rules: { required: "Pilih Tempat Tidur Rawat Bayi is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Fragment>
      <DynamicStepForm
        title="Pendaftaran Pasien Bayi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        externalOptions={{ titles: titlesOptions }}
        backPath="/pendaftaran/pendaftaran-pasien-bayi"
        isAddMode={true}
      />
    </Fragment>
  );
});

AddPasienBayi.displayName = "AddPasienBayi";
export default AddPasienBayi;
