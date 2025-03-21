"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";

import { FaMapMarkerAlt } from "react-icons/fa"; // Icon untuk KodePos
import {
  fetchKodePos,
  fetchKodePosWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kodePosSlice";
import { FaMailBulk } from "react-icons/fa";
const TableDataKodePos = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: KodePosData,
    loading,
    totalPages,
  } = useSelector((state) => state.KodePos);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchKodePos({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(KodePosData) ? KodePosData : []);
  }, [KodePosData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Kode Pos"
        headerSubtitle="Manajemen Daftar Kode Pos dalam Master Data"
        icon={FaMailBulk} // Icon KodePos
        iconBgColor="bg-danger-subtle" // Warna background ikon (Merah lembut)
        iconColor="text-danger" // Warna ikon (Merah)
        // Custom Search Filter
        fetchFunction={fetchKodePosWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component

        tableTitle="Tabel List Kode Pos"
        data={filteredData}
        loading={loading} // Mengirim loading ke CustomTableComponent
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "uniqueKodePos", label: "Kode KodePos" },
          { key: "namaProvinsi", label: "Nama Provinsi" },
          { key: "namaKabupatenKota", label: "Nama Kabupaten / Kota" },
          { key: "namaKecamatan", label: "Nama Kecamatan" },
          { key: "namaKelurahan", label: "Nama Kelurahan" },
          { key: "namaKodePos", label: "Nama KodePos" },
        ]}
        basePath="/MasterData/master-wilayah/kode-pos/edit-kode-pos"
        slugConfig={{
          textField: "namaKodePos",
          idField: "kodePosId",
        }}
        paginationProps={{
          currentPage: page,
          itemsPerPage: perPage,
          totalPages: totalPages,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-wilayah/kode-pos/add-kode-pos"
            label="Tambah Kode Pos"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataKodePos;
