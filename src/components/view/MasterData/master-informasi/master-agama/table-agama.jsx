"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  fetchAgamaPaged,
  fetchAgamaWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";
import CustomSearchFilterApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-api";

const TableDataAgama = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const {
    data: agamaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.agama);

  useEffect(() => {
    dispatch(fetchAgamaPaged({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    if (Array.isArray(agamaData)) {
      const updatedData = agamaData.map((item) => ({
        ...item,
        createByName: item.createByName || "Tidak Diketahui",
        createdDate: item.createDateTime || "-",
      }));
      console.log("Updated Data:", updatedData);
      setFilteredData(updatedData);
    }
  }, [agamaData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Agama</span>
          </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilterApi
            fetchFunction={fetchAgamaWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
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
                    { key: "createdDate", label: "Tanggal Dibuat" },
                    { key: "kodeAgama", label: "Kode Agama" },
                    { key: "namaAgama", label: "Nama Agama" },
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

export default TableDataAgama;
