"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendidikan,
  fetchPendidikanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";

const TableDataPendidikan = () => {
  const methods = useForm();

  const dispatch = useDispatch();
  const {
    data: pendidikanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pendidikan);

  // Gunakan useMemo untuk menghitung ulang pendidikan hanya ketika pendidikanData berubah
  const pendidikan = useMemo(() => pendidikanData || [], [pendidikanData]);

  const [filteredpendidikan, setFilteredpendidikan] = useState([]);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan

  useEffect(() => {
    dispatch(fetchPendidikan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredpendidikan(pendidikan); // Update filteredpendidikan setelah pendidikan diubah
  }, [pendidikan]);

  console.log("pendidikan", pendidikan);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Pendidikan
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
            fetchFunction={fetchPendidikanWithFilters}
            setFilteredData={setFilteredpendidikan}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Pendidikan">
                  <h4 className="card-Pendidikan font-widest">
                    Tabel List Daftar Pendidikan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/master-pendidikan/add-pendidikan"
                  label="Tambah Pendidikan"
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
              ) : filteredpendidikan.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredpendidikan}
                    columns={[
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createByName",
                        label: "Dibuat Oleh",
                      },
                      { key: "kodePendidikan", label: "Kode Pendidikan" },
                      { key: "namaPendidikan", label: "Nama Pendidikan" },
                    ]}
                    slugConfig={{
                      textField: "namaPendidikan",
                      idField: "pendidikanId",
                    }}
                    basePath="/MasterData/master-informasi/master-pendidikan/edit-form-pendidikan"
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

export default TableDataPendidikan;
