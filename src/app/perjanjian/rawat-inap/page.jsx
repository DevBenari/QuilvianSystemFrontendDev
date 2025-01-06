"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataRawatInap } from "@/utils/dataPerjanjian"; // Pastikan dataRawatInap diimpor dengan benar

const PerjanjianRawatInap = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataRawatInap); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nomorRekamMedis: "",
    nama: "",
    alamat: "",
    kelas: "",
    dokter: "",
    departemen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    penjamin: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataRawatInap.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kosong

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggalInput).getTime();
          const startDate = new Date(updatedCriteria.tanggalMulai).getTime();
          const endDate = new Date(updatedCriteria.tanggalSelesai).getTime();
          if (criteriaKey === "tanggalMulai" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai" && endDate) {
            return itemDate <= endDate;
          }
        }

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
          id: "dokter",
          label: "Nama Dokter",
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
          ],
          onChange: (e) => handleSearch("departemen", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalMulai",
          label: "Tanggal Mulai",
          name: "tanggalMulai",
          placeholder: "DD-MM-YYYY",
          onChange: (e) => handleSearch("tanggalMulai", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalSelesai",
          label: "Tanggal Selesai",
          name: "tanggalSelesai",
          placeholder: "DD-MM-YYYY",
          onChange: (e) => handleSearch("tanggalSelesai", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRekamMedis",
          label: "Medical Record ID",
          name: "nomorRekamMedis",
          placeholder: "Masukkan Medical Record ID...",
          onChange: (e) => handleSearch("nomorRekamMedis", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan Nama Pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "alamat",
          label: "Alamat",
          name: "alamat",
          placeholder: "Masukkan Alamat...",
          onChange: (e) => handleSearch("alamat", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "kelas",
          label: "Kelas",
          name: "kelas",
          options: [
            { label: "Pilih Kelas", value: "" },
            { label: "Kelas 1", value: "Kelas 1" },
            { label: "Kelas 2", value: "Kelas 2" },
            { label: "Kelas 3", value: "Kelas 3" },
          ],
          onChange: (e) => handleSearch("kelas", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "penjamin",
          label: "Penjamin",
          name: "penjamin",
          options: [
            { label: "Pilih Penjamin", value: "" },
            { label: "BPJS", value: "BPJS" },
            { label: "Pribadi", value: "Pribadi" },
          ],
          onChange: (e) => handleSearch("penjamin", e.target.value),
          colSize: 6,
        },
      ],
    },
  ];

  const headers = [
    "NO LIST",
    "NO RM",
    "TANGGAL MASUK",
    "NAMA",
    "DIAGNOSA",
    "DOKTER",
    "KELAS",
    "KONTRAK",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "INFORMASI LAIN",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    nomorRekamMedis: item.nomorRekamMedis,
    tanggalMasuk: item.tanggalMasuk,
    nama: item.nama,
    diagnosis: item.diagnosis,
    dokter: item.dokter,
    kelas: item.kelas,
    kontrak: item.kontrak,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput,
    tanggalEdit: item.tanggalEdit,
    informasiLain: item.informasiLain,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian Rawat Inap" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Pasien Rawat Inap"
      />
    </FormProvider>
  );
});

PerjanjianRawatInap.displayName = "PerjanjianRawatInap";
export default PerjanjianRawatInap;
