"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import {
  fetchSubPoli,
  fetchSubPoliWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/SubPoliSlice";
import { FaStethoscope } from "react-icons/fa"; // Icon untuk SubPoli
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataSubPoli = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: SubPoliData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.SubPoli);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchSubPoli({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(SubPoliData) ? SubPoliData : []);
  }, [SubPoliData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data SubPoli"
        headerSubtitle="Manajemen Daftar SubPoli dalam Master Data"
        icon={FaStethoscope} // Icon SubPoli
        iconBgColor="bg-info-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-info" // Warna ikon (Biru)
        // Custom Search Filter
        fetchFunction={fetchSubPoliWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List SubPoli"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodeSubPoli", label: "Kode Sub Poli" },
          { key: "namaSubPoli", label: "Nama Sub Poli" },
          { key: "kepalaSubPoli", label: "Kepala Sub Poli" },
          { key: "lokasi", label: "Lokasi" },
          { key: "telepon", label: "Telepon" },
          { key: "email", label: "Email" },
          { key: "jamBuka", label: "Jam Buka" },
          { key: "jamTutup", label: "Jam Tutup" },
          { key: "layananSubPoli", label: "Layanan Sub Poli" },
          { key: "deskripsi", label: "Deskripsi" },
          { key: "namaPoliklinik", label: "Nama Poliklinik" },
        ]}
        slugConfig={{
          textField: "namaPoliklinik",
          idField: "subPoliId",
        }}
        basePath="/MasterData/master-PoliKlinik/subPoli/edit-subPoli"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-PoliKlinik/subPoli/add-subPoli"
            label="Tambah Sub Poli"
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

export default TableDataSubPoli;
