"use client";
import { Container, Modal, Form } from "react-bootstrap";
import React, { memo, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
const PengaturanAntrian = memo(() => {
  const methods = useForm();
  const [kiosAntrian, setKiosAntrian] = useState([
    { id: 1, name: "AdminKasir" },
    { id: 2, name: "Kios 1" },
    { id: 3, name: "Reception" },
  ]);
  const [tombolAntrian, setTombolAntrian] = useState([
    {
      id: 1,
      name: "ADMISSION",
      description: "Pendaftaran Rawat Inap",
      code: "D",
    },
    {
      id: 2,
      name: "ADMISSION OLD",
      description: "Pendaftaran Rawat Inap",
      code: "A",
    },
    { id: 3, name: "CASHIER", description: "Kasir", code: "C" },
    {
      id: 4,
      name: "REGISTRATION",
      description: "Pendaftaran Rawat Jalan",
      code: "R",
    },
  ]);
  const [kiosTombolAntrian, setKiosTombolAntrian] = useState([
    { id: 1, kiosName: "AdminKasir", tombolName: "ADMISSION" },
    { id: 2, kiosName: "Kios 1", tombolName: "ADMISSION OLD" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentTable, setCurrentTable] = useState("");

  const handleAdd = (table) => {
    setCurrentTable(table);
    setModalData({});
    setShowModal(true);
  };

  const handleEdit = (table, data) => {
    setCurrentTable(table);
    setModalData(data);
    setShowModal(true);
  };

  const handleDelete = (table, id) => {
    if (table === "kiosAntrian")
      setKiosAntrian(kiosAntrian.filter((item) => item.id !== id));
    if (table === "tombolAntrian")
      setTombolAntrian(tombolAntrian.filter((item) => item.id !== id));
    if (table === "kiosTombolAntrian")
      setKiosTombolAntrian(kiosTombolAntrian.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    console.log(kiosAntrian);
    const id = modalData.id || new Date().getTime();
    if (currentTable === "kiosAntrian") {
      setKiosAntrian((prev) =>
        modalData.id
          ? prev.map((item) => (item.id === id ? modalData : item))
          : [...prev, { id, ...modalData }]
      );
    }
    if (currentTable === "tombolAntrian") {
      setTombolAntrian((prev) =>
        modalData.id
          ? prev.map((item) => (item.id === id ? modalData : item))
          : [...prev, { id, ...modalData }]
      );
    }
    if (currentTable === "kiosTombolAntrian") {
      setKiosTombolAntrian((prev) =>
        modalData.id
          ? prev.map((item) => (item.id === id ? modalData : item))
          : [...prev, { id, ...modalData }]
      );
    }
    setShowModal(false);
  };
  const renderModalBody = () => {
    if (currentTable === "kiosAntrian") {
      return (
        <Form>
          <Form.Group>
            <Form.Label>Nama Kios</Form.Label>
            <Form.Control
              type="text"
              value={modalData.name || ""}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      );
    }

    if (currentTable === "tombolAntrian") {
      return (
        <Form>
          <Form.Group>
            <Form.Label>Nama Tombol</Form.Label>
            <Form.Control
              type="text"
              value={modalData.name || ""}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              type="text"
              value={modalData.description || ""}
              onChange={(e) =>
                setModalData({ ...modalData, description: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      );
    }

    if (currentTable === "kiosTombolAntrian") {
      return (
        <Form>
          <Form.Group>
            <Form.Label>Pilih Kios</Form.Label>
            <Form.Control
              as="select"
              value={modalData.kiosName || ""}
              onChange={(e) =>
                setModalData({ ...modalData, kiosName: e.target.value })
              }
            >
              <option value="">-- Pilih Kios --</option>
              {kiosAntrian.map((kios) => (
                <option key={kios.id} value={kios.name}>
                  {kios.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Pilih Tombol</Form.Label>
            <Form.Control
              as="select"
              value={modalData.tombolName || ""}
              onChange={(e) =>
                setModalData({ ...modalData, tombolName: e.target.value })
              }
            >
              <option value="">-- Pilih Tombol --</option>
              {tombolAntrian.map((tombol) => (
                <option key={tombol.id} value={tombol.name}>
                  {tombol.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      );
    }

    return null;
  };
  return (
    <Container>
      <FormProvider {...methods}>
        <div className="mt-5">
          <Row>
            <Col sm="12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Konfigurasi Kios Antrian</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div id="table" className="table-editable">
                    <div className="table-responsive-md w-100">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Kios</th>
                            <th>Fungsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kiosAntrian.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                <Button variant="primary">
                                  Tampilkan Tombol Print
                                </Button>{" "}
                                <Button
                                  variant="warning"
                                  onClick={() =>
                                    handleEdit("kiosAntrian", item)
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleDelete("kiosAntrian", item.id)
                                  }
                                >
                                  Hapus
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Button onClick={() => handleAdd("kiosAntrian")}>
                        Tambah Kios
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </FormProvider>
      <FormProvider {...methods}>
        <div className="mt-5">
          <Row>
            <Col sm="12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Konfigurasi Tombol Antrian</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div id="table" className="table-editable">
                    <div className="table-responsive-md w-100">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Tombol</th>
                            <th>Deskripsi</th>
                            <th>Kode</th>
                            <th>Fungsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tombolAntrian.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.code}</td>
                              <td>
                                <Button
                                  variant="warning"
                                  onClick={() =>
                                    handleEdit("tombolAntrian", item)
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleDelete("tombolAntrian", item.id)
                                  }
                                >
                                  Hapus
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Button onClick={() => handleAdd("tombolAntrian")}>
                        Tambah Tombol
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </FormProvider>
      <FormProvider {...methods}>
        <div className="mt-5">
          <Row>
            <Col sm="12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      Konfigurasi Tombol Kios Antrian
                    </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div id="table" className="table-editable">
                    <div className="table-responsive-md w-100">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Kios</th>
                            <th>Nama Tombol</th>
                            <th>Fungsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kiosTombolAntrian.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.kiosName}</td>
                              <td>{item.tombolName}</td>
                              <td>
                                <Button
                                  variant="warning"
                                  onClick={() =>
                                    handleEdit("kiosTombolAntrian", item)
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleDelete("kiosTombolAntrian", item.id)
                                  }
                                >
                                  Hapus
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Button onClick={() => handleAdd("kiosTombolAntrian")}>
                        Tambah Tombol Kios
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </FormProvider>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.id ? "Edit" : "Tambah"} {currentTable}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalBody()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});
PengaturanAntrian.displayName = "PengaturanAntrian";
export default PengaturanAntrian;
