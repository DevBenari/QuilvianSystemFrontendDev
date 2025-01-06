"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataPerjanjian } from "@/utils/dataPerjanjian"; // Data dummy

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPerjanjian); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nama: "",
    dokter: "",
    departemen: "",
    tipePerjanjian: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  });

  // Fungsi untuk menangani pencarian dengan kriteria
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPerjanjian.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kriteria kosong

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          // Filter tanggal dalam range
          const itemDate = new Date(item.tanggal).getTime(); // Konversi ke timestamp
          const startDate = new Date(updatedCriteria.tanggalMulai).getTime();
          const endDate = new Date(updatedCriteria.tanggalSelesai).getTime();
          if (criteriaKey === "tanggalMulai" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai" && endDate) {
            return itemDate <= endDate;
          }
        }

        // Pencarian default (teks)
        return item[criteriaKey]
          ?.toString()
          .toLowerCase()
          .includes(criteriaValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "nama",
          label: "nama Pasien",
          name: "nama",
          placeholder: "Masukkan nama Pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "dokter",
          label: "Dokter",
          name: "dokter",
          placeholder: "Masukkan nama dokter...",
          onChange: (e) => handleSearch("dokter", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "departemen",
          label: "Departemen",
          name: "departemen",
          options: [
            { label: "Pilih Departemen", value: "" },
            { label: "Poli Anak", value: "Poli Anak" },
            { label: "Poli Penyakit Dalam", value: "Poli Penyakit Dalam" },
            { label: "Poli Mata", value: "Poli Mata" },
          ],
          onChange: (e) => handleSearch("departemen", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "tipePerjanjian",
          label: "Tipe Perjanjian",
          name: "tipePerjanjian",
          options: [
            { label: "Pilih Tipe Perjanjian", value: "" },
            { label: "Rawat Jalan", value: "Rawat Jalan" },
            { label: "Rawat Inap", value: "Rawat Inap" },
          ],
          onChange: (e) => handleSearch("tipePerjanjian", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalMulai",
          label: "Tanggal Mulai",
          name: "tanggalMulai",
          placeholder: "Pilih tanggal mulai...",
          onChange: (e) => handleSearch("tanggalMulai", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalSelesai",
          label: "Tanggal Selesai",
          name: "tanggalSelesai",
          placeholder: "Pilih tanggal selesai...",
          onChange: (e) => handleSearch("tanggalSelesai", e.target.value),
          colSize: 6,
        },
      ],
    },
  ];

  const headers = [
    "NO",
    "NO RM",
    "NAMA",
    "NO REGISTRASI",
    "PENJAMIN",
    "TEL REGIS",
    "DOKTER",
    "DEPARTEMEN",
    "USER",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    nomorRekamMedis: item.nomorRekamMedis,
    nama: item.nama,
    no_registrasi: item.no_registrasi,
    penjamin: item.penjamin,
    tel_regis: item.tel_regis,
    dokter: item.dokter,
    departemen: item.departemen,
    user: item.user,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable
        title="Pasien yang telah registrasi"
        formConfig={formFields}
      />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Pasien Perjanjian"
      />
    </FormProvider>
  );
});

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
