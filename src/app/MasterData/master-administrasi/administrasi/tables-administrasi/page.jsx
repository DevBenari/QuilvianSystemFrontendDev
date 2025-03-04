"use client";
import React, { useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilterNonApi from "@/components/features/custom-search/CustomSearchComponen/custom-search-non-api";

const TableListDaftarAdministrasi = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(
    administrasiRawatJalan
  );
  const handleRemovePatient = (id) => {
    const updatedPatients = filteredPatients.filter(
      (patient) => patient.id !== id
    );
    setFilteredPatients(updatedPatients);
  };
  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Administrasi
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
          <CustomSearchFilterNonApi
            data={administrasiRawatJalan}
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
                    Tabel Daftar Administrasi
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-administrasi/administrasi/add-administrasi"
                  label="Add Administrasi"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredPatients}
                  columns={[
                    { key: "id", label: "ID" },
                    { key: "namaAdministrasi", label: "Nama Administrasi" },
                    { key: "tipeRawat", label: "Tipe Rawat" },
                    { key: "tipeAdministrasi", label: "Tipe Administrasi" },
                    { key: "kelompokUsia", label: "Kelompok Usia" },
                    { key: "departement", label: "Departement" },
                  ]}
                  itemsPerPage={10}
                  onRemove={handleRemovePatient}
                  slugConfig={{ textField: "namaAdministrasi", idField: "id" }}
                  basePath="/MasterData/master-administrasi/administrasi/edit-rawat-jalan"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};
export default TableListDaftarAdministrasi;
