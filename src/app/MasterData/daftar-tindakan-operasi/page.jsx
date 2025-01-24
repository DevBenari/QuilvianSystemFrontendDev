"use client";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";

import { useEffect, useState } from "react";

import ButtonNav from "@/components/ui/button-navigation";

import { useRouter } from "next/navigation";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { useTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi";

const DaftarTindakanOperasi = () => {
  const methods = useForm();
  const { tindakanOperasi, loading, error } = useTindakanOperasi();
  const [filteredTindakanOperasi, setFilteredTindakanOperasi] =
    useState(tindakanOperasi);
  const router = useRouter();

  // Get Data
  useEffect(() => {
    if (tindakanOperasi) {
      setFilteredTindakanOperasi(tindakanOperasi);
    }
  }, [tindakanOperasi]);

  const handleEdit = (id) => {
    router.push(
      `/MasterData/daftar-tindakan-operasi/edit-tindakan-operasi?id=${id}`
    );
  };

  const handleEditHarga = (id) => {
    router.push(
      `/MasterData/daftar-tindakan-operasi/edit-harga-tindakan-operasi?id=${id}`
    );
  };

  // Hapus Data
  const handleRemovePatient = (id) => {
    const updatedPatients = filteredTindakanOperasi.filter(
      (patient) => patient.id !== id
    );
    setFilteredTindakanOperasi(updatedPatients);
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={tindakanOperasi}
            setFilteredPatients={setFilteredTindakanOperasi}
            onFilteredPatients={filteredTindakanOperasi}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">Tabel Operasi</h4>
                </div>
                <ButtonNav
                  path="/MasterData/daftar-tindakan-operasi/tambah-tindakan-operasi"
                  label="Tambah Tindakan Operasi"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              <div className="iq-card-body">
                {loading && <div>Loading...</div>}
                {error && <div className="text-danger">{error}</div>}
                {!loading && !error && (
                  <CustomTableComponent
                    data={filteredTindakanOperasi}
                    columns={[
                      { key: "id", label: "NO" },
                      { key: "namaTindakanOperasi", label: "Tindakan Operasi" },
                      { key: "tipeOperasi", label: "Jenis Operasi" },
                    ]}
                    itemsPerPage={10}
                    onRemove={handleRemovePatient}
                    onEdit={handleEdit}
                    onCustom={handleEditHarga}
                    labelEdit="Edit"
                    labelCustom="Edit Harga"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal Bootstrap */}
    </FormProvider>
  );
};

export default DaftarTindakanOperasi;
