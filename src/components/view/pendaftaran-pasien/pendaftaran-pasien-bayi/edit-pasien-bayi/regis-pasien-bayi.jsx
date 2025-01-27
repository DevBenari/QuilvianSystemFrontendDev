"use client";

import React, { Fragment, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBayiById } from "@/lib/hooks/pasienBayi/getbyid";
import { BayiEdit } from "@/lib/hooks/pasienBayi/edit";
import { dataDokter } from "@/utils/SearchSelect";

import { useForm } from "react-hook-form";
import useSelectKelas from "@/lib/hooks/useSelectKelas";
import { datakelas } from "@/utils/dataKelas";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

export const RegisPasienBayi = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [bayiEditData, setBayiEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setValue } = useForm();

  const {
    selectedKelas,
    selectedRuang,
    filteredRuang,
    filteredTempatTidur,
    handleChange,
  } = useSelectKelas();

  // Fetch data bayi berdasarkan ID
  useEffect(() => {
    if (id) {
      getBayiById(id)
        .then((response) => {
          setBayiEditData(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch bayi:", error);
          setLoading(false);
        });
    }
  }, [id]);

  // Debugging: log perubahan data filtering
  useEffect(() => {
    console.log("Selected Kelas:", selectedKelas);
    console.log("Filtered Ruang:", filteredRuang);
    console.log("Filtered Tempat Tidur:", filteredTempatTidur);
  }, [selectedKelas, filteredRuang, filteredTempatTidur]);

  const handleSubmit = async (bayiData) => {
    try {
      const response = await BayiEdit(bayiData, id);
      alert("Bayi updated successfully!");
      router.push("/pendaftaran/pendaftaran-pasien-bayi");
      console.log("Response:", response);
    } catch (error) {
      console.error("Failed to update bayi:", error);
      alert("Failed to update bayi.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bayiEditData) {
    return <div className="text-danger">Bayi not found.</div>;
  }

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "namaBayi",
          label: "Nama Bayi",
          name: "namaPasienMelahirkan",
          value: bayiEditData?.namaPasienMelahirkan || "",
          colSize: 6,
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama keluarga",
          value: bayiEditData?.namaKeluarga || "",
          colSize: 6,
        },
        {
          type: "select",
          id: "dokter",
          label: "Pilih Dokter Penanggung Jawab",
          name: "dokter",
          placeholder: bayiEditData?.dokter || "",
          options: dataDokter,
          value: bayiEditData?.dokter || "",
          rules: { required: "Pilih Dokter Penanggung Jawab is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Masukkan tempat lahir...",
          value: bayiEditData?.tempatLahir || "",
          rules: { required: "Tempat Lahir is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalLahir",
          label: "Tanggal Lahir",
          placeholder: "Masukkan tanggal lahir...",
          name: "tanggalLahir",
          value: bayiEditData?.tanggalLahir || "",
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
          value: bayiEditData?.jenisKelamin || "",
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
          value: bayiEditData?.keadaanBayi || "",
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
          placeholder: bayiEditData?.kelas,
          options: datakelas.map((item) => ({
            label: item.kelas,
            value: item.kelas,
          })),
          value: bayiEditData?.kelas || selectedKelas,
          onChangeCallback: (value) => handleChange("kelas", value),
          rules: { required: "Pilih Kelas Rawat Bayi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "ruang",
          label: "Pilih Ruang Rawat Bayi",
          name: "ruang",
          placeholder: bayiEditData?.ruang,
          options: filteredRuang.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          value: bayiEditData?.ruang || selectedRuang,
          onChangeCallback: (value) => handleChange("ruang", value),
          rules: { required: "Pilih Ruang Rawat Bayi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tempatTidur",
          label: "Pilih Tempat Tidur Rawat Bayi",
          name: "tempatTidur",
          placeholder: bayiEditData?.tempatTidur,
          options: filteredTempatTidur.map((item) => ({
            label: item,
            value: item,
          })),
          value: bayiEditData?.tempatTidur,
          onChangeCallback: (value) => handleChange("tempatTidur", value),
          rules: { required: "Pilih Tempat Tidur Rawat Bayi is required" },
          colSize: 6,
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Pasien Bayi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/pendaftaran/pendaftaran-pasien-bayi"
      />
    </Fragment>
  );
};

export default RegisPasienBayi;
