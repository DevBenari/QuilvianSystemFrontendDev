"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchIdentitas,
  fetchIdentitasWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";

const TableDataIdentitas = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: identitasData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.identitas);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const identitasList = useMemo(() => identitasData || [], [identitasData]);

  const [filteredIdentitas, setFilteredIdentitas] = useState([]);

  useEffect(() => {
    dispatch(fetchIdentitas({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredIdentitas(identitasList);
  }, [identitasList]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Identitas
            </span>
          </h2>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchIdentitasWithFilters}
            setFilteredData={setFilteredIdentitas}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">Tabel List Identitas</h4>
                <ButtonNav
                  path="/MasterData/master-informasi/identitas/add-identitas"
                  label="Tambah Identitas"
                  icon="ri-add-fill"
                  size="sm"
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
              ) : filteredIdentitas.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <CustomTableComponent
                  data={filteredIdentitas}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "createDateTime", label: "Tanggal Dibuat" },
                    { key: "createByName", label: "Dibuat Oleh" },
                    { key: "kodeIdentitas", label: "Kode Identitas" },
                    { key: "jenisIdentitas", label: "Jenis Identitas" },
                  ]}
                  slugConfig={{
                    textField: "kodeIdentitas",
                    idField: "identitasId",
                  }}
                  paginationProps={{
                    currentPage: page,
                    totalPages,
                    itemsPerPage: perPage,
                    onPageChange: setPage,
                  }}
                  itemsPerPage={perPage}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataIdentitas;
