"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchNegara,
  fetchNegaraWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { FaGlobeAmericas } from "react-icons/fa"; // Icon untuk Negara

const TableDataNegara = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: negaraData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.negara);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data negara agar selalu dalam bentuk array
  const negaraList = useMemo(
    () => (Array.isArray(negaraData) ? negaraData : []),
    [negaraData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredNegara, setFilteredNegara] = useState([]);

  useEffect(() => {
    dispatch(fetchNegara({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredNegara(negaraList);
  }, [negaraList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Negara"
        headerSubtitle="Manajemen Daftar Negara dalam Master Data"
        icon={FaGlobeAmericas} // Icon Negara
        // Custom Search Filter
        fetchFunction={fetchNegaraWithFilters}
        setFilteredData={setFilteredNegara}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Daftar Negara"
        data={filteredNegara}
        columns={[
          { key: "no", label: "No" }, // Kolom nomor urut
          { key: "createdDate", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeNegara", label: "Kode Negara" },
          { key: "namaNegara", label: "Nama Negara" },
        ]}
        slugConfig={{
          textField: "namaNegara",
          idField: "negaraId",
        }}
        basePath="/MasterData/master-informasi/negara/edit-negara"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/negara/add-negara"
            label="Tambah Negara"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataNegara;
