"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDokter,
  fetchDokterWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import { set } from "date-fns";

const TableDataDokter = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: dokterData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.dokter);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuha

  // 🔹 Menggunakan useMemo untuk memastikan hanya dire-render saat data berubah
  const dokter = useMemo(() => dokterData || [], [dokterData]);

  const [filteredDokter, setFilteredDokter] = useState([]);

  useEffect(() => {
    dispatch(fetchDokter({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredDokter(dokter); // Perbarui data setelah fetch
  }, [dokter]);

  console.log("dokter Data:", dokter);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Dokter</span>
          </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchDokterWithFilters}
            setFilteredData={setFilteredDokter}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">Tabel List Dokter</h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-dokter/dokter/add-dokter"
                  label="Tambah Dokter"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>

              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Mengambil data, harap tunggu...</p>
                </div>
              ) : error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : filteredDokter.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredDokter}
                    columns={[
                      { key: "no", label: "No" }, // Nomor urut
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createdByName",
                        label: "Dibuat Oleh",
                      },
                      { key: "kdDokter", label: "Kode Dokter" },
                      { key: "nmDokter", label: "Nama Dokter" },
                      { key: "sip", label: "SIP" },
                      { key: "str", label: "STR" },
                      { key: "tglSip", label: "Tanggal SIP" },
                      { key: "tglStr", label: "Tanggal STR" },
                      { key: "panggilDokter", label: "Panggilan" },
                      { key: "nik", label: "NIK" },
                    ]}
                    slugConfig={{ textField: "nmDokter", idField: "dokterId" }} // ID Dokter untuk Slug
                    basePath="/MasterData/master-dokter/dokter/edit-dokter-form"
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

export default TableDataDokter;
