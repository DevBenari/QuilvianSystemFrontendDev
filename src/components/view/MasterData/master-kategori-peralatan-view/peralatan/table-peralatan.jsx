"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchPeralatan,
  fetchPeralatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/PeralatanSlice";
import { FaWrench } from "react-icons/fa"; // Icon untuk Peralatan

const TableDataPeralatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: PeralatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Peralatan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchPeralatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(PeralatanData) ? PeralatanData : []);
  }, [PeralatanData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Peralatan"
        headerSubtitle="Manajemen Daftar Peralatan dalam Master Data"
        icon={FaWrench} // Icon Peralatan
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchPeralatanWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Peralatan"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodePeralatan", label: "Kode Peralatan" },
          { key: "namaPeralatan", label: "Nama Peralatan" },
          { key: "manufacturer", label: "Manufacturer" },
          { key: "purchase_date", label: "Tanggal Pembelian" },
          { key: "maintenance_status", label: "Status Pemeliharaan" },
          { key: "operational_status", label: "Status Operasional" },
          { key: "department_name", label: "Nama Departemen" },
          { key: "location", label: "Lokasi" },
        ]}
        slugConfig={{
          textField: "namaPeralatan",
          idField: "peralatanId",
        }}
        basePath="/MasterData/master-kategori-peralatan/peralatan/edit-peralatan"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-kategori-peralatan/peralatan/add-peralatan"
            label="Tambah Peralatan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataPeralatan;
