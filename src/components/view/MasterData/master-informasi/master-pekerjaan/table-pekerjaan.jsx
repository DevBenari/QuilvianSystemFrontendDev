"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPekerjaan,
  fetchPekerjaanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";

const TableDataPekerjaan = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: pekerjaanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pekerjaan);

  const pekerjaan = useMemo(() => pekerjaanData || [], [pekerjaanData]);

  const [filteredPekerjaan, setFilteredPekerjaan] = useState([]);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  useEffect(() => {
    dispatch(fetchPekerjaan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredPekerjaan(pekerjaan);
  }, [pekerjaan]);

  console.log("pekerjaan", pekerjaan);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Pekerjaan
            </span>
          </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => dispatch(fetchPekerjaan())}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchPekerjaanWithFilters}
            setFilteredData={setFilteredPekerjaan}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Pekerjaan">
                  <h4 className="card-Pekerjaan font-widest">
                    Tabel List Daftar Pekerjaan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/master-pekerjaan/add-pekerjaan"
                  label="Add Pekerjaan"
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
              ) : filteredPekerjaan.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredPekerjaan}
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
                      { key: "kodePekerjaan", label: "Kode Pekerjaan" },
                      { key: "namaPekerjaan", label: "Nama Pekerjaan" },
                    ]}
                    slugConfig={{
                      textField: "namaPekerjaan",
                      idField: "pekerjaanId",
                    }}
                    basePath="/MasterData/master-informasi/master-pekerjaan/edit-pekerjaan-form"
                    paginationProps={{
                      currentPage: page,
                      totalPages: totalPages,
                      itemsPerPage: perPage,
                      onPageChange: setPage, // Fungsi untuk mengubah halaman
                    }}
                    itemsPerPage={perPage}
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

export default TableDataPekerjaan;
