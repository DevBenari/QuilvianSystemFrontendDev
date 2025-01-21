"use client";

import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import { jenisOperasi, kategoriOperasi } from "@/utils/masterData";
import React, { Fragment } from "react";

const TambahTindakanOperasi = () => {
  const formFields = [
    {
      section: "Data Tindakan Operasi",
      fields: [
        {
          type: "select",
          id: "kategoriOperasi",
          label: "Kategori Operasi",
          name: "kategoriOperasi",
          placeholder: "Kategori Operasi",
          options: kategoriOperasi,
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisOperasi",
          label: "Jenis Operasi",
          name: "jenisOperasi",
          placeholder: "Jenis Operasi",
          options: jenisOperasi,
          rules: { required: "Jenis Operasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakanOperasi",
          label: "Nama Tindakan Operasi",
          name: "namaTindakanOperasi",
          placeholder: "Nama Tindakan Operasi",
          rules: { required: "Nama Tindakan Operasi is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Dokter Tambahan",
      fields: [
        {
          type: "text",
          id: "namaDokterOperasi1",
          label: "Nama Dokter Operasi 1",
          name: "namaDokterOperasi1",
          placeholder: "Nama Dokter Operasi 1",
          rules: { required: "Nama Dokter Operasi 1 is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaDokterOperasi2",
          label: "Nama Dokter Operasi 2",
          name: "namaDokterOperasi2",
          placeholder: "Nama Dokter Operasi 2",
          rules: { required: "Nama Dokter Operasi 2 is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaDokterOperasi3",
          label: "Nama Dokter Operasi 3",
          name: "namaDokterOperasi3",
          placeholder: "Nama Dokter Operasi 3",
          rules: { required: "Nama Dokter Operasi 3 is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "termasukPerhitungan",
          label: "Kategori Operasi",
          name: "termasukPerhitungan",
          placeholder: "Kategori Operasi",
          options: [
            { label: "Dapat Reward", value: "Dapat Reward" },
            { label: "Tidak Dapat Reward", value: "Tidak Dapat Reward" },
          ],
          rules: { required: "Kategori Operasi is required" },
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
        title="Assign Tindakan Operasi"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default TambahTindakanOperasi;
