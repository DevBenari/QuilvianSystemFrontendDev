"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const AsuransiAddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createAsuransi(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-asuransi/daftar-asuransi");
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
          label: "Kode Asuransi",
          name: "kodeAsuransi",
          placeholder: "Masukkan Kode Asuransi...",
          defaultValue: "",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Pilih Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama asuransi harus dipilih" },
        },

        {
          type: "text",
          label: "Tipe Perusahaan",
          name: "tipePerusahaan",
          placeholder: "Pilih Tipe Perusahaan...",
          colSize: 6,
          rules: { required: "Tipe perusahaan harus dipilih" },
        },

        {
          type: "text",
          label: "Status",
          name: "status",
          placeholder: "Pilih Status...",
          colSize: 6,
          rules: { required: "Status harus dipilih" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AsuransiAddForm;
