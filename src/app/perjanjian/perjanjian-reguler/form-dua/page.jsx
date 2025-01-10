"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Col, Form, Row, Table, Label, Pagination } from "react-bootstrap";
import SelectField from "@/components/ui/select-field";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextField from "@/components/ui/text-field";

import DateInput from "@/components/ui/date-input";
import TableTindakan from "@/components/features/tindakanTable/tindakantTable";
import { pemeriksaRadiologi } from "@/utils/dataTindakan";
import SearchableSelectField from "@/components/ui/select-field-search";
import { dataDokter } from "@/utils/SearchSelect";
import { jadwalDokterByDate } from "@/utils/PasienPerjanjian";
import DataTable from "@/components/features/viewDataTables/dataTable";
import { dataKelasTersedia } from "@/utils/PasienPerjanjian";

const AddPerjanjianForm = () => {
  const methods = useForm({
    defaultValues: {
      layanan: "",
      tanggalKunjungan: new Date(),
      dokter: "",
      departemen: "",
      waktuPraktek: "",
      noUrut: "",
      searchDokter: "",
      searchDepartemen: "",
    },
  });

  // inisialiasi use state dokter

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(3);

  const searchDokter = methods.watch("searchDokter");
  const searchDepartemen = methods.watch("searchDepartemen");

  // handle filter dokter dan departemen

  const filterDoctors = useCallback(
    (doctors) => {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.label.toLowerCase().includes(searchDokter.toLowerCase()) &&
          doctor.department
            .toLowerCase()
            .includes(searchDepartemen.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setCurrentPage(1);
    },
    [searchDokter, searchDepartemen]
  );

  // pengambilan data jadwal dokter

  useEffect(() => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const doctorsForDate = jadwalDokterByDate[dateKey] || [];
    filterDoctors(doctorsForDate);
  }, [selectedDate, filterDoctors]);

  // handle tanggal dokter
  const handleDateChange = (date) => {
    setSelectedDate(date);
    methods.setValue("tanggalKunjungan", date);
  };

  // handle row clich
  const handleDoctorSelection = (doctor) => {
    methods.setValue("dokter", doctor.label);
    methods.setValue("departemen", doctor.department);
    methods.setValue("waktuPraktek", doctor.waktuPraktek);
    methods.setValue("noUrut", doctor.noUrut.toString());
  };

  // Paginasi
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // handle paginasi
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // untuk handle layanan

  const [selectedLayanan, setSelectedLayanan] = useState("");
  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state lokal
  };

  // fungsi Untuk Kelas

  // untuk mencari kelas

  const [filteredData, setFilteredData] = useState(dataKelasTersedia);

  const [selectedKelas, setSelectedKelas] = useState("");

  const [searchKelas, setSearchKelas] = useState({
    Kelas: "",
  });

  const handleSearch = (key, value) => {
    const updatedKelas = { ...searchKelas, [key]: value };
    setSearchKelas(updatedKelas);

    const filtered = dataKelasTersedia.filter((item) => {
      return Object.keys(updatedKelas).every((KelasKey) => {
        const KelasValue = updatedKelas[KelasKey];
        if (!KelasValue) return true; // Abaikan jika kosong

        return item[KelasKey]?.toString()
          .toLowerCase()
          .includes(KelasValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const header = [
    "No",
    "Kelas ",
    "Keterangan",
    "Jml Ruang",
    "JML Tempat Tidur",
    "jml Terisi",
    "Jml reservasi",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    kelas: item.Kelas,
    keterangan: item.Keterangan,
    jmlRuang: item.JmlRuang,
    jmlTempatTidur: item.JmlTempatTidur,
    jmlTerisi: item.JmlTerisi,
    jmlReservasi: item.JmlReservasi,
  }));

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Row className="mt-3">
          {/* Column Kiri */}
          <Col md={6}>
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h3 className="card-title">Perjanjian</h3>
              </div>
              <div className="iq-card-body">
                <SelectField
                  name="layanan"
                  label="Pilih Layanan"
                  placeholder="Pilih Layanan"
                  options={[
                    { label: "Rawat Inap", value: "Rawat Inap" },
                    { label: "Rawat Jalan", value: "Rawat Jalan" },
                    { label: "ODC", value: "ODC" },
                    { label: "Radiologi", value: "Radiologi" },
                    { label: "Operasi", value: "Operasi" },
                    { label: "MCU", value: "MCU" },
                  ]}
                  onChangeCallback={handleLayananChange}
                  className="mb-3"
                  rules={{ required: "Layanan harus dipilih" }}
                />
                {selectedLayanan === "Rawat Jalan" && (
                  <>
                    <Col xs="6" lg="5">
                      <div className="form-group">
                        <label
                          htmlFor="tanggalKunjungan"
                          className="form-label"
                        >
                          Tanggal Kunjungan
                        </label>

                        <DatePicker
                          id="tanggalKunjungan"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="MMMM d, yyyy"
                          className="form-control "
                        />
                      </div>
                    </Col>
                    <TextField
                      name="dokter"
                      label="Dokter Pemeriksa"
                      type="text"
                      className="form-control"
                      readOnly
                    />
                    <TextField
                      name="departemen"
                      label="Departemen"
                      type="text"
                      className="form-control"
                      readOnly
                    />
                    <TextField
                      name="waktuPraktek"
                      label="Waktu Praktek"
                      type="text"
                      className="form-control"
                      readOnly
                    />
                    <TextField
                      name="noUrut"
                      label="No. Urut"
                      type="text"
                      className="form-control"
                      readOnly
                    />
                  </>
                )}

                {selectedLayanan === "Rawat Inap" && (
                  <Row>
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                    </Row>
                    <Col lg="12">
                      <TextField
                        name="Kelas"
                        label="Kelas"
                        type="text"
                        className="form-control"
                        value={selectedKelas}
                        readOnly
                      />
                    </Col>
                    <Col lg="12">
                      <SearchableSelectField
                        name="dokter"
                        label="Dokter Pemeriksa"
                        options={dataDokter}
                        placeholder="Pilih Dokter"
                        rules={{ required: "Dokter harus dipilih" }}
                      />
                    </Col>
                  </Row>
                )}

                {selectedLayanan === "ODC" && (
                  <Row>
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                    </Row>
                    <Col lg="12">
                      <TextField
                        name="KelasODC"
                        label="Kelas"
                        type="text"
                        className="form-control"
                        value={selectedKelas}
                        readOnly
                      />
                    </Col>
                    <Col lg="12">
                      <SearchableSelectField
                        name="dokter"
                        label="Dokter Pemeriksa"
                        options={dataDokter}
                        placeholder="Pilih Dokter"
                        rules={{ required: "Dokter harus dipilih" }}
                      />
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Col>
          {/* Colomn Kanan */}
          <Col md={6}>
            <Row>
              <div className="iq-card">
                <div className="iq-card-body">
                  {selectedLayanan === "Rawat Jalan" && (
                    <>
                      <Row>
                        <Col xs="6" lg="3">
                          <div className="form-group">
                            <label
                              htmlFor="tanggalKunjungan"
                              className="form-label"
                            >
                              Tanggal Kunjungan
                            </label>
                            <DatePicker
                              id="tanggalKunjungan"
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="MMMM d, yyyy"
                              className="form-control "
                            />
                          </div>
                        </Col>
                        <Col lg="3">
                          <TextField
                            label="Cari Dokter"
                            placeholder="Cari Dokter"
                            name="searchDokter"
                            onChange={(e) =>
                              methods.setValue("searchDokter", e.target.value)
                            }
                          />
                        </Col>
                        <Col lg="3">
                          <TextField
                            label="Cari Departemen"
                            placeholder="Cari Departemen"
                            name="searchDepartemen"
                            onChange={(e) =>
                              methods.setValue(
                                "searchDepartemen",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <div className="Tanggal">
                        <h5 className="my-3 text-center">
                          Dokter Tersedia pada{" "}
                          {selectedDate.toLocaleDateString()}
                        </h5>
                      </div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Nama Dokter</th>
                            <th>Departemen</th>
                            <th>Waktu Praktek</th>
                            <th>No Urut</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDoctors.map((doc) => (
                            <tr
                              key={doc.id}
                              onClick={() => handleDoctorSelection(doc)}
                              style={{ cursor: "pointer" }}
                            >
                              <td>{doc.label}</td>
                              <td>{doc.department}</td>
                              <td>{doc.waktuPraktek}</td>
                              <td>{doc.noUrut}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <Pagination className="justify-content-center">
                          <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                          />
                          <Pagination.Prev
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          />
                          {[...Array(totalPages)].map((_, i) => (
                            <Pagination.Item
                              key={i}
                              active={i + 1 === currentPage}
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </Pagination.Item>
                          ))}
                          <Pagination.Next
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          />
                          <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          />
                        </Pagination>
                      )}
                    </>
                  )}

                  {selectedLayanan === "Radiologi" && (
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="tglJanji"
                          label="Tanggal Janji"
                          rules={{ required: "Tanggal Pelayanan harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                      <TableTindakan tindakan={pemeriksaRadiologi} />,
                    </Row>
                  )}

                  {selectedLayanan === "Rawat Inap" && (
                    <>
                      <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                          <div className="iq-header-title my-3">
                            <h4 className="card-title mb-3">
                              Ketersediaan Kelas
                            </h4>
                            <Col lg="12">
                              <TextField
                                label="Cari Kelas"
                                name="kelas"
                                type="text"
                                placeholder="Cari Kelas"
                                className="form-control"
                                onChange={(e) =>
                                  handleSearch("Kelas", e.target.value)
                                }
                              />
                            </Col>
                          </div>
                        </div>
                        <DataTable
                          headers={header}
                          data={members}
                          rowsPerPage={4}
                          actions={{
                            booking: (row) => handleEdit(row.id),
                          }}
                          customActions={[
                            {
                              label: "Booking Kelas",
                              onClick: (row) => setSelectedKelas(row.kelas),
                              className: "iq-bg-success",
                            },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {selectedLayanan === "ODC" && (
                    <>
                      <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                          <div className="iq-header-title my-3">
                            <h4 className="card-title mb-3">
                              Ketersediaan Kelas
                            </h4>
                            <Col lg="12">
                              <TextField
                                label="Cari Kelas"
                                name="carikelasODC"
                                type="text"
                                placeholder="Cari Kelas"
                                className="form-control"
                                onChange={(e) =>
                                  handleSearch("Kelas", e.target.value)
                                }
                              />
                            </Col>
                          </div>
                        </div>
                        <DataTable
                          headers={header}
                          data={members}
                          rowsPerPage={4}
                          actions={{
                            booking: (row) => handleEdit(row.id),
                          }}
                          customActions={[
                            {
                              label: "Booking Kelas",
                              onClick: (row) => setSelectedKelas(row.kelas),
                              className: "iq-bg-success",
                            },
                          ]}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default AddPerjanjianForm;
