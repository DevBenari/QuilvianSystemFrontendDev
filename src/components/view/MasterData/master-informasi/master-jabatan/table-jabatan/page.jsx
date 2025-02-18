"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { fetchJabatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";

const TableDataJabatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: jabatanData,
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.jabatan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 10; // Bisa diubah sesuai kebutuhan

  // 🔹 Data yang akan ditampilkan di tabel
  const jabatan = useMemo(() => jabatanData || [], [jabatanData]);
  const [filteredJabatan, setFilteredJabatan] = useState(jabatan);

  // 🔹 Fetch data ketika komponen pertama kali di-mount atau ketika `page` berubah
  useEffect(() => {
    dispatch(fetchJabatan({ page, perPage }));
  }, [dispatch, page]);

  // 🔹 Sinkronisasi filtered data dengan data dari Redux
  useEffect(() => {
    setFilteredJabatan(jabatan);
  }, [jabatan]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Jabatan</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={jabatan}
            setFilteredData={setFilteredJabatan}
            filterFields={["namaJabatan"]}
            dateField="createDateTime"
          />
        </Col>
      </Col>
      <Col sm="12" className="p-3">
        <div className="iq-card p-3">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-jabatan">
              <h4 className="card-jabatan font-widest">
                Tabel List Daftar jabatan
              </h4>
            </div>
            <ButtonNav
              path="/MasterData/master-informasi/jabatan/add-jabatan"
              label="Tambah jabatan"
              icon="ri-add-fill"
              size="sm"
              variant=""
              className="btn btn-sm iq-bg-success"
            />
          </div>

          {/* Tampilkan loading spinner jika sedang mengambil data */}
          {loading && (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Mengambil data, harap tunggu...</p>
            </div>
          )}

          {/* Tampilkan pesan jika terjadi error */}
          {!loading && error && (
            <Alert variant="danger" className="text-center mt-3">
              {error}
            </Alert>
          )}

          {/* Tampilkan pesan jika data kosong */}
          {!loading && !error && jabatan.length === 0 && (
            <Alert variant="warning" className="text-center mt-3">
              <i className="ri-information-line me-2"></i>
              Tidak ada data yang tersedia.
            </Alert>
          )}

          {/* Tampilkan tabel jika ada data */}
          {!loading && !error && jabatan.length > 0 && (
            <CustomTableComponent
              data={filteredJabatan}
              columns={[
                { key: "no", label: "No" },
                { key: "namaJabatan", label: "Nama Jabatan" },
                {
                  key: "createdDate",
                  label: "Tanggal Dibuat",
                },
                {
                  key: "createByName",
                  label: "Dibuat Oleh",
                },
              ]}
              slugConfig={{ textField: "kodeJabatan", idField: "jabatanId" }}
              basePath="/MasterData/master-informasi/jabatan/edit-jabatan"
              paginationProps={{
                currentPage: page,
                totalPages: totalPages,
                itemsPerPage: perPage,
                onPageChange: setPage, // Fungsi untuk mengubah halaman
              }}
              itemsPerPage={perPage}
            />
          )}
        </div>
      </Col>
    </FormProvider>
  );
};

export default TableDataJabatan;
