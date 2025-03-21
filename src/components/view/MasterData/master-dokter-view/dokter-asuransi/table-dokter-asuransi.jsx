"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import ButtonNav from "@/components/ui/button-navigation";

import { FaUserShield } from "react-icons/fa"; // Icon untuk DokterAsuransi
import {
  fetchDokterAsuransi,
  fetchDokterAsuransiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/DokterAsuransiSlice";

const TableDataDokterAsuransi = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  // 🔹 Ambil data dari Redux store
  const {
    data: DokterAsuransiData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.DokterAsuransi);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data dokter agar selalu dalam bentuk array
  const DokterAsuransiList = useMemo(
    () => (Array.isArray(DokterAsuransiData) ? DokterAsuransiData : []),
    [DokterAsuransiData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredDokterAsuransi, setFilteredDokterAsuransi] = useState([]);

  useEffect(() => {
    dispatch(fetchDokterAsuransi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredDokterAsuransi(DokterAsuransiList);
  }, [DokterAsuransiList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Dokter Asuransi"
        headerSubtitle="Kelola data dan legalitas dokter yang bekerja sama dengan asuransi"
        icon={FaUserShield}
        iconBgColor="bg-primary-subtle"
        iconColor="text-primary"
        fetchFunction={fetchDokterAsuransiWithFilters}
        setFilteredData={setFilteredDokterAsuransi}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List DokterAsuransi"
        data={filteredDokterAsuransi}
        loading={loading}
        columns={[
          { key: "no", label: "No" }, // Nomor urut
          { key: "createdDate", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "namaAsuransi", label: "Asuransi" },
          { key: "namaDokter", label: "Dokter" },
        ]}
        slugConfig={{ textField: "namaAsuransi", idField: "asuransiDokterId" }} // ID DokterAsuransi untuk Slug
        basePath="/MasterData/maste-dokter/dokter-asuransi/edit-dokter-asuransi"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-dokter/dokter-asuransi/add-dokter-asuransi"
            label="Tambah Dokter Asuransi"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataDokterAsuransi;
