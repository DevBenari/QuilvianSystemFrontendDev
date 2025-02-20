"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import useKelurahanData from "@/lib/hooks/useKelurahanData";

const KelurahanAddForm = () => {
  const router = useRouter();

  const {
    data: KelurahanOptions,
    loading: KelurahanLoading,
    handleLoadMore,
  } = useKelurahanData();

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      // Tambahkan negaraId secara default saat submit
      await dispatch(createKelurahan(data)).unwrap();
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
          name: "namaKelurahan",
          placeholder: "Masukkan Nama Kabupaten  / Kota...",
          colSize: 6,
          rules: { required: "Nama Kabupaten Kota harus diisi" },
        },
        {
          type: "select",
          id: "kelurahanId",
          label: "Kelurahan",
          name: "kelurahanId",
          placeholder: "Pilih Kelurahan ",
          options: KelurahanOptions,
          rules: { required: "Kelurahan is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: KelurahanLoading,
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
        backPath="/MasterData/master-informasi/Kelurahan/table-Kelurahan"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default KelurahanAddForm;
