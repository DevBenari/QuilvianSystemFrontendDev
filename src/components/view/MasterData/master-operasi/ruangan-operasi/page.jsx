"use client";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";
import { useRuanganOperasi } from "@/lib/hooks/manajemen-operasi/ruangan-operasi";
import { RuanganOperasiEdit } from "@/lib/hooks/manajemen-operasi/ruangan-operasi/edit";
import { addRuanganOperasi } from "@/lib/hooks/manajemen-operasi/ruangan-operasi/add";
// import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomTableComponent from "@/components/features/custom-table/custom-table/custom-table-edit-remove";

const TableRuanganOperasi = () => {
  const methods = useForm();
  const { ruanganOperasi, error } = useRuanganOperasi();
  const [filteredRuanganOperasi, setFilteredRuanganOperasi] =
    useState(ruanganOperasi);

  const [currentEditData, setCurrentEditData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Get Data
  useEffect(() => {
    if (ruanganOperasi) {
      setFilteredRuanganOperasi(ruanganOperasi);
    }
  }, [ruanganOperasi]);

  // Hapus Data
  const handleRemovePatient = (id) => {
    const updatedPatients = filteredRuanganOperasi.filter(
      (patient) => patient.id !== id
    );
    setFilteredRuanganOperasi(updatedPatients);
  };

  const handleSubmit = async (data) => {
    try {
      if (isEditMode && currentEditData) {
        // Edit Data
        const response = await RuanganOperasiEdit(data, currentEditData.id);
        alert("Operasi berhasil diperbarui!");
        console.log("Edit Response:", response);

        // Update data di state
        setFilteredRuanganOperasi((prev) =>
          prev.map((item) =>
            item.id === currentEditData.id ? { ...item, ...response } : item
          )
        );
      } else {
        // Tambah Data
        const response = await addRuanganOperasi(data);
        alert("Operasi berhasil ditambahkan!");
        console.log("Add Response:", response);

        // Tambahkan data baru ke state
        setFilteredRuanganOperasi((prev) => [...prev, response]);
      }

      setShowModal(false); // Tutup modal
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    }
  };

  const handleEdit = (id) => {
    const selectedData = filteredRuanganOperasi.find((item) => item.id === id);
    if (selectedData) {
      setCurrentEditData(selectedData);
      methods.reset(selectedData); // Isi form dengan data yang dipilih
      setIsEditMode(true);
      setShowModal(true);
    }
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
            data={ruanganOperasi}
            setFilteredPatients={setFilteredRuanganOperasi}
            onFilteredPatients={filteredRuanganOperasi}
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
                    Tabel Ruangan Operasi
                  </h4>
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
                {error && <div className="text-danger">{error}</div>}
                {!error && (
                  <CustomTableComponent
                    data={filteredRuanganOperasi}
                    columns={[
                      { key: "id", label: "NO" },
                      { key: "namaRuangan", label: "Nama Ruangan" },
                      { key: "lokasi", label: "Lokasi" },
                    ]}
                    itemsPerPage={10}
                    onRemove={handleRemovePatient}
                    onEdit={handleEdit}
                    labelEdit="Edit"
                    // onCustom={handleEditHarga}
                    // labelEdit="Edit"
                    // labelCustom="Edit Harga"
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
            <Form.Group controlId="namaRuangan">
              <Form.Label>Nama Ruangan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tipe Operasi"
                {...methods.register("namaRuangan", { required: true })}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="lokasi">
              <Form.Label>Lokasi Operasi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tipe Operasi"
                {...methods.register("lokasi", { required: true })}
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

export default TableRuanganOperasi;
