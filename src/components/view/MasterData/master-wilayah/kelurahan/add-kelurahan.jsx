"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import useKabupatenKotaData from "@/lib/hooks/useKabupatenKotaData";
import useProvinsiData from "@/lib/hooks/useProvinsiData";
import useKecamatanData from "@/lib/hooks/useKecamatanData";
import { createKelurahan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";

const KelurahanAddForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    KecamatanOptions,
    loading: KecamatanLoading,
    handleLoadMore: handleLoadMoreKecamatan,
  } = useKecamatanData();

  const {
    KabupatenKotaOptions,
    loading: KabupatenKotaLoading,
    handleLoadMore: handleLoadMoreKabupatenKota,
  } = useKabupatenKotaData();

  const {
    ProvinsiOptions,
    loading: provinsiLoading,
    handleLoadMore: handleLoadMoreProvinsi,
  } = useProvinsiData();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKelurahan(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kelurahan/table-kelurahan");
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
          onMenuScrollToBottom: handleLoadMoreProvinsi,
          isLoading: provinsiLoading,
        },
        {
          type: "select",
          id: "kabupatenKotaId",
          label: "Kabupaten Kota",
          name: "kabupatenKotaId",
          placeholder: "Pilih Kabupaten Kota",
          options: KabupatenKotaOptions,
          rules: { required: "Kabupaten Kota is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKabupatenKota,
          isLoading: KabupatenKotaLoading,
        },
        {
          type: "select",
          id: "kecamatanId",
          label: "Kecamatan",
          name: "kecamatanId",
          placeholder: "Pilih Kecamatan",
          options: KecamatanOptions,
          rules: { required: "Kecamatan is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKecamatan,
          isLoading: KecamatanLoading,
        },
        {
          type: "text",
          label: "Nama Kelurahan",
          name: "namaKelurahan",
          placeholder: "Masukkan Nama Kelurahan",
          colSize: 6,
          rules: { required: "Nama Kelurahan Kota harus diisi" },
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
        backPath="/MasterData/master-wilayah/kelurahan/table-kelurahan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KelurahanAddForm;
