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
          type: "text",
          id: "medicalRecord",
          label: "Nomor RM",
          name: "medicalRecord",
          placeholder: "Masukkan Nomor RM",
          colSize: 6,
          onChange: (e) => handleFilterChange("medicalRecord", e.target.value),
        },
        {
          type: "text",
          id: "patientName",
          label: "Nama Pasien",
          name: "patientName",
          placeholder: "Masukkan Nama Pasien",
          colSize: 6,
          onChange: (e) => handleFilterChange("patientName", e.target.value),
        },
        {
          type: "select",
          id: "registrationStatus",
          label: "Status Registrasi",
          name: "registrationStatus",
          placeholder: "Pilih Status Registrasi",
          options: [
            { label: "All", value: "all" },
            { label: "Sudah Registrasi", value: "sudah" },
            { label: "Belum Registrasi", value: "belum" },
          ],
          colSize: 6,
          onChange: (e) =>
            handleFilterChange("registrationStatus", e.target.value),
        },
        {
          type: "select",
          id: "operationRoom",
          label: "Ruang Operasi",
          name: "operationRoom",
          placeholder: "Pilih Ruang Operasi",
          options: [
            { label: "Ruang Operasi 1", value: "ruang_1" },
            { label: "Ruang Operasi 2", value: "ruang_2" },
            { label: "Ruang Operasi 3", value: "ruang_3" },
          ],
          colSize: 6,
          onChange: (e) => handleFilterChange("operationRoom", e.target.value),
        },
      ],
    },
  ];

  const headers = [
    "NO",
    "KLASIFIKASI",
    "NO REGISTRASI",
    "TANGGAL OPERASI",
    "RUANG OPERASI",
    "PASIEN",
    "NO RM",
    "NIK",
    "KELAS",
    "DIAGNOSA",
    "TINDAKAN",
    "KETERANGAN",
    "OPERATOR",
    "TIPE ANESTESI",
    "JAM AWAL",
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
        title="Pasien Operasi"
      />
    </FormProvider>
  );
});

PerjanjianOdc.displayName = "PerjanjianOdc";
export default PerjanjianOdc;
