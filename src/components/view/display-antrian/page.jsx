"use client";
import DateInput from "@/components/ui/date-input";
import TextField from "@/components/ui/text-field";

import axios from "axios";
import Link from "next/link";
import {
  Container,
  Modal,
  Form,
  Navbar,
  Nav,
  FormControl,
} from "react-bootstrap";

import React, { memo, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
const DisplayAntrian = memo(() => {
  const [kiosAntrian, setKiosAntrian] = useState([
    { id: 1, name: "AdminKasir" },
    { id: 2, name: "Kios 1" },
    { id: 3, name: "Reception" },
  ]);

  // State for each patient type's display number
  const [displayNumbers, setDisplayNumbers] = useState({
    ADMISSION_OLD: 0,
    ADMISSION: 0,
    REGISTRATION: 0,
    CASHIER: 0,
  });

  // Function to increment display number by 1
  const incrementDisplay = (type) => {
    setDisplayNumbers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  // Function to set display number to the next multiple of 10
  const nextMultipleTen = (type) => {
    const current = displayNumbers[type];
    setDisplayNumbers((prev) => ({
      ...prev,
      [type]: Math.floor((current + 10) / 10) * 10,
    }));
  };

  // Function to jump to a specific number
  const jumpToNumber = (type, number) => {
    if (number >= 0) {
      setDisplayNumbers((prev) => ({
        ...prev,
        [type]: parseInt(number),
      }));
    }
  };

  // Helper function to render the patient section
  const renderPatientSection = (type, title) => {
    return (
      <Row lg={12} className="mt-2">
        <Col lg="12">
          <div>
            <Row lg={12} className="g-0 align-items-center iq-card-header">
              <Col lg="8">
                <h5 className="text-center mb-0 me-3">{title}</h5>
              </Col>
              <Col lg="4">
                <div className="d-flex">
                  <input
                    type="number"
                    id={`no${type}`}
                    className="form-control form-control-sm me-2"
                    placeholder="Enter number"
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      jumpToNumber(
                        type,
                        document.getElementById(`no${type}`).value
                      )
                    }
                  >
                    Loncat
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Row className="g-0 mt-3">
                  <Col lg="12" className="d-flex align-items-center">
                    <div className="d-flex justify-content-center flex-grow-1">
                      <button
                        className="btn btn-sm btn-primary mx-2"
                        onClick={() => incrementDisplay(type)}
                      >
                        {">>"}
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => nextMultipleTen(type)}
                      >
                        {">|"}
                      </button>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="d-flex flex-column p-1 text-center">
                        <h6 className="mb-0 bg-dark text-white px-2 py-1">
                          DISPLAY DI PLASMA
                        </h6>
                        <h6 className="border bg-white text-dark px-1 py-0 mb-0">
                          {displayNumbers[type]}
                        </h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg="12"
                className="d-flex justify-content-center align-items-center"
              >
                <h2>{displayNumbers[type]}</h2>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Container>
      {/* ... your existing navbar and other components */}
      <div className="mt-2">
        <Row>
          <Col sm="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-center align-items-center">
                <div className="iq-header-title">
                  <h4 className="card-title text-center">
                    Konfigurasi Tombol Antrian
                  </h4>
                </div>
              </div>
              <div className="iq-card-body">
                <Row lg={12} className="mt-5">
                  <Col lg="6">
                    {" "}
                    {renderPatientSection(
                      "ADMISSION_OLD",
                      "Pasien ADMISSION OLD"
                    )}
                    {renderPatientSection(
                      "REGISTRATION",
                      "Pasien REGISTRATION"
                    )}
                    {renderPatientSection("ADMISSION", "Pasien ADMISSION")}
                    {renderPatientSection("CASHIER", "Pasien CASHIER")}
                  </Col>
                  <Col lg="6">
                    <div>
                      <div id="table" className="table-editable">
                        <div className="table-responsive-md w-100">
                          <Table bordered>
                            <thead>
                              <tr>
                                <th>No Antrian</th>
                                <th>Tanggal</th>
                                <th>Loket</th>
                              </tr>
                            </thead>
                            <tbody>
                              {kiosAntrian.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
});

DisplayAntrian.displayName = "DisplayAntrian";
export default DisplayAntrian;
