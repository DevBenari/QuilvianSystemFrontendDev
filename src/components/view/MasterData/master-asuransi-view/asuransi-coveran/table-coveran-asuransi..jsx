"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoveranAsuransi,
  fetchCoveranAsuransiWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataCoveranAsuransi = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: CoveranAsuransiData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.CoveranAsuransi);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchCoveranAsuransi({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(CoveranAsuransiData);
  }, [CoveranAsuransiData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Koveran Asuransi
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
            fetchFunction={fetchCoveranAsuransiWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-CoveranAsuransi">
                  <h4 className="card-CoveranAsuransi font-widest">
                    Tabel List Daftar Coveran Asuransi
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-asuransi/coveran-asuransi/add-CoveranAsuransi"
                  label="Tambah Coveran Asuransi"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {/* Loading Animation */}
              {loading && (
                <LoadingScreen
                  text="Please wait, loading..."
                  variant="primary"
                />
              )}

              {/* Error or No Data */}
              {!loading && (error || CoveranAsuransiData.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && CoveranAsuransiData.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredData}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "createByName", label: "Dibuat Oleh" },
                      { key: "createDateTime", label: "Tanggal Dibuat" },
                      {
                        key: "kodeCoveranAsuransi",
                        label: "Kode Coveran Asuransi",
                      },
                      { key: "namaAsuransi", label: "Nama Asuransi" },
                      { key: "serviceCode", label: "Kode Layanan" },
                      { key: "serviceDesc", label: "Deskripsi Layanan" },
                      { key: "serviceCodeClass", label: "Kode Kelas Layanan" },
                      { key: "class", label: "Kelas" },
                      { key: "tarif", label: "Tarif" },
                      { key: "tglBerlaku", label: "Tanggal Berlaku" },
                      { key: "tglBerakhir", label: "Tanggal Berakhir" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaAsuransi",
                      idField: "coveranAsuransiId",
                    }}
                    basePath="/MasterData/master-asuransi/coveran-asuransi/edit-CoveranAsuransi"
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

export default TableDataCoveranAsuransi;
