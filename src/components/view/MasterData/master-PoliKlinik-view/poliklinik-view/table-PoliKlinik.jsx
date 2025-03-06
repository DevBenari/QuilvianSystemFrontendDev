"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";

import LoadingScreen from "@/components/features/loading/loadingScreen";
import {
  fetchPoliKlinik,
  fetchPoliKlinikWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";

const TableDataPoliKlinik = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: PoliKlinikData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.PoliKlinik);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPoliKlinik({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(PoliKlinikData);
  }, [PoliKlinikData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar PoliKlinik
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
            fetchFunction={fetchPoliKlinikWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-PoliKlinik">
                  <h4 className="card-PoliKlinik font-widest">
                    Tabel List Daftar PoliKlinik
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-PoliKlinik/add-PoliKlinik"
                  label="Tambah  PoliKlinik"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {loading ? (
                <LoadingScreen text="Please wait, loading..." />
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
                      key: "kepalaPoliklinik",
                      label: "Kode  PoliKlinik",
                    },
                    {
                      key: "namaPoliklinik",
                      label: "Nama  PoliKlinik",
                    },
                    { key: "telepon", label: "No Telepon" },
                    { key: "email", label: "email" },
                    { key: "jamBuka", label: "Jam Buka" },
                    { key: "jamTutup", label: "Jam Tutup" },
                    { key: "layananPoliklinik", label: "Layanan Poliklinik" },
                    { key: "deskripsi", label: "dekripsi" },
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
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataPoliKlinik;
