"use client";
import React, { useEffect, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useIndentitas } from "@/lib/hooks/Indentitas";

const TableDataIndentitas = () => {
  const methods = useForm();
  const { Indentitas, loading, error } = useIndentitas();
  const [filteredPatients, setFilteredPatients] = useState(
    Indentitas.data || []
  );

  useEffect(() => {
    if (Indentitas && Array.isArray(Indentitas.data)) {
      setFilteredPatients(Indentitas.data);
    }
  }, [Indentitas]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Indentitas
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
            data={Indentitas.data}
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
                <div className="iq-header-Indentitas">
                  <h4 className="card-Indentitas font-widest">
                    Tabel List Daftar Indentitas
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-Indentitas/add-Indentitas"
                  label="Add Indentitas"
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
                    { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                    { key: "kodeIndentitas", label: "Kode Indentitas" },
                    { key: "namaIndentitas", label: "Nama Indentitas" },
                  ]}
                  itemsPerPage={10}
                  slugConfig={{
                    textField: "namaIndentitas",
                    idField: "IndentitasId",
                  }} // Menggunakan IndentitasId untuk slug
                  basePath="/MasterData/master-Indentitas/edit-Indentitas"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataIndentitas;
