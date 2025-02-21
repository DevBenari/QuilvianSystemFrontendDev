"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import { createKecamatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";

import useProvinsiData from "@/lib/hooks/useProvinsiData";
import useKabupatenKotaData from "@/lib/hooks/useKabupatenKotaData";

const KecamatanAddForm = () => {
  const router = useRouter();

  const {
    KabupatenKotaOptions,
    loading: KabupatenKotaLoading,
    handleLoadMore,
  } = useKabupatenKotaData();

  const {
    ProvinsiOptions,
    loading: provinsiLoading,
    handleLoadMore: handleLoadMoreProvinsi,
  } = useProvinsiData();

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKecamatan(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kecamatan/table-kecamatan");
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
          id: "kabupatenKotaId",
          label: "Kabupaten Kota",
          name: "kabupatenKotaId",
          placeholder: "Pilih Kabupaten Kota",
          options: KabupatenKotaOptions,
          rules: { required: "Kabupaten Kota is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: KabupatenKotaLoading,
        },
        {
          type: "text",
          label: "Nama Kecamatan",
          name: "namaKecamatan",
          placeholder: "Masukkan Nama Kecamatan...",
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
        backPath="/MasterData/master-wilayah/kecamatan/table-kecamatan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KecamatanAddForm;
