"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import useAsuransiData from "@/lib/hooks/useAsuransi";
import useMedicalData from "@/lib/hooks/useDokter";

import { createDokterAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/DokterAsuransiSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddFormDokterAsuransi = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm();

  const { DokterOptions, handleLoadMoreDokter } = useMedicalData();

  const { AsuransiOptions, handleLoadMoreAsuransi } = useAsuransiData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Pilih Dokter",
          name: "dokterId",
          options: DokterOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDokter,
          rules: { required: "Dokter harus dipilih" },
        },
        {
          type: "select",
          label: "Asuransi",
          name: "asuransiId",
          options: AsuransiOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreAsuransi,
          rules: { required: "Asuransi harus dipilih" },
        },
      ],
    },
  ];

  // Di form component

  const handleSubmit = async (data) => {
    try {
      await dispatch(createDokterAsuransi(data)).unwrap();
      showAlert.success("Data dokter berhasil ditambahkan!", () => {
        router.push(
          "/MasterData/master-dokter/dokter-asuransi/table-dokter-asuransi"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan dokter:", error);
      showAlert.error("Gagal menambahkan data dokter.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Fragment>
        <DynamicForm
          title="Tambah Data Dokter Asuransi"
          formConfig={formFields}
          onSubmit={handleSubmit}
          backPath="/MasterData/master-dokter/dokter-asuransi/table-dokter-asuransi"
          isAddMode={true}
        />
      </Fragment>
    </FormProvider>
  );
};

export default AddFormDokterAsuransi;
