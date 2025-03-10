"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";
import ButtonNav from "@/components/ui/button-navigation";
import { dataODC } from "@/utils/dataPerjanjian";
import { FaClinicMedical } from "react-icons/fa"; // Icon untuk Perjanjian ODC

const DashboardPerjanjianOdc = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(dataODC);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Perjanjian ODC"
        headerSubtitle="Manajemen Perjanjian Pasien dalam Layanan ODC"
        icon={FaClinicMedical} // Icon ODC
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien ODC"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama Pasien" },
          { key: "alamat", label: "Alamat" },
          { key: "departemen", label: "Poli" },
          { key: "dokter", label: "Dokter" },
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

export default DashboardPerjanjianOdc;
