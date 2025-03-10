"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

import ButtonNav from "@/components/ui/button-navigation";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import LoadingScreen from "@/components/features/loading/loadingScreen";
import {
  fetchAnggota,
  fetchAnggotaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/admisi/Anggota/anggotaSlice";
import { FaUsers } from "react-icons/fa"; // Icon untuk Anggota

const TableDataAnggota = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux Store
  const {
    data: AnggotaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.anggota);

  // 🔹 Gunakan useMemo untuk memastikan data tetap konsisten
  const AnggotaList = useMemo(() => {
    return Array.isArray(AnggotaData) ? AnggotaData : [];
  }, [AnggotaData]);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter pencarian
  const [filteredAnggota, setFilteredAnggota] = useState([]);

  // 🔹 Fetch data saat pertama kali render
  useEffect(() => {
    dispatch(fetchAnggota({ page, perPage }));
  }, [dispatch, page]);

  // 🔹 Update filteredAnggota ketika AnggotaList berubah
  useEffect(() => {
    setFilteredAnggota(AnggotaList);
  }, [AnggotaList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Anggota"
        headerSubtitle="Manajemen Daftar Anggota dalam Master Data"
        icon={FaUsers} // Icon Anggota
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        fetchFunction={fetchAnggotaWithFilters}
        setFilteredData={setFilteredAnggota}
        showSearch={true}
        loading={loading}
        // 🔹 Table Component
        tableTitle="Tabel List Anggota"
        data={filteredAnggota}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeKeanggotaan", label: "Kode Anggota" },
          { key: "jenisKeanggotaan", label: "Jenis Anggota" },
          { key: "jenisPromo", label: "Jenis Promo" },
        ]}
        slugConfig={{
          textField: "jenisKeanggotaan",
          idField: "keanggotaanId",
        }}
        basePath="/pendaftaran/anggota/edit-anggota"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/pendaftaran/anggota/add-anggota"
            label="Tambah Anggota"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataAnggota;
