"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGolongan,
  fetchGolonganDarahWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";

const TableDataGolongan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // 🔹 Ambil data dari Redux store
  const {
    data: golonganData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.golongan);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  // 🔹 Fetch data ketika komponen pertama kali di-mount atau ketika `page` berubah
  useEffect(() => {
    dispatch(fetchGolongan({ page, perPage }));
  }, [dispatch, page]);

  const [filteredGolongan, setFilteredGolongan] = useState([]);

  useEffect(() => {
    console.log("Agama Data:", golonganData);
    setFilteredGolongan(golonganData);
  }, [golonganData]);

  console.log("Golongan Data:", golonganData);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Golongan Darah</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchGolonganDarahWithFilters}
            setFilteredData={setFilteredGolongan}
          />
        </Col>
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">
                  Tabel List Golongan Darah
                </h4>
                <ButtonNav
                  path="/MasterData/master-informasi/golongan-darah/add-golongan"
                  label="Add Golongan"
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
              ) : filteredGolongan.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredGolongan}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "createByName", label: "Dibuat Oleh" },
                      { key: "createDateTime", label: "Tanggal Dibuat" },
                      {
                        key: "namaGolonganDarah",
                        label: "Nama Golongan Darah",
                      },
                      {
                        key: "kodeGolonganDarah",
                        label: "Kode Golongan Darah",
                      },
                    ]}
                    slugConfig={{
                      textField: "namaGolonganDarah",
                      idField: "golonganDarahId",
                    }}
                    basePath="/MasterData/master-informasi/golongan-darah/edit-golongan"
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

export default TableDataGolongan;
