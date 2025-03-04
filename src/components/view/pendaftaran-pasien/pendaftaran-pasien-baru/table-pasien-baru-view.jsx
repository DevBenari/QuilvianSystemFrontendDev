"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";
import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
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
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Admisi <br></br>
            <span className="letter-spacing fw-bold">List Daftar Pasien</span>
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
            fetchFunction={fetchPasienWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-pasien">
                  <h4 className="card-pasien font-widest">
                    Tabel List Daftar Pasien
                  </h4>
                </div>
                <ButtonNav
                  path="/pendaftaran/pendaftaran-pasien-baru/add-pasien-baru"
                  label="Tambah Pasien"
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
              ) : filteredData.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <CustomTableComponent
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
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataPasien;
