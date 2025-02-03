"use client";
import React, { useEffect, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";

import { Spinner } from "react-bootstrap";
import { useAgama } from "@/lib/hooks/masterData/master-informasi/agama";

const TableDataAgama = () => {
  const methods = useForm();
  const { Agama, loading, error } = useAgama();
  const [filteredPatients, setFilteredPatients] = useState(Agama.data || []);

  useEffect(() => {
    if (Agama && Array.isArray(Agama.data)) {
      setFilteredPatients(Agama.data);
    }
  }, [Agama]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">List Daftar Agama</span>
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
            data={Agama.data}
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
                <div className="iq-header-agama">
                  <h4 className="card-Agama font-widest">
                    Tabel List Daftar Agama
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/master-agama/add-form-agama"
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
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredPatients}
                    columns={[
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                      { key: "agamaKode", label: "Kode Agama" },
                      { key: "jenisAgama", label: "Nama Agama" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{ textField: "jenisAgama", idField: "agamaId" }} // Menggunakan AgamaId untuk slug
                    basePath="/MasterData/master-informasi/master-agama/edit-agama"
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

export default TableDataAgama;
