"use client";
import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/custom-table/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamic-form/dynamicFormTable/dynamicFormTable";

import { useRouter } from "next/navigation";
import { pasienLama } from "@/utils/dataPasien";

const PasienLama = () => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(pasienLama); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    noRm: "",
    alamat: "",
    tempatTanggalLahir: "",
  });

  const router = useRouter();
  //   const handleAdd = () => {
  //     router.push("/perjanjian/perjanjian-reguler/add-perjanjian-reguler");
  //   };

  // Fungsi untuk menangani pencarian dengan kriteria
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = pasienLama.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kriteria kosong

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggal_lahir).getTime(); // Gunakan `tanggal_lahir` sebagai referensi
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
          id: "nomorRekamMedis",
          label: "Medical Record ID",
          name: "nomorRekamMedis",
          placeholder: "Masukkan Medical Record ID...",
          onChange: (e) => handleSearch("noRm", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nama",
          label: "Nama",
          name: "nama",
          placeholder: "Masukkan nama pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "alamat",
          label: "Alamat",
          name: "alamat",
          placeholder: "Masukkan alamat pasien...",
          onChange: (e) => handleSearch("alamat", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "text",
        //   id: "nomorTelepon",
        //   label: "No. HP",
        //   name: "nomorTelepon",
        //   placeholder: "Masukkan nomor HP pasien...",
        //   onChange: (e) => handleSearch("nomorTelepon", e.target.value),
        //   colSize: 6,
        // },
        {
          type: "date",
          id: "tanggal_lahir",
          label: "Tgl. Lahir",
          name: "tanggal_lahir",
          placeholder: "Masukkan tanggal lahir pasien...",
          onChange: (e) => handleSearch("tanggal_lahir", e.target.value),
          colSize: 6,
        },
      ],
    },
  ];

  const headers = [
    "NO",
    "NO RM",
    "OLD RM",
    "NAMA",
    "ALAMAT",
    "TEMPAT TANGGAL LAHIR",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    noRm: item.noRm,
    oldRm: item.oldRm,
    nama: item.nama,
    alamat: item.alamat,
    tempatTanggalLahir: item.tempatTanggalLahir,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian Pasien Lama" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="Pasien Lama"
        // onAdd={handleAdd}
      />
    </FormProvider>
  );
};

export default PasienLama;
