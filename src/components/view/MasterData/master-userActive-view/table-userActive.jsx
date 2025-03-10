"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchUserActive,
  fetchUserActiveWithFilters,
} from "@/lib/state/slice/auth/master-userActive/UserActive";

const TableDataUserActive = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: UserActiveData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.UserActive);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchUserActive({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(UserActiveData);
  }, [UserActiveData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar User Aktif
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
            fetchFunction={fetchUserActiveWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-UserActive">
                  <h4 className="card-UserActive font-widest">
                    Tabel List Daftar User Aktif
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-userActive/add-userActive"
                  label="Tambah User Active"
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
                    { key: "userActiveCode", label: "Kode UserActive" },
                    { key: "fullName", label: "Nama Lengkap" },
                  ]}
                  slugConfig={{
                    textField: "fullName",
                    idField: "userActiveId",
                  }}
                  basePath="/MasterData/master-userActive/edit-userActive"
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

export default TableDataUserActive;
