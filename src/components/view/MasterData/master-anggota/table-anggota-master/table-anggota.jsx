"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { fetchAnggota } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-anggota/anggotaSlice";

const TableDataAnggota = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // Ambil data dari Redux Store
  const {
    data: AnggotaData,
    loading,
    error,
  } = useSelector((state) => state.anggota);

  // Gunakan useMemo untuk menghindari perhitungan ulang yang tidak perlu
  const AnggotaList = useMemo(() => {
    return Array.isArray(AnggotaData) ? AnggotaData : [];
  }, [AnggotaData]);

  // State untuk hasil filter pencarian
  const [filteredAnggota, setFilteredAnggota] = useState(AnggotaList);

  // Fetch data saat pertama kali render
  useEffect(() => {
    dispatch(fetchAnggota());
  }, [dispatch]);

  // Update filteredAnggota ketika AnggotaList berubah
  useEffect(() => {
    setFilteredAnggota(AnggotaList);
  }, [AnggotaList]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">List Daftar Anggota</span>
          </h2>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={AnggotaData}
            setFilteredPatients={setFilteredAnggota}
            onFilteredPatients={filteredAnggota}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Anggota">
                  <h4 className="card-Anggota font-widest">
                    Tabel List Daftar Anggota
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-anggota/add-anggota"
                  label="Tambah Anggota"
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
              {!loading && !error && AnggotaList.length === 0 && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {/* Tampilkan tabel jika ada data */}
              {!loading && !error && AnggotaList.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredAnggota}
                    columns={[
                      { key: "keangotaanKode", label: "Kode Anggota" },
                      { key: "jenisKeangotaan", label: "Jenis Anggota" },
                      { key: "jenisPromo", label: "Jenis Promo" },
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
                      textField: "keangotaanKode",
                      idField: "keangotaanId",
                    }}
                    basePath="/MasterData/master-anggota/edit-anggota"
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

export default TableDataAnggota;
