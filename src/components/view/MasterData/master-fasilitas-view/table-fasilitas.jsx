"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import ButtonNav from "@/components/ui/button-navigation";

import { FaBuilding } from "react-icons/fa"; // Icon untuk Fasilitas
import {
  fetchFasilitas,
  fetchFasilitasWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-fasilitas/FasilitasSlice";
import { MdHomeRepairService, MdMedicalServices } from "react-icons/md";

const TableDataFasilitas = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: FasilitasData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Fasilitas);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchFasilitas({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(FasilitasData) ? FasilitasData : []);
  }, [FasilitasData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Fasilitas"
        headerSubtitle="Manajemen Daftar Fasilitas dalam Master Data"
        icon={MdHomeRepairService} // Icon Fasilitas
        iconBgColor="bg-secondary-subtle" // Warna background ikon (Abu-abu lembut)
        iconColor="text-secondary" // Warna ikon (Abu-abu)
        // Custom Search Filter
        fetchFunction={fetchFasilitasWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Fasilitas"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodeFasilitas", label: "Kode Fasilitas" },
          { key: "namaFasilitasPasien", label: "Nama Fasilitas" },
        ]}
        slugConfig={{
          textField: "namaFasilitasPasien",
          idField: "fasilitasPasienId",
        }}
        basePath="/MasterData/master-fasilitas/edit-fasilitas"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-fasilitas/add-fasilitas"
            label="Tambah Fasilitas"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataFasilitas;
