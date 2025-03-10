"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataSemuaPerjanjian } from "@/utils/dataPerjanjian";
import { FaClipboardList } from "react-icons/fa"; // Icon untuk Perjanjian Pasien

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataSemuaPerjanjian);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian Pasien"
        headerSubtitle="Manajemen Data Semua Perjanjian Pasien"
        icon={FaClipboardList} // Icon Perjanjian
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredData}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien"
        data={filteredData}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "nama", label: "Nama" },
          { key: "no_registrasi", label: "No Registrasi" },
          { key: "tipe_perjanjian", label: "Tipe Perjanjian" },
          { key: "tanggal_regis", label: "Tanggal Regis" },
          { key: "dokter", label: "Dokter" },
          { key: "departemen", label: "Departemen" },
          { key: "penjamin", label: "Penjamin" },
          { key: "user", label: "User" },
        ]}
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredData.length / 10),
          itemsPerPage: 10,
          onPageChange: () => {}, // Fungsi pagination bisa ditambahkan jika ada backend
        }}
        addButton={
          <ButtonNav
            path="/perjanjian/add-perjanjian"
            label="Buat Janji"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
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

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
