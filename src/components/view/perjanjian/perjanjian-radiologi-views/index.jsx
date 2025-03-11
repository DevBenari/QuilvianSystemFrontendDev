"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataPasienRadiologi } from "@/utils/dataPerjanjian";
import { FaXRay } from "react-icons/fa"; // Icon untuk Perjanjian Radiologi

const DashboardPerjanjianRadiologi = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(dataPasienRadiologi);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian Radiologi"
        headerSubtitle="Manajemen Perjanjian Pasien yang Akan Menjalani Pemeriksaan Radiologi"
        icon={FaXRay} // Icon Radiologi
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien Radiologi"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama Pasien" },
          { key: "dokter", label: "Dokter" },
          { key: "penjamin", label: "Penjamin" },
          { key: "telepon", label: "No Telp" },
        ]}
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredPatients.length / 10),
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
};

export default DashboardPerjanjianRadiologi;
