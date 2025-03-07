"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchIdentitas,
  fetchIdentitasWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import { FaIdCard } from "react-icons/fa"; // Icon untuk Identitas

const TableDataIdentitas = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: identitasData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.identitas);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 Konversi data identitas agar selalu dalam bentuk array
  const identitasList = useMemo(
    () => (Array.isArray(identitasData) ? identitasData : []),
    [identitasData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredIdentitas, setFilteredIdentitas] = useState([]);

  useEffect(() => {
    dispatch(fetchIdentitas({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredIdentitas(identitasList);
  }, [identitasList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Identitas"
        headerSubtitle="Manajemen Jenis Identitas dalam Master Data"
        icon={FaIdCard} // Icon Identitas
        // Custom Search Filter
        fetchFunction={fetchIdentitasWithFilters}
        setFilteredData={setFilteredIdentitas}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Identitas"
        data={filteredIdentitas}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeIdentitas", label: "Kode Identitas" },
          { key: "jenisIdentitas", label: "Jenis Identitas" },
        ]}
        slugConfig={{
          textField: "kodeIdentitas",
          idField: "identitasId",
        }}
        paginationProps={{
          currentPage: page,
          totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/identitas/add-identitas"
            label="Tambah Identitas"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataIdentitas;
