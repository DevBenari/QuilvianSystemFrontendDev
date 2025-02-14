"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { Fragment } from "react";

const FormAddAdministrasi = () => {
  const formFields = [
    {
      section: "Detail Tarif Administrasi",
      fields: [
        {
          type: "text",
          id: "namaAdministrasi",
          label: "Nama Administrasi",
          name: "namaAdministrasi",
          placeholder: "Masukkan nama administrasi",
          rules: { required: "Nama administrasi wajib diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeAdministrasi",
          label: "Tipe Administrasi",
          name: "tipeAdministrasi",
          options: [
            { label: "All", value: "all" },
            { label: "Pasien Baru", value: "pasienBaru" },
            { label: "Pasien Lama", value: "pasienLama" },
            { label: "Pasien OTC", value: "pasienOTC" },
          ],
          placeholder: "Pilih tipe administrasi",
          rules: { required: "Tipe administrasi wajib dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeRawat",
          label: "Tipe Rawat",
          name: "tipeRawat",
          options: [
            { label: "All", value: "all" },
            { label: "Rawat Jalan", value: "rawatJalan" },
            { label: "Rawat Inap", value: "rawatInap" },
          ],
          placeholder: "Pilih tipe rawat",
          rules: { required: "Tipe rawat wajib dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "berlaku",
          label: "Berlaku",
          name: "berlaku",
          options: [
            { label: "All", value: "all" },
            { label: "Dewasa", value: "dewasa" },
            { label: "Bayi", value: "bayi" },
          ],
          placeholder: "Pilih status berlaku",
          rules: { required: "Status berlaku wajib dipilih" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Kode C.O.A",
      fields: [
        {
          type: "text",
          id: "kodeCOARawatJalan",
          label: "Kode C.O.A Rawat Jalan",
          name: "kodeCOARawatJalan",
          placeholder: "Masukkan kode C.O.A untuk rawat jalan",
          colSize: 6,
        },
        {
          type: "text",
          id: "kodeCOARawatInap",
          label: "Kode C.O.A Rawat Inap",
          name: "kodeCOARawatInap",
          placeholder: "Masukkan kode C.O.A untuk rawat inap",
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
      />
    </Fragment>
  );
};

export default FormAddAdministrasi;
