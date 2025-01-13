"use client";
import DateInput from "@/components/ui/date-input";
import SelectField from "@/components/ui/select-field";
import TextField from "@/components/ui/text-field";
import { dataBookingBed } from "@/utils/PasienPerjanjian";
import React, { useState, useEffect } from "react";

import {
  Table,
  FormControl,
  Form,
  Container,
  Row,
  Col,
  Pagination,
  Button,
  Modal,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const PemesananBed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const rowsPerPage = 10;

  const [selectedBed, setSelectedBed] = useState("");
  const [selectedRuangan, setSelectedRuangan] = useState("");

  const methods = useForm({
    defaultValues: {
      noRekamMedis: "",
      patientName: "",
      bed: selectedBed,
      ruangan: selectedRuangan,
      tanggalBooking: "",
    },
  });

  // modals booking

  const handleBooking = (bed, ruangan) => {
    console.log("Debug: Selected ruangan:", ruangan); // Log untuk ruanga
    console.log("Selected bed: ", bed); // Untuk debugging, periksa output ini
    setSelectedBed(bed); // Pastikan 'bed' adalah objek atau nilai yang diharapkan
    setShowModal(true);
    setSelectedRuangan(ruangan);

    // Set nilai menggunakan setValue
    methods.setValue("bed", bed);
    methods.setValue("ruangan", ruangan);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const filteredData = dataBookingBed
    .map((item) => ({
      ...item,
      beds: item.beds.filter((bed) =>
        bed.bed.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((item) => item.beds.length > 0);

  const totalRows = filteredData.reduce(
    (sum, item) => sum + item.beds.length,
    0
  );
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData
    .flatMap((item) =>
      item.beds.map((bed) => ({
        ...bed,
        no: item.no,
        kelas: item.kelas,
        ruangan: item.ruangan,
      }))
    )
    .slice(indexOfFirstRow, indexOfLastRow);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // handle submit

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    handleClose();
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="12">
          <div className="iq-card">
            <div className="iq-card-body">
              <Form className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Search by bed..."
                  onChange={handleSearchChange}
                />
              </Form>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kelas</th>
                    <th>Ruangan</th>
                    <th>Bed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((item, index, arr) => (
                    <tr key={index}>
                      {index === 0 || arr[index].no !== arr[index - 1].no ? (
                        <td
                          rowSpan={
                            filteredData.find((x) => x.no === item.no).beds
                              .length
                          }
                        >
                          {item.no}
                        </td>
                      ) : null}
                      {index === 0 ||
                      arr[index].kelas !== arr[index - 1].kelas ? (
                        <td
                          rowSpan={
                            filteredData.find((x) => x.kelas === item.kelas)
                              .beds.length
                          }
                        >
                          {item.kelas}
                        </td>
                      ) : null}
                      {index === 0 ||
                      arr[index].ruangan !== arr[index - 1].ruangan ? (
                        <td
                          rowSpan={
                            filteredData.find((x) => x.ruangan === item.ruangan)
                              .beds.length
                          }
                        >
                          {item.ruangan}
                        </td>
                      ) : null}
                      <td>{item.bed}</td>
                      <td>{item.status}</td>
                      <td>
                        {item.status === "Free" ? (
                          <Button
                            variant="primary"
                            onClick={() => {
                              console.log(
                                "Button clicked:",
                                item.bed,
                                item.ruangan
                              ); // Debugging sebelum fungsi dipanggil
                              handleBooking(item.bed, item.ruangan);
                            }}
                          >
                            Booking
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {totalPages > 1 && (
                <Pagination className="justify-content-center">
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              )}
              <FormProvider {...methods}>
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Form Booking</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                      <TextField
                        name="bed"
                        label="Bed"
                        type="text"
                        className="form-control mb-3"
                        value={selectedBed}
                        readOnly
                      />
                      <TextField
                        name="ruangan"
                        label="Ruangan "
                        type="text"
                        className="form-control mb-3"
                        value={selectedRuangan}
                        readOnly
                      />
                      <TextField
                        label="No Rekam Medis:"
                        name="noRekamMedis"
                        type="text"
                        placeholder="Enter No Rekam Medis..."
                        className="mb-3"
                      />
                      <TextField
                        label="Pasien"
                        name="patientName"
                        type="text"
                        placeholder="Masukkan nama pasien"
                        className="mb-3"
                      />
                      <DateInput
                        name="tanggalBooking"
                        label="Tanggal Booking"
                        placeholder={"Enter Tanggal Booking"}
                        rules={{ required: "Tanggal Booking harus diisi" }}
                      />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Batal
                    </Button>
                    <Button
                      variant="primary"
                      onClick={methods.handleSubmit(onSubmit)}
                    >
                      Simpan
                    </Button>
                  </Modal.Footer>
                </Modal>
              </FormProvider>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PemesananBed;
