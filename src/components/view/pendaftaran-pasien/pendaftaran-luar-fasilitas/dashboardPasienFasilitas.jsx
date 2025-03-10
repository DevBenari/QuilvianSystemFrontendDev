"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { daftarPasien } from "@/utils/config";
import { FaProcedures } from "react-icons/fa"; // Icon untuk Pasien Luar Fasilitas

const DashboardAdmisiFasilitas = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(daftarPasien);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien Luar Fasilitas"
        headerSubtitle="Manajemen Daftar Pasien dari Fasilitas Eksternal"
        icon={FaProcedures} // Icon Pasien Luar Fasilitas
        iconBgColor="bg-secondary-subtle" // Warna background ikon (Abu-abu lembut)
        iconColor="text-secondary" // Warna ikon (Abu-abu)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatients}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Pasien Luar Fasilitas"
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
            path="/pendaftaran/pendaftaran-pasien-fasilitas/add-pendaftaran-fasilitas"
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

export default DashboardAdmisiFasilitas;
