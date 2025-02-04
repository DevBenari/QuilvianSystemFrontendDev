"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Col, Row, Spinner } from "react-bootstrap";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import ButtonNav from "@/components/ui/button-navigation";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { useAnggota } from "@/lib/hooks/admisi/keanggotaan";

const TableAnggota = memo(() => {
  const methods = useForm();
  const { anggota, loading, error } = useAnggota();
  const [filteredAnggota, setFilteredAnggota] = useState(anggota);
  const router = useRouter();

  // Sinkronisasi data awal saat `anggota` berubah
  useEffect(() => {
    setFilteredAnggota(anggota);
    console.log("Data API diterima:", anggota);
  }, [anggota]);

  const handleDelete = (id) => {
    alert(`Anggota dengan ID ${id} berhasil dihapus!`);
    // Tambahkan logic penghapusan sesuai kebutuhan di sini
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Anggota</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={anggota}
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
                <h4 className="card-title font-widest">Tabel Anggota</h4>
                <ButtonNav
                  path="/pendaftaran/keanggotaan/addAnggota"
                  label="Add Anggota"
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
                    data={filteredAnggota}
                    columns={[
                      { key: "no", label: "No" },
                      { key: "nama", label: "Nama" },
                      { key: "noRekamMedis", label: "No RM" },
                      { key: "tanggalDaftar", label: "Tanggal Mulai" },
                      { key: "tipeMember", label: "Jenis" },
                      { key: "statusMember", label: "Status" },
                    ]}
                    slugConfig={{
                      textField: "nama",
                      idField: "id",
                    }}
                    basePath="/pendaftaran/keanggotaan/editAnggota"
                    itemsPerPage={5}
                    onRemove={handleDelete}
                    labelEdit="Edit"
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
});

TableAnggota.displayName = "TableAnggota";
export default TableAnggota;
