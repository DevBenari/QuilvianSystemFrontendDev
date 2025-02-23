"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import useProvinsiData from "@/lib/hooks/useProvinsiData";
import { createKabupatenKota } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";

const KabupatenKotaAddForm = () => {
  const router = useRouter();
  const {
    ProvinsiOptions,
    loading: provinsiLoading,
    handleLoadMore,
  } = useProvinsiData();

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKabupatenKota(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-wilayah/kabupaten-kota/table-kabupaten-kota"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan Kabupaten Kota:", error);
      showAlert.error("Gagal menambahkan data Kabupaten Kota");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "provinsiId",
          label: "Provinsi",
          name: "provinsiId",
          placeholder: "Pilih Provinsi",
          options: ProvinsiOptions,
          rules: { required: "Provinsi is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: provinsiLoading,
        },
        {
          type: "text",
          label: "Nama Kabupaten / Kota",
          name: "namaKabupatenKota",
          placeholder: "Masukkan Nama Kabupaten  / Kota...",
          colSize: 6,
          rules: { required: "Nama Kabupaten Kota harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Kabupaten Kota"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-wilayah/kabupaten-kota/table-kabupaten-kota"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KabupatenKotaAddForm;
