"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createIdentitas } from "@/lib/state/slices/masterData/master-informasi/identitasSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const AddFormIdentitas = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (data) => {
    // Validasi data sebelum submit

    try {
      await dispatch(createIdentitas(data).unwrap());
      router.push(
        "/MasterData/master-informasi/master-indetitas/table-indetitas"
      );
    } catch (error) {
      console.error("Gagal menambahkan Identitas:", error);
      alert("Failed to add Identitas.");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Identitas",
          name: "kodeIdentitas",
          placeholder: "Masukkan Kode Identitas...",
          colSize: 6,
          rules: { required: "Kode Identitas harus diisi" },
        },
        {
          type: "text",
          label: "Nama Identitas",
          name: "namaIdentitas",
          placeholder: "Masukkan Nama Identitas...",
          colSize: 6,
          rules: { required: "Nama Identitas harus diisi" },
        },
      ],
    },
  ];

  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { name, label, rules } = field; // Ganti id dengan name
        const value = data[name]; // Ambil value berdasarkan name

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
        Identitas="Tambah Data Identitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-Identitas/table-Identitas"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormIdentitas;
