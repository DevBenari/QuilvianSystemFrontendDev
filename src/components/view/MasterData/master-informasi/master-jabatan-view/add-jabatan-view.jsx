"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { showAlert } from "@/components/features/alert/custom-alert";
import { createJabatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";

const AddJabatanForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Fungsi submit form untuk menambahkan jabatan baru
  const handleSubmit = async (data) => {
    try {
      // Validasi data sebelum submit
      const errors = validateFormData(data, formFields);
      if (errors.length > 0) {
        showAlert.error(errors.join("\n"));
        return;
      }

      // Kirim data ke Redux API
      await dispatch(createJabatan(data)).unwrap();
      showAlert.success("Data Jabatan berhasil ditambahkan!", () => {
        router.push("/MasterData/master-informasi/jabatan/table-jabatan");
      });
    } catch (error) {
      console.error("Gagal menambahkan Jabatan:", error);
      showAlert.error("Gagal menambahkan data jabatan.");
    }
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Jabatan",
      fields: [
        {
          type: "text",
          label: "Nama Jabatan",
          name: "namaJabatan",
          placeholder: "Masukkan Nama Jabatan...",
          colSize: 6,
          rules: { required: "Nama Jabatan harus diisi" },
        },
      ],
    },
  ];

  // Fungsi untuk validasi form
  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { name, label, rules } = field;
        const value = data[name];

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
        title="Tambah Data Jabatan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/jabatan/table-jabatan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddJabatanForm;
