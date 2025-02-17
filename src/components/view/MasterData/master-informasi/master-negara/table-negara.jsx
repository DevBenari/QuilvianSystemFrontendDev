"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNegara } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";

const TableDataNegara = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const {
    data: negaraData,
    loading,
    error,
  } = useSelector((state) => state.negara);

  // Gunakan useMemo untuk menghitung ulang negara hanya ketika negaraData berubah
  const negaraList = useMemo(() => negaraData?.data || [], [negaraData]);

  const [filteredNegara, setFilteredNegara] = useState(negaraList);

  // Fetch data negara saat komponen di-mount
  useEffect(() => {
    dispatch(fetchNegara());
  }, [dispatch]);

  // Update filteredNegara setelah negaraList diubah
  useEffect(() => {
    setFilteredNegara(negaraList);
  }, [negaraList]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Negara</span>
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
            data={negaraList}
            setFilteredData={setFilteredNegara}
            filterFields={["negara"]}
            dateField="createDateTime"
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Negara">
                  <h4 className="card-Negara font-widest">
                    Tabel List Daftar Negara
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/negara/add-negara"
                  label="Add Negara"
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
              {!loading && (error || negaraList.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && negaraList.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredNegara}
                    columns={[
                      { key: "no", label: "No" }, // Kolom nomor urut

                      { key: "kodeNegara", label: "Kode Negara" },
                      { key: "namaNegara", label: "Nama Negara" },
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
                    slugConfig={{
                      textField: "namaNegara",
                      idField: "negaraId",
                    }}
                    basePath="/MasterData/master-informasi/negara/edit-negara"
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

export default TableDataNegara;
