"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

const FormAddDepartemen = () => {
  const router = useRouter();

  const formFields = [
    {
      section: "Informasi Departemen",
      fields: [
        {
          type: "select",
          id: "namaDepartemen",
          label: "Nama Departemen",
          name: "namaDepartemen",
          placeholder: "Pilih Nama Departemen",
          options: [
            { label: "Farmasi", value: "farmasi" },
            { label: "Gizi", value: "gizi" },
            { label: "Radiologi", value: "radiologi" },
            { label: "Laboratorium", value: "laboratorium" },
            { label: "Bedah", value: "bedah" },
            { label: "Rawat Inap", value: "rawatInap" },
            { label: "Poli Anak", value: "poliAnak" },
            { label: "Poli Penyakit Dalam", value: "poliPenyakitDalam" },
          ],
          rules: { required: "Nama Departemen is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "penanggungJawab",
          label: "Penanggung Jawab / Nama Ketua Departemen",
          name: "penanggungJawab",
          placeholder: "Masukkan Nama Penanggung Jawab",
          rules: { required: "Penanggung Jawab is required" },
          colSize: 6,
        },
        {
          type: "time",
          id: "jamOperasional",
          label: "Jam Operasional",
          name: "jamOperasional",
          placeholder: "Masukkan Jam Operasional (contoh: 08:00 - 17:00)",
          rules: { required: "Jam Operasional is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "ruanganLokasi",
          label: "Ruangan / Lokasi",
          name: "ruanganLokasi",
          placeholder: "Masukkan Ruangan atau Lokasi",
          rules: { required: "Ruangan / Lokasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "lineTelp",
          label: "Line Telepon",
          name: "lineTelp",
          placeholder: "Masukkan Line Telepon",
          rules: { required: "Line Telepon is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalPembuatan",
          label: "Tanggal Pembuatan",
          name: "tanggalPembuatan",
          placeholder: "Pilih Tanggal Pembuatan",
          rules: { required: "Tanggal Pembuatan is required" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "deskripsi",
          label: "Deskripsi",
          name: "deskripsi",
          placeholder: "Masukkan Deskripsi Departemen",
          rules: { required: "Deskripsi is required" },
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
        title="Tambah Data Departemen"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-departemen/daftar-departemen`}
      />
    </Fragment>
  );
};

export default FormAddDepartemen;
