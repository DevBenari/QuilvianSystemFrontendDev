"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";

import { FaCalendarCheck } from "react-icons/fa"; // Icon untuk Jadwal Praktek
import {
  fetchJadwalPraktek,
  fetchJadwalPraktekWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/JadwalPraktekSlice";

const TableDataJadwalPraktek = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: JadwalPraktekData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.JadwalPraktek);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data jadwal praktek agar selalu dalam bentuk array
  const JadwalPraktekList = useMemo(
    () => (Array.isArray(JadwalPraktekData) ? JadwalPraktekData : []),
    [JadwalPraktekData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredJadwalPraktek, setFilteredJadwalPraktek] = useState([]);

  useEffect(() => {
    dispatch(fetchJadwalPraktek({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredJadwalPraktek(JadwalPraktekList);
  }, [JadwalPraktekList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Jadwal Praktek"
        headerSubtitle="Manajemen Daftar Jadwal Praktek dalam Master Data"
        icon={FaCalendarCheck} // Icon Jadwal Praktek
        iconBgColor="bg-warning-subtle" // Warna background ikon (Kuning lembut)
        iconColor="text-warning" // Warna ikon (Kuning)
        // Custom Search Filter
        fetchFunction={fetchJadwalPraktekWithFilters}
        setFilteredData={setFilteredJadwalPraktek}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Jadwal Praktek"
        data={filteredJadwalPraktek}
        columns={[
          { key: "no", label: "No" }, // Nomor urut
          { key: "createdDate", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kdJadwalPraktek", label: "Kode Jadwal Praktek" },
          { key: "nmJadwalPraktek", label: "Nama Jadwal Praktek" },
          { key: "sip", label: "SIP" },
          { key: "str", label: "STR" },
          { key: "tglSip", label: "Tanggal SIP" },
          { key: "tglStr", label: "Tanggal STR" },
          { key: "panggilJadwalPraktek", label: "Panggilan" },
          { key: "nik", label: "NIK" },
        ]}
        slugConfig={{
          textField: "nmJadwalPraktek",
          idField: "jadwalPraktekId",
        }} // ID Jadwal Praktek untuk Slug
        basePath="/MasterData/master-dokter/jadwal-praktek/edit-jadwal-praktek"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-dokter/jadwal-praktek/add-jadwal-praktek"
            label="Tambah Jadwal Praktek"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataJadwalPraktek;
