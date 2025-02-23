"use client";

import React, { Fragment, memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBayi, useBayi } from "@/lib/hooks/admisi/pasienBayi";

import { Col, Row, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import ButtonNav from "@/components/ui/button-navigation";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const DashboardPendaftaranBayi = memo(() => {
  const router = useRouter();
  const { bayi, loading, error } = useBayi();
  const [filteredPatientsBayi, setFilteredPatientsBayi] = useState(bayi);

  useEffect(() => {
    if (bayi) {
      setFilteredPatientsBayi(bayi);
    }
  }, [bayi]);

  const handleAdd = () => {
    router.push("/pendaftaran/pendaftaran-pasien-baru");
  };

  const handleEdit = (id) => {
    router.push(
      `/pendaftaran/pendaftaran-pasien-bayi/edit-pasien-bayi?id=${id}`
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteBayi(id);
      alert("Data berhasil dihapus!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data.");
    }
  };

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Pasien Bayi</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={bayi}
            setFilteredPatients={setFilteredPatientsBayi}
            onFilteredPatients={filteredPatientsBayi}
          />
        </Col>
      </Col>

      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title font-widest">Tabel Pasien Bayi</h4>
                <ButtonNav
                  path="/pendaftaran/pendaftaran-pasien-baru"
                  label="Add Pasien Bayi"
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
                    data={filteredPatientsBayi}
                    columns={[
                      { key: "no", label: "No" },
                      {
                        key: "namaPasienMelahirkan",
                        label: "Nama Pasien Melahirkan",
                      },
                      { key: "dokter", label: "Dokter" },
                      { key: "kelas", label: "Kelas" },
                      { key: "ruang", label: "Ruang" },
                    ]}
                    slugConfig={{
                      textField: "namaPasienMelahirkan",
                      idField: "id",
                    }}
                    basePath="/pendaftaran/pendaftaran-pasien-bayi/edit-pasien-bayi"
                    itemsPerPage={8}
                    onRemove={handleDelete}
                    onEdit={handleEdit}
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

DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi";
export default DashboardPendaftaranBayi;
