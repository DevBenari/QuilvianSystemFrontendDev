"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Spinner } from "react-bootstrap";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import ButtonNav from "@/components/ui/button-navigation";

import { FaShieldHeart } from "react-icons/fa6";
import {
  fetchAsuransiPasien,
  fetchAsuransiPasienWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";
import { FaIdCard } from "react-icons/fa";

const TableDataAsuransiPasien = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: AsuransiPasienData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.AsuransiPasien);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔹 State untuk menyimpan hasil filter
  const [filteredData, setFilteredData] = useState([]);

  // 🔹 Pastikan data dari Redux store selalu berupa array sebelum disimpan
  useEffect(() => {
    dispatch(fetchAsuransiPasien({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(
      Array.isArray(AsuransiPasienData) ? AsuransiPasienData : []
    );
  }, [AsuransiPasienData]);

  const columns = [
    { key: "no", label: "No" },
    { key: "namaPasien", label: "Nama Pasien" },
    { key: "namaAsuransi", label: "Nama Asuransi" },
    { key: "noPolis", label: "Nomor Polis" },
  ];

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        headerTitle="Pencarian Data Polis Asuransi"
        headerSubtitle="Manajemen Data Polis Pasien"
        icon={FaIdCard} // Gunakan ikon yang relevan
        iconBgColor="bg-primary-subtle"
        iconColor="text-primary"
        fetchFunction={fetchAsuransiPasienWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        tableTitle="Tabel Daftar Polis Asuransi"
        data={filteredData}
        columns={columns}
        slugConfig={{ textField: "namaAsuransi", idField: "asuransiPasienId" }}
        basePath="/MasterData/master-asuransi/asuransi-pasien/edit-asuransi-pasien"
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/MasterData/master-asuransi/asuransi-pasien/add-asuransi-pasien"
            label="Tambah Asuransi"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
      />
    </FormProvider>
  );
};

export default TableDataAsuransiPasien;
