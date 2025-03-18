"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchCoveranAsuransi,
  fetchCoveranAsuransiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";
import { FaShieldAlt } from "react-icons/fa"; // Icon untuk Coveran Asuransi
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataCoveranAsuransi = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: CoveranAsuransiData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.CoveranAsuransi);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchCoveranAsuransi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(
      Array.isArray(CoveranAsuransiData) ? CoveranAsuransiData : []
    );
  }, [CoveranAsuransiData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Coveran Asuransi"
        headerSubtitle="Manajemen Daftar Coveran Asuransi dalam Master Data"
        icon={FaShieldAlt} // Icon Coveran Asuransi
        iconBgColor="bg-success-subtle" // Warna background ikon (Hijau lembut)
        iconColor="text-success" // Warna ikon (Hijau)
        // Custom Search Filter
        fetchFunction={fetchCoveranAsuransiWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Coveran Asuransi"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodeCoveranAsuransi", label: "Kode Coveran Asuransi" },
          { key: "namaAsuransi", label: "Nama Asuransi" },
          { key: "serviceCode", label: "Kode Layanan" },
          { key: "serviceDesc", label: "Deskripsi Layanan" },
          { key: "serviceCodeClass", label: "Kode Kelas Layanan" },
          { key: "class", label: "Kelas" },
          { key: "tarif", label: "Tarif" },
          { key: "tglBerlaku", label: "Tanggal Berlaku" },
          { key: "tglBerakhir", label: "Tanggal Berakhir" },
        ]}
        itemsPerPage={10}
        slugConfig={{
          textField: "namaAsuransi",
          idField: "coveranAsuransiId",
        }}
        basePath="/MasterData/master-asuransi/coveran-asuransi/edit-CoveranAsuransi"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-asuransi/coveran-asuransi/add-CoveranAsuransi"
            label="Tambah Coveran Asuransi"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataCoveranAsuransi;
