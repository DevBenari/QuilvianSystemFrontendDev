"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchKategoriPeralatan,
  fetchKategoriPeralatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";
import { FaTools } from "react-icons/fa"; // Icon untuk Kategori Peralatan

const TableDataKategoriPeralatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredKategoriPeralatan, setFilteredKategoriPeralatan] = useState(
    []
  );

  // 🔹 Ambil data dari Redux store
  const {
    data: KategoriPeralatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.KategoriPeralatan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 Pastikan data selalu berupa array

  const KategoriPeralatanList = useMemo(
    () => (Array.isArray(KategoriPeralatanData) ? KategoriPeralatanData : []),
    [KategoriPeralatanData]
  );

  useEffect(() => {
    dispatch(fetchKategoriPeralatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredKategoriPeralatan(KategoriPeralatanList);
  }, [KategoriPeralatanList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Kategori Peralatan"
        headerSubtitle="Manajemen Daftar Kategori Peralatan dalam Master Data"
        icon={FaTools} // Icon Kategori Peralatan
        iconBgColor="bg-danger-subtle" // Warna background ikon (Merah lembut)
        iconColor="text-danger" // Warna ikon (Merah)
        // Custom Search Filter
        fetchFunction={fetchKategoriPeralatanWithFilters}
        setFilteredData={setFilteredKategoriPeralatan}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Kategori Peralatan"
        data={filteredKategoriPeralatan}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodeKategoriPeralatan", label: "Kode Kategori Peralatan" },
          { key: "namaKategoriPeralatan", label: "Nama Kategori Peralatan" },
        ]}
        slugConfig={{
          textField: "namaKategoriPeralatan",
          idField: "kategoriPeralatanId",
        }}
        basePath="/MasterData/master-kategori-peralatan/kategori-peralatan/edit-kategori-peralatan"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-kategori-peralatan/kategori-peralatan/add-kategori-peralatan"
            label="Tambah Kategori Peralatan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataKategoriPeralatan;
