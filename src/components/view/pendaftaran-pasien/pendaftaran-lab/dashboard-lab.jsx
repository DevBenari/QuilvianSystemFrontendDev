"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { daftarPasien } from "@/utils/config";
import { FaUserInjured } from "react-icons/fa"; // Icon untuk Pasien Lab

const DashboardAdmisiLab = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(daftarPasien);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien Lab"
        headerSubtitle="Manajemen Daftar Pasien Laboratorium"
        icon={FaUserInjured} // Icon Pasien
        iconBgColor="bg-danger-subtle" // Warna background ikon (Merah lembut)
        iconColor="text-danger" // Warna ikon (Merah)
        // 🔹 Custom Search Filter

        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien"
        data={daftarPasien}
        columns={[
          { key: "id", label: "ID" },
          { key: "noRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "namaPasien", label: "Nama Pasien" },
          { key: "jenisKelamin", label: "Jenis Kelamin" },
          { key: "umur", label: "Umur" },
        ]}
        slugConfig={{
          textField: "namaPasien",
          idField: "id",
        }}
        basePath="/pendaftaran/pendaftaran-pasien-laboratorium/edit-pasien-lab"
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredPatients.length / 10),
          itemsPerPage: 10,
          onPageChange: () => {}, // Fungsi pagination bisa ditambahkan jika ada backend
        }}
        addButton={
          <ButtonNav
            path="/pendaftaran/pendaftaran-pasien-laboratorium/add-pasien-laboratorium"
            label="Tambah Pasien"
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

export default DashboardAdmisiLab;
