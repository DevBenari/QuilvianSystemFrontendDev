"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createSuku } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/SukuSlice";

const SukuAddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Suku",
          name: "namaSuku",
          placeholder: "Masukkan Nama Suku...",
          colSize: 6,
          rules: { required: "Nama suku harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createSuku(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-informasi/suku/table-suku");
      });
    } catch (error) {
      console.error("Gagal menambahkan suku:", error);
      showAlert.error("Gagal menambahkan data suku");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Suku"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/suku/table-suku"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default SukuAddForm;
