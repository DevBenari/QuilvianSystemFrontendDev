"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { addTitle } from "@/lib/hooks/masterData/title";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

const PenambahanTitle = () => {
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Title",
          name: "kodeTitle",
          placeholder: "Masukkan Kode Title...",
          colSize: 6,
          rules: { required: "Kode Title harus diisi" },
        },
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          placeholder: "Masukkan Nama Title...",
          colSize: 6,
          rules: { required: "Nama Title harus diisi" },
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
      const response = await addTitle(data);
      alert("Title added successfully!");
      console.log("Response:", response);
      router.push("/MasterData/master-title/table-title");
    } catch (error) {
      console.error(error);
      alert("Failed to add Title.");
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
        title="Tambah Data Title"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-title/table-title"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default PenambahanTitle;
