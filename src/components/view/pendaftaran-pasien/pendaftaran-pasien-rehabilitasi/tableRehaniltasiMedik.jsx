"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { daftarPasien } from "@/utils/config";
import { FaHandHoldingMedical } from "react-icons/fa"; // Icon untuk Rehabilitasi Medik

const DashBoardAdmisiRehabilitasiMedik = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(daftarPasien);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien Rehabilitasi Medik"
        headerSubtitle="Manajemen Daftar Pasien dalam Layanan Rehabilitasi Medik"
        icon={FaHandHoldingMedical} // Icon Rehabilitasi Medik
        iconBgColor="bg-success-subtle" // Warna background ikon (Hijau lembut)
        iconColor="text-success" // Warna ikon (Hijau)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Perjanjian Pasien Rehabilitasi Medik"
        data={filteredPatients}
        columns={[
          { key: "id", label: "ID" },
          { key: "nomorRekamMedis", label: "No Rekam Medis" },
          { key: "date", label: "Tanggal" },
          { key: "nama", label: "Nama Pasien" },
          { key: "jenisKelamin", label: "Jenis Kelamin" },
          { key: "umur", label: "Umur" },
        ]}
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredPatients.length / 10),
          itemsPerPage: 10,
          onPageChange: () => {}, // Fungsi pagination bisa ditambahkan jika ada backend
        }}
        addButton={
          <ButtonNav
            path="/pendaftaran/pendaftaran-pasien-rehabilitasi/add-rehabilitasi-medik"
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

export default DashBoardAdmisiRehabilitasiMedik;
