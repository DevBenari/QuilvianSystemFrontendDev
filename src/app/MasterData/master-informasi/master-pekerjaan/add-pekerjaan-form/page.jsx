"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ReusableAlert from "@/components/ui/reusable-alert";
import { addPekerjaan } from "@/lib/hooks/masterData/master-informasi/pekerjaan";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const FormAddPekerjaan = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Pekerjaan",
          name: "kodePekerjaan",
          placeholder: "Masukkan Kode Pekerjaan...",
          colSize: 6,
          rules: { required: "Kode Pekerjaan harus diisi" },
        },
        {
          type: "text",
          label: "Nama Pekerjaan",
          name: "namaPekerjaan",
          placeholder: "Masukkan Nama Pekerjaan...",
          colSize: 6,
          rules: { required: "Nama Pekerjaan harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    // Validasi data sebelum submit
    const errors = validateFormData(data, formFields);

    if (errors.length > 0) {
      alert(`Form tidak valid:\n${errors.join("\n")}`);
      return;
    }

    try {
      const response = await addPekerjaan(data);
      console.log(response);
      setAlertMessage("Pekerjaan added successfully!");
      setAlertVariant("success");

      // Navigasi setelah beberapa detik
      setTimeout(() => {
        router.push(
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        );
      }, 500);
    } catch (error) {
      console.error(error);
      alert("Failed to add Pekerjaan.");
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
        autoClose={alertVariant === "success" ? 2000 : null}
      />
      <DynamicForm
        title="Tambah Data Pekerjaan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPekerjaan;
