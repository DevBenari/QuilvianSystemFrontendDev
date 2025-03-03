"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsuransi,
  fetchAsuransiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const TableDataAsuransi = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: AsuransiData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Asuransi);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchAsuransi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(AsuransiData);
  }, [AsuransiData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Asuransi</span>
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
            fetchFunction={fetchAsuransiWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Asuransi">
                  <h4 className="card-Asuransi font-widest">
                    Tabel List Daftar Asuransi
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-asuransi/add-asuransi"
                  label="Add Asuransi"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {/* Loading Animation */}
              {loading && (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <h5 className="mt-3 text-primary fw-bold">
                    Loading data, please wait...
                  </h5>
                </div>
              )}

              {/* Error or No Data */}
              {!loading && (error || AsuransiData.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && AsuransiData.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredData}
                    columns={[
                      { key: "no", label: "No" },
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createByName",
                        label: "Dibuat Oleh",
                      },
                      { key: "kodeAsuransi", label: "Kode Asuransi" },
                      { key: "namaAsuransi", label: "Nama Asuransi" },
                      { key: "statusAsuransi", label: "Status Asuransi" },
                      {
                        key: "tanggalMulaiKerjasama",
                        label: "Tanggal Mulai Kerjasama",
                      },
                      {
                        key: "tanggalAkhirKerjasama",
                        label: "Tanggal Akhir Kerjasama",
                      },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaAsuransi",
                      idField: "asuransiId",
                    }}
                    basePath="/MasterData/master-asuransi/edit-asuransi"
                    paginationProps={{
                      currentPage: page,
                      totalPages: totalPages,
                      itemsPerPage: perPage,
                      onPageChange: setPage,
                    }}
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

export default TableDataAsuransi;
