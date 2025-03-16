"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Spinner } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import ButtonNav from "@/components/ui/button-navigation";

import { FaShieldHeart } from "react-icons/fa6";
import {
  fetchAsuransi,
  fetchAsuransiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const TableDataAsuransi = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: AsuransiData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Asuransi);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchAsuransi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(Array.isArray(AsuransiData) ? AsuransiData : []);
  }, [AsuransiData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // Header
        headerTitle="Pencarian Data Asuransi"
        headerSubtitle="Manajemen Daftar Asuransi dalam Master Data"
        icon={FaShieldHeart} // Icon Asuransi
        iconBgColor="bg-success-subtle" // Warna background ikon (Hijau lembut)
        iconColor="text-success" // Warna ikon (Hijau)
        // Custom Search Filter
        fetchFunction={fetchAsuransiWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // Table Component
        tableTitle="Tabel List Asuransi"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "kodeAsuransi", label: "Kode Asuransi" },
          { key: "namaAsuransi", label: "Nama Asuransi" },
          { key: "jenisAsuransi", label: "Jenis Asuransi" },
          { key: "statusAsuransi", label: "Status Asuransi" },
          { key: "tanggalMulaiKerjasama", label: "Tanggal Mulai Kerjasama" },
          { key: "tanggalAkhirKerjasama", label: "Tanggal Akhir Kerjasama" },
        ]}
        itemsPerPage={10}
        slugConfig={{
          textField: "namaAsuransi",
          idField: "asuransiId",
        }}
        basePath="/MasterData/master-asuransi/asuransi/edit-asuransi"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-asuransi/asuransi/add-asuransi"
            label="Tambah Asuransi"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
        loading={
          loading && (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <Spinner
                animation="border"
                variant="primary"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
              />
              <h5 className="mt-3 text-primary fw-bold">
                Loading data, please wait...
              </h5>
            </div>
          )
        }
      />
    </FormProvider>
  );
};

export default TableDataAsuransi;
