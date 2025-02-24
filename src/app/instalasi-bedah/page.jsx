"use client";

import React, { useState } from "react";
import { Row, Col, Badge, Form } from "react-bootstrap";
import {
  FaSyringe,
  FaUsers,
  FaSearch,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { pasienBedah } from "@/utils/dataPasien";

import { FaStethoscope } from "react-icons/fa";
import { RiSurgicalMaskFill } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";
import { AiOutlineTeam } from "react-icons/ai";
// Data Dummy Grafik
const surgeryData = [
  { name: "Jan", operasi: 40 },
  { name: "Feb", operasi: 35 },
  { name: "Mar", operasi: 45 },
  { name: "Apr", operasi: 50 },
  { name: "May", operasi: 38 },
  { name: "Jun", operasi: 60 },
];

// Kustomisasi Grafik
const chartOptions = {
  options: {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    colors: ["#28a745"],
    stroke: {
      curve: "smooth",
    },
  },
  series: [
    {
      name: "Jumlah Operasi",
      data: surgeryData.map((item) => item.operasi),
    },
  ],
};

const DashboardBedah = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(pasienBedah);

  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  

  // Fungsi untuk pencarian pasien
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filtered = pasienBedah.filter((patient) =>
      patient.nama.toLowerCase().includes(text)
    );
    setFilteredPatients(filtered);
  };

  return (
    <>
      <Col md="12">
        {/* Statistik Utama */}
        <Row>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-primary rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <FaStethoscope />
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">12</span>
                    </h2>
                    <h5 className="">Operasi Hari Ini</h5>
                    <small className="text-success">↑ 2 dari kemarin</small>
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
                    <RiSurgicalMaskFill />
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">4</span>
                    </h2>
                    <h5 className="">Ruang Operasi Aktif</h5>
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
                    <FaHeartPulse />
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">2</span>
                    </h2>
                    <h5 className="">Operasi Darurat</h5>
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
                    <AiOutlineTeam />
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">8</span>
                    </h2>
                    <h5 className="">Tim Operasi Aktif</h5>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Status Operasi per Kamar */}
        <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h5 className="mb-0">Status Operasi per Kamar</h5>
              </div>
              <div className="iq-card-body">
                <Row>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar Operasi 1</h6>
                    <Badge bg="primary" className="px-3 py-2">
                      Operasi: 2
                    </Badge>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar Operasi 2</h6>
                    <Badge bg="success" className="px-3 py-2">
                      Operasi: 3
                    </Badge>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>Kamar Operasi 3</h6>
                    <Badge bg="danger" className="px-3 py-2">
                      Kosong
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
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title">Grafik Jumlah Operasi</h4>
              </div>
              <div className="iq-card-body">
                <Chart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </Col>

          {/* Aktivitas Terkini */}
          <Col lg="4">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="text-lg font-semibold">Aktivitas Terkini</h4>
              </div>
              <div className="iq-card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    Operasi Jantung - dr. John Smith{" "}
                    <Badge bg="primary">Berlangsung</Badge>
                  </li>
                  <li className="list-group-item">
                    Operasi Ortopedi - dr. Jane Doe{" "}
                    <Badge bg="success">Selesai</Badge>
                  </li>
                  <li className="list-group-item">
                    Operasi Mata - dr. Mike Wilson{" "}
                    <Badge bg="warning">Menunggu</Badge>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        {/* Daftar Pasien Terjadwal */}
        {/* <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h5 className="mb-0">Daftar Pasien Operasi</h5>
                <Form.Control
                  type="search"
                  placeholder="Cari pasien..."
                  className="w-auto"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredPatients}
                  columns={[
                    { key: "id", label: "ID Pasien" },
                    { key: "nama", label: "Nama Pasien" },
                    { key: "dokter", label: "Dokter" },
                    { key: "jenisOperasi", label: "Jenis Operasi" },
                    { key: "jadwal", label: "Jadwal Operasi" },
                  ]}
                  itemsPerPage={5}
                />
              </div>
            </div>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default DashboardBedah;
