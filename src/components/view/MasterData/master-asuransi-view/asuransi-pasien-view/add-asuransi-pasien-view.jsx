"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAsuransiPasien } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";
import useAsuransiData from "@/lib/hooks/useAsuransi";
import usePasienData from "@/lib/hooks/usePasien";

const PendaftaranAsuransiPasien = memo(() => {
  const dispatch = useDispatch();

  const { AsuransiOptions, handleLoadMoreAsuransi } = useAsuransiData();
  const { PasienOptions, handleLoadMorePasien } = usePasienData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: " Asuransi Pasien",
          name: "asuransiPasienId",
          options: AsuransiOptions,
          placeholder: "Masukkan  Asuransi Pasien...",
          colSize: 6,
          rules: { required: " Asuransi Pasien harus diisi" },
          onMenuScrollToBottom: handleLoadMoreAsuransi,
        },
        {
          type: "select",
          label: "Nama Pasien",
          name: "pasienId",
          placeholder: "Masukkan Nama Pasien...",
          colSize: 6,
          options: PasienOptions,
          rules: { required: "Nama Pasien harus diisi" },
          onMenuScrollToBottom: handleLoadMorePasien,
        },

        {
          type: "text",
          label: "Nomor Polis",
          name: "noPolis",
          placeholder: "Masukkan Nomor Polis...",
          colSize: 6,
          rules: { required: "Nomor Polis harus diisi" },
        },
      ],
    },
  ];

  const handleSubmitWithApi = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createAsuransiPasien(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien"
        );
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
        backPath="/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranAsuransiPasien.displayName = "PendaftaranAsuransiPasien";
export default PendaftaranAsuransiPasien;
