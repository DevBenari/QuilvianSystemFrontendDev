"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import useSelectKelas from "@/lib/hooks/useSelectKelas";
import React, { Fragment } from "react";

const PendaftaranPasienIgd = () => {
  const {
    selectedKelas,
    selectedRuang,
    filteredRuang,
    filteredTempatTidur,
    handleChange,
  } = useSelectKelas();
  const formFields = [
    {
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
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },

          colSize: 6,
        },
        {
          type: "text",
          id: "nomorTlpn",
          label: "Nomor Telepon",
          name: "nomorTlpn",
          placeholder: "Nomor Telepon",
          rules: { required: "Nomor Telepon is required" },
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
        {
          type: "textarea",
          id: "alamatRumah",
          label: "Alamat Rumah",
          name: "alamatRumah",
          placeholder: "Alamat Rumah",
          rules: { required: "Alamat Rumah is required" },
          colSize: 12,
        },
        {
          type: "text",
          id: "afiliasi",
          label: "Afiliasi",
          name: "afiliasi",
          placeholder: "Afiliasi",
          rules: { required: "Afiliasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "polisAsuransi",
          label: "Polis Asuransi",
          name: "polisAsuransi",
          placeholder: "Polis Asuransi",
          rules: { required: "Polis Asuransi is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Informasi Dokter",
      fields: [
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Nama Dokter",
          name: "dokterPemeriksa",
          placeholder: "Nama Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          rules: { required: "Dokter Lab is required" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "diagnosa",
          label: "Diagnosa",
          name: "diagnosa",
          placeholder: "Diagnosa",
          rules: { required: "Diagnosa is required" },
          colSize: 12,
        },
      ],
    },
    {
      section: "Dirujuk",
      fields: [
        {
          type: "select",
          id: "dirujuk",
          name: "dirujuk",
          label: "Pilih Rujukan",
          placeholder: "Pilih Rujukan",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          colSize: 12,
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

        {
          type: "select",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          placeholder: "Surat Rujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Biaya",
      fields: [
        {
          type: "text",
          id: "biaya",
          label: "Biaya",
          name: "biaya",
          placeholder: "Biaya",
          rules: { required: "Biaya is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "kelas",
          label: "Pilih Kelas ",
          name: "kelas",
          placeholder: "Pilih Kelas ",
          options: dataKelas.map((item) => ({
            label: item.kelas,
            value: item.kelas,
          })),
          value: selectedKelas,
          onChangeCallback: (value) => handleChange("kelas", value),
          rules: { required: "Pilih Kelas  is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "ruang",
          label: "Pilih Ruang ",
          name: "ruang",
          placeholder: "Pilih Ruang ",
          options: filteredRuang.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          value: selectedRuang,
          onChangeCallback: (value) => handleChange("ruang", value),
          rules: { required: "Pilih Ruang  is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tempatTidur",
          label: "Pilih Tempat Tidur ",
          name: "tempatTidur",
          placeholder: "Pilih Tempat Tidur ",
          options: filteredTempatTidur.map((item) => ({
            label: item,
            value: item,
          })),
          onChangeCallback: (value) => handleChange("tempatTidur", value),
          rules: { required: "Pilih Tempat Tidur  is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Rehabilitasi Medik"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default PendaftaranPasienIgd;
