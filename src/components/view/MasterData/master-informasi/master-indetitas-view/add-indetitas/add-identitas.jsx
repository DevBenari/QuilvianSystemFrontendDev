"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createIdentitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";

const AddFormIdentitas = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (data) => {
    try {
      // Validasi data sebelum submit
      const errors = validateFormData(data, formFields);
      if (errors.length > 0) {
        showAlert.error(errors.join("\n"));
        return;
      }

      // Kirim data ke Redux API
      await dispatch(createIdentitas(data)).unwrap();
      showAlert.success("Data Identitas berhasil ditambahkan!", () => {
        router.push("/MasterData/master-informasi/identitas/table-identitas");
      });
    } catch (error) {
      console.error("Gagal menambahkan Identitas:", error);
      showAlert.error("Gagal menambahkan data Identitas.");
    }
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Jenis Identitas",
          name: "jenisIdentitas",
          placeholder: "Masukkan Jenis Identitas...",
          colSize: 6,
          rules: { required: "Jenis Identitas harus diisi" },
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
        title="Tambah Data Identitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-identitas/table-identitas"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormIdentitas;
