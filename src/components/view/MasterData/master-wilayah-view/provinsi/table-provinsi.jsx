"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchProvinsi,
  fetchProvinsiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import { FaGlobeAsia } from "react-icons/fa"; // Icon untuk Provinsi

const TableDataProvinsi = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: ProvinsiData,
    loading,
    totalPages,
  } = useSelector((state) => state.Provinsi);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchProvinsi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(ProvinsiData) ? ProvinsiData : []);
  }, [ProvinsiData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Provinsi"
        headerSubtitle="Manajemen Daftar Provinsi dalam Master Data"
        icon={FaGlobeAsia} // Icon Provinsi
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchProvinsiWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Provinsi"
        data={filteredData}
        loading={loading} // Mengirim loading ke CustomTableComponent
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeProvinsi", label: "Kode Provinsi" },
          { key: "namaProvinsi", label: "Nama Provinsi" },
        ]}
        basePath="/MasterData/master-wilayah/provinsi/edit-provinsi"
        slugConfig={{
          textField: "namaProvinsi",
          idField: "provinsiId",
        }}
        paginationProps={{
          currentPage: page,
          itemsPerPage: perPage,
          totalPages: totalPages,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-wilayah/provinsi/add-provinsi"
            label="Tambah Provinsi"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataProvinsi;
