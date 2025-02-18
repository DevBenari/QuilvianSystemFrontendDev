"use client";
import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row, Spinner } from "react-bootstrap";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { pasienLama } from "@/utils/dataPasien";

const PasienLama = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(pasienLama);

  // Sinkronisasi data awal
  useEffect(() => {
    setFilteredData(pasienLama);
  }, []);

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian Pasien Lama" />

      <Col lg="12" className="iq-card p-4 mt-3">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Pasien Lama</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={pasienLama}
            setFilteredPatients={setFilteredData}
            onFilteredPatients={filteredData}
          />
        </Col>
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">Tabel Pasien Lama</h4>
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "noRm", label: "No RM" },
                    { key: "oldRm", label: "Old RM" },
                    { key: "nama", label: "Nama" },
                    { key: "alamat", label: "Alamat" },
                    {
                      key: "tempatTanggalLahir",
                      label: "Tempat Tanggal Lahir",
                    },
                  ]}
                  slugConfig={{
                    textField: "nama",
                    idField: "id",
                  }}
                  basePath="/pendaftaran/pasien-lama/edit-pasien-lama"
                  itemsPerPage={5}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
});

PasienLama.displayName = "PasienLama";
export default PasienLama;
