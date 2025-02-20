"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import { createKecamatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/Kecamatan";
import useKabupatenKotaData from "@/lib/hooks/useKabupatenKotaData";

const KecamatanAddForm = () => {
  const router = useRouter();

  const {
    data: KabupatenKotaOptions,
    loading: KabupatenKotaLoading,
    handleLoadMore,
  } = useKabupatenKotaData();

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKecamatan(data)).unwrap();
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
          type: "text",
          label: "Nama Kabupaten / Kota",
          name: "namaKecamatan",
          placeholder: "Masukkan Nama Kabupaten  / Kota...",
          colSize: 6,
          rules: { required: "Nama Kabupaten Kota harus diisi" },
        },
        {
          type: "select",
          id: "kabupatenKotaId",
          label: "KabupatenKota",
          name: "kabupatenKotaId",
          placeholder: "Pilih Kabupaten Kota",
          options: KabupatenKotaOptions,
          rules: { required: "KabupatenKota is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: KabupatenKotaLoading,
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
        backPath="/MasterData/master-informasi/Kecamatan/table-Kecamatan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KecamatanAddForm;
