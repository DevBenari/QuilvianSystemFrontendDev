"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchKelurahan,
  fetchKelurahanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import { FaMapMarkerAlt } from "react-icons/fa"; // Icon untuk Kelurahan

const TableDataKelurahan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: KelurahanData,
    loading,
    totalPages,
  } = useSelector((state) => state.Kelurahan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchKelurahan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(KelurahanData) ? KelurahanData : []);
  }, [KelurahanData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Kelurahan"
        headerSubtitle="Manajemen Daftar Kelurahan dalam Master Data"
        icon={FaMapMarkerAlt} // Icon Kelurahan
        iconBgColor="bg-danger-subtle" // Warna background ikon (Merah lembut)
        iconColor="text-danger" // Warna ikon (Merah)
        // Custom Search Filter
        fetchFunction={fetchKelurahanWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component

        tableTitle="Tabel List Kelurahan"
        data={filteredData}
        loading={loading} // Mengirim loading ke CustomTableComponent
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeKelurahan", label: "Kode Kelurahan" },
          { key: "namaProvinsi", label: "Nama Provinsi" },
          { key: "namaKabupatenKota", label: "Nama Kabupaten / Kota" },
          { key: "namaKecamatan", label: "Nama Kecamatan" },
          { key: "namaKelurahan", label: "Nama Kelurahan" },
        ]}
        basePath="/MasterData/master-wilayah/kelurahan/edit-kelurahan"
        slugConfig={{
          textField: "namaKelurahan",
          idField: "kelurahanId",
        }}
        paginationProps={{
          currentPage: page,
          itemsPerPage: perPage,
          totalPages: totalPages,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-wilayah/kelurahan/add-kelurahan"
            label="Tambah Kelurahan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataKelurahan;
