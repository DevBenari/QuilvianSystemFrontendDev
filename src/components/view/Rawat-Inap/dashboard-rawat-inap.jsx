"use client";

import React, { useState } from "react";
import { Row, Col, Badge, Modal, Button } from "react-bootstrap";
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
import StatusRuangRawatInapComponent from "@/components/features/status/status-ruangan";

const DashboardRawatInap = () => {
  // State untuk data pasien rawat inap
  const [filteredPatients, setFilteredPatients] = useState(PasienRawatInap);
  const [loading, setLoading] = useState(false);

  // Dynamically import Chart component (untuk Client-side Rendering)
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  // Konfigurasi header untuk Rawat Inap
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "RAWAT INAP",
    divisionText: "Instalasi Pelayanan Rawat Inap",
    icon: FaHospital,
    bgColor: "#2E7D32", // Hijau gelap yang memberikan kesan tenang dan aman
    bgGradient: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)", // Gradasi hijau yang fresh dan profesional
    badgeColor: "#A5D6A7", // Hijau pastel yang lembut dan nyaman dipandang
    badgeTextColor: "#1B5E20", // Hijau lebih gelap untuk kontras yang baik
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

  // Fungsi simulasi untuk refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredPatients([...PasienRawatInap]);
    }, 1000);
  };

  const ruangRawatInapData = [
    {
      id: "RR001",
      namaRuangan: "Melati",
      kelas: "Kelas 1",
      jenisRuangan: "Ruang Umum",
      kapasitas: 20,
      terisi: 18,
    },
    {
      id: "RR002",
      namaRuangan: "Anggrek",
      kelas: "Kelas 2",
      jenisRuangan: "Ruang Khusus",
      kapasitas: 15,
      terisi: 11,
    },
    {
      id: "RR003",
      namaRuangan: "Mawar",
      kelas: "Kelas 3",
      jenisRuangan: "Ruang Isolasi",
      kapasitas: 25,
      terisi: 23,
    },
    {
      id: "RR004",
      namaRuangan: "Tulip",
      kelas: "Kelas 1",
      jenisRuangan: "Ruang VIP",
      kapasitas: 10,
      terisi: 6,
    },
  ];

  // State untuk modal detail ruangan
  const [selectedRuangan, setSelectedRuangan] = useState(null);

  // Handler untuk klik item ruangan
  const handleItemClick = (ruangan) => {
    setSelectedRuangan(ruangan);
  };

  // Handler untuk menutup modal
  const handleCloseModal = () => {
    setSelectedRuangan(null);
  };

  // Kustomisasi konten untuk layout
  const content = (
    <>
      <StatusRuangRawatInapComponent
        data={ruangRawatInapData}
        title="Status Ruang Rawat Inap"
        headerBadgeText="Ruangan"
        onItemClick={handleItemClick}
        customLabels={{
          kelas: "Tipe Ruangan",
          jenisRuangan: "Kategori",
          kapasitas: "Ketersediaan",
          terisi: "Terpakai",
        }}
      />

      {/* Modal Detail Ruangan */}
      {selectedRuangan && (
        <Modal show={!!selectedRuangan} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Detail Ruangan {selectedRuangan.namaRuangan}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <strong>ID Ruangan:</strong> {selectedRuangan.id}
              </div>
              <div className="col-6">
                <strong>Nama Ruangan:</strong> {selectedRuangan.namaRuangan}
              </div>
              <div className="col-6 mt-2">
                <strong>Kelas:</strong> {selectedRuangan.kelas}
              </div>
              <div className="col-6 mt-2">
                <strong>Jenis Ruangan:</strong> {selectedRuangan.jenisRuangan}
              </div>
              <div className="col-6 mt-2">
                <strong>Kapasitas Total:</strong> {selectedRuangan.kapasitas}{" "}
                pasien
              </div>
              <div className="col-6 mt-2">
                <strong>Terisi:</strong> {selectedRuangan.terisi} pasien
              </div>
              <div className="col-12 mt-2">
                <strong>Sisa Ruangan:</strong>{" "}
                {selectedRuangan.kapasitas - selectedRuangan.terisi} pasien
              </div>
              <div className="col-12 mt-3">
                <div className="progress">
                  <div
                    className={`progress-bar ${
                      (selectedRuangan.terisi / selectedRuangan.kapasitas) *
                        100 >=
                      90
                        ? "bg-danger"
                        : (selectedRuangan.terisi / selectedRuangan.kapasitas) *
                            100 >=
                          70
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                    role="progressbar"
                    style={{
                      width: `${
                        (selectedRuangan.terisi / selectedRuangan.kapasitas) *
                        100
                      }%`,
                    }}
                    aria-valuenow={
                      (selectedRuangan.terisi / selectedRuangan.kapasitas) * 100
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {Math.round(
                      (selectedRuangan.terisi / selectedRuangan.kapasitas) * 100
                    )}
                    % Terisi
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );

  const RightChart = {
    title: "Sebaran Kasus Rawat Inap",
    type: "pie",
    data: [
      { category: "Bedah", value: 320 },
      { category: "Penyakit Dalam", value: 280 },
      { category: "Anak", value: 250 },
      { category: "Obstetri & Ginekologi", value: 260 },
      { category: "Lainnya", value: 150 },
    ],
    height: 350,
    id: "igd-chart-01",
  };

  return (
    <BaseDashboard
      // Header konfigurasi
      headerConfig={headerConfig}
      // Statistik cards
      statCards={statCards}
      // Custom content (ganti grafik bawaan)
      customContent={content}
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
      leftChart={barChartConfig}
      rightChart={RightChart}
    />
  );
};

export default DashboardRawatInap;
