"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchDokterPoli,
  fetchDokterPoliWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import { FaStethoscope } from "react-icons/fa"; // Icon untuk Dokter Poli

const TableDataDokterPoli = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: DokterPoliData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.DokterPoli);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data dokter poli agar selalu dalam bentuk array
  const DokterPoliList = useMemo(
    () => (Array.isArray(DokterPoliData) ? DokterPoliData : []),
    [DokterPoliData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredDokterPoli, setFilteredDokterPoli] = useState([]);

  useEffect(() => {
    dispatch(fetchDokterPoli({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredDokterPoli(DokterPoliList);
  }, [DokterPoliList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Dokter Poli"
        headerSubtitle="Manajemen Daftar Dokter Poli dalam Master Data"
        icon={FaStethoscope} // Icon Dokter Poli
        iconBgColor="bg-info-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-info" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchDokterPoliWithFilters}
        setFilteredData={setFilteredDokterPoli}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Dokter Poli"
        data={filteredDokterPoli}
        columns={[
          { key: "no", label: "No" }, // Nomor urut
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeDokterPoli", label: "Kode Dokter Poli" },
          { key: "namaDokter", label: "Nama Dokter Poli" },
          { key: "namaPoliklinik", label: "Nama Poliklinik" },
        ]}
        slugConfig={{ textField: "createByName", idField: "dokterPoliId" }} // ID Dokter Poli untuk Slug
        basePath="/MasterData/master-dokter/dokter-poli/edit-DokterPoli"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-dokter/dokter-poli/add-DokterPoli"
            label="Tambah Dokter Poli"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataDokterPoli;
