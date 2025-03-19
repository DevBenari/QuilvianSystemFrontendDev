"use client";

import React, { useState, useEffect } from "react";
import {
  FaBaby,
  FaHeartbeat,
  FaWeight,
  FaUserMd,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaProcedures,
  FaClock,
  FaCheckCircle,
  FaHospital,
  FaFileMedical,
  FaTemperatureHigh,
  FaStethoscope,
} from "react-icons/fa";
import { Badge, Row, Col, Card, ProgressBar } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample data for infant patients
const infantPatientsData = [
  {
    id: "IP001",
    patientName: "Bayi Andi",
    patientId: "P-2023-042",
    birthDate: "2023-10-15",
    gender: "Laki-laki",
    birthWeight: "3.2 kg",
    currentWeight: "3.5 kg",
    weightGain: "+0.3 kg",
    attendingDoctor: "dr. Ratna Sari",
    status: "Stable",
    vitalSigns: "Normal",
    lastCheckup: "2023-11-14 08:30",
    nextCheckup: "2023-11-21 10:00",
    nutritionStatus: "Good",
    immunizationStatus: "Up to date",
  },
  {
    id: "IP002",
    patientName: "Bayi Budi",
    patientId: "P-2023-078",
    birthDate: "2023-10-20",
    gender: "Laki-laki",
    birthWeight: "2.9 kg",
    currentWeight: "3.0 kg",
    weightGain: "+0.1 kg",
    attendingDoctor: "dr. Hadi Purnomo",
    status: "Monitoring",
    vitalSigns: "Slightly Elevated Temperature",
    lastCheckup: "2023-11-15 09:15",
    nextCheckup: "2023-11-17 09:00",
    nutritionStatus: "Adequate",
    immunizationStatus: "Pending BCG",
  },
  {
    id: "IP003",
    patientName: "Bayi Citra",
    patientId: "P-2023-103",
    birthDate: "2023-09-25",
    gender: "Perempuan",
    birthWeight: "3.0 kg",
    currentWeight: "3.7 kg",
    weightGain: "+0.7 kg",
    attendingDoctor: "dr. Nia Kurniawan",
    status: "Stable",
    vitalSigns: "Normal",
    lastCheckup: "2023-11-14 10:45",
    nextCheckup: "2023-11-28 11:00",
    nutritionStatus: "Excellent",
    immunizationStatus: "Up to date",
  },
  {
    id: "IP004",
    patientName: "Bayi Dedi",
    patientId: "P-2023-056",
    birthDate: "2023-11-01",
    gender: "Laki-laki",
    birthWeight: "2.7 kg",
    currentWeight: "2.8 kg",
    weightGain: "+0.1 kg",
    attendingDoctor: "dr. Santoso",
    status: "Needs Attention",
    vitalSigns: "Low Body Temperature",
    lastCheckup: "2023-11-15 10:00",
    nextCheckup: "2023-11-16 09:00",
    nutritionStatus: "Needs Improvement",
    immunizationStatus: "Not Started",
  },
  {
    id: "IP005",
    patientName: "Bayi Eva",
    patientId: "P-2023-098",
    birthDate: "2023-10-05",
    gender: "Perempuan",
    birthWeight: "3.3 kg",
    currentWeight: "3.8 kg",
    weightGain: "+0.5 kg",
    attendingDoctor: "dr. Ratna Sari",
    status: "Stable",
    vitalSigns: "Normal",
    lastCheckup: "2023-11-13 08:00",
    nextCheckup: "2023-11-27 09:30",
    nutritionStatus: "Good",
    immunizationStatus: "Up to date",
  },
  {
    id: "IP006",
    patientName: "Bayi Firman",
    patientId: "P-2023-112",
    birthDate: "2023-09-15",
    gender: "Laki-laki",
    birthWeight: "3.1 kg",
    currentWeight: "4.0 kg",
    weightGain: "+0.9 kg",
    attendingDoctor: "dr. Nia Kurniawan",
    status: "Stable",
    vitalSigns: "Normal",
    lastCheckup: "2023-11-14 10:30",
    nextCheckup: "2023-11-28 10:30",
    nutritionStatus: "Excellent",
    immunizationStatus: "Up to date",
  },
  {
    id: "IP007",
    patientName: "Bayi Gita",
    patientId: "P-2023-067",
    birthDate: "2023-10-25",
    gender: "Perempuan",
    birthWeight: "2.8 kg",
    currentWeight: "2.9 kg",
    weightGain: "+0.1 kg",
    attendingDoctor: "dr. Hadi Purnomo",
    status: "Monitoring",
    vitalSigns: "Mild Jaundice",
    lastCheckup: "2023-11-15 11:00",
    nextCheckup: "2023-11-18 11:00",
    nutritionStatus: "Adequate",
    immunizationStatus: "Pending Hepatitis B",
  },
  {
    id: "IP008",
    patientName: "Bayi Hendra",
    patientId: "P-2023-073",
    birthDate: "2023-11-05",
    gender: "Laki-laki",
    birthWeight: "3.5 kg",
    currentWeight: "3.5 kg",
    weightGain: "0 kg",
    attendingDoctor: "dr. Santoso",
    status: "Monitoring",
    vitalSigns: "Normal",
    lastCheckup: "2023-11-15 09:30",
    nextCheckup: "2023-11-17 09:30",
    nutritionStatus: "Good",
    immunizationStatus: "Not Started",
  },
];

// Sample data for infant health statistics
const infantHealthData = [
  { category: "Normal Weight", value: 65 },
  { category: "Low Birth Weight", value: 20 },
  { category: "Very Low Birth Weight", value: 10 },
  { category: "Extremely Low Birth Weight", value: 5 },
];

const DashboardBayi = () => {
  const [filteredInfants, setFilteredInfants] = useState(infantPatientsData);
  const [loading, setLoading] = useState(false);

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Stable":
        return <Badge bg="success">{status}</Badge>;
      case "Monitoring":
        return <Badge bg="info">{status}</Badge>;
      case "Needs Attention":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Function to get nutrition status badge
  const getNutritionBadge = (status) => {
    switch (status) {
      case "Excellent":
        return <Badge bg="success">{status}</Badge>;
      case "Good":
        return <Badge bg="info">{status}</Badge>;
      case "Adequate":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Needs Improvement":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Refresh data function
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredInfants([...infantPatientsData]);
    }, 1000);
  };

  // Header configuration for Infant Dashboard
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "NEONATAL",
    divisionText: "Departemen Pediatri & Neonatologi",
    icon: FaBaby,
    bgColor: "#1565C0", // Deep blue for pediatrics
    bgGradient: "linear-gradient(135deg, #1565C0 0%, #1976D2 100%)", // Blue gradient
    badgeColor: "#E3F2FD", // Light blue for the badge
    badgeTextColor: "#1565C0", // Blue for the text
  };

  // Statistics cards
  const statCards = [
    { title: "Total Bayi", value: 32, icon: FaBaby, color: "primary" },
    { title: "Kondisi Stabil", value: 25, icon: FaHeartbeat, color: "success" },
    {
      title: "Perlu Monitoring",
      value: 5,
      icon: FaStethoscope,
      color: "warning",
    },
    {
      title: "Perlu Perhatian",
      value: 2,
      icon: FaExclamationTriangle,
      color: "danger",
    },
    {
      title: "Jadwal Imunisasi Hari Ini",
      value: 4,
      icon: FaCalendarCheck,
      color: "info",
    },
    {
      title: "Pemeriksaan Hari Ini",
      value: 8,
      icon: FaFileMedical,
      color: "secondary",
    },
  ];

  // Line chart for weight gain tracking
  const lineChartConfig = {
    title: "Rata-rata Pertambahan Berat Badan (kg)",
    type: "line",
    height: 350,
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: [
          "Minggu 1",
          "Minggu 2",
          "Minggu 3",
          "Minggu 4",
          "Minggu 5",
          "Minggu 6",
          "Minggu 7",
          "Minggu 8",
        ],
      },
      yaxis: {
        title: {
          text: "Berat Badan (kg)",
        },
      },
      colors: ["#4e73df", "#f6c23e", "#1cc88a"],
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Rata-rata Actual",
        data: [3.2, 3.4, 3.6, 3.9, 4.1, 4.3, 4.5, 4.7],
      },
      {
        name: "Batas Bawah Normal",
        data: [2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2],
      },
      {
        name: "Batas Atas Normal",
        data: [3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7],
      },
    ],
  };

  // Pie chart for infant health statistics
  const pieChartConfig = {
    title: "Distribusi Berat Badan Lahir",
    type: "pie",
    data: infantHealthData,
    height: 350,
    id: "infant-chart-01",
  };

  // Table configuration for infant patients
  const tableConfig = {
    title: "Daftar Pasien Bayi",
    columns: [
      { key: "patientName", label: "Nama Bayi" },
      { key: "patientId", label: "ID Pasien" },
      { key: "birthDate", label: "Tanggal Lahir" },
      { key: "gender", label: "Jenis Kelamin" },
      { key: "birthWeight", label: "Berat Lahir" },
      { key: "currentWeight", label: "Berat Sekarang" },
      { key: "weightGain", label: "Pertambahan" },
      { key: "attendingDoctor", label: "Dokter" },
      {
        key: "status",
        label: "Status",
        render: (item) => getStatusBadge(item.status),
      },
      {
        key: "nutritionStatus",
        label: "Status Nutrisi",
        render: (item) => getNutritionBadge(item.nutritionStatus),
      },
      { key: "lastCheckup", label: "Pemeriksaan Terakhir" },
      { key: "nextCheckup", label: "Pemeriksaan Berikutnya" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaBaby,
    buttonRefresh: true,
    basePath: "/pediatrics/infant-details",
    slugConfig: {
      textField: "patientName",
      idField: "id",
    },
    showActions: true,
    actions: [
      {
        label: "Lihat Detail",
        icon: "eye",
        onClick: (item) => console.log(`View details for ${item.id}`),
      },
      {
        label: "Update Status",
        icon: "edit",
        onClick: (item) => console.log(`Update status for ${item.id}`),
      },
    ],
  };

  // Custom summary component for infant health statistics
  const InfantSummary = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <h4 className="card-title mb-4">Statistik Kesehatan Bayi</h4>
          <Row>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Rata-rata Berat Lahir</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">3.1 kg</h2>
                  <small className="text-success">
                    +0.1 kg dari bulan lalu
                  </small>
                </div>
                <p className="text-muted small">
                  Dalam kisaran normal (2.5-4.0 kg)
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Tingkat Imunisasi</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">92%</h2>
                  <small className="text-success">+2%</small>
                </div>
                <p className="text-muted small">
                  Bayi dengan imunisasi lengkap
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Indeks ASI Eksklusif</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">85%</h2>
                  <small className="text-success">+5%</small>
                </div>
                <p className="text-muted small">Bayi dengan ASI eksklusif</p>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <h6 className="text-primary mb-3">
                Target Pertumbuhan Bulan Ini
              </h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Berat Badan</span>
                  <span>85%</span>
                </div>
                <ProgressBar variant="success" now={85} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Tinggi Badan</span>
                  <span>90%</span>
                </div>
                <ProgressBar variant="info" now={90} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Perkembangan Motorik</span>
                  <span>80%</span>
                </div>
                <ProgressBar variant="warning" now={80} />
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 border rounded bg-light">
                <h6 className="text-primary mb-3">Status Peralatan NICU</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-2">
                    <span>Incubator</span>
                    <Badge bg="success">10/12 Tersedia</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Infant Warmer</span>
                    <Badge bg="success">8/8 Tersedia</Badge>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Ventilator Neonatal</span>
                    <Badge bg="warning" text="dark">
                      4/6 Tersedia
                    </Badge>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <BaseDashboard
      // Header configuration
      headerConfig={headerConfig}
      // Statistics cards
      statCards={statCards}
      // Left chart - line chart of weight gain
      leftChart={lineChartConfig}
      // Right chart - pie chart of birth weight distribution
      rightChart={pieChartConfig}
      // Custom content - Infant health summary
      customContent={<InfantSummary />}
      // Table configuration
      tableConfig={tableConfig}
      // Data and state
      data={infantPatientsData}
      filteredData={filteredInfants}
      setFilteredData={setFilteredInfants}
      loading={loading}
      // Pagination
      pagination={{
        currentPage: 1,
        totalPages: 1,
        itemPerPage: 10,
        onPageChange: () => {},
      }}
      // Refresh function
      onRefresh={handleRefresh}
      // Show title
      showTitle={false}
    />
  );
};

export default DashboardBayi;
