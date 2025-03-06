"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { showAlert } from "@/components/features/alert/custom-alert";
import useAsuransiData from "@/lib/hooks/useAsuransi";
import { createCoveranAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";

const CoveranAsuransiAddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    AsuransiOptions,
    loading: AsuransiLoading,
    handleLoadMore: handleLoadMoreAsuransi,
  } = useAsuransiData();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Kode Layanan",
          name: "serviceCode",
          placeholder: "Masukkan Kode Layanan...",
          colSize: 6,
          rules: { required: "Kode Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Deskripsi Layanan",
          name: "serviceDesc",
          placeholder: "Masukkan Deskripsi Layanan...",
          colSize: 6,
          rules: { required: "Deskripsi Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Kode Kelas Layanan",
          name: "serviceCodeClass",
          placeholder: "Masukkan Kode Kelas Layanan...",
          colSize: 6,
          rules: { required: "Kode Kelas Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Kelas",
          name: "class",
          placeholder: "Masukkan Kelas...",
          colSize: 6,
          rules: { required: "Kelas harus diisi" },
        },
        {
          type: "select",
          label: "Apakah Operasi?",
          name: "isSurgery",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
          rules: { required: "Pilih apakah ini operasi atau bukan" },
        },
        {
          type: "text",
          label: "Tarif",
          name: "tarif",
          placeholder: "Masukkan Tarif...",
          colSize: 6,
          rules: { required: "Tarif harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Berlaku",
          name: "tglBerlaku",
          colSize: 6,
          rules: { required: "Tanggal Berlaku harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Berakhir",
          name: "tglBerakhir",
          colSize: 6,
          rules: { required: "Tanggal Berakhir harus diisi" },
        },
        {
          type: "select",
          label: "Apakah PKS?",
          name: "isPKS",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
          rules: { required: "Pilih apakah ini PKS atau bukan" },
        },
        {
          type: "select",
          label: "Jenis Asuransi",
          name: "asuransiId",
          colSize: 6,
          rules: { required: "Asuransi harus dipilih" },
          options: AsuransiOptions,
          handleLoadMore: handleLoadMoreAsuransi,
          isLoading: AsuransiLoading,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createCoveranAsuransi(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-asuransi/coveran-asuransi/daftar-CoveranAsuransi"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan Coveran Asuransi:", error);
      showAlert.error("Gagal menambahkan data Coveran Asuransi");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Koveran Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-asuransi/coveran-asuransi/daftar-CoveranAsuransi"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default CoveranAsuransiAddForm;
