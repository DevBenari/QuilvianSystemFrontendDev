"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchPeralatan,
  fetchPeralatanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/PeralatanSlice";

const TableDataPeralatan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: PeralatanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Peralatan);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPeralatan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(PeralatanData);
  }, [PeralatanData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Peralatan
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
            fetchFunction={fetchPeralatanWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Peralatan">
                  <h4 className="card-Peralatan font-widest">
                    Tabel List Daftar Peralatan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-kategori-peralatan/peralatan/add-peralatan"
                  label="Tambah  Peralatan"
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
                      key: "kodePeralatan",
                      label: "Kode  Peralatan",
                    },
                    {
                      key: "namaPeralatan",
                      label: "Nama  Peralatan",
                    },
                    {
                      key: "manufacturer",
                      label: "Manufacturer",
                    },
                    {
                      key: "purchase_date",
                      label: "Tanggal Pembelian",
                    },
                    {
                      key: "maintenance_status",
                      label: "Status Pemeliharaan",
                    },
                    {
                      key: "operational_status",
                      label: "Status Operasional",
                    },
                    {
                      key: "department_name",
                      label: "Nama Departemen",
                    },
                    {
                      key: "location",
                      label: "Lokasi",
                    },
                  ]}
                  slugConfig={{
                    textField: "namaPeralatan",
                    idField: "peralatanId",
                  }}
                  basePath="/MasterData/master-kategori-peralatan/peralatan/edit-peralatan"
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

export default TableDataPeralatan;
