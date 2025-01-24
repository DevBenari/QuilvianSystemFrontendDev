"use client";

import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import { addTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/add";

import { jenisOperasi, kategoriOperasi } from "@/utils/masterData";
import { useRouter } from "next/navigation";
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
          id: "tipeOperasi",
          label: "Jenis Operasi",
          name: "tipeOperasi",
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

  const router = useRouter();

  const handleSubmit = async (data) => {
    // Validasi data sebelum submit
    const errors = validateFormData(data, formFields);

    if (errors.length > 0) {
      alert(`Form tidak valid:\n${errors.join("\n")}`);
      return;
    }

    try {
      const response = await addTindakanOperasi(data);
      alert("sukses menambahkan data tindakan operasi");
      console.log("Response:", response);
      router.push("/MasterData/daftar-tindakan-operasi");
    } catch (error) {
      console.error(error);
      alert("gagal menambahkan data tindakan operasi");
    }
  };

  // Fungsi validasi data
  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { id, label, rules } = field;
        const value = data[id];

        if (rules?.required && (!value || value.trim() === "")) {
          errors.push(`${label} harus diisi`);
        }

        if (rules?.pattern && !rules.pattern.test(value)) {
          errors.push(`${label} tidak valid`);
        }
      });
    });
    return errors;
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
