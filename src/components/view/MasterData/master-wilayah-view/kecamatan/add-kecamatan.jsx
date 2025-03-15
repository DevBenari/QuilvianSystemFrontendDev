"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import { createKecamatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";

const KecamatanAddForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    KabupatenKotaOptions,
    loadingKabupatenKota,
    handleLoadMoreKabupatenKota,
  } = useWilayahData();

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
          onMenuScrollToBottom: handleLoadMoreKabupatenKota,
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

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKecamatan(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kecamatan/table-kecamatan");
        setTimeout(() => {
          window.location.reload(); // Full reload untuk memastikan Redux dan UI diperbarui
        }, 100);
      });
    } catch (error) {
      console.error("Gagal menambahkan Kecamatan:", error);
      showAlert.error("Gagal menambahkan data Kecamatan");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Kecamatan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-wilayah/kecamatan/table-kecamatan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KecamatanAddForm;
