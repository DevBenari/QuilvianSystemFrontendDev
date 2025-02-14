"use client";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createAgama } from "@/lib/state/slices/masterData/master-informasi/AgamaSlice";

const FormAddAgama = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createAgama(data)).unwrap(); // Tunggu hasil dari dispatch
      alert("Agama berhasil ditambahkan!");
      router.push("/MasterData/master-informasi/agama/table-agama");
    } catch (error) {
      console.error("Gagal menambahkan Agama:", error);
      alert("Gagal menambahkan Agama.");
    }
    console.log("Submitted data:", data);
  };

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

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Agama"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/agama/table-agama"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddAgama;
