"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendidikan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";

const TableDataPendidikan = () => {
  const methods = useForm();

  const dispatch = useDispatch();
  const {
    data: pendidikanData,
    loading,
    error,
  } = useSelector((state) => state.pendidikan);

  // Gunakan useMemo untuk menghitung ulang pendidikan hanya ketika pendidikanData berubah
  const pendidikan = useMemo(
    () => pendidikanData?.data || [],
    [pendidikanData]
  );

  const [filteredpendidikan, setFilteredpendidikan] = useState(pendidikan);

  useEffect(() => {
    dispatch(fetchPendidikan());
  }, [dispatch]);

  useEffect(() => {
    setFilteredpendidikan(pendidikan); // Update filteredpendidikan setelah pendidikan diubah
  }, [pendidikan]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br></br>{" "}
            <span className="letter-spacing fw-bold">
              List Daftar Pendidikan
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
            data={pendidikan}
            setFilteredPatients={setFilteredpendidikan}
            onFilteredPatients={filteredpendidikan}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Pendidikan">
                  <h4 className="card-Pendidikan font-widest">
                    Tabel List Daftar Pendidikan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/master-pendidikan/add-pendidikan"
                  label="Add Pendidikan"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
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
              {!loading && (error || pendidikan.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}
              {!loading && !error && pendidikan.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredpendidikan}
                    columns={[
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut
                      { key: "kodePendidikan", label: "Kode Pendidikan" },
                      { key: "namaPendidikan", label: "Nama Pendidikan" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaPendidikan",
                      idField: "pendidikanId",
                    }}
                    basePath="/MasterData/master-informasi/master-pendidikan/edit-form-pendidikan"
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

export default TableDataPendidikan;
