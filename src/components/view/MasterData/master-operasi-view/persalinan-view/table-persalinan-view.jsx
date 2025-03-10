"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FormProvider, useForm } from "react-hook-form";

import ButtonNav from "@/components/ui/button-navigation";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import {
  fetchPersalinan,
  fetchPersalinanWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-operasi/PersalinanSlice";

const TableDataPersalinan = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const {
    data: PersalinanData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.Persalinan);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPersalinan({ page, perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredData(PersalinanData);
  }, [PersalinanData]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Persalinan
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
            fetchFunction={fetchPersalinanWithFilters}
            setFilteredData={setFilteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-Persalinan">
                  <h4 className="card-Persalinan font-widest">
                    Tabel List Daftar Persalinan
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-operasi/persalinan/add-persalinan"
                  label="Tambah Persalinan"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Mengambil data, harap tunggu...</p>
                </div>
              ) : error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : filteredData.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "createByName", label: "Dibuat Oleh" },
                    { key: "createDateTime", label: "Tanggal Dibuat" },
                    { key: "kodePersalinan", label: "Kode Persalinan" },
                    { key: "namaPersalinan", label: "Nama Persalinan" },
                    { key: "tanggalPersalinan", label: "Tanggal Persalinan" },
                    { key: "tipePersalinan", label: "Tipe Persalinan" },
                    { key: "tindakanPersalinan", label: "Tindakan Persalinan" },
                    {
                      key: "subTindakanPersalinan",
                      label: "Sub-Tindakan Persalinan",
                    },
                    {
                      key: "komplikasiPersalinan",
                      label: "Komplikasi Persalinan",
                    },
                    { key: "namaKamar", label: "Nama Kamar" },
                    { key: "noKamar", label: "No Kamar" },
                    { key: "kategoriKamar", label: "Kategori Kamar" },
                    { key: "catatanPersalinan", label: "Catatan Persalinan" },
                    { key: "dokterPersalinan", label: "Dokter Persalinan" },
                    { key: "bidanPersalinan", label: "Bidan Persalinan" },
                    { key: "anastesiPersalinan", label: "Anastesi Persalinan" },
                    {
                      key: "observasiPersalinan",
                      label: "Observasi Persalinan",
                    },
                    { key: "namaBayi", label: "Nama Bayi" },
                    { key: "jenisKelaminBayi", label: "Jenis Kelamin Bayi" },
                    { key: "ttlBayi", label: "Tanggal Lahir Bayi" },
                    { key: "beratBayi", label: "Berat Bayi" },
                    { key: "panjangBayi", label: "Panjang Bayi" },
                    { key: "namaAyah", label: "Nama Ayah" },
                    { key: "namaIbu", label: "Nama Ibu" },
                    { key: "statusBayi", label: "Status Bayi" },
                  ]}
                  slugConfig={{
                    textField: "namaPersalinan",
                    idField: "persalinanId",
                  }}
                  basePath="/MasterData/master-operasi/persalinan/edit-persalinan"
                  paginationProps={{
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: perPage,
                    onPageChange: setPage,
                  }}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default TableDataPersalinan;
