"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { fetchAgama } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { FormProvider, useForm } from "react-hook-form";
import ButtonNav from "@/components/ui/button-navigation";

const TableDataAgama = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const perPage = 10; // Bisa diubah sesuai kebutuhan
  const [filteredData, setFilteredData] = useState([]);
  const {
    data: agamaData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.agama);

  useEffect(() => {
    dispatch(fetchAgama({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    if (Array.isArray(agamaData)) {
      setFilteredData(agamaData);
      console.log("Filtered Data (cek createByName):", agamaData);
    }
  }, [agamaData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Daftar Agama</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>

        <CustomSearchFilter
          data={agamaData}
          setFilteredData={setFilteredData}
          filterFields={["namaAgama", "kodeAgama"]}
        />
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">
                  Tabel List Daftar Agama
                </h4>
                <ButtonNav
                  path="/MasterData/master-informasi/agama/add-agama"
                  label="Add Agama"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {loading && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {error && <div className="text-danger">{error}</div>}
              {!loading && !error && (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    // { key: "kodeAgama", label: "Kode Agama" },
                    { key: "namaAgama", label: "Nama Agama" },
                    { key: "createByName", label: "Dibuat Oleh" }, // Pastikan ini benar
                    { key: "createdDate", label: "Tanggal Dibuat" },
                  ]}
                  itemsPerPage={perPage}
                  slugConfig={{ textField: "namaAgama", idField: "agamaId" }}
                  basePath="/MasterData/master-informasi/agama/edit-agama"
                  paginationProps={{
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: perPage,
                    onPageChange: setPage, // Gunakan fungsi untuk mengubah halaman
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

export default TableDataAgama;
