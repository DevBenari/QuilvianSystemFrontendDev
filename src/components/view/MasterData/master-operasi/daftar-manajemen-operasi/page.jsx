"use client";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useManajemenOperasi } from "@/lib/hooks/masterData/manajemen-operasi/manajemenOperasi";
import { addOperasi } from "@/lib/hooks/masterData/manajemen-operasi/manajemenOperasi/index";
import { OperasiEdit } from "@/lib/hooks/masterData/manajemen-operasi/manajemenOperasi/index";
import TextField from "@/components/ui/text-field";
import NumberField from "@/components/ui/distance-filed";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const TableManajemenOperasi = () => {
  const methods = useForm();
  const { operasi, error } = useManajemenOperasi();
  const [filteredOperasi, setFilteredOperasi] = useState(operasi);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);

  useEffect(() => {
    setFilteredOperasi(operasi);
  }, [operasi]);

  const handleSubmit = async (data) => {
    try {
      if (isEditMode && currentEditData?.id) {
        // Edit existing data
        await OperasiEdit(data, currentEditData.id);
      } else {
        // Add new data
        await addOperasi(data);
      }
      setShowModal(false);
      methods.reset();
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (id) => {
    const selectedData = filteredOperasi.find((item) => item.id === id);
    if (selectedData) {
      setCurrentEditData(selectedData);
      methods.reset(selectedData);
      setIsEditMode(true);
      setShowModal(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={operasi}
            setFilteredPatients={setFilteredOperasi}
            onFilteredPatients={filteredOperasi}
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
                <Button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    setShowModal(true);
                    setIsEditMode(false);
                    methods.reset();
                  }}
                >
                  Tambah
                </Button>
              </div>
              <div className="iq-card-body">
                {!error && (
                  <CustomTableComponent
                    data={filteredOperasi}
                    columns={[
                      { key: "id", label: "NO" },
                      { key: "tipeOperasi", label: "Tipe Operasi" },
                    ]}
                    itemsPerPage={10}
                    onRemove={(id) =>
                      setFilteredOperasi((prev) =>
                        prev.filter((item) => item.id !== id)
                      )
                    }
                    onEdit={handleEdit}
                    labelEdit="Edit"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal Bootstrap */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Tipe Operasi" : "Tambah Tipe Operasi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={methods.handleSubmit(handleSubmit)}>
            <TextField
              name="tipeOperasi"
              label="Tipe Operasi"
              type="text"
              placeholder="Masukkan Tipe Operasi"
              rules={{ required: "Tipe Operasi harus diisi" }}
              className="mb-3"
            />
            <NumberField
              name="urutan"
              label="Urutan"
              type="number"
              placeholder="Masukkan Urutan"
              rules={{ required: "Urutan harus diisi" }}
              className="mb-3"
            />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button type="submit" variant="primary" className="mx-2">
                {isEditMode ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </FormProvider>
  );
};

export default TableManajemenOperasi;
