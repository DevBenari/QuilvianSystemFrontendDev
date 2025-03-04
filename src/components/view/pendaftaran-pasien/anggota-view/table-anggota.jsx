"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchAnggota,
  fetchAnggotaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/admisi/Anggota/anggotaSlice";

const TableDataAnggota = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // Ambil data dari Redux Store
  const {
    data: AnggotaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.anggota);

  // Gunakan useMemo untuk menghindari perhitungan ulang yang tidak perlu
  const AnggotaList = useMemo(() => {
    return Array.isArray(AnggotaData) ? AnggotaData : [];
  }, [AnggotaData]);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 2; // Bisa diubah sesuai kebutuhan

  // State untuk hasil filter pencarian
  const [filteredAnggota, setFilteredAnggota] = useState([]);

  // Fetch data saat pertama kali render
  useEffect(() => {
    dispatch(fetchAnggota({ page, perPage }));
  }, [dispatch, page]);

  // Update filteredAnggota ketika AnggotaList berubah
  useEffect(() => {
    setFilteredAnggota(AnggotaList);
  }, [AnggotaList]);

  console.log("anggota Data:", AnggotaList);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Anggota</span>
          </h2>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchAnggotaWithFilters}
            setFilteredData={setFilteredAnggota}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Anggota">
                  <h4 className="card-Anggota font-widest">
                    Tabel List Daftar Anggota
                  </h4>
                </div>
                <ButtonNav
                  path="/pendaftaran/anggota/add-anggota"
                  label="Tambah Anggota"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>

              {/* Tampilkan loading spinner jika sedang mengambil data */}
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Mengambil data, harap tunggu...</p>
                </div>
              ) : error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : filteredAnggota.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredAnggota}
                    columns={[
                      { key: "no", label: "No" },
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createByName",
                        label: "Dibuat Oleh",
                      },
                      { key: "kodeKeanggotaan", label: "Kode Anggota" },
                      { key: "jenisKeanggotaan", label: "Jenis Anggota" },
                      { key: "jenisPromo", label: "Jenis Promo" },
                    ]}
                    slugConfig={{
                      textField: "jenisKeanggotaan",
                      idField: "keanggotaanId",
                    }}
                    basePath="/pendaftaran/anggota/edit-anggota"
                    paginationProps={{
                      currentPage: page,
                      totalPages: totalPages,
                      itemsPerPage: perPage,
                      onPageChange: setPage, // Fungsi untuk mengubah halaman
                    }}
                    itemsPerPage={perPage}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataAnggota;
