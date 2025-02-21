"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchKategoriPeralatan,
  fetchKategoriPeralatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";

const TableDataKategoriPeralatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: KategoriPeralatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.KategoriPeralatan);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchKategoriPeralatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(KategoriPeralatanData);
  }, [KategoriPeralatanData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar KategoriPeralatan
            </span>
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
            fetchFunction={fetchKategoriPeralatanWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-KategoriPeralatan">
                  <h4 className="card-KategoriPeralatan font-widest">
                    Tabel List Daftar Kategori Peralatan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-kategori-peralatan/kategori-peralatan/add-kategori-peralatan"
                  label="Tambah Kategori Peralatan"
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
                    {
                      key: "kodeKategoriPerlatan",
                      label: "Kode Kategori Peralatan",
                    },
                    {
                      key: "namaKategoriPeralatan",
                      label: "Nama Kategori Peralatan",
                    },
                    ,
                  ]}
                  slugConfig={{
                    textField: "namaKategoriPeralatan",
                    idField: "kategoriPeralatanId",
                  }}
                  basePath="/MasterData/master-kategori-peralatan/kategori-peralatan/edit-kategori-peralatan"
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

export default TableDataKategoriPeralatan;
