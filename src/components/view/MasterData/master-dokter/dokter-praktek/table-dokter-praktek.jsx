"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchDokterPraktek,
  fetchDokterPraktekWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";
import LoadingScreen from "@/components/features/loading/loadingScreen";

const TableDataDokterPraktek = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: DokterPraktekData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.DokterPraktek);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchDokterPraktek({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(DokterPraktekData);
  }, [DokterPraktekData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Dokter Praktek
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
            fetchFunction={fetchDokterPraktekWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-DokterPraktek">
                  <h4 className="card-DokterPraktek font-widest">
                    Tabel List Daftar Dokter Praktek
                  </h4>
                </div>
                <ButtonNav
                  path="//MasterData/master-dokter/dokter-praktek/add-dokter-praktek"
                  label="Tambah  DokterPraktek"
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
                    { key: "dokter", label: "Nama Dokter" }, // Nama dokter dari objek "dokters"
                    { key: "layanan", label: "Layanan" },
                    { key: "jamPraktek", label: "Jam Praktek" },
                    { key: "hari", label: "Hari" },
                    { key: "jamMasuk", label: "Tanggal Masuk" },
                    { key: "jamKeluar", label: "Tanggal Keluar" },
                  ]}
                  slugConfig={{
                    textField: "layanan",
                    idField: "dokterPraktekId",
                  }}
                  basePath="/MasterData/master-dokter/dokter-praktek/edit-dokter-praktek"
                  paginationProps={{
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: perPage,
                    onPageChange: setPage, // Fungsi untuk mengubah halaman
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

export default TableDataDokterPraktek;
