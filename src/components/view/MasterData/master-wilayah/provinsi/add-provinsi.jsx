"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createProvinsi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const ProvinsiAddForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      const formData = {
        ...data,
        negaraId: "a7b29b3f-a944-4982-bdd0-9f0fac0beed5", // Kirim ID Indonesia ke backend
      };

      await dispatch(createProvinsi(formData)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/provinsi/table-provinsi");
      });
    } catch (error) {
      console.error("Gagal menambahkan Provinsi:", error);
      showAlert.error("Gagal menambahkan data Provinsi");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Provinsi",
          name: "namaProvinsi",
          placeholder: "Masukkan Nama Provinsi...",
          colSize: 6,
          rules: { required: "Nama Provinsi harus diisi" },
        },
        {
          type: "hidden", // ID negara dikirim tetapi tidak ditampilkan di UI
          name: "negaraId",
          defaultValue: "a7b29b3f-a944-4982-bdd0-9f0fac0beed5",
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Provinsi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/Provinsi/table-Provinsi"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default ProvinsiAddForm;
