"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTablePerjanjian from "@/components/view/tablePerjanjian/table";
import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import useAnggotaState, { createMembers } from "@/lib/hooks/keanggotaan/data";

const PerjanjianOdc = memo(() => {
  const methods = useForm();
  const router = useRouter();
  const { getMembers } = useAnggotaState();
  const members = getMembers();

  const formFields = [
    {
      fields: [
        {
          type: "date",
          id: "startDate",
          label: "Periode Awal",
          name: "startDate",
          placeholder: "Pilih Tanggal Awal",
          colSize: 6,
          onChange: (e) => handleFilterChange("startDate", e.target.value),
        },
        {
          type: "date",
          id: "endDate",
          label: "Periode Akhir",
          name: "endDate",
          placeholder: "Pilih Tanggal Akhir",
          colSize: 6,
          onChange: (e) => handleFilterChange("endDate", e.target.value),
        },
        {
          type: "text",
          id: "medicalRecord",
          label: "No RM",
          name: "medicalRecord",
          placeholder: "Masukkan No RM",
          colSize: 6,
          onChange: (e) => handleFilterChange("medicalRecord", e.target.value),
        },
        {
          type: "text",
          id: "name",
          label: "Nama",
          name: "name",
          placeholder: "Masukkan Nama",
          colSize: 6,
          onChange: (e) => handleFilterChange("name", e.target.value),
        },
        {
          type: "text",
          id: "address",
          label: "Alamat",
          name: "address",
          placeholder: "Masukkan Alamat",
          colSize: 6,
          onChange: (e) => handleFilterChange("address", e.target.value),
        },
        {
          type: "select",
          id: "paketMCU",
          label: "Paket MCU",
          name: "paketMCU",
          placeholder: "Pilih Paket MCU",
          options: [
            { label: "Paket A", value: "paket_a" },
            { label: "Paket B", value: "paket_b" },
            { label: "Paket C", value: "paket_c" },
          ],
          colSize: 6,
          onChange: (e) => handleFilterChange("paketMCU", e.target.value),
        },
        {
          type: "select",
          id: "kategoriPenjamin",
          label: "Kategori Penjamin",
          name: "kategoriPenjamin",
          placeholder: "Pilih Kategori Penjamin",
          options: [
            { label: "Pribadi", value: "pribadi" },
            { label: "Penjamin/Asuransi", value: "asuransi" },
          ],
          rules: { required: "Kategori Penjamin harus dipilih" },
          colSize: 6,
          onChange: (e) =>
            handleFilterChange("kategoriPenjamin", e.target.value),
        },
      ],
    },
  ];

  const headers = [
    "NO. RM",
    "NAMA",
    "ALAMAT",
    "TELEPON",
    "TEL_JANJI",
    "STATUS",
    "USER",
    "USER EDIT",
    "WAKTU INPUT",
    "WAKTU EDIT",
    "FUNGSI",
  ];

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian" formConfig={formFields} />
      <DataTablePerjanjian
        headers={headers}
        data={members}
        // onRowDoubleClick={handleRowDoubleClick}
        title="Pasien MCU"
      />
    </FormProvider>
  );
});

PerjanjianOdc.displayName = "PerjanjianOdc";
export default PerjanjianOdc;
