"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useDispatch, useSelector } from "react-redux";
fetchnegar


const TableDataNegara = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const {
    data: NegaraData,
    loading,
    error,
  } = useSelector((state) => state.Negara);

  const Negara = useMemo(() => NegaraData?.data || [], [NegaraData]);

  const [filteredNegara, setFilteredNegara] = useState(Negara);

  useEffect(() => {
    dispatch(fetchNegara());
  }, [dispatch]);

  useEffect(() => {
    setFilteredNegara(Negara);
  }, [Negara]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Negara
            </span>
          </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => dispatch(fetchNegara())}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={Negara}
            setFilteredPatients={setFilteredNegara}
            onFilteredPatients={filteredNegara}
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
                  path="/MasterData/master-informasi/master-Negara/add-Negara"
                  label="Add Negara"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
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
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredNegara}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "kodeNegara", label: "Kode Negara" },
                      { key: "namaNegara", label: "Nama Negara" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "namaNegara",
                      idField: "NegaraId",
                    }}
                    basePath="/MasterData/master-informasi/master-Negara/edit-Negara-form"
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
