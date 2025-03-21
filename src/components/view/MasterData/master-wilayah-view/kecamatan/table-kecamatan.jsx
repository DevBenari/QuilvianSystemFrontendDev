"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchKecamatan,
  fetchKecamatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import { FaMapMarkedAlt } from "react-icons/fa"; // Icon untuk Kecamatan
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataKecamatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: KecamatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Kecamatan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchKecamatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(KecamatanData) ? KecamatanData : []);
  }, [KecamatanData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Kecamatan"
        headerSubtitle="Manajemen Daftar Kecamatan dalam Master Data"
        icon={FaMapMarkedAlt} // Icon Kecamatan
        iconBgColor="bg-warning-subtle" // Warna background ikon (Kuning lembut)
        iconColor="text-warning" // Warna ikon (Kuning)
        // Custom Search Filter
        fetchFunction={fetchKecamatanWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        loading={loading}
        tableTitle="Tabel List Kecamatan"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeKecamatan", label: "Kode Kecamatan" },
          { key: "namaKecamatan", label: "Nama Kecamatan" },
          { key: "namaKabupatenKota", label: "Nama Kabupaten / Kota" },
          { key: "namaProvinsi", label: "Nama Provinsi" },
        ]}
        basePath="/MasterData/master-wilayah/kecamatan/edit-kecamatan"
        slugConfig={{
          textField: "namaKecamatan",
          idField: "kecamatanId",
        }}
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-wilayah/kecamatan/add-kecamatan"
            label="Tambah Kecamatan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataKecamatan;
