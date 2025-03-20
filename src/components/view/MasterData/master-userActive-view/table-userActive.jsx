"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Spinner } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchUserActive,
  fetchUserActiveWithFilters,
} from "@/lib/state/slice/auth/master-userActive/UserActive";
import { FaUserCheck } from "react-icons/fa"; // Icon untuk User Aktif

const TableDataUserActive = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: UserActiveData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.UserActive);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchUserActive({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(UserActiveData) ? UserActiveData : []);
  }, [UserActiveData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data User Aktif"
        headerSubtitle="Manajemen Daftar User Aktif dalam Master Data"
        icon={FaUserCheck} // Icon User Aktif
        iconBgColor="bg-success-subtle" // Warna background ikon (Hijau lembut)
        iconColor="text-success" // Warna ikon (Hijau)
        // Custom Search Filter
        fetchFunction={fetchUserActiveWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List User Aktif"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "userActiveCode", label: "Kode User Aktif" },
          { key: "fullName", label: "Nama Lengkap" },
        ]}
        slugConfig={{
          textField: "fullName",
          idField: "userActiveId",
        }}
        basePath="/MasterData/master-userActive/edit-userActive"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-userActive/add-userActive"
            label="Tambah User Aktif"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataUserActive;
