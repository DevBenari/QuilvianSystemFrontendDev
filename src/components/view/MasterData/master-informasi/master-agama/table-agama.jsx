"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";
import { fetchAgama } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import CustomSearchFilterApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-api";
import CustomTablePagedApi from "@/components/features/CustomTable/custom-table-page-api";

const TableDataAgama = () => {
  const dispatch = useDispatch();
  const {
    data: agamaData,
    loading,
    error,
  } = useSelector((state) => state.agama);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [periode, setPeriode] = useState("ThisYear");
  const [sortDirection, setSortDirection] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch data berdasarkan filter
  const fetchData = () => {
    dispatch(
      fetchAgama({
        page: currentPage,
        perPage,
        searchQuery,
        periode,
        sortDirection,
        startDate,
        endDate,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    perPage,
    searchQuery,
    periode,
    sortDirection,
    startDate,
    endDate,
  ]);

  return (
    <FormProvider {...useForm()}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Daftar Agama</h2>
        </div>

        {/* Custom Search Filter */}
        <CustomSearchFilterApi
          setSearchQuery={setSearchQuery}
          setPeriode={setPeriode}
          setSortDirection={setSortDirection}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSearch={fetchData} // Tam
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
                  className="btn btn-sm iq-bg-success"
                />
              </div>

              {/* Handling Loading, Error, dan Data */}
              {loading ? (
                <div className="text-center p-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Memuat data...</p>
                </div>
              ) : error ? (
                <Alert variant="danger" className="text-center mt-3">
                  {error}
                </Alert>
              ) : (
                <CustomTablePagedApi
                  data={agamaData.rows}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "namaAgama", label: "Nama Agama" },
                  ]}
                  fetchData={fetchData}
                  currentPage={currentPage}
                  totalPages={agamaData.totalPages}
                  totalRows={agamaData.totalRows}
                  perPage={perPage}
                  onPageChange={setCurrentPage}
                  slugConfig={{ textField: "namaAgama", idField: "agamaId" }}
                  basePath="/MasterData/master-informasi/agama/edit-agama"
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
