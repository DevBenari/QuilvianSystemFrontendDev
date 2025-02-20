"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchKabupatenKota,
  fetchKabupatenKotaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKota";

const TableDataKabupatenKota = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: KabupatenKotaData,
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.KabupatenKota);

  const [page, setPage] = useState(1);
  const perPage = 10;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchKabupatenKota({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(KabupatenKotaData);
  }, [KabupatenKotaData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Daftar KabupatenKota</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchKabupatenKotaWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Negara">
                  <h4 className="card-Negara font-widest">
                    Tabel List Daftar Negara
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-wilayah/kabupaten-kota/add-kabupaten-kota"
                  label="Add Kabupaten / Kota"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                <Alert variant="warning">{error}</Alert>
              ) : filteredData.length === 0 ? (
                <Alert variant="warning">Tidak ada data yang tersedia.</Alert>
              ) : (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "createDateTime", label: "Tanggal Dibuat" },
                    { key: "createByName", label: "Dibuat Oleh" },
                    {
                      key: "kodeKabupatenKota",
                      label: "Kode Kabupaten / Kota",
                    },
                    {
                      key: "namaKabupatenKota",
                      label: "Nama Kabupaten / Kota",
                    },
                  ]}
                  basePath="/MasterData/master-wilayah/kabupaten-kota/edit-kabupaten-kota"
                  slugConfig={{
                    textField: "namaKabupatenKota",
                    idField: "KabupatenKotaId",
                  }}
                  paginationProps={{
                    currentPage: currentPage,
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

export default TableDataKabupatenKota;
