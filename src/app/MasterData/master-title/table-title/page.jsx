"use client";
import React, { useEffect, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useTitle } from "@/lib/hooks/title";

const TableDataTitle = () => {
  const methods = useForm();
  const { title, loading, error } = useTitle();
  const [filteredPatients, setFilteredPatients] = useState(title.data || []);

  useEffect(() => {
    if (title && Array.isArray(title.data)) {
      setFilteredPatients(title.data);
    }
  }, [title]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">List Daftar Title</span>
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
            data={title.data}
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
                    Tabel List Daftar Title
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-title/add-title"
                  label="Add Title"
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
                    { key: "kodeTitle", label: "Kode Title" },
                    { key: "namaTitle", label: "Nama Title" },
                  ]}
                  itemsPerPage={10}
                  slugConfig={{ textField: "namaTitle", idField: "titleId" }} // Menggunakan titleId untuk slug
                  basePath="/MasterData/master-title/edit-title"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataTitle;
