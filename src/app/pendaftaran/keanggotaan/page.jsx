"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { useAnggota } from "@/lib/hooks/keanggotaan";
import { useRouter } from "next/navigation";

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const { anggota, loading, error } = useAnggota();
  const [filteredAnggota, setFilteredAnggota] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    nama: "",
    nomorRm: "",
    jenis: "",
    status: "",
    tanggalStart: "", // Menambahkan filter untuk tanggal
  });

  // Sinkronisasi data awal saat `anggota` berubah
  useEffect(() => {
    setFilteredAnggota(anggota);
    console.log("Data API diterima:", anggota); // Debugging: Data API
  }, [anggota]);

  // Fungsi untuk menangani pencarian dengan kriteria
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    console.log("Kriteria pencarian diperbarui:", updatedCriteria); // Debugging: Kriteria pencarian

    const filtered = anggota.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kriteria kosong

        if (criteriaKey === "tanggalStart") {
          // Debugging: Memeriksa format tanggal
          console.log("Memeriksa tanggal:", {
            itemDate: item[criteriaKey],
            criteriaValue,
          });

          // Parsing dan membandingkan tanggal
          const itemDate = item[criteriaKey]
            ? new Date(item[criteriaKey]).toISOString().split("T")[0]
            : ""; // Format ke YYYY-MM-DD atau kosong
          return itemDate === criteriaValue; // Membandingkan dengan input
        }

        // Pencarian default (teks)
        return item[criteriaKey]
          ?.toString()
          .toLowerCase()
          .includes(criteriaValue.toLowerCase());
      });
    });

    console.log("Data setelah difilter:", filtered); // Debugging: Data yang telah difilter
    setFilteredAnggota(filtered);
  };

  const router = useRouter();

  const handleAdd = () => {
    router.push("/pendaftaran/keanggotaan/addAnggota");
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "nama",
          label: "Cari Nama Anggota",
          name: "nama",
          placeholder: "Masukkan nama anggota...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRm",
          label: "No Rekam Medis",
          name: "nomorRm",
          placeholder: "Masukkan nomor rekam medis...",
          onChange: (e) => handleSearch("nomorRm", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "jenis",
          label: "Jenis",
          name: "jenis",
          placeholder: "Pilih Jenis",
          options: [
            { label: "VIP Member dengan UP", value: "VIP Member dengan UP" },
            { label: "VIP Member B", value: "VIP Member B" },
            { label: "VIP BKM Tanpa UP", value: "VIP BKM Tanpa UP" },
            { label: "Telemedicine", value: "Telemedicine" },
          ],
          onChange: (e) => handleSearch("jenis", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "status",
          label: "Status",
          name: "status",
          placeholder: "Pilih Status",
          options: [
            { label: "Aktif", value: "aktif" },
            { label: "Non-Aktif", value: "non-aktif" },
          ],
          onChange: (e) => handleSearch("status", e.target.value),
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalStart",
          label: "Tanggal Start",
          name: "tanggalStart",
          placeholder: "Masukkan tanggal start...",
          onChange: (e) => handleSearch("tanggalStart", e.target.value), // Mencari berdasarkan tanggal
          colSize: 6,
        },
      ],
    },
  ];

  const headers = ["NO", "NAMA", "NO RM", "TANGGAL START", "JENIS", "STATUS"];

  // Format data untuk ditampilkan di tabel
  const members = filteredAnggota.map((anggota, index) => ({
    no: index + 1,
    nama: anggota.nama,
    nomorRm: anggota.nomorRm,
    tanggalStart: anggota.tanggalStart,
    jenis: anggota.jenis,
    status: anggota.status,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Anggota" formConfig={formFields} />

      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <DataTable
          headers={headers}
          data={members}
          id="id"
          onAdd={handleAdd}
          rowsPerPage={3}
          title="Anggota"
        />
      )}
    </FormProvider>
  );
});

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
