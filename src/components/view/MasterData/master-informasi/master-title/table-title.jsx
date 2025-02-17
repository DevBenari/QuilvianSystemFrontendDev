"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTitles } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";

const TableDataTitle = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: titlesData,
    loading,
    error,
  } = useSelector((state) => state.titles);

  // Gunakan useMemo untuk menghitung ulang titles hanya ketika titlesData berubah
  const titles = useMemo(() => titlesData?.data || [], [titlesData]);
  console.log(titles);

  const [filteredTitles, setFilteredTitles] = useState(titles);

  useEffect(() => {
    dispatch(fetchTitles());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTitles(titles); // Update filteredTitles setelah titles diubah
  }, [titles]);

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
            data={titles}
            setFilteredData={setFilteredTitles} 
            filterFields={["namaTitle", "kodeTitle"]} 
            dateField="createDateTime"
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
                  path="/MasterData/master-informasi/title/add-title"
                  label="Add Title"
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
              {!loading && (error || titles.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && titles.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredTitles}
                    columns={[
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                      { key: "kodeTitle", label: "Kode Title" },
                      { key: "namaTitle", label: "Nama Title" },
                      {
                        key: "createDateTime",
                        label: "Tanggal Dibuat",
                      },
                      {
                        key: "createBy",
                        label: "Dibuat Oleh",
                      },
                      {
                        key: "updateDateTime",
                        label: "Tanggal Update",
                      },
                      {
                        key: "updateBy",
                        label: "Update Oleh",
                      },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{ textField: "namaTitle", idField: "titleId" }} // Menggunakan titleId untuk slug
                    basePath="/MasterData/master-informasi/title/edit-title"
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

export default TableDataTitle;
