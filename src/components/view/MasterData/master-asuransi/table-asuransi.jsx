"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const TableDataAsuransi = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: asuransiData,
    loading,
    error,
  } = useSelector((state) => state.asuransi);

  // Pastikan data berupa array

  // Menggunakan useMemo untuk memproses asuransiList
  const asuransiList = useMemo(() => {
    return Array.isArray(asuransiData) ? asuransiData : [];
  }, [asuransiData]);

  const [filteredAsuransi, setFilteredAsuransi] = useState(asuransiList);

  useEffect(() => {
    dispatch(fetchAsuransi());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAsuransi(asuransiList); // Update filteredAsuransi setelah asuransiList berubah
  }, [asuransiList]);
  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Asuransi</span>
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
            data={asuransiData}
            setFilteredData={setFilteredAsuransi}
            filterFields={["kodeAsuransi", "namaAsuransi", "tipePerusahaan"]}
            dateField="createDateTime"
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Asuransi">
                  <h4 className="card-Asuransi font-widest">
                    Tabel List Daftar Asuransi
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-asuransi/add-asuransi"
                  label="Add Asuransi"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {/* Loading Animation */}
              {loading && (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <h5 className="mt-3 text-primary fw-bold">
                    Loading data, please wait...
                  </h5>
                </div>
              )}

              {/* Error or No Data */}
              {!loading && (error || asuransiList.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && asuransiList.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredAsuransi}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "kodeAsuransi", label: "Kode Asuransi" },
                      { key: "namaAsuransi", label: "Nama Asuransi" },
                      { key: "tipePerusahaan", label: "Tipe Perusahaan" },
                      { key: "status", label: "Status" },
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createByName",
                        label: "Dibuat Oleh",
                      },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaAsuransi",
                      idField: "asuransiId",
                    }}
                    basePath="/MasterData/master-asuransi/edit-asuransi"
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

export default TableDataAsuransi;
