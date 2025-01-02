"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTablePerjanjian from "@/components/view/tablePerjanjian/table";
import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const PerjanjianReguler = memo(() => {
  const methods = useForm();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "medicalRecord",
          label: "Medical Record",
          name: "medicalRecord",
          placeholder: "Enter your Medical Record...",
          onChange: (e) => handleFilterChange("medicalRecord", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "name",
          label: "Nama",
          name: "name",
          placeholder: "Enter your Name...",
          onChange: (e) => handleFilterChange("name", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "address",
          label: "Alamat",
          name: "address",
          placeholder: "Enter your Address...",
          onChange: (e) => handleFilterChange("address", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "phoneNumber",
          label: "No. HP",
          name: "phoneNumber",
          placeholder: "Enter your Phone Number...",
          onChange: (e) => handleFilterChange("phoneNumber", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "birthDate",
          label: "Tgl. Lahir",
          name: "birthDate",
          placeholder: "Enter your Birth Date...",
          rules: { required: "Tanggal lahir harus diisi" },
          colSize: 6,
        },
      ],
    },
  ];

  const headers = [
    "NO",
    "URUTAN",
    "NO RM",
    "NAMA",
    "NO REGISTRASI",
    "PENJAMIN",
    "TANGGAL REGIS",
    "DOKTER",
    "DEPARTEMENT",
    "USER",
  ];

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian" formConfig={formFields} />
      <DataTablePerjanjian headers={headers} />
    </FormProvider>
  );
});
PerjanjianReguler.displayName = "PerjanjianReguler";
export default PerjanjianReguler;
