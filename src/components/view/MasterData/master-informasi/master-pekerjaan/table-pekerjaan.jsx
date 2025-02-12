"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";

const TableDataPekerjaan = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: pekerjaanData,
    loading,
    error,
  } = useSelector((state) => state.pekerjaan);

  const pekerjaan = useMemo(() => pekerjaanData?.data || [], [pekerjaanData]);

  const [filteredPekerjaan, setFilteredPekerjaan] = useState(pekerjaan);

  useEffect(() => {
    dispatch(fetchPekerjaan());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPekerjaan(pekerjaan);
  }, [pekerjaan]);

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
            data={pekerjaan}
            setFilteredPatients={setFilteredPekerjaan}
            onFilteredPatients={filteredPekerjaan}
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
              {!loading && (error || pekerjaan.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}
              {!loading && !error && pekerjaan.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredPekerjaan}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "namaPekerjaan", label: "Nama Pekerjaan" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaPekerjaan",
                      idField: "pekerjaanId",
                    }}
                    basePath="/MasterData/master-informasi/master-pekerjaan/edit-pekerjaan-form"
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
