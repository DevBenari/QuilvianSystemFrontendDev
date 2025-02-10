"use client";
import React, { useEffect, useState, useMemo } from "react";
import ButtonNav from "@/components/ui/button-navigation";

import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";

import { useSelector, useDispatch } from "react-redux";
import { fetchGolongan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";

const TableDataGolongan = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: golonganData,
    loading,
    error,
  } = useSelector((state) => state.golongan);

  // Gunakan useMemo untuk menghitung ulang golongan hanya ketika golonganData berubah
  const golongan = useMemo(() => golonganData?.data || [], [golonganData]);

  const [filteredgolongan, setFilteredgolongan] = useState(golongan);

  useEffect(() => {
    dispatch(fetchGolongan());
  }, [dispatch]);

  useEffect(() => {
    setFilteredgolongan(golongan); // Update filteredgolongan setelah golongan diubah
  }, [golongan]);

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
            data={golongan}
            setFilteredPatients={setFilteredgolongan}
            onFilteredPatients={filteredgolongan}
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
                  path="/MasterData/master-informasi/golongan-darah/add-golongan"
                  label="Add Golongan"
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
              {!loading && (error || golongan.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && golongan.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredgolongan}
                    columns={[
                      { key: "no", label: "No" }, // Tambahkan kolom nomor urut

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
                    basePath="/MasterData/master-informasi/golongan-darah/edit-golongan"
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
