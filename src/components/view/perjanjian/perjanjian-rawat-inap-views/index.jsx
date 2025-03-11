"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataRawatInap } from "@/utils/dataPerjanjian";
import { FaBed } from "react-icons/fa"; // Icon untuk Perjanjian Rawat Inap

const DashboardPerjanjianRawatInap = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(dataRawatInap);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian Rawat Inap"
        headerSubtitle="Manajemen Perjanjian Pasien untuk Rawat Inap"
        icon={FaBed} // Icon Rawat Inap
        iconBgColor="bg-secondary-subtle" // Warna background ikon (Abu-abu lembut)
        iconColor="text-secondary" // Warna ikon (Abu-abu)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien Rawat Inap"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama" },
          { key: "dokter", label: "Dokter" },
          { key: "ruangan", label: "Ruangan" },
          { key: "kelas", label: "Kelas" },
          { key: "diagnosis", label: "Diagnosa" },
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

export default DashboardPerjanjianRawatInap;
