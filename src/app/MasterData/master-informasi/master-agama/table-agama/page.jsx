"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import ButtonNav from "@/components/ui/button-navigation";
import { fetchAgama } from "@/lib/state/slices/MasterData/master-informasi/AgamaSlice";

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
                  path="/MasterData/master-informasi/master-agama/add-form-agama"
                  label="Add Agama"
                  icon="ri-add-fill"
                  size="sm"
                  className="btn btn-sm iq-bg-success"
                />
              </div>

              {loading && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {error && <div className="text-danger">{error}</div>}
              {!loading && !error && (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "agamaKode", label: "Kode Agama" },
                    { key: "jenisAgama", label: "Nama Agama" },
                  ]}
                  itemsPerPage={10}
                  slugConfig={{ textField: "jenisAgama", idField: "agamaId" }}
                  basePath="/MasterData/master-informasi/master-agama/edit-agama"
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
