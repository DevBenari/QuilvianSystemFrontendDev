"use client";
import React, { useState, useEffect } from "react";

import { FaUserInjured } from "react-icons/fa";

import { Button } from "react-bootstrap";
import { fetchPasienWithFilters } from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import ButtonNav from "@/components/ui/button-navigation";
import BaseTableComponent from "@/components/features/CustomTable/custom-table";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const PasienIGDPage = () => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "no", label: "No" },
    { key: "nama", label: "Nama Pasien" },
    { key: "usia", label: "Usia" },
    { key: "jenisKelamin", label: "Jenis Kelamin" },
    { key: "tanggalMasuk", label: "Tanggal Masuk" },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <CustomTableComponent
          //  start header
          headerTitle="Pencarian Pasien IGD"
          headerSubtitle="Sistem Pencarian dan Manajemen Pasien Instalasi Gawat Darurat"
          icon={FaUserInjured} // Menggunakan icon yang bisa diubah
          historyPath="/IGD/riwayat-kunjungan"
          //  end header
          //  custom search filter
          fetchFunction={fetchPasienWithFilters}
          setFilteredData={setFilteredData}
          showSearch={true}
          //  end  custom search filter
          //   Table
          tableTitle="Data Pasien IGD"
          data={filteredData}
          columns={columns}
          slugConfig={{ textField: "nama", idField: "id" }}
          basePath="/IGD/pasien"
          addButton={
            <ButtonNav
              path="/pendaftaran/pendaftaran-pasien-laboratorium/add-pasien-laboratorium"
              label="Tambah Pasien"
              icon="ri-add-fill"
              size="sm"
              variant=""
              className="btn btn-sm iq-bg-success"
            />
            // End Table
          }
        />
      </FormProvider>
    </>
  );
};

export default PasienIGDPage;
