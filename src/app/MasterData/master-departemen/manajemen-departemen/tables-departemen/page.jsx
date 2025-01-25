"use client";
import React, { useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { ManajemenDepartemen } from "@/utils/masterData";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import CustomTableComponent from "@/components/features/custom-table/CustomTable/custom-table";

const TableListManajemenDepartemen = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(ManajemenDepartemen);
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
              List Daftar Departemen
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
          <CustomSearchFilter
            data={ManajemenDepartemen}
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
                    Tabel Daftar Departemen
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-departemen/manajemen-departemen/add-departemen"
                  label="Add Departemen"
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
                    { key: "namaDepartemen", label: "Nama Departemen" },
                    { key: "penanggungJawab", label: "Penanggung Jawab" },
                    { key: "jamOperasional", label: "Jam Operasional" },
                    { key: "ruangan", label: "Ruangan" },
                    { key: "lineTelp", label: "No Telp" },
                    { key: "tanggalPembuatan", label: "Tanggal Pembuatan" },
                    { key: "deskripsi", label: "Deskripsi" },
                  ]}
                  itemsPerPage={10}
                  onRemove={handleRemovePatient}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};
export default TableListManajemenDepartemen;
