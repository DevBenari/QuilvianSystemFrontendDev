"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ReusableAlert from "@/components/ui/reusable-alert";
import { addAgama } from "@/lib/hooks/masterData/agama";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const FormAddAgama = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");

  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Agama",
          name: "agamaKode",
          placeholder: "Masukkan Kode Agama...",
          colSize: 6,
          rules: { required: "Kode Agama harus diisi" },
        },
        {
          type: "text",
          label: "Nama Agama",
          name: "jenisAgama",
          placeholder: "Masukkan Nama Agama...",
          colSize: 6,
          rules: { required: "Nama Agama harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    const errors = validateFormData(data, formFields);

    if (errors.length > 0) {
      alert(`Form tidak valid:\n${errors.join("\n")}`);
      return;
    }

    try {
      const response = await addAgama(data);
      setAlertMessage("Agama added successfully!");
      setAlertVariant("success");

      // Navigasi setelah beberapa detik
      setTimeout(() => {
        router.push("/MasterData/master-informasi/master-agama/table-agama");
      }, 500);
    } catch (error) {
      console.error(error);
      // Menampilkan alert error tanpa auto-close
      setAlertMessage("Failed to add Agama.");
      setAlertVariant("danger");
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
      <ReusableAlert
        message={alertMessage}
        variant={alertVariant}
        onClose={() => setAlertMessage(null)}
        autoClose={alertVariant === "success" ? 3000 : null}
      />

      <DynamicForm
        title="Tambah Data Agama"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-informasi/master-agama/table-agama"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddAgama;
