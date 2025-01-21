"use client";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";

import { useEffect, useState } from "react";

import { dataTindakanOperasi } from "@/utils/masterData";
import ButtonNav from "@/components/ui/button-navigation";
dataTindakanOperasi;
const DaftarTindakanOperasi = () => {
  const methods = useForm();
  const [filteredTindakanOperasi, setFilteredTindakanOperasi] =
    useState(dataTindakanOperasi);

  // Hapus Data
  const handleRemovePatient = (id) => {
    const updatedPatients = filteredTindakanOperasi.filter(
      (patient) => patient.id !== id
    );
    setFilteredTindakanOperasi(updatedPatients);
  };

  const handleEdit = (row) => {
    console.log(row, "in click");
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
            data={dataTindakanOperasi}
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
                  label="Buat Janji"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredTindakanOperasi}
                  columns={[
                    { key: "id", label: "NO" },
                    { key: "namaTindakan", label: "Tindakan Operasi" },
                    { key: "jenisOperasi", label: "Jenis Operasi" },
                  ]}
                  itemsPerPage={10}
                  onRemove={handleRemovePatient}
                  onEdit={handleEdit}
                />
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
