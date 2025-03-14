"use client";

import React, { useState } from "react";
import {
  Row,
  Col,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import {

  FaUserClock,
} from "react-icons/fa";

import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { aktivitasPasien, PasienRawatInap } from "@/utils/dataPasien";
import dynamic from "next/dynamic";


const DashboardRawatInap = () => {
  // State untuk teks pencarian dan data pasien rawat inap
  // const [searchText, setSearchText] = useState("");
  // const [filteredPatients, setFilteredPatients] = useState(PasienRawatInap);

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    // Filter data berdasarkan teks pencarian
    const filtered = PasienRawatInap.filter((patient) =>
      patient.nama.toLowerCase().includes(text)
    );
    setFilteredPatients(filtered);
  };

  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const chartOptions = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2023 GMT",
          "01/02/2023 GMT",
          "01/03/2023 GMT",
          "01/04/2023 GMT",
          "01/05/2023 GMT",
          "01/06/2023 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      colors: ["#6a9fca", "#f8b94c", "#d67ab1"],
    },
    series: [
      {
        name: "Kamar A",
        data: [24, 35, 41, 57, 32, 43],
      },
      {
        name: "Kamar B",
        data: [13, 20, 25, 30, 18, 27],
      },
      {
        name: "Kamar C",
        data: [17, 14, 19, 23, 21, 14],
      },
    ],
  };

  return (
    <>
      <Col md="12">
        {/* Header */}
        <Row>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-primary rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <i className="ri-group-fill"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">75</span>
                    </h2>
                    <h5 className=""> Pasien Rawat Inap</h5>
                    <small className="text-success">↑ 8% dari kemarin</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-warning rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-warning">
                    <i className="ri-hotel-line"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">30</span>
                    </h2>
                    <h5 className=""> Kamar Terisi</h5>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-danger rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-danger">
                    <i className="ri-door-open-fill"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">20</span>
                    </h2>
                    <h5 className="">Kamar Kosong</h5>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-info rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-info">
                    <i className="ri-time-line"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h5 className="mb-0">rata rata</h5>
                    <h2 className="mb-0 mt-0">
                      <span className="counter">48</span>
                    </h2>
                    <small className="text-success">Jam</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Status Rawat Inap per Kamar */}
        <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <FaUserClock className="text-primary me-2" size={20} />
                  <h5 className="mb-0">Status Pasien per Kamar</h5>
                </div>
              </div>
              <div className="iq-card-body">
                <Row>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar 101</h6>
                    <Badge bg="primary" className="px-3 py-2">
                      Pasien: 2
                    </Badge>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar 102</h6>
                    <Badge bg="success" className="px-3 py-2">
                      Pasien: 3
                    </Badge>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar 103</h6>
                    <Badge bg="warning" className="px-3 py-2">
                      Pasien: 1
                    </Badge>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar 104</h6>
                    <Badge bg="info" className="px-3 py-2">
                      Pasien: 0
                    </Badge>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        {/* Grafik Kunjungan */}
        <Row className="mb-4">
          <Col lg="8">
            <div className="iq-card ">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title">
                  Grafik Kunjungan Pasien Rawat Inap
                </h4>
              </div>
              <div className="iq-card-body">
                <Chart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </Col>

          <Col lg="4">
            <div className="iq-card ">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="text-lg font-semibold">Aktivitas Terkini</h4>
                <span className="px-2 py-1 text-xs font-semibold bg-blue-500 rounded">
                  Hari Ini
                </span>
              </div>
              <div className="iq-card-body">
                <div>
                  <Row>
                    {aktivitasPasien.map((aktivitasPasien, index) => (
                      <div key={index} >
                        <Col lg="6" className="p-3">
                          <div>
                            <div>
                              <div className="mr-3">{aktivitasPasien.icon}</div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <h6 className="font-medium">
                                    {aktivitasPasien.title}
                                  </h6>
                                  <div className="flex items-center text-gray-500 text-sm">
                                    <i className="ri-time-line mr-1"></i>
                                    {aktivitasPasien.time}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500 block">
                                  {aktivitasPasien.patient}
                                </span>
                                <span className="text-sm text-blue-500">
                                  {aktivitasPasien.info}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </div>
                    ))}
                  </Row>
                </div>
                <div className="text-center mb-3">
                  <Button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Lihat Semua Aktivitas
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Daftar Pasien */}
        {/* <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card ">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <FaUsers className="text-primary me-2" size={20} />
                  <h5 className="mb-0">Daftar Pasien Rawat Inap</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FaSearch className="text-muted me-2" />
                  <Form.Control
                    type="search"
                    placeholder="Cari pasien..."
                    className="w-auto"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredPatients}
                  columns={[
                    { key: "id", label: "ID Pasien" },
                    { key: "nama", label: "Nama Pasien" },
                    { key: "kamar", label: "Kamar" },
                    { key: "jenisKelamin", label: "Jenis Kelamin" },
                    { key: "status", label: "Status Perawatan" },
                    { key: "waktuMasuk", label: "Waktu Masuk" },
                  ]}
                  itemsPerPage={5}
                  slugConfig={{ textField: "nama", idField: "id" }}
                  basePath="/instalasi-rawat-inap/data-pasien/detail-pasien"
                />
              </div>
            </div>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default DashboardRawatInap;
