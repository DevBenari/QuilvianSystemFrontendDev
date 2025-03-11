"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataRawatJalan } from "@/utils/dataPerjanjian";
import { FaUserMd } from "react-icons/fa"; // Icon untuk Perjanjian Rawat Jalan

const DashboardPerjanjianRawatJalan = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(dataRawatJalan);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian Rawat Jalan"
        headerSubtitle="Manajemen Perjanjian Pasien untuk Rawat Jalan"
        icon={FaUserMd} // Icon Rawat Jalan
        iconBgColor="bg-info-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-info" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien Rawat Jalan"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama" },
          { key: "alamat", label: "Alamat" },
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

export default DashboardPerjanjianRawatJalan;
