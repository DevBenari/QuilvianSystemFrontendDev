"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { fetchIdentitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";

const TableDataIdentitas = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // Ambil data dari Redux Store
  const {
    data: identitasData,
    loading,
    error,
  } = useSelector((state) => state.identitas);

  // Gunakan useMemo untuk menghindari perhitungan ulang yang tidak perlu
  const identitasList = useMemo(() => {
    return Array.isArray(identitasData) ? identitasData : [];
  }, [identitasData]);

  // State untuk hasil filter pencarian
  const [filteredIdentitas, setFilteredIdentitas] = useState(identitasList);

  // Fetch data saat pertama kali render
  useEffect(() => {
    dispatch(fetchIdentitas());
  }, [dispatch]);

  // Update filteredIdentitas ketika identitasList berubah
  useEffect(() => {
    setFilteredIdentitas(identitasList);
  }, [identitasList]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Identitas
            </span>
          </h2>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={identitasData}
            setFilteredPatients={setFilteredIdentitas}
            onFilteredPatients={filteredIdentitas}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Identitas">
                  <h4 className="card-Identitas font-widest">
                    Tabel List Daftar Identitas
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-informasi/identitas/add-identitas"
                  label="Tambah Identitas"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>

              {/* Tampilkan loading spinner jika sedang mengambil data */}
              {loading && (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Mengambil data, harap tunggu...</p>
                </div>
              )}

              {/* Tampilkan pesan jika terjadi error */}
              {!loading && error && (
                <Alert variant="danger" className="text-center mt-3">
                  {error}
                </Alert>
              )}

              {/* Tampilkan pesan jika data kosong */}
              {!loading && !error && identitasList.length === 0 && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {/* Tampilkan tabel jika ada data */}
              {!loading && !error && identitasList.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredIdentitas}
                    columns={[
                      { key: "kodeIdentitas", label: "Kode Identitas" },
                      { key: "jenisIdentitas", label: "Jenis Identitas" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "kodeIdentitas",
                      idField: "identitasId",
                    }}
                    basePath="/MasterData/master-informasi/identitas/edit-identitas"
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

export default TableDataIdentitas;
