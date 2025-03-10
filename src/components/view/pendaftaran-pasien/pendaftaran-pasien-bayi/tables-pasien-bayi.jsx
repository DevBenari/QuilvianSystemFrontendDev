"use client";

import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBayi } from "@/lib/hooks/admisi/pasienBayi";

import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { FaBaby } from "react-icons/fa"; // Icon untuk Pasien Bayi

const DashboardPendaftaranBayi = memo(() => {
  const { bayi, loading, error } = useBayi();
  const [filteredPatientsBayi, setFilteredPatientsBayi] = useState([]);

  useEffect(() => {
    if (bayi) {
      setFilteredPatientsBayi(bayi);
    }
  }, [bayi]);

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien Bayi"
        headerSubtitle="Manajemen Daftar Pasien Bayi dalam Sistem Pendaftaran"
        icon={FaBaby} // Icon Pasien Bayi
        iconBgColor="bg-info-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-info" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        setFilteredData={setFilteredPatientsBayi}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel Pasien Bayi"
        data={filteredPatientsBayi}
        columns={[
          { key: "no", label: "No" },
          { key: "namaPasienMelahirkan", label: "Nama Pasien Melahirkan" },
          { key: "dokter", label: "Dokter" },
          { key: "kelas", label: "Kelas" },
          { key: "ruang", label: "Ruang" },
        ]}
        paginationProps={{
          currentPage: 1,
          totalPages: Math.ceil(filteredPatientsBayi.length / 8),
          itemsPerPage: 8,
          onPageChange: () => {}, // Fungsi pagination bisa ditambahkan jika ada backend
        }}
        addButton={
          <ButtonNav
            path="/pendaftaran/pendaftaran-pasien-bayi/add-pasien-bayi"
            label="Tambah Pasien Bayi"
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
        loading={
          loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Mengambil data, harap tunggu...</p>
            </div>
          ) : error ? (
            <Alert variant="warning" className="text-center">
              {error}
            </Alert>
          ) : filteredPatientsBayi.length === 0 ? (
            <Alert variant="warning" className="text-center">
              <i className="ri-information-line me-2"></i>
              Tidak ada data yang tersedia.
            </Alert>
          ) : null
        }
      />
    </FormProvider>
  );
});

DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi";
export default DashboardPendaftaranBayi;
