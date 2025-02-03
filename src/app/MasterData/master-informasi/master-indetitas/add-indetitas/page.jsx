"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { addIdentitas } from "@/lib/hooks/Identitas";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

const AddFormIdentitas = () => {
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

  const router = useRouter();

  const handleSubmit = async (data) => {
    // Validasi data sebelum submit
    const errors = validateFormData(data, formFields);

    if (errors.length > 0) {
      alert(`Form tidak valid:\n${errors.join("\n")}`);
      return;
    }

    try {
      const response = await addIdentitas(data);
      alert("Identitas added successfully!");
      console.log("Response:", response);
      router.push("/MasterData/master-Identitas/table-Identitas");
    } catch (error) {
      console.error(error);
      alert("Failed to add Identitas.");
    }
  };

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
