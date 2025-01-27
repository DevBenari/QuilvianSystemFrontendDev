"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";

import { dataFasilitas } from "@/utils/dataTindakan";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";

export const FormAdmisiFasilitas = () => {
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
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          value: "",
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
          type: "number",
          id: "nomorHP",
          label: "Nomor HP",
          name: "nomorHP",
          placeholder: "Nomor HP",
          rules: {
            required: "Nomor Telepon wajib diisi",
            pattern: {
              value: /^[0-9]*$/, // Hanya angka yang diperbolehkan
              message: "Nomor Telepon hanya boleh berisi angka",
            },
          },
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
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Dokter Pemeriksa",
          options: [
            { label: "Dr. zainudin", value: "dr_zainudin" },
            { label: "Dr. putri", value: "dr_putri" },
            { label: "Dr. rindu", value: "dr_rindu" },
          ],
          rules: { required: "Dokter Lab is required" },
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
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Pasien Luar Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/pendaftaran/pendaftaran-pasien-fasilitas"}
      />
    </Fragment>
  );
};

export default FormAdmisiFasilitas;
