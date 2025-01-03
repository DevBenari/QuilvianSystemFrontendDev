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
          type: "select",
          id: "doctor",
          label: "Nama Dokter",
          name: "doctor",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. X", value: "dr_x" },
            { label: "Dr. Y", value: "dr_y" },
            { label: "Dr. Z", value: "dr_z" },
          ],
          rules: { required: "Dokter harus dipilih" },
          colSize: 6,
          onChange: (e) => handleFilterChange("doctor", e.target.value),
        },
        {
          type: "select",
          id: "department",
          label: "Departemen",
          name: "department",
          placeholder: "Pilih Departemen",
          options: [
            { label: "Departemen A", value: "dept_a" },
            { label: "Departemen B", value: "dept_b" },
            { label: "Departemen C", value: "dept_c" },
          ],
          rules: { required: "Departemen harus dipilih" },
          colSize: 6,
          onChange: (e) => handleFilterChange("department", e.target.value),
        },
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
    {
      section: "Pencarian lebih lanjut",
      fields: [
        {
          type: "text",
          id: "medicalRecord",
          label: "Medical Record",
          name: "medicalRecord",
          placeholder: "Masukkan No. Medical Record",
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
          type: "textarea",
          id: "address",
          label: "Alamat",
          name: "address",
          placeholder: "Masukkan Alamat",
          colSize: 12,
          onChange: (e) => handleFilterChange("address", e.target.value),
        },
        {
          type: "select",
          id: "cancellationDoctor",
          label: "Pembatalan Dokter",
          name: "cancellationDoctor",
          placeholder: "Pilih Pembatalan Dokter",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak", value: "tidak" },
          ],
          colSize: 6,
          onChange: (e) =>
            handleFilterChange("cancellationDoctor", e.target.value),
        },
      ],
    },
  ];

  const headers = [
    "NO. URUT",
    "NO RM",
    "JAM MASUK",
    "NAMA",
    "PENJAMIN",
    "ALAMAT",
    "PEMILIHAN REGISTRASI MELALUI",
    "TELEPON",
    "NOTES",
    "DOKTER",
    "JAM PRAKTIK",
    "DEPARTEMEN",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "KONFIRMASI",
    "FUNGSI",
    "REGISTRASI",
    "HAPUS",
  ];

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian" formConfig={formFields} />
      <DataTablePerjanjian
        headers={headers}
        data={members}
        // onRowDoubleClick={handleRowDoubleClick}
        title="Pasien Rawat Jalan"
      />
    </FormProvider>
  );
});

PerjanjianOdc.displayName = "PerjanjianOdc";
export default PerjanjianOdc;
