"use client";
import React, { useEffect, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useGolongan } from "@/lib/hooks/masterData/master-informasi/golongan";

const TableDataGolongan = () => {
  const methods = useForm();
  const { Golongan, loading, error } = useGolongan();
  const [filteredPatients, setFilteredPatients] = useState(Golongan.data || []);

  useEffect(() => {
    if (Golongan && Array.isArray(Golongan.data)) {
      setFilteredPatients(Golongan.data);
    }
  }, [Golongan]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">List Daftar Golongan</span>
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
            data={Golongan.data}
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
                <div className="iq-header-Golongan">
                  <h4 className="card-Golongan font-widest">
                    Tabel List Daftar Golongan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/master-golongan/add-golongan"
                  label="Add Golongan"
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
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                      {
                        key: "kodeGolonganDarah",
                        label: "Kode Golongan Darah",
                      },
                      {
                        key: "namaGolonganDarah",
                        label: "Nama Golongan Darah",
                      },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaGolonganDarah",
                      idField: "golonganDarahId",
                    }}
                    basePath="/MasterData/master-informasi/master-golongan/edit-golongan"
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
