"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGolongan,
  fetchGolonganDarahWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { FaTint } from "react-icons/fa"; // Icon untuk golongan darah

const TableDataGolongan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: golonganData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.golongan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Fetch data saat komponen dimount atau ketika `page` berubah
  useEffect(() => {
    dispatch(fetchGolongan({ page, perPage }));
  }, [dispatch, page]);

  // 🔹 State untuk menyimpan hasil filter
  const [filteredGolongan, setFilteredGolongan] = useState([]);

  useEffect(() => {
    setFilteredGolongan(Array.isArray(golonganData) ? golonganData : []);
  }, [golonganData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Golongan Darah"
        headerSubtitle="Manajemen Data Golongan Darah dalam Master Data"
        icon={FaTint} // Menggunakan icon darah
        // Custom Search Filter
        fetchFunction={fetchGolonganDarahWithFilters}
        setFilteredData={setFilteredGolongan}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Golongan Darah"
        data={filteredGolongan}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "namaGolonganDarah", label: "Nama Golongan Darah" },
          { key: "kodeGolonganDarah", label: "Kode Golongan Darah" },
        ]}
        slugConfig={{
          textField: "namaGolonganDarah",
          idField: "golonganDarahId",
        }}
        basePath="/MasterData/master-informasi/golongan-darah/edit-golongan"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage, // Fungsi untuk mengubah halaman
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/golongan-darah/add-golongan"
            label="Tambah Golongan Darah"
            icon="ri-add-fill"
            size="sm"
            variant=""
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataGolongan;
