"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import { createKecamatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";
import { resetWilayahState } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const KecamatanAddForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    KabupatenKotaOptions,

    handleLoadMoreKabupatenKota,
  } = useWilayahData({ kabupatenKota: true });

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
      dispatch(resetWilayahState());
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kecamatan/table-kecamatan");
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
