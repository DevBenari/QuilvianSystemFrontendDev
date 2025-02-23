"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col,Spinner, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { fetchPasienSlice, fetchPasienWithFilters } from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";

const ListPasienBaruPage = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Ambil data dari Redux store
  const {
    data: pasienData,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.pasien);

  const [page,setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPasienSlice({page,perPage}));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredPatients(pasienData);

  }, [pasienData])
  // Tampilkan loading jika data sedang dimuat
  if (loading) {
    return <div>Loading data pasien...</div>;
  }

  // Tampilkan pesan error jika ada kesalahan
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Table List Pasien Baru</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            fetchFunction={fetchPasienWithFilters}
            setFilteredData={setFilteredPatients}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">
                    Tabel Daftar Pasien Baru
                  </h4>
                </div>
                <ButtonNav
                  path="/pendaftaran/pendaftaran-pasien-baru/add-pasien-baru"
                  label="Tambah Pasien"
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
              ) : filteredPatients.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <i className="ri-information-line me-2"></i>
                  Tidak ada data yang tersedia.
                </Alert>
              ) : (
                <CustomTableComponent
                  data={filteredPatients}
                  columns={[
                    { key: "no", label: "No" },
                    { key: "kodePasien", label: "Kode Pasien" },
                    { key: "noRekamMedis", label: "Rekam Medis" },
                    { key: "namaLengkap", label: "Nama Pasien" },
                    { key: "jenisKelamin", label: "Jenis Kelamin" },
                    
                  ]}
                  slugConfig={{ textField: "namaLengkap", idField: "pasienId" }}
                  basePath="/"
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

export default ListPasienBaruPage;
