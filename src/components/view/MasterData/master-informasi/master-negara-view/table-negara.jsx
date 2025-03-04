"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNegara,
  fetchNegaraWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";

const TableDataNegara = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: negaraData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.negara);

  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // Gunakan useMemo untuk menghitung ulang negara hanya ketika negaraData berubah
  const negaraList = useMemo(() => negaraData || [], [negaraData]);
  const [filteredNegara, setFilteredNegara] = useState([]);

  // Fetch data negara saat komponen di-mount
  useEffect(() => {
    dispatch(fetchNegara({ page, perPage }));
  }, [dispatch, page]);

  // Update filteredNegara setelah negaraList diubah
  useEffect(() => {
    setFilteredNegara(negaraList);
  }, [negaraList]);

  console.log("negara list", negaraList);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Negara</span>
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
            fetchFunction={fetchNegaraWithFilters}
            setFilteredData={setFilteredNegara}
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
                  path="/MasterData/master-informasi/negara/add-negara"
                  label="Add Negara"
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
              ) : filteredNegara.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredNegara}
                    columns={[
                      { key: "no", label: "No" }, // Kolom nomor urut
                      {
                        key: "createdDate",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createByName",
                        label: "Dibuat Oleh",
                      },
                      { key: "kodeNegara", label: "Kode Negara" },
                      { key: "namaNegara", label: "Nama Negara" },
                    ]}
                    slugConfig={{
                      textField: "namaNegara",
                      idField: "negaraId",
                    }}
                    basePath="/MasterData/master-informasi/negara/edit-negara"
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

export default TableDataNegara;
