"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchDokter,
  fetchDokterWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import { FaUserMd } from "react-icons/fa"; // Icon untuk Dokter

const TableDataDokter = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  // 🔹 Ambil data dari Redux store
  const {
    data: DokterData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Dokter);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data dokter agar selalu dalam bentuk array
  const DokterList = useMemo(
    () => (Array.isArray(DokterData) ? DokterData : []),
    [DokterData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredDokter, setFilteredDokter] = useState([]);

  useEffect(() => {
    dispatch(fetchDokter({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredDokter(DokterList);
  }, [DokterList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Dokter"
        headerSubtitle="Manajemen Daftar Dokter dalam Master Data"
        icon={FaUserMd} // Icon Dokter
        iconBgColor="bg-success-subtle" // Warna background ikon (Hijau lembut)
        iconColor="text-success" // Warna ikon (Hijau)
        // Custom Search Filter
        fetchFunction={fetchDokterWithFilters}
        setFilteredData={setFilteredDokter}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Dokter"
        data={filteredDokter}
        loading={loading}
        columns={[
          { key: "no", label: "No" }, // Nomor urut
          { key: "createdDate", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kdDokter", label: "Kode Dokter" },
          { key: "nmDokter", label: "Nama Dokter" },
          { key: "sip", label: "SIP" },
          { key: "str", label: "STR" },
          { key: "tglSip", label: "Tanggal SIP" },
          { key: "tglStr", label: "Tanggal STR" },
          { key: "nik", label: "NIK" },
          {key: "fotoPath", label: "Foto Dokter"},
        ]}
        slugConfig={{ textField: "nmDokter", idField: "dokterId" }} // ID Dokter untuk Slug
        basePath="/MasterData/master-dokter/dokter/edit-dokter-form"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-dokter/dokter/add-dokter"
            label="Tambah Dokter"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataDokter;
