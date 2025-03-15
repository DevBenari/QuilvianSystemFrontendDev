"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAsuransiPasien } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";
import useAsuransiData from "@/lib/hooks/useAsuransi";

const PendaftaranAsuransiPasien = memo(() => {
  const dispatch = useDispatch();

  const {
    AsuransiPasienOptions,
    loadingAsuransiPasien,
    handleLoadMoreAsuransiPasien,
    AsuransiOptions,
    loadingAsuransi,
    handleLoadMoreAsuransi,
  } = useAsuransiData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "ID Asuransi Pasien",
          name: "asuransiPasienId",
          options: AsuransiPasienOptions,
          placeholder: "Masukkan ID Asuransi Pasien...",
          colSize: 6,
          rules: { required: "ID Asuransi Pasien harus diisi" },
          onMenuScrollToBottom: handleLoadMoreAsuransiPasien,
          isLoading: loadingAsuransiPasien,
        },
        {
          type: "select",
          label: "ID Pasien",
          name: "pasienId",
          placeholder: "Masukkan ID Pasien...",
          colSize: 6,
          options: [],
          rules: { required: "ID Pasien harus diisi" },
        },
        {
          type: "text",
          label: "Nomor Polis",
          name: "noPolis",
          placeholder: "Masukkan Nomor Polis...",
          colSize: 6,
          rules: { required: "Nomor Polis harus diisi" },
        },
        {
          type: "select",
          label: "ID Asuransi",
          name: "asuransiId",
          options: AsuransiOptions,
          placeholder: "Masukkan ID Asuransi...",
          colSize: 6,
          rules: { required: "ID Asuransi harus diisi" },
          onMenuScrollToBottom: handleLoadMoreAsuransi,
          isLoading: loadingAsuransi,
        },
      ],
    },
  ];

  const handleSubmitWithApi = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createAsuransiPasien(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        // router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      console.error("Gagal menambahkan asuransi:", error);
      showAlert.error("Gagal menambahkan data asuransi");
    }
  };

  return (
    <Fragment>
      <DynamicStepForm
        title="Pendaftaran Pasien AsuransiPasien"
        formConfig={formFields}
        onSubmit={handleSubmitWithApi}
        backPath="/MasterData/master-asuransi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranAsuransiPasien.displayName = "PendaftaranAsuransiPasien";
export default PendaftaranAsuransiPasien;
