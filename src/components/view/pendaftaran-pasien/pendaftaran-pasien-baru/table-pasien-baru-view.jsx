"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { FaUserInjured } from "react-icons/fa"; // Icon untuk Pasien

import {
  fetchPasienSlice,
  fetchPasienWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";

const TableDataPasien = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: pasienData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pasien);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPasienSlice({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(pasienData);
  }, [pasienData]);

  return (
    <FormProvider {...methods}>
      <CustomTableComponent
        // 🔹 Header
        headerTitle="Pencarian Data Pasien"
        headerSubtitle="Manajemen Daftar Pasien dalam Sistem Admisi"
        icon={FaUserInjured} // Icon Pasien
        iconBgColor="bg-primary-subtle" // Warna background ikon (Biru lembut)
        iconColor="text-primary" // Warna ikon (Biru)
        // 🔹 Custom Search Filter
        fetchFunction={fetchPasienWithFilters}
        setFilteredData={setFilteredData}
        showSearch={true}
        // 🔹 Table Component
        tableTitle="Tabel List Daftar Pasien"
        data={filteredData}
        columns={[
          { key: "no", label: "No" },
          { key: "createByName", label: "Dibuat Oleh" },
          { key: "createDateTime", label: "Tanggal Dibuat" },
          { key: "kodePasien", label: "Kode Pasien" },
          { key: "namaLengkap", label: "Nama Pasien" },
          { key: "jenisKelamin", label: "Jenis Kelamin" },
        ]}
        paginationProps={{
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: perPage,
          onPageChange: setPage,
        }}
        addButton={
          <ButtonNav
            path="/pendaftaran/pendaftaran-pasien-baru/add-pasien-baru"
            label="Tambah Pasien"
            icon="ri-add-fill"
            size="sm"
            className="btn btn-sm iq-bg-success"
          />
        }
        additionalButtons={
          <button
            className="btn btn-dark btn-sm mx-2"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i> Refresh
          </button>
        }
        loading={
          loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Mengambil data, harap tunggu...</p>
            </div>
          ) : error ? (
            <Alert variant="warning" className="text-center">
              {error}
            </Alert>
          ) : filteredData.length === 0 ? (
            <Alert variant="warning" className="text-center">
              <i className="ri-information-line me-2"></i>
              Tidak ada data yang tersedia.
            </Alert>
          ) : null
        }
      />
    </FormProvider>
  );
};

export default TableDataPasien;
