"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createProvinsi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";

const ProvinsiAddForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { NegaraOptions, loadingNegara, handleLoadMoreNegara } =
    useWilayahData();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Provinsi",
          name: "namaProvinsi",
          placeholder: "Masukkan Nama Provinsi...",
          colSize: 6,
          rules: { required: "Nama Provinsi harus diisi" },
        },
        {
          type: "select",
          id: "negaraId",
          label: "Negara",
          name: "negaraId",
          placeholder: "Pilih Negara",
          options: NegaraOptions,
          rules: { required: "Negara is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreNegara,
          isLoading: loadingNegara,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      // 🔹 Buat data baru
      await dispatch(createProvinsi(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-wilayah/provinsi/table-provinsi");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (error) {
      console.error("Gagal menambahkan Provinsi:", error);
      showAlert.error("Gagal menambahkan data Provinsi");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Provinsi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-wilayah/provinsi/table-provinsi"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default ProvinsiAddForm;
