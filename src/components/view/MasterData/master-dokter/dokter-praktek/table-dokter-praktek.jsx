"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";

import { fetchDokterPraktek } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";

const TableDokterPraktek = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  // Ambil data dari Redux Store
  const {
    data: dokterPraktekData,
    loading,
    error,
  } = useSelector((state) => state.dokterPraktek);

  // Transformasi data untuk memasukkan nama dokter langsung dari objek "dokters"
  const dokterPraktekList = useMemo(() => {
    if (!Array.isArray(dokterPraktekData)) return [];

    return dokterPraktekData.map((praktek) => ({
      ...praktek,
      namaDokter: praktek.dokters?.nmDokter || "Tidak Diketahui", // Ambil nmDokter dari dokters
      kodeDokter: praktek.dokters?.kdDokter || "Tidak Diketahui", // Ambil nmDokter dari dokters
    }));
  }, [dokterPraktekData]);

  // State untuk hasil filter pencarian
  const [filteredDokterPraktek, setFilteredDokterPraktek] =
    useState(dokterPraktekList);

  // Fetch data saat pertama kali render
  useEffect(() => {
    dispatch(fetchDokterPraktek());
  }, [dispatch]);

  // Update filteredDokterPraktek ketika dokterPraktekList berubah
  useEffect(() => {
    setFilteredDokterPraktek(dokterPraktekList);
  }, [dokterPraktekList]);

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">
            Master Data <br />
            <span className="letter-spacing fw-bold">
              List Daftar Dokter Praktek
            </span>
          </h2>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={dokterPraktekData}
            setFilteredPatients={setFilteredDokterPraktek}
            onFilteredPatients={filteredDokterPraktek}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-dokterPraktek">
                  <h4 className="card-dokterPraktek font-widest">
                    Tabel List Daftar Dokter Praktek
                  </h4>
                </div>
                <ButtonNav
                  path="/MasterData/master-dokter/dokter-praktek/add-dokter-praktek"
                  label="Tambah Dokter Praktek"
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
              {!loading && !error && dokterPraktekList.length === 0 && (
                <Alert variant="warning" className="text-center mt-3">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              )}

              {/* Tampilkan tabel jika ada data */}
              {!loading && !error && dokterPraktekList.length > 0 && (
                <div className="iq-card-body">
                  <CustomTableComponent
                    data={filteredDokterPraktek}
                    columns={[
                      { key: "kodeDokter", label: "Kode Dokter" }, // Nama dokter dari objek "dokters"
                      { key: "namaDokter", label: "Nama Dokter" }, // Nama dokter dari objek "dokters"
                      { key: "layanan", label: "Layanan" },
                      { key: "jamPraktek", label: "Jam Praktek" },
                      { key: "hari", label: "Hari" },
                      { key: "jamMasuk", label: "Tanggal Masuk" },
                      { key: "jamKeluar", label: "Tanggal Keluar" },
                    ]}
                    itemsPerPage={10}
                    slugConfig={{
                      textField: "dokter",
                      idField: "dokterPraktekId",
                    }}
                    basePath="/MasterData/master-dokter/dokter-praktek/edit-dokter-praktek"
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

export default TableDokterPraktek;
