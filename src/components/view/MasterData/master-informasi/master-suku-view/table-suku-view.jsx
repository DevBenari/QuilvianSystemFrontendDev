"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import ButtonNav from "@/components/ui/button-navigation";

import { FaGlobeAmericas } from "react-icons/fa"; // Icon untuk Suku
import {
  fetchSuku,
  fetchSukuWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/SukuSlice";
import { MdGroups } from "react-icons/md";

const TableDataSuku = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: sukuData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.suku);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data suku agar selalu dalam bentuk array
  const sukuList = useMemo(
    () => (Array.isArray(sukuData) ? sukuData : []),
    [sukuData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredSuku, setFilteredSuku] = useState([]);

  useEffect(() => {
    dispatch(fetchSuku({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredSuku(sukuList);
  }, [sukuList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Suku"
        headerSubtitle="Manajemen Daftar Suku dalam Master Data"
        icon={MdGroups} // Icon Suku
        // Custom Search Filter
        fetchFunction={fetchSukuWithFilters}
        setFilteredData={setFilteredSuku}
        showSearch={true}
        // Table Component
        loading={loading}
        tableTitle="Tabel List Daftar Suku"
        data={filteredSuku}
        columns={[
          { key: "no", label: "No" }, // Kolom nomor urut
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeSuku", label: "Kode Suku" },
          { key: "namaSuku", label: "Nama Suku" },
        ]}
        slugConfig={{
          textField: "namaSuku",
          idField: "sukuId",
        }}
        basePath="/MasterData/master-informasi/suku/edit-suku"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/suku/add-suku"
            label="Tambah Suku"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataSuku;
