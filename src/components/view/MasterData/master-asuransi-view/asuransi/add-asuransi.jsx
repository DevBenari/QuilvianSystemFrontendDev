"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
const PendaftaranPasienAsuransi = memo(() => {
  const dispatch = useDispatch();
  const formFields = [
    {
      section: "Metadata",
      fields: [
        {
          type: "date",
          label: "Tanggal Pembuatan",
          name: "createDateTime",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dibuat Oleh",
          name: "createBy",
          placeholder: "Masukkan ID Pembuat...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal Pembaruan",
          name: "updateDateTime",
          colSize: 6,
        },
        {
          type: "text",
          label: "Diperbarui Oleh",
          name: "updateBy",
          placeholder: "Masukkan ID Pembaru...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal Penghapusan",
          name: "deleteDateTime",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dihapus Oleh",
          name: "deleteBy",
          placeholder: "Masukkan ID Penghapus...",
          colSize: 6,
        },
        {
          type: "select",
          label: "Status Hapus",
          name: "isDelete",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
        },
      ],
    },
    {
      section: "Informasi Asuransi Pasien",
      fields: [
        {
          type: "text",
          label: "ID Asuransi Pasien",
          name: "asuransiPasienId",
          placeholder: "Masukkan ID Asuransi Pasien...",
          colSize: 6,
        },
        {
          type: "text",
          label: "ID Pasien",
          name: "pasienId",
          placeholder: "Masukkan ID Pasien...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nomor Polis",
          name: "noPolis",
          placeholder: "Masukkan Nomor Polis...",
          colSize: 6,
        },
        {
          type: "text",
          label: "ID Asuransi",
          name: "asuransiId",
          placeholder: "Masukkan ID Asuransi...",
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmitWithApi = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createAsuransi(data)).unwrap();
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
        title="Pendaftaran Pasien Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmitWithApi}
        backPath="/MasterData/master-asuransi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranPasienAsuransi.displayName = "PendaftaranPasienAsuransi";
export default PendaftaranPasienAsuransi;
