"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import ButtonNav from "@/components/ui/button-navigation";
import { fetchAgama } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";

const TableDataAgama = () => {
  const dispatch = useDispatch();
  const {
    data: agamaData,
    loading,
    error,
  } = useSelector((state) => state.agama);
  const methods = useForm();

  const agama = useMemo(() => agamaData?.data || [], [agamaData]);

  const [filteredData, setFilteredData] = useState(agama);

  useEffect(() => {
    dispatch(fetchAgama());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(agama);
  }, [agama]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Master Data - List Daftar Agama</h2>
        </div>
        <CustomSearchFilter
          data={agama}
          setFilteredPatients={setFilteredData}
          onFilteredPatients={filteredData}
        />
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">
                  Tabel List Daftar Agama
                </h4>
                <ButtonNav
                  path="/MasterData/master-informasi/agama/add-agama"
                  label="Add Agama"
                  icon="ri-add-fill"
                  size="sm"
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
              {!loading && (error || agama.length === 0) && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {!loading && !error && agama.length > 0 && (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "jenisAgama", label: "Nama Agama" },
                  ]}
                  itemsPerPage={10}
                  slugConfig={{ textField: "jenisAgama", idField: "agamaId" }}
                  basePath="/MasterData/master-informasi/agama/edit-agama"
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataAgama;
