"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Badge, Button } from "react-bootstrap";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaSearch,
  FaHospital,
} from "react-icons/fa";
import Chart from "react-apexcharts";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import { FaDoorOpen } from "react-icons/fa";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// Data dummy untuk daftar pendaftaran
const pasienPendaftaranData = [
  {
    id: "PD-001",
    nama: "John Doe",
    poli: "Umum",
    dokter: "dr. Sarah Johnson",
    status: "Selesai",
    waktuDaftar: "08:00",
  },
  {
    id: "PD-002",
    nama: "Jane Smith",
    poli: "Gigi",
    dokter: "dr. Mike Wilson",
    status: "Dalam Antrian",
    waktuDaftar: "08:15",
  },
  {
    id: "PD-003",
    nama: "Michael Johnson",
    poli: "Anak",
    dokter: "dr. Rachel Adams",
    status: "Dalam Pemeriksaan",
    waktuDaftar: "09:00",
  },
];

// Data grafik pendaftaran
const visitDataPendaftaran = [
  { name: "Jan", pendaftaran: 340 },
  { name: "Feb", pendaftaran: 410 },
  { name: "Mar", pendaftaran: 380 },
  { name: "Apr", pendaftaran: 460 },
  { name: "May", pendaftaran: 420 },
  { name: "Jun", pendaftaran: 450 },
];

const DashboardPendaftaran = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPasien, setFilteredPasien] = useState(pasienPendaftaranData);

  // Fungsi pencarian
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = pasienPendaftaranData.filter((pasien) =>
      pasien.nama.toLowerCase().includes(text)
    );
    setFilteredPasien(filtered);
  };

  useEffect(() => {
    if (document.querySelectorAll("#home-chart-03").length) {
      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        const chart = am4core.create("home-chart-03", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0;

        // Data provinsi di Indonesia
        chart.data = [
          {
            province: "DKI Jakarta",
            value: 320,
          },
          {
            province: "Jawa Barat",
            value: 280,
          },
          {
            province: "Jawa Tengah",
            value: 250,
          },
          {
            province: "Jawa Timur",
            value: 260,
          },
          {
            province: "Bali",
            value: 150,
          },
        ];

        chart.rtl = true;
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        // Series configuration
        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "province";
        series.colors.list = [
          am4core.color("#089bab"),
          am4core.color("#2ca5b2"),
          am4core.color("#faa264"),
          am4core.color("#fcb07a"),
          am4core.color("#5bc5d1"),
        ];

        series.slices.template.cornerRadius = 0;
        series.slices.template.innerCornerRadius = 0;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        chart.legend = new am4charts.Legend();
      });
    }
    return () => {};
  }, []);

  // Konfigurasi grafik
  const chartOptionsAdmisi = {
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
      colors: ["#007bff", "#28a745", "#ffc107"],
    },
    series: [
      {
        name: "Pasien Baru",
        data: [120, 150, 140, 170, 180, 200],
      },
      {
        name: "Pasien Lama",
        data: [80, 95, 85, 120, 100, 90],
      },
      {
        name: "Pasien Darurat",
        data: [30, 40, 35, 50, 45, 60],
      },
    ],
  };
  return (
    <>
      <Row>
        <Col md="12">
          {/* Header Statistik */}
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
                        <span className="counter">120</span>
                      </h2>
                      <h5 className="">Total Pendaftaran</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="3">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-success rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-success">
                      <i className="ri-hospital-line"></i>
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">45</span>
                      </h2>
                      <h5 className="">Pasien Selesai</h5>
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
                      <i className="ri-time-line"></i>
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">35</span>
                      </h2>
                      <h5 className="">Dalam Pemeriksaan</h5>
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
                      <FaDoorOpen />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">20</span>
                      </h2>
                      <h5 className="">Pasien Menunggu</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Grafik Kunjungan */}
            <Row className="mb-4">
              <Col lg="6">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <h4 className="card-title">Grafik Kunjungan Admisi</h4>
                  </div>
                  <div className="iq-card-body">
                    <Chart
                      options={chartOptionsAdmisi.options}
                      series={chartOptionsAdmisi.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </Col>
              {/* Daftar Poli Terpopuler */}
              <Col lg="6">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Patient overview</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <div
                      id="home-chart-03"
                      style={{ height: "350px" }}
                      className="iq-card-body"
                    ></div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Statistik Pendaftaran Tambahan */}

            {/* Daftar Pasien */}
            <Row className="mb-4">
              <Col lg="12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <FaUsers className="text-primary me-2" size={20} />
                      <h5 className="mb-0">Daftar Pendaftaran Pasien</h5>
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
                      data={filteredPasien}
                      columns={[
                        { key: "id", label: "ID Pendaftaran" },
                        { key: "nama", label: "Nama Pasien" },
                        { key: "poli", label: "Poli Tujuan" },
                        { key: "dokter", label: "Dokter" },
                        { key: "status", label: "Status" },
                        { key: "waktuDaftar", label: "Waktu Daftar" },
                      ]}
                      itemsPerPage={5}
                      slugConfig={{ textField: "nama", idField: "id" }}
                      basePath="/pendaftaran/data-pasien/detail-pasien"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPendaftaran;
