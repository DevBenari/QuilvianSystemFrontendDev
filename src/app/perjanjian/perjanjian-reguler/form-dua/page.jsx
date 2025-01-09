"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Col, Form, Row, Table, Label } from "react-bootstrap";
import SelectField from "@/components/ui/select-field";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextField from "@/components/ui/text-field";
import { jadwalDokterByDate } from "@/utils/jadwalDokter";

const AddPerjanjianForm = () => {
  const methods = useForm({
    defaultValues: {
      layanan: "",
      tanggalKunjungan: new Date(),
      dokter: "",
      departemen: "",
      waktuPraktek: "",
      noUrut: "",
    },
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const doctorsForDate = jadwalDokterByDate[dateKey] || [];
    setDoctors(doctorsForDate); // Perbarui state doctors dengan data yang sesuai berdasarkan tanggal
  }, [selectedDate]); // Dependency hanya selectedDate

  const handleDateChange = (date) => {
    setSelectedDate(date);
    methods.setValue("tanggalKunjungan", date);
  };

  const handleDoctorSelection = (doctor) => {
    methods.setValue("dokter", doctor.label);
    methods.setValue("departemen", doctor.department);
    methods.setValue("waktuPraktek", doctor.waktuPraktek);
    methods.setValue("noUrut", doctor.noUrut.toString());
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Row className="mt-3">
          <Col md={6}>
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h3 className="card-title">Perjanjian</h3>
              </div>
              <div className="iq-card-body">
                <SelectField
                  name="layanan"
                  label="Pilih Layanan"
                  options={[{ label: "Rawat Jalan", value: "Rawat Jalan" }]}
                  onChangeCallback={(value) =>
                    methods.setValue("layanan", value)
                  }
                  className="mb-3"
                />
                <Col lg="3">
                  <label>Tanggal Kunjungan</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="form-control my-2"
                  />
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
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="iq-card">
              <div className="iq-card-body">
                <Col lg="5">
                  <label htmlFor="">Tanggal Kunjungan</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                  />
                </Col>
                <h5>
                  Dokter Tersedia pada {selectedDate.toLocaleDateString()}
                </h5>
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
                    {doctors.map((doc) => (
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
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default AddPerjanjianForm;
