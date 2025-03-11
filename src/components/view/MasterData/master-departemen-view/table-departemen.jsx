"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchDepartement,
  fetchDepartementWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-departemen/DepartemenSlice";
import { FaBuilding } from "react-icons/fa"; // Icon untuk Departemen

const TableDataDepartement = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: DepartementData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Departement);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchDepartement({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(DepartementData) ? DepartementData : []);
  }, [DepartementData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Departemen"
        headerSubtitle="Manajemen Daftar Departemen dalam Master Data"
        icon={FaBuilding} // Icon Departemen
        iconBgColor="bg-secondary-subtle" // Warna background ikon (Abu-abu lembut)
        iconColor="text-secondary" // Warna ikon (Abu-abu)
        // Custom Search Filter
        fetchFunction={fetchDepartementWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Departemen"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodeDepartement", label: "Kode Departemen" },
          { key: "namaDepartement", label: "Nama Departemen" },
          { key: "lokasi", label: "Lokasi" },
          { key: "telepon", label: "Telepon" },
          { key: "jamBuka", label: "Tanggal Buka" },
          { key: "jamTutup", label: "Tanggal Tutup" },
          { key: "layanan", label: "Layanan" },
        ]}
        slugConfig={{
          textField: "namaDepartement",
          idField: "departementId",
        }}
        basePath="/MasterData/master-departement/edit-departement"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-departement/add-departement"
            label="Tambah Departemen"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataDepartement;
