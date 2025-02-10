"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ReusableAlert from "@/components/ui/reusable-alert";
import { createGolongan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";

const FormAddGolongan = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createGolongan(data)).unwrap(); // Tunggu hasil dari dispatch
      alert("golongan berhasil ditambahkan!");

      setAlertMessage("Golongan added successfully!");
      setAlertVariant("success");
      //  Navigasi setelah beberapa detik
      setTimeout(() => {
        router.push(
          "/MasterData/master-informasi/golongan-darah/table-golongan"
        );
      }, 500);
    } catch (error) {
      console.error("Gagal menambahkan golongan:", error);
      alert("Gagal menambahkan golongan.");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Golongan",
          name: "kodeGolonganDarah",
          placeholder: "Masukkan Kode Golongan...",
          defaultValue: "",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Golongan",
          name: "namaGolonganDarah",
          placeholder: "Masukkan Nama Golongan...",
          colSize: 6,
          rules: { required: "Nama Golongan harus diisi" },
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
      <ReusableAlert
        message={alertMessage}
        variant={alertVariant}
        onClose={() => setAlertMessage(null)}
        autoClose={alertVariant === "success" ? 3000 : null}
      />
      <DynamicForm
        title="Tambah Data Golongan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-informasi/master-golongan/table-golongan"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddGolongan;
