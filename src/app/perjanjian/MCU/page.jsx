"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTablePerjanjian from "@/components/view/perjanjian-pasien/tablePerjanjian/table";
import { dataPasienMCU } from "@/utils/dataPerjanjian";
import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const PerjanjianMCU = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPasienMCU); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: "",
    endDate: "",
    medicalRecord: "",
    name: "",
    address: "",
    paketMCU: "",
    kategoriPenjamin: "",
  });

  // Fungsi untuk menangani pencarian
  const handleFilterChange = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPasienMCU.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kosong

        if (criteriaKey === "startDate" || criteriaKey === "endDate") {
          const itemDate = new Date(item.telJanji).getTime();
          const startDate = new Date(updatedCriteria.startDate).getTime();
          const endDate = new Date(updatedCriteria.endDate).getTime();
          if (criteriaKey === "startDate" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "endDate" && endDate) {
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
          colSize: 6,
          onChange: (e) =>
            handleFilterChange("kategoriPenjamin", e.target.value),
        },
      ],
    },
  ];

  const headers = [
    "NO",
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

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    noRM: item.noRM,
    nama: item.nama,
    alamat: item.alamat,
    telepon: item.telepon,
    telJanji: item.telJanji,
    status: item.status,
    user: item.user,
    userEdit: item.userEdit,
    waktuInput: item.waktuInput,
    waktuEdit: item.waktuEdit,
    fungsi: item.fungsi,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian MCU" formConfig={formFields} />
      <DataTablePerjanjian
        headers={headers}
        data={members}
        title="Pasien MCU"
      />
    </FormProvider>
  );
});

PerjanjianMCU.displayName = "PerjanjianMCU";
export default PerjanjianMCU;
