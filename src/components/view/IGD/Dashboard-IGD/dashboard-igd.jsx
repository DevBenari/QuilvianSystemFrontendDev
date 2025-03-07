"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Badge, Button } from "react-bootstrap";
import {
  FaUserMd,
  FaUsers,
  FaHospital,
  FaSearch,
  FaAmbulance,
  FaBed,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import Chart from "react-apexcharts";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// Data dummy untuk daftar pasien IGD
const pasienIGDData = [
  {
    id: "P-2023-001",
    nama: "Ahmad Rizal",
    usia: 45,
    keluhan: "Nyeri dada",
    status: "Menunggu",
    keparahan: "Sedang",
    waktuMasuk: "15:30",
  },
  {
    id: "P-2023-002",
    nama: "Siti Aminah",
    usia: 32,
    keluhan: "Sesak napas",
    status: "Dalam Perawatan",
    keparahan: "Kritis",
    waktuMasuk: "15:15",
  },
  {
    id: "P-2023-003",
    nama: "Budi Santoso",
    usia: 28,
    keluhan: "Demam tinggi",
    status: "Menunggu",
    keparahan: "Ringan",
    waktuMasuk: "15:45",
  },
  {
    id: "P-2023-004",
    nama: "Dewi Putri",
    usia: 56,
    keluhan: "Cedera kepala",
    status: "Dalam Perawatan",
    keparahan: "Sedang",
    waktuMasuk: "15:10",
  },
  {
    id: "P-2023-005",
    nama: "Rudi Hermawan",
    usia: 22,
    keluhan: "Luka sayat",
    status: "Menunggu",
    keparahan: "Ringan",
    waktuMasuk: "15:50",
  },
];

// Data untuk ruangan IGD
const ruanganIGDData = [
  {
    id: "R001",
    nama: "Ruang IGD 1",
    status: "Terpakai",
    pasien: "Siti Aminah",
  },
  { id: "R002", nama: "Ruang IGD 2", status: "Terpakai", pasien: "Dewi Putri" },
  {
    id: "R003",
    nama: "Ruang IGD 3",
    status: "Terpakai",
    pasien: "Eko Prasetyo",
  },
  { id: "R004", nama: "Ruang Resusitasi", status: "Kosong", pasien: "-" },
  {
    id: "R005",
    nama: "Ruang Observasi 1",
    status: "Terpakai",
    pasien: "Rina Wati",
  },
  { id: "R006", nama: "Ruang Observasi 2", status: "Kosong", pasien: "-" },
  {
    id: "R007",
    nama: "Ruang Observasi 3",
    status: "Terpakai",
    pasien: "Joko Widodo",
  },
  { id: "R008", nama: "Ruang Khusus", status: "Terpakai", pasien: "Maya Sari" },
];

// Data grafik kunjungan IGD
const visitDataIGD = [
  { name: "Jan", kunjungan: 340 },
  { name: "Feb", kunjungan: 410 },
  { name: "Mar", kunjungan: 380 },
  { name: "Apr", kunjungan: 460 },
  { name: "May", kunjungan: 420 },
  { name: "Jun", kunjungan: 450 },
];

const DashboardIGD = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPasien, setFilteredPasien] = useState(pasienIGDData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Fungsi pencarian
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = pasienIGDData.filter((pasien) =>
      pasien.nama.toLowerCase().includes(text)
    );
    setFilteredPasien(filtered);
  };

  useEffect(() => {
    if (document.querySelectorAll("#igd-chart-01").length) {
      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        const chart = am4core.create("igd-chart-01", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0;

        // Data penyebab kunjungan IGD
        chart.data = [
          {
            kasus: "Trauma/Kecelakaan",
            value: 320,
          },
          {
            kasus: "Penyakit Jantung",
            value: 280,
          },
          {
            kasus: "Infeksi",
            value: 250,
          },
          {
            kasus: "Pernapasan",
            value: 260,
          },
          {
            kasus: "Lainnya",
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
        series.dataFields.category = "kasus";
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
  const chartOptionsIGD = {
    options: {
      chart: {
        type: "line",
        height: 350,
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      colors: ["#dc3545", "#007bff", "#28a745"],
    },
    series: [
      {
        name: "Pasien Kritis",
        data: [30, 40, 35, 50, 49, 60, 70, 65, 80],
      },
      {
        name: "Pasien Sedang",
        data: [120, 130, 125, 140, 145, 150, 155, 160, 170],
      },
      {
        name: "Pasien Ringan",
        data: [180, 185, 190, 175, 185, 195, 160, 200, 210],
      },
    ],
  };

  // Fungsi untuk mendapatkan warna badge berdasarkan keparahan
  const getKeparahanBadge = (keparahan) => {
    switch (keparahan) {
      case "Kritis":
        return <Badge bg="danger">{keparahan}</Badge>;
      case "Sedang":
        return (
          <Badge bg="warning" text="dark">
            {keparahan}
          </Badge>
        );
      case "Ringan":
        return <Badge bg="success">{keparahan}</Badge>;
      default:
        return <Badge bg="secondary">{keparahan}</Badge>;
    }
  };

  // Fungsi untuk mendapatkan warna badge berdasarkan status ruangan
  const getRoomStatusBadge = (status) => {
    switch (status) {
      case "Terpakai":
        return <Badge bg="danger">{status}</Badge>;
      case "Kosong":
        return <Badge bg="success">Tersedia</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="igd-header p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="hospital-logo me-3">
              <FaHospital size={42} className="logo-icon" />
            </div>
            <div className="hospital-info">
              <h1 className="hospital-name mb-0">RS INTERNAL</h1>
              <div className="division-name">
                <span className="badge-emergency">EMERGENCY</span>
                <span className="division-text">Instalasi Gawat Darurat</span>
              </div>
            </div>
          </div>
          <div className="datetime-display text-end">
            <div className="date-info">
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="time-info">
              {currentTime.toLocaleTimeString("id-ID")}
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md="12">
          {/* Header Statistik */}
          <Row className="mb-4">
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-primary rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-primary">
                      <FaUsers />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">12</span>
                      </h2>
                      <h5 className="">Pasien Menunggu</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-success rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-success">
                      <FaHospital />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">8</span>
                      </h2>
                      <h5 className="">Dalam Perawatan</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-info rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-info">
                      <FaBed />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">5</span>
                      </h2>
                      <h5 className="">Tempat Tidur Tersedia</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-danger rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-danger">
                      <FaExclamationTriangle />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">3</span>
                      </h2>
                      <h5 className="">Pasien Kritis</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-warning rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-warning">
                      <FaClock />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">25</span>
                      </h2>
                      <h5 className="">Waktu Tunggu (menit)</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="2">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-primary rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-primary">
                      <FaUserMd />
                    </div>
                    <div className="text-end mx-2">
                      <h2 className="mb-0">
                        <span className="counter">15</span>
                      </h2>
                      <h5 className="">Staf Bertugas</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Grafik dan Status Ruangan */}
          <Row className="mb-4">
            <Col lg="8">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <h4 className="card-title">Tren Kunjungan IGD</h4>
                </div>
                <div className="iq-card-body">
                  <Chart
                    options={chartOptionsIGD.options}
                    series={chartOptionsIGD.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </Col>
            {/* Statistik Kasus IGD */}
            <Col lg="4">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Sebaran Kasus IGD</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div
                    id="igd-chart-01"
                    style={{ height: "350px" }}
                    className="iq-card-body"
                  ></div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Tabel Pasien */}
          <Row className="mb-4">
            <Col lg="12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <FaUsers className="text-primary me-2" size={20} />
                    <h5 className="mb-0">Daftar Pasien Terkini</h5>
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
                      { key: "id", label: "ID" },
                      { key: "nama", label: "Nama" },
                      { key: "usia", label: "Usia" },
                      { key: "keluhan", label: "Keluhan" },
                      { key: "status", label: "Status" },
                      {
                        key: "keparahan",
                        label: "Keparahan",
                        render: (item) => getKeparahanBadge(item.keparahan),
                      },
                      { key: "waktuMasuk", label: "Waktu Masuk" },
                    ]}
                    itemsPerPage={5}
                    slugConfig={{ textField: "nama", idField: "id" }}
                    basePath="/igd/data-pasien/detail-pasien"
                  />
                </div>
              </div>
            </Col>

            {/* Status Ruangan */}
            {/* Status Ruangan - Full Width */}
            <Row className="mb-4">
              <Col lg="12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between align-items-center">
                    <div className="iq-header-title">
                      <h4 className="card-title">Status Ruangan</h4>
                    </div>
                    <Badge bg="success" className="p-2">
                      {
                        ruanganIGDData.filter(
                          (room) => room.status === "Kosong"
                        ).length
                      }{" "}
                      Tersedia
                    </Badge>
                  </div>
                  <div className="iq-card-body">
                    <div className="room-grid-container">
                      {ruanganIGDData.map((room) => (
                        <div
                          key={room.id}
                          className={`room-card-lg ${
                            room.status === "Terpakai"
                              ? "room-occupied"
                              : "room-available"
                          }`}
                        >
                          <div className="room-header">
                            <div className="room-id">{room.id}</div>
                            <div
                              className={`room-status-badge ${
                                room.status === "Terpakai"
                                  ? "status-occupied"
                                  : "status-available"
                              }`}
                            >
                              {room.status}
                            </div>
                          </div>
                          <div className="room-content">
                            <h4 className="room-name">{room.nama}</h4>
                            <div className="patient-info">
                              <span className="patient-label">Pasien:</span>
                              <span className="patient-name">
                                {room.pasien}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>

      <style jsx>{`
        .igd-header {
          border-radius: 0.5rem;
          background: #1a237e;
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }

        .igd-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
          z-index: 0;
        }

        .igd-header > div {
          position: relative;
          z-index: 1;
        }

        .hospital-name {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ffffff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .division-name {
          display: flex;
          align-items: center;
          margin-top: 8px;
        }

        .badge-emergency {
          background-color: #ff3d00;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: bold;
          margin-right: 12px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .division-text {
          font-size: 1.2rem;
          color: #ffffff;
          font-weight: 500;
        }

        .datetime-display {
          background: rgba(0, 0, 0, 0.25);
          padding: 12px 18px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .date-info {
          font-size: 1rem;
          color: #ffffff;
        }

        .time-info {
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.1;
          margin-top: 5px;
          color: #ffffff;
        }

        .logo-icon {
          background: rgba(255, 255, 255, 0.15);
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          color: #ffffff;
        }

        .room-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .room-card-lg {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          min-height: 120px;
        }

        .room-card-lg:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }

        .room-occupied {
          background-color: #ffebee;
          border-left: 5px solid #ef5350;
        }

        .room-available {
          background-color: #e8f5e9;
          border-left: 5px solid #4caf50;
        }

        .room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background-color: rgba(0, 0, 0, 0.03);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .room-id {
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }

        .room-status-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 30px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .status-occupied {
          background-color: #f44336;
          color: white;
        }

        .status-available {
          background-color: #4caf50;
          color: white;
        }

        .room-content {
          padding: 16px;
        }

        .room-name {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .patient-info {
          display: flex;
          align-items: center;
        }

        .patient-label {
          font-size: 14px;
          color: #777;
          margin-right: 5px;
        }

        .patient-name {
          font-size: 15px;
          font-weight: 500;
          color: #212121;
        }

        @media (max-width: 768px) {
          .igd-header .d-flex {
            flex-direction: column;
            text-align: center;
          }

          .datetime-display {
            margin-top: 15px;
            text-align: center;
          }

          .hospital-info,
          .division-name {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardIGD;
