"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createKelurahan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";
import { resetWilayahState } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const KelurahanAddForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { KecamatanOptions, handleLoadMoreKecamatan } = useWilayahData({
    kecamatan: true,
  });

  const formFields = [
    {
      fields: [
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

  const handleSubmit = async (data) => {
    try {
      await dispatch(createKelurahan(data)).unwrap();
      dispatch(resetWilayahState());
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kelurahan/table-kelurahan");
      });
    } catch (error) {
      console.error("Gagal menambahkan Kelurahan Kota:", error);
      showAlert.error("Gagal menambahkan data Kelurahan Kota");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Kelurahan Kota"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-wilayah/kelurahan/table-kelurahan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KelurahanAddForm;
