"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createNegara } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const NegaraAddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createNegara(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-informasi/negara/table-negara");
      });
    } catch (error) {
      console.error("Gagal menambahkan negara:", error);
      showAlert.error("Gagal menambahkan data negara");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Negara",
          name: "namaNegara",
          placeholder: "Masukkan Nama Negara...",
          colSize: 6,
          rules: { required: "Nama negara harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Negara"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/negara/table-negara"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default NegaraAddForm;
