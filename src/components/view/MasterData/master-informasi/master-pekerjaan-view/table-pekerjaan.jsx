"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchPekerjaan,
  fetchPekerjaanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import { FaBriefcase } from "react-icons/fa"; // Icon untuk Pekerjaan

const TableDataPekerjaan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: pekerjaanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pekerjaan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data pekerjaan agar selalu dalam bentuk array
  const pekerjaanList = useMemo(
    () => (Array.isArray(pekerjaanData) ? pekerjaanData : []),
    [pekerjaanData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredPekerjaan, setFilteredPekerjaan] = useState([]);

  useEffect(() => {
    dispatch(fetchPekerjaan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredPekerjaan(pekerjaanList);
  }, [pekerjaanList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Pekerjaan"
        headerSubtitle="Manajemen Daftar Pekerjaan dalam Master Data"
        icon={FaBriefcase} // Icon Pekerjaan
        // Custom Search Filter
        fetchFunction={fetchPekerjaanWithFilters}
        setFilteredData={setFilteredPekerjaan}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Daftar Pekerjaan"
        data={filteredPekerjaan}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodePekerjaan", label: "Kode Pekerjaan" },
          { key: "namaPekerjaan", label: "Nama Pekerjaan" },
        ]}
        slugConfig={{
          textField: "namaPekerjaan",
          idField: "pekerjaanId",
        }}
        basePath="/MasterData/master-informasi/master-pekerjaan/edit-pekerjaan-form"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/master-pekerjaan/add-pekerjaan"
            label="Tambah Pekerjaan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataPekerjaan;
