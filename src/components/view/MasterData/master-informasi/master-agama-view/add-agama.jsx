"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createAgama } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddAgama = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createAgama(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-informasi/agama/table-agama");
      });
    } catch (error) {
      console.error("Gagal menambahkan Agama :", error);
      showAlert.error("Gagal menambahkan data Agama ");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Agama",
          name: "namaAgama",
          placeholder: "Masukkan Nama Agama...",
          colSize: 6,
          rules: { required: "Nama Agama harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Agama"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-informasi/agama/table-agama"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddAgama;
