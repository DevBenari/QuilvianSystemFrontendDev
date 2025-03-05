"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchKelurahan,
  fetchKelurahanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataKelurahan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: KelurahanData,
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.Kelurahan);

  const [page, setPage] = useState(1);
  const perPage = 10;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchKelurahan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(KelurahanData);
  }, [KelurahanData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar kelurahan
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
            fetchFunction={fetchKelurahanWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-kelurahan">
                  <h4 className="card-kelurahan font-widest">
                    Tabel List Daftar kelurahan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-wilayah/kelurahan/add-kelurahan"
                  label="Tambah Kelurahan"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {loading ? (
                <LoadingScreen
                  variant="primary"
                  text="Mengambil data, harap tunggu..."
                />
              ) : error ? (
                <Alert variant="warning">{error}</Alert>
              ) : filteredData.length === 0 ? (
                <Alert variant="warning">Tidak ada data yang tersedia.</Alert>
              ) : (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "createDateTime", label: "Tanggal Dibuat" },
                    { key: "createByName", label: "Dibuat Oleh" },
                    {
                      key: "kodeKelurahan",
                      label: "Kode Kelurahan",
                    },
                    {
                      key: "namaProvinsi",
                      label: "Nama Provinsi",
                    },
                    {
                      key: "namaKabupatenKota",
                      label: "Nama Kabupaten / Kota",
                    },

                    {
                      key: "namaKecamatan",
                      label: "Nama Kecamatan",
                    },

                    {
                      key: "namaKelurahan",
                      label: "Nama Kelurahan",
                    },
                  ]}
                  basePath="/MasterData/master-wilayah/kelurahan/edit-kelurahan"
                  slugConfig={{
                    textField: "namaKelurahan",
                    idField: "kelurahanId",
                  }}
                  paginationProps={{
                    currentPage: page,
                    itemsPerPage: perPage,
                    totalPages: totalPages,
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

export default TableDataKelurahan;
