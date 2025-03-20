"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import useWilayahData from "@/lib/hooks/useWilayahData";
import { createKodePos } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kodePosSlice";
const KodePosAddForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { KelurahanOptions, handleLoadMoreKelurahan } = useWilayahData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "kelurahanId",
          label: "Kelurahan",
          name: "kelurahanId",
          placeholder: "Pilih Kelurahan",
          options: KelurahanOptions,
          rules: { required: "Kelurahan is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKelurahan,
        },
        {
          type: "text",
          label: "Nama KodePos",
          name: "namaKodePos",
          placeholder: "Masukkan Nama KodePos",
          colSize: 6,
          rules: { required: "Nama KodePos Kota harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createKodePos(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/kode-pos/table-kode-pos");
      });
    } catch (error) {
      console.error("Gagal menambahkan KodePos Kota:", error);
      showAlert.error("Gagal menambahkan data KodePos Kota");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Kode Pos Kota"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-wilayah/kode-pos/table-kode-pos"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KodePosAddForm;
