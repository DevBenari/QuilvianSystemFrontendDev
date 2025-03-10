"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataReservasi } from "@/utils/dataPerjanjian";
import { FaCalendarCheck } from "react-icons/fa"; // Icon untuk Perjanjian Reguler

const DashboardPerjanjianReguler = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(dataReservasi);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian Reguler"
        headerSubtitle="Manajemen Perjanjian Pasien Reguler"
        icon={FaCalendarCheck} // Icon Perjanjian Reguler
        iconBgColor="bg-warning-subtle" // Warna background ikon (Kuning lembut)
        iconColor="text-warning" // Warna ikon (Kuning)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien Reguler"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama" },
          { key: "alamat", label: "Alamat" },
          { key: "tanggal_lahir", label: "Tanggal Lahir" },
          { key: "penjamin", label: "Penjamin" },
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

export default DashboardPerjanjianReguler;
