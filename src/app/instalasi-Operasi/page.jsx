"use client";

import React, { useState } from "react";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { Row, Col } from "react-bootstrap";
import { FaStethoscope } from "react-icons/fa";
import { RiSurgicalMaskFill } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";
import { AiOutlineTeam } from "react-icons/ai";
import dynamic from "next/dynamic";

const DashboardOperasi = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredOperations, setFilteredOperations] = useState(jadwalOperasi);

  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
   
  


  // Data untuk grafik operasi
  const chartOptions = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
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
        name: "Operasi Mayor",
        data: [4, 3, 5, 4, 3, 2],
      },
      {
        name: "Operasi Minor",
        data: [3, 4, 2, 3, 4, 3],
      },
      {
        name: "Operasi Darurat",
        data: [1, 2, 1, 2, 1, 1],
      },
    ],
  };

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = jadwalOperasi.filter((operation) =>
      operation.pasien.toLowerCase().includes(text)
    );
    setFilteredOperations(filtered);
  };

  return (
    <>
      <Col md="12">
        {/* Header Stats */}
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

        {/* Status Ruang Operasi */}
        <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <i className="ri-hospital-line text-primary me-2 fs-5"></i>
                  <h5 className="mb-0">Status Ruang Operasi</h5>
                </div>
              </div>
              <div className="iq-card-body">
                <Row>
                  <Col md={3} className="text-center mb-3">
                    <h6>OK 1 - Mayor</h6>
                    <span className="badge bg-success px-3 py-2">
                      Operasi Berlangsung
                    </span>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>OK 2 - Minor</h6>
                    <span className="badge bg-warning px-3 py-2">
                      Persiapan
                    </span>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>OK 3 - Mayor</h6>
                    <span className="badge bg-danger px-3 py-2">
                      Sterilisasi
                    </span>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h6>OK 4 - Darurat</h6>
                    <span className="badge bg-info px-3 py-2">
                      Siap Digunakan
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        {/* Grafik dan Jadwal */}
        <Row className="mb-4">
          <Col lg="8">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title">Statistik Operasi Minggu Ini</h4>
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
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h4 className="card-title">Tim Operasi Aktif</h4>
              </div>
              <div className="iq-card-body">
                <div className="timeline-list">
                  {timOperasi.map((tim, index) => (
                    <div key={index} className="d-flex mb-3">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{tim.ruang}</h6>
                        <p className="mb-0 text-muted">{tim.dokter}</p>
                        <small className="text-muted">
                          <i className="ri-time-line me-1"></i>
                          {tim.waktu}
                        </small>
                      </div>
                      <span
                        className={`badge bg-${
                          tim.status === "Berlangsung" ? "success" : "warning"
                        }`}
                      >
                        {tim.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Daftar Jadwal Operasi
        <Row className="mb-4">
          <Col lg="12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <i className="ri-calendar-check-line text-primary me-2 fs-5"></i>
                  <h5 className="mb-0">Jadwal Operasi Hari Ini</h5>
                </div>
                <div className="d-flex align-items-center">
                  <i className="ri-search-line text-muted me-2"></i>
                  <input
                    type="search"
                    placeholder="Cari pasien..."
                    className="form-control w-auto"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredOperations}
                  columns={[
                    { key: "waktu", label: "Waktu" },
                    { key: "ruang", label: "Ruang Operasi" },
                    { key: "pasien", label: "Nama Pasien" },
                    { key: "dokter", label: "Dokter Bedah" },
                    { key: "jenis", label: "Jenis Operasi" },
                    { key: "status", label: "Status" },
                  ]}
                  paginationProps={{
                    currentPage: page,
                    totalPages: totalPages,
                    itemsPerPage: perPage,
                    onPageChange: setPage,
                  }}
                />
              </div>
            </div>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

// Data dummy untuk tim operasi
const timOperasi = [
  {
    ruang: "OK 1 - Operasi Jantung",
    dokter: "dr. Ahmad Specialist",
    waktu: "09:00 - 13:00",
    status: "Berlangsung",
  },
  {
    ruang: "OK 2 - Operasi Minor",
    dokter: "dr. Sarah Bedah",
    waktu: "10:30 - 11:30",
    status: "Persiapan",
  },
  {
    ruang: "OK 4 - Operasi Darurat",
    dokter: "dr. Budi Trauma",
    waktu: "11:00 - 14:00",
    status: "Berlangsung",
  },
];

// Data dummy untuk jadwal operasi
const jadwalOperasi = [
  {
    waktu: "09:00",
    ruang: "OK 1",
    pasien: "Tn. Agus",
    dokter: "dr. Ahmad",
    jenis: "Operasi Jantung",
    status: "Berlangsung",
  },
  {
    waktu: "10:30",
    ruang: "OK 2",
    pasien: "Ny. Siti",
    dokter: "dr. Sarah",
    jenis: "Operasi Minor",
    status: "Persiapan",
  },
  {
    waktu: "13:00",
    ruang: "OK 3",
    pasien: "Tn. Budi",
    dokter: "dr. Rudi",
    jenis: "Operasi Mayor",
    status: "Terjadwal",
  },
];

export default DashboardOperasi;
