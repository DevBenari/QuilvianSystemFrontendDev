"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchJabatan,
  fetchJabatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";
import { FaBriefcase } from "react-icons/fa"; // Icon untuk Jabatan

const TableDataJabatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: jabatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.jabatan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data agar selalu dalam bentuk array
  const jabatanList = useMemo(
    () => (Array.isArray(jabatanData) ? jabatanData : []),
    [jabatanData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredJabatan, setFilteredJabatan] = useState([]);

  useEffect(() => {
    dispatch(fetchJabatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredJabatan(jabatanList);
  }, [jabatanList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Jabatan"
        headerSubtitle="Manajemen Daftar Jabatan dalam Master Data"
        icon={FaBriefcase} // Icon Jabatan
        iconBgColor="bg-warning-subtle" // Warna background ikon
        iconColor="text-warning" // Warna ikon
        // Custom Search Filter
        fetchFunction={fetchJabatanWithFilters}
        setFilteredData={setFilteredJabatan}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Daftar Jabatan"
        data={filteredJabatan}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "namaJabatan", label: "Nama Jabatan" },
        ]}
        slugConfig={{ textField: "namaJabatan", idField: "jabatanId" }} // Menggunakan jabatanId untuk slug
        basePath="/MasterData/master-informasi/jabatan/edit-jabatan"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/jabatan/add-jabatan"
            label="Tambah Jabatan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataJabatan;
