"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchPoliKlinik,
  fetchPoliKlinikWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import { FaHospitalUser } from "react-icons/fa"; // Icon untuk PoliKlinik
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataPoliKlinik = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: PoliKlinikData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.PoliKlinik);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchPoliKlinik({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(PoliKlinikData) ? PoliKlinikData : []);
  }, [PoliKlinikData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data PoliKlinik"
        headerSubtitle="Manajemen Daftar PoliKlinik dalam Master Data"
        icon={FaHospitalUser} // Icon PoliKlinik
        iconBgColor="bg-info-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-info" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchPoliKlinikWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List PoliKlinik"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kepalaPoliklinik", label: "Kode PoliKlinik" },
          { key: "namaPoliklinik", label: "Nama PoliKlinik" },
          { key: "telepon", label: "No Telepon" },
          { key: "email", label: "Email" },
          { key: "jamBuka", label: "Jam Buka" },
          { key: "jamTutup", label: "Jam Tutup" },
          { key: "layananPoliklinik", label: "Layanan PoliKlinik" },
          { key: "deskripsi", label: "Deskripsi" },
        ]}
        slugConfig={{
          textField: "namaPoliklinik",
          idField: "poliklinikId",
        }}
        basePath="/MasterData/master-PoliKlinik/edit-PoliKlinik"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-PoliKlinik/poliklinik/add-PoliKlinik"
            label="Tambah PoliKlinik"
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

export default TableDataPoliKlinik;
