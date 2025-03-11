"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchTitle,
  fetchTitleWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import { FaTag } from "react-icons/fa"; // Icon untuk Title

const TableDataTitle = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: titlesData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.titles);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data title agar selalu dalam bentuk array
  const titlesList = useMemo(
    () => (Array.isArray(titlesData) ? titlesData : []),
    [titlesData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredTitles, setFilteredTitles] = useState([]);

  useEffect(() => {
    dispatch(fetchTitle({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredTitles(titlesList);
  }, [titlesList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Title"
        headerSubtitle="Manajemen Daftar Title dalam Master Data"
        icon={FaTag} // Icon Title
        iconBgColor="bg-primary-subtle" // Warna background ikon
        iconColor="text-primary" // Warna ikon
        // Custom Search Filter
        fetchFunction={fetchTitleWithFilters}
        setFilteredData={setFilteredTitles}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Daftar Title"
        data={filteredTitles}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeTitle", label: "Kode Title" },
          { key: "namaTitle", label: "Nama Title" },
        ]}
        slugConfig={{ textField: "namaTitle", idField: "titleId" }} // Menggunakan titleId untuk slug
        basePath="/MasterData/master-informasi/title/edit-title"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/title/add-title"
            label="Tambah Title"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataTitle;
