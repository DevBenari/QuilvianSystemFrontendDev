"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { pasienLama } from "@/utils/dataPasien";
import { FaUserClock } from "react-icons/fa"; // Icon untuk Pasien Lama

const PasienLama = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(pasienLama);

  // 🔹 Sinkronisasi data awal saat komponen pertama kali dimuat
  useEffect(() => {
    setFilteredData(pasienLama);
  }, []);

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Pencarian Pasien Lama" />

      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien Lama"
        headerSubtitle="Manajemen Daftar Pasien Lama"
        icon={FaUserClock} // Icon Pasien Lama
        iconBgColor="bg-warning-subtle" // Warna background ikon (Kuning lembut)
        iconColor="text-warning" // Warna ikon (Kuning)
        // 🔹 Custom Search Filter

        setFilteredData={setFilteredData}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Pasien Lama"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "noRm", label: "No RM" },
          { key: "oldRm", label: "Old RM" },
          { key: "nama", label: "Nama" },
          { key: "alamat", label: "Alamat" },
          { key: "tempatTanggalLahir", label: "Tempat Tanggal Lahir" },
        ]}
        slugConfig={{
          textField: "nama",
          idField: "id",
        }}
        basePath="/pendaftaran/pasien-lama/edit-pasien-lama"
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredData.length / 5),
          itemsPerPage: 5,
          onPageChange: () => {}, // Fungsi pagination bisa ditambahkan jika ada backend
        }}
        addButton={null} // Jika tidak ada tombol tambah pasien, bisa dikosongkan
        additionalButtons={
          <button
            className="btn btn-dark btn-sm mx-2"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i> Refresh
          </button>
        }
      />
    </FormProvider>
  );
});

PasienLama.displayName = "PasienLama";
export default PasienLama;
