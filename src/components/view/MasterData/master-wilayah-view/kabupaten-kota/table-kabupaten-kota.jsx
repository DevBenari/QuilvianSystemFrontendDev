"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchKabupatenKota,
  fetchKabupatenKotaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import { FaCity } from "react-icons/fa";

const TableDataKabupatenKota = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: KabupatenKotaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.KabupatenKota);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchKabupatenKota({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(KabupatenKotaData) ? KabupatenKotaData : []);
  }, [KabupatenKotaData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Kabupaten/Kota"
        headerSubtitle="Manajemen Daftar Kabupaten/Kota dalam Master Data"
        icon={FaCity} // Icon Kabupaten/Kota
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchKabupatenKotaWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        loading={loading}
        // Table Component
        tableTitle="Tabel List Kabupaten/Kota"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeKabupatenKota", label: "Kode Kabupaten/Kota" },
          { key: "namaKabupatenKota", label: "Kabupaten/Kota" },
          { key: "namaProvinsi", label: "Provinsi" },
        ]}
        basePath="/MasterData/master-wilayah/kabupaten-kota/edit-kabupaten-kota"
        slugConfig={{
          textField: "namaKabupatenKota",
          idField: "kabupatenKotaId",
        }}
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-wilayah/kabupaten-kota/add-kabupaten-kota"
            label="Tambah Kabupaten/Kota"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataKabupatenKota;
