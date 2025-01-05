"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTablePerjanjian from "@/components/view/perjanjian-pasien/tablePerjanjian/table";
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
          id: "roomType",
          label: "Kelas/Type Kamar",
          name: "roomType",
          placeholder: "Pilih Kelas/Type Kamar",
          options: [
            { label: "VIP", value: "vip" },
            { label: "Kelas 1", value: "kelas_1" },
            { label: "Kelas 2", value: "kelas_2" },
            { label: "Kelas 3", value: "kelas_3" },
          ],
          colSize: 6,
          onChange: (e) => handleFilterChange("roomType", e.target.value),
        },
      ],
    },
  ];

  const headers = [
    "NO. RM",
    "TANGGAL (JANJI)",
    "NAMA",
    "TELEPON",
    "DOKTER",
    "KONFIRMASI",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "FUNGSI",
  ];

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian" formConfig={formFields} />
      <DataTablePerjanjian
        headers={headers}
        data={members}
        // onRowDoubleClick={handleRowDoubleClick}
        title="Pasien Radiologi"
      />
    </FormProvider>
  );
});

PerjanjianOdc.displayName = "PerjanjianOdc";
export default PerjanjianOdc;
