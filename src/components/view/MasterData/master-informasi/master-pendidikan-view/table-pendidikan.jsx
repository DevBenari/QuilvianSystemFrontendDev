"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchPendidikan,
  fetchPendidikanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import { FaGraduationCap } from "react-icons/fa"; // Icon untuk Pendidikan

const TableDataPendidikan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: pendidikanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pendidikan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Konversi data pendidikan agar selalu dalam bentuk array
  const pendidikanList = useMemo(
    () => (Array.isArray(pendidikanData) ? pendidikanData : []),
    [pendidikanData]
  );

  // 🔹 State untuk menyimpan hasil filter
  const [filteredPendidikan, setFilteredPendidikan] = useState([]);

  useEffect(() => {
    dispatch(fetchPendidikan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredPendidikan(pendidikanList);
  }, [pendidikanList]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Pendidikan"
        headerSubtitle="Manajemen Daftar Pendidikan dalam Master Data"
        icon={FaGraduationCap} // Icon Pendidikan
        // Custom Search Filter
        fetchFunction={fetchPendidikanWithFilters}
        setFilteredData={setFilteredPendidikan}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Daftar Pendidikan"
        data={filteredPendidikan}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodePendidikan", label: "Kode Pendidikan" },
          { key: "namaPendidikan", label: "Nama Pendidikan" },
        ]}
        slugConfig={{
          textField: "namaPendidikan",
          idField: "pendidikanId",
        }}
        basePath="/MasterData/master-informasi/master-pendidikan/edit-form-pendidikan"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-informasi/master-pendidikan/add-pendidikan"
            label="Tambah Pendidikan"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataPendidikan;
