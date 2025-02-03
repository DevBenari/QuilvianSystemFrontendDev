"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { addPendidikan } from "@/lib/hooks/masterData/pendidikan";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const AddFormPendidikan = () => {
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Pendidikan",
          name: "kodePendidikan",
          placeholder: "Masukkan Kode Pendidikan...",
          colSize: 6,
          rules: { required: "Kode Pendidikan harus diisi" },
        },
        {
          type: "text",
          label: "Nama Pendidikan",
          name: "namaPendidikan",
          placeholder: "Masukkan Nama Pendidikan...",
          colSize: 6,
          rules: { required: "Nama Pendidikan harus diisi" },
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
      const response = await addPendidikan(data);
      alert("Pendidikan added successfully!");
      console.log("Response:", response);
      router.push("/MasterData/master-Pendidikan/table-Pendidikan");
    } catch (error) {
      console.error(error);
      alert("Failed to add Pendidikan.");
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
        title="Tambah Data Pendidikan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-informasi/master-pendidikan/table-pendidikan"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormPendidikan;
