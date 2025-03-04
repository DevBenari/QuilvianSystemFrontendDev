"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchPosition,
  fetchPositionWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-position/PositionSlice";
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataPosition = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: PositionData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Position);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPosition({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(PositionData);
  }, [PositionData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Position</span>
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
            fetchFunction={fetchPositionWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Position">
                  <h4 className="card-Position font-widest">
                    Tabel List Daftar Position
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-position/add-position"
                  label="Tambah  Position"
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
                      key: "positionCode",
                      label: "Kode  Position",
                    },
                    {
                      key: "positionName",
                      label: "Nama  Position",
                    },
                    { key: "departementName", label: "Nama Departemen" },
                  ]}
                  slugConfig={{
                    textField: "positionName",
                    idField: "positionId",
                  }}
                  basePath="/MasterData/master-position/edit-position"
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

export default TableDataPosition;
