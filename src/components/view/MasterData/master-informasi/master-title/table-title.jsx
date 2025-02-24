"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTitle,
  fetchTitleWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";

const TableDataTitle = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: titlesData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.titles);

  // 🔹 State untuk Pagination
  const [page, setPage] = useState(1);
  const perPage = 5; // Bisa diubah sesuai kebutuhan
  // Gunakan useMemo untuk menghitung ulang titles hanya ketika titlesData berubah
  const titles = useMemo(() => titlesData || [], [titlesData]);

  const [filteredTitles, setFilteredTitles] = useState([]);

  useEffect(() => {
    dispatch(fetchTitle({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredTitles(titles); // Update filteredTitles setelah titles diubah
  }, [titles]);

  console.log("titles", titles);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">List Daftar Title</span>
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
            fetchFunction={fetchTitleWithFilters}
            setFilteredData={setFilteredTitles}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">
                    Tabel List Daftar Title
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/title/add-title"
                  label="Add Title"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {/* Loading Animation */}
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Mengambil data, harap tunggu...</p>
                </div>
              ) : error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : filteredTitles.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredTitles}
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
                      { key: "kodeTitle", label: "Kode Title" },
                      { key: "namaTitle", label: "Nama Title" },
                    ]}
                    slugConfig={{ textField: "namaTitle", idField: "titleId" }} // Menggunakan titleId untuk slug
                    basePath="/MasterData/master-informasi/title/edit-title"
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

export default TableDataTitle;
