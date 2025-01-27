"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { Fragment } from "react";

const FormAddAdministrasi = () => {
  const formFields = [
    {
      section: "Informasi Administrasi",
      fields: [
        {
          type: "text",
          id: "namaAdministrasi",
          label: "Nama Administrasi",
          name: "namaAdministrasi",
          placeholder: "Masukkan Nama Administrasi",
          rules: { required: "Nama Administrasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeRawat",
          label: "Tipe Rawat",
          name: "tipeRawat",
          placeholder: "Pilih Tipe Rawat",
          options: [
            { label: "Rawat Jalan", value: "Rawat Jalan" },
            { label: "Rawat Inap", value: "Rawat Inap" },
            { label: "Rawat Darurat", value: "Rawat Darurat" },
          ],
          rules: { required: "Tipe Rawat is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeAdministrasi",
          label: "Tipe Administrasi",
          name: "tipeAdministrasi",
          placeholder: "Pilih Tipe Administrasi",
          options: [
            { label: "Pendaftaran", value: "Pendaftaran" },
            { label: "Pembayaran", value: "Pembayaran" },
            { label: "Pengelolaan Data", value: "Pengelolaan Data" },
          ],
          rules: { required: "Tipe Administrasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "kelompokUsia",
          label: "Kelompok Usia",
          name: "kelompokUsia",
          placeholder: "Pilih Kelompok Usia",
          options: [
            { label: "Anak-anak", value: "Anak-anak" },
            { label: "Dewasa", value: "Dewasa" },
            { label: "Lansia", value: "Lansia" },
          ],
          rules: { required: "Kelompok Usia is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "departement",
          label: "Departement",
          name: "departement",
          placeholder: "Pilih Departement",
          options: [
            { label: "Poli Anak", value: "Poli Anak" },
            { label: "Poli Penyakit Dalam", value: "Poli Penyakit Dalam" },
            { label: "Radiologi", value: "Radiologi" },
            { label: "Farmasi", value: "Farmasi" },
            { label: "Laboratorium", value: "Laboratorium" },
            { label: "Rehabilitasi", value: "Rehabilitasi" },
            { label: "Kasir", value: "Kasir" },
            { label: "Gizi", value: "Gizi" },
          ],
          rules: { required: "Departement is required" },
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
        title="Tambah Data Administrasi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        // backPath={`/MasterData/master-administrasi/daftar-administrasi`}
      />
    </Fragment>
  );
};

export default FormAddAdministrasi;
