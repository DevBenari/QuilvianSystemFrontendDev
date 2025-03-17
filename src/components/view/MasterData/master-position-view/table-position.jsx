"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchPosition,
  fetchPositionWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-position-slice/positionSlice";
import { FaUserTie } from "react-icons/fa"; // Icon untuk Position
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataPosition = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: PositionData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Position);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchPosition({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(PositionData) ? PositionData : []);
  }, [PositionData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Position"
        headerSubtitle="Manajemen Daftar Position dalam Master Data"
        icon={FaUserTie} // Icon Position
        iconBgColor="bg-warning-subtle" // Warna background ikon (Kuning lembut)
        iconColor="text-warning" // Warna ikon (Kuning)
        // Custom Search Filter
        fetchFunction={fetchPositionWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Position"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "positionCode", label: "Kode Position" },
          { key: "positionName", label: "Nama Position" },
          { key: "departementName", label: "Nama Departemen" },
        ]}
        slugConfig={{
          textField: "positionName",
          idField: "positionId",
        }}
        basePath="/MasterData/master-position/edit-position"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-position/add-position"
            label="Tambah Position"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
      {/* Loading Animation */}
      {loading && <LoadingScreen text="Please wait, loading..." />}

      {/* Error or No Data */}
      {!loading && (error || filteredData.length === 0) && (
        <Alert variant="warning" className="text-center mt-3">
          <i className="ri-information-line me-2"></i>
          Tidak ada data yang tersedia.
        </Alert>
      )}
    </FormProvider>
  );
};

export default TableDataPosition;
