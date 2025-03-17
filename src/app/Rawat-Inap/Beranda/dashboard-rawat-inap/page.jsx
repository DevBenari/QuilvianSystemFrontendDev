"use client";

import React, { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import {
  FaUserClock,
  FaBed,
  FaHospital,
  FaUserInjured,
  FaClock,
  FaDoorOpen,
  FaCalendarCheck,
} from "react-icons/fa";
import dynamic from "next/dynamic";

import { aktivitasPasien, PasienRawatInap } from "@/utils/dataPasien";
import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

const DashboardRawatInap = () => {
  // State untuk data pasien rawat inap
  const [filteredPatients, setFilteredPatients] = useState(PasienRawatInap);
  const [loading, setLoading] = useState(false);

  // Dynamically import Chart component (untuk Client-side Rendering)
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  // Konfigurasi header untuk Rawat Inap
  const headerConfig = {
    hospitalName: "RS MMC",
    badgeText: "RAWAT INAP",
    divisionText: "Instalasi Pelayanan Rawat Inap",
    icon: FaHospital,
    bgColor: "#4a148c",
    bgGradient: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)",
    badgeColor: "#ce93d8",
    badgeTextColor: "#4a148c",
  };

  // Konfigurasi statistik cards
  const statCards = [
    {
      title: "Pasien Rawat Inap",
      value: 75,
      icon: FaUserInjured,
      color: "primary",
      subtitle: "↑ 8% dari kemarin",
    },
    {
      title: "Kamar Terisi",
      value: 30,
      icon: FaBed,
      color: "warning",
    },
    {
      title: "Kamar Kosong",
      value: 20,
      icon: FaDoorOpen,
      color: "danger",
    },
    {
      title: "Rata-rata (Jam)",
      value: 48,
      icon: FaClock,
      color: "info",
      subtitle: "Lama rawat inap",
    },
  ];

  // Konfigurasi bar chart
  const barChartConfig = {
    title: "Grafik Kunjungan Pasien Rawat Inap",
    type: "bar",
    height: 350,
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
          borderRadius: 5,
          columnWidth: "55%",
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

  // Konfigurasi tabel
  const tableConfig = {
    title: "Daftar Pasien Rawat Inap",
    columns: [
      { key: "id", label: "ID Pasien" },
      { key: "nama", label: "Nama Pasien" },
      { key: "kamar", label: "Kamar" },
      { key: "jenisKelamin", label: "Jenis Kelamin" },
      { key: "status", label: "Status Perawatan" },
      { key: "waktuMasuk", label: "Waktu Masuk" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaUserInjured,
    buttonRefresh: true,
    basePath: "/instalasi-rawat-inap/data-pasien/detail-pasien",
    slugConfig: {
      textField: "nama",
      idField: "id",
    },
  };

  // Komponen custom untuk status pasien per kamar
  const StatusPasienPerKamar = () => (
    <div className="iq-card mb-4">
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
  );

  // Komponen custom untuk aktivitas terkini
  const AktivitasTerkini = () => (
    <div className="iq-card">
      <div className="iq-card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">Aktivitas Terkini</h4>
        <span className="badge bg-primary">Hari Ini</span>
      </div>
      <div className="iq-card-body">
        <div className="activity-list">
          {aktivitasPasien.map((item, index) => (
            <div key={index} className="activity-item mb-3 p-3 border-bottom">
              <div className="d-flex">
                <div className="me-3">{item.icon}</div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-medium">{item.title}</h6>
                    <div className="text-muted small">
                      <i className="ri-time-line me-1"></i>
                      {item.time}
                    </div>
                  </div>
                  <span className="text-muted small d-block">
                    {item.patient}
                  </span>
                  <span className="text-primary small">{item.info}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary btn-sm">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );

  // Fungsi simulasi untuk refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredPatients([...PasienRawatInap]);
    }, 1000);
  };

  // Kustomisasi konten untuk layout
  const customContent = (
    <>
      <StatusPasienPerKamar />
      <Row>
        <Col lg="8">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <h4 className="card-title">Grafik Kunjungan Pasien Rawat Inap</h4>
            </div>
            <div className="iq-card-body">
              <Chart
                options={barChartConfig.options}
                series={barChartConfig.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <AktivitasTerkini />
        </Col>
      </Row>
    </>
  );

  return (
    <BaseDashboard
      // Header konfigurasi
      headerConfig={headerConfig}
      // Statistik cards
      statCards={statCards}
      // Custom content (ganti grafik bawaan)
      customContent={customContent}
      // Data dan state
      data={PasienRawatInap}
      filteredData={filteredPatients}
      setFilteredData={setFilteredPatients}
      loading={loading}
      // Pagination (dummy untuk contoh)
      pagination={{
        currentPage: 1,
        totalPages: 1,
        itemPerPage: 5,
        onPageChange: () => {},
      }}
      // Fungsi refresh
      onRefresh={handleRefresh}
      // Tabel config (opsional, dalam contoh asli di-comment)
      tableConfig={tableConfig}
      // Set ke null agar tidak menampilkan chart bawaan dari BaseDashboard
      leftChart={null}
      rightChart={null}
    />
  );
};

export default DashboardRawatInap;
