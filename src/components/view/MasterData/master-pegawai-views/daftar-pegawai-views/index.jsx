"use client";
import React, { useState, useEffect } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { usePegawai } from "@/lib/hooks/masterData/master-pegawai";

const TableListDaftarPegawai = () => {
  const methods = useForm();

  const { Pegawai, loading, error } = usePegawai();
  const [filteredPatients, setFilteredPatients] = useState(Pegawai);

  useEffect(() => {
    if (Pegawai) {
      setFilteredPatients(Pegawai);
    }
  }, [Pegawai]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">List Daftar Pegawai</span>
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
            data={Pegawai}
            setFilteredPatients={setFilteredPatients}
            onFilteredPatients={filteredPatients}
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
                    Tabel Daftar Pegawai
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-pegawai/add-pegawai"
                  label="Add Pegawai"
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
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredPatients}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "noRekamMedis", label: "No Rekam Medis" },
                      { key: "tanggalLahir", label: "Tanggal" },
                      { key: "namaLengkap", label: "Nama" },
                      { key: "pekerjaan", label: "Pekerjaan" },
                      { key: "noPenjamin", label: "No Penjamin" },
                      { key: "nomorHP", label: "No Hp" },
                    ]}
                    slugConfig={{
                      textField: "namaLengkap",
                      idField: "userActiveId",
                    }}
                    basePath="/MasterData/master-pegawai/edit-pegawai-form"
                    itemsPerPage={10}
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
export default TableListDaftarPegawai;
