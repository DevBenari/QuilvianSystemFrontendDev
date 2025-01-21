"use client";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";
import { useManajemenOperasi } from "@/lib/hooks/manajemenOperasi";
import { useEffect, useState } from "react";
import { addOperasi } from "@/lib/hooks/manajemenOperasi/add";
import { OperasiEdit } from "@/lib/hooks/manajemenOperasi/edit";

const DashboardManajemenOperasi = () => {
  const methods = useForm();
  const { operasi, error } = useManajemenOperasi();
  const [filteredOperasi, setFilteredOperasi] = useState(operasi);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);

  useEffect(() => {
    setFilteredOperasi(operasi);
    console.log("Data yang diterima ", operasi);
  }, [operasi]);

  // Tambah Data
  const handleSubmit = async (data) => {
    try {
      if (isEditMode && currentEditData) {
        // Edit Data
        const response = await OperasiEdit(data, currentEditData.id);
        alert("Operasi berhasil diperbarui!");
        console.log("Edit Response:", response);

        // Update data di state
        setFilteredOperasi((prev) =>
          prev.map((item) =>
            item.id === currentEditData.id ? { ...item, ...response } : item
          )
        );
      } else {
        // Tambah Data
        const response = await addOperasi(data);
        alert("Operasi berhasil ditambahkan!");
        console.log("Add Response:", response);

        // Tambahkan data baru ke state
        setFilteredOperasi((prev) => [...prev, response]);
      }

      setShowModal(false); // Tutup modal
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    }
  };

  // Edit Data
  const handleEdit = (id) => {
    const selectedData = filteredOperasi.find((item) => item.id === id);
    if (selectedData) {
      setCurrentEditData(selectedData);
      methods.reset(selectedData); // Isi form dengan data yang dipilih
      setIsEditMode(true);
      setShowModal(true);
    }
  };

  // Hapus Data
  const handleRemovePatient = (id) => {
    const updatedPatients = filteredOperasi.filter(
      (patient) => patient.id !== id
    );
    setFilteredOperasi(updatedPatients);
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
                    methods.reset(); // Reset form untuk mode tambah
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
                    onRemove={handleRemovePatient}
                    onEdit={handleEdit}
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
            <Form.Group controlId="tipeOperasi">
              <Form.Label>Tipe Operasi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tipe Operasi"
                {...methods.register("tipeOperasi", { required: true })}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="urutan">
              <Form.Label>Urutan</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan Urutan"
                {...methods.register("urutan", { required: true })}
                className="mb-3"
              />
            </Form.Group>
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

export default DashboardManajemenOperasi;
