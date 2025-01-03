"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTablePerjanjian from "@/components/view/tablePerjanjian/table";
import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import useAnggotaState, { createMembers } from "@/lib/hooks/keanggotaan/data";

const PerjanjianReguler = memo(() => {
  const methods = useForm();
  const router = useRouter();
  const { getMembers } = useAnggotaState();
  const members = getMembers();

  // Fungsi untuk menangani filter pencarian pasien
  const handleFilterChange = (fieldName, value) => {
    console.log(`Filter changed: ${fieldName} -> ${value}`);
    // Tambahkan logika filter di sini jika data berasal dari API
  };

  // Fungsi untuk menangani double click pada baris tabel
  const handleRowDoubleClick = (patient) => {
    setSelectedPatient(patient);
    console.log("Detail pasien:", patient);
    // Tambahkan logika untuk menampilkan data detail atau mengarah ke form berikutnya
  };

  // Fungsi untuk menangani pasien baru
  const handleAdd = () =>
    router.push("/perjanjian/perjanjian-reguler/add-perjanjian-reguler");

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
      <DataTablePerjanjian
        headers={headers}
        data={members}
        // onRowDoubleClick={handleRowDoubleClick}
        title="Daftar Pasien"
        onAdd={handleAdd}
      />
    </FormProvider>
  );
});

PerjanjianReguler.displayName = "PerjanjianReguler";
export default PerjanjianReguler;
