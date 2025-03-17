"use client";

import React, { useState, useEffect } from "react";
import {
  FaWheelchair,
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaHeartbeat,
  FaRunning,
  FaHospital,
  FaSync,
  FaClipboardList,
  FaCalendarAlt,
  FaChartLine,
  FaBrain,
  FaLungs,
  FaBone,
} from "react-icons/fa";
import { Badge, Row, Col, Card, Button } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample data for rehabilitation patients
const fisioterapiData = [
  {
    id: "RH001",
    name: "Ahmad Rizal",
    age: 45,
    diagnosis: "Pasca Stroke",
    category: "Neurologi",
    therapy: "Fisioterapi Motorik",
    sessions: "10/24",
    therapist: "Dr. Lina Wijaya",
    schedule: "Senin, Rabu, Jumat",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-10",
  },
  {
    id: "RH002",
    name: "Budi Santoso",
    age: 52,
    diagnosis: "Pasca Operasi Lutut",
    category: "Ortopedi",
    therapy: "Fisioterapi Lutut",
    sessions: "5/12",
    therapist: "Dr. Hendra Wijaya",
    schedule: "Selasa, Kamis",
    status: "Active",
    progress: "Good",
    lastUpdated: "2023-11-08",
  },
  {
    id: "RH003",
    name: "Citra Dewi",
    age: 38,
    diagnosis: "Nyeri Punggung Bawah",
    category: "Muskuloskeletal",
    therapy: "Fisioterapi Spine",
    sessions: "7/10",
    therapist: "Dr. Maya Sari",
    schedule: "Senin, Jumat",
    status: "Active",
    progress: "Excellent",
    lastUpdated: "2023-11-12",
  },
  {
    id: "RH004",
    name: "Dian Kusuma",
    age: 60,
    diagnosis: "Osteoarthritis",
    category: "Geriatri",
    therapy: "Hydrotherapy",
    sessions: "2/8",
    therapist: "Dr. Lina Wijaya",
    schedule: "Rabu",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-05",
  },
  {
    id: "RH005",
    name: "Eko Prasetyo",
    age: 29,
    diagnosis: "Cedera Olahraga",
    category: "Ortopedi",
    therapy: "Terapi Latihan",
    sessions: "6/8",
    therapist: "Dr. Indra Kusuma",
    schedule: "Senin, Rabu, Jumat",
    status: "Active",
    progress: "Good",
    lastUpdated: "2023-11-09",
  },
];

const terapiOkupasiData = [
  {
    id: "TO001",
    name: "Fina Maharani",
    age: 42,
    diagnosis: "Cedera Tangan",
    category: "Hand Therapy",
    therapy: "Terapi Okupasi Tangan",
    sessions: "4/12",
    therapist: "Ny. Dewi Sartika",
    schedule: "Senin, Kamis",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-11",
  },
  {
    id: "TO002",
    name: "Gunawan Wibowo",
    age: 55,
    diagnosis: "Pasca Stroke",
    category: "Neurologi",
    therapy: "ADL Training",
    sessions: "8/16",
    therapist: "Tn. Andi Permana",
    schedule: "Selasa, Jumat",
    status: "Active",
    progress: "Slow",
    lastUpdated: "2023-10-28",
  },
  {
    id: "TO003",
    name: "Hesti Indah",
    age: 34,
    diagnosis: "Cerebral Palsy",
    category: "Pediatri",
    therapy: "Sensory Integration",
    sessions: "9/20",
    therapist: "Ny. Dewi Sartika",
    schedule: "Senin, Rabu",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-06",
  },
];

const terapiWicaraData = [
  {
    id: "TW001",
    name: "Indra Jaya",
    age: 62,
    diagnosis: "Afasia Pasca Stroke",
    category: "Neurologi",
    therapy: "Speech Therapy",
    sessions: "10/16",
    therapist: "Tn. Bayu Nugroho",
    schedule: "Selasa, Kamis",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-07",
  },
  {
    id: "TW002",
    name: "Joko Widodo",
    age: 7,
    diagnosis: "Speech Delay",
    category: "Pediatri",
    therapy: "Speech Development",
    sessions: "5/12",
    therapist: "Ny. Sinta Purnama",
    schedule: "Senin, Rabu, Jumat",
    status: "Active",
    progress: "Good",
    lastUpdated: "2023-11-10",
  },
];

const terapiKardioData = [
  {
    id: "TK001",
    name: "Kartini Putri",
    age: 58,
    diagnosis: "Pasca Operasi Jantung",
    category: "Kardiovaskular",
    therapy: "Cardiac Rehabilitation",
    sessions: "7/12",
    therapist: "Dr. Rudi Hartanto",
    schedule: "Selasa, Kamis",
    status: "Active",
    progress: "Good",
    lastUpdated: "2023-11-05",
  },
  {
    id: "TK002",
    name: "Lukman Hakim",
    age: 65,
    diagnosis: "Gagal Jantung",
    category: "Kardiovaskular",
    therapy: "Exercise Training",
    sessions: "3/16",
    therapist: "Dr. Rudi Hartanto",
    schedule: "Rabu, Jumat",
    status: "Active",
    progress: "Moderate",
    lastUpdated: "2023-11-09",
  },
];

const DashboardRehabilitasi = () => {
  // State management
  const [activeTab, setActiveTab] = useState("fisioterapi");
  const [filteredData, setFilteredData] = useState(fisioterapiData);
  const [loading, setLoading] = useState(false);

  // Get data based on active tab
  useEffect(() => {
    handleTabChange(activeTab);
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setLoading(true);
    setTimeout(() => {
      switch (tab) {
        case "fisioterapi":
          setFilteredData(fisioterapiData);
          break;
        case "terapiOkupasi":
          setFilteredData(terapiOkupasiData);
          break;
        case "terapiWicara":
          setFilteredData(terapiWicaraData);
          break;
        case "terapiKardio":
          setFilteredData(terapiKardioData);
          break;
        default:
          setFilteredData([]);
      }
      setActiveTab(tab);
      setLoading(false);
    }, 500);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge bg="success">{status}</Badge>;
      case "Completed":
        return <Badge bg="primary">{status}</Badge>;
      case "On Hold":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Discontinued":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Get progress badge
  const getProgressBadge = (progress) => {
    switch (progress) {
      case "Excellent":
        return <Badge bg="success">{progress}</Badge>;
      case "Good":
        return <Badge bg="info">{progress}</Badge>;
      case "Moderate":
        return (
          <Badge bg="warning" text="dark">
            {progress}
          </Badge>
        );
      case "Slow":
        return <Badge bg="danger">{progress}</Badge>;
      default:
        return <Badge bg="secondary">{progress}</Badge>;
    }
  };

  // Header configuration for Rehabilitation
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "REHABILITATION",
    divisionText: `Rehabilitasi Medik - ${
      activeTab === "fisioterapi"
        ? "Fisioterapi"
        : activeTab === "terapiOkupasi"
        ? "Terapi Okupasi"
        : activeTab === "terapiWicara"
        ? "Terapi Wicara"
        : "Rehabilitasi Kardio"
    }`,
    icon: FaWheelchair,
    bgColor: "#00796B", // Teal for rehabilitation
    bgGradient: "linear-gradient(135deg, #00796B 0%, #009688 100%)",
    badgeColor: "#E0F2F1", // Light teal for the badge
    badgeTextColor: "#00796B", // Teal for the text
  };

  // Stat cards config
  const getStatCards = () => {
    const totalPatients =
      fisioterapiData.length +
      terapiOkupasiData.length +
      terapiWicaraData.length +
      terapiKardioData.length;

    return [
      {
        title: "Total Pasien",
        value: totalPatients,
        icon: FaUsers,
        color: "primary",
      },
      {
        title: "Terapi Aktif",
        value: totalPatients - 2, // Assuming 2 completed
        icon: FaHeartbeat,
        color: "success",
      },
      {
        title: "Terapis Bertugas",
        value: 6,
        icon: FaUserMd,
        color: "info",
      },
      {
        title: "Sesi Hari Ini",
        value: 12,
        icon: FaCalendarAlt,
        color: "warning",
      },
    ];
  };

  // Bar chart config
  const barChartConfig = {
    title: "Distribusi Pasien Berdasarkan Kategori Terapi",
    type: "bar",
    height: 350,
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Fisioterapi",
          "Terapi Okupasi",
          "Terapi Wicara",
          "Rehab Kardio",
        ],
      },
      yaxis: {
        title: {
          text: "Jumlah Pasien",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " pasien";
          },
        },
      },
      colors: ["#4CAF50", "#2196F3", "#FF9800"],
    },
    series: [
      {
        name: "Total Pasien",
        data: [
          fisioterapiData.length,
          terapiOkupasiData.length,
          terapiWicaraData.length,
          terapiKardioData.length,
        ],
      },
      {
        name: "Progress Baik",
        data: [3, 1, 1, 1],
      },
      {
        name: "Perlu Perhatian",
        data: [2, 2, 1, 1],
      },
    ],
  };

  // Pie chart config
  const pieChartConfig = {
    title: "Distribusi Berdasarkan Diagnosis",
    type: "pie",
    data: [
      { category: "Neurologi", value: 4 },
      { category: "Ortopedi", value: 3 },
      { category: "Kardiovaskular", value: 2 },
      { category: "Pediatri", value: 2 },
      { category: "Muskuloskeletal", value: 1 },
      { category: "Geriatri", value: 1 },
    ],
    height: 350,
    id: "rehabilitasi-chart-01",
  };

  // Table column configurations based on active tab
  const getTableColumns = () => {
    const commonColumns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Nama Pasien" },
      { key: "age", label: "Usia" },
      { key: "diagnosis", label: "Diagnosis" },
      { key: "category", label: "Kategori" },
      { key: "therapy", label: "Jenis Terapi" },
      { key: "sessions", label: "Sesi" },
      { key: "therapist", label: "Terapis" },
      { key: "schedule", label: "Jadwal" },
      {
        key: "status",
        label: "Status",
        render: (item) => getStatusBadge(item.status),
      },
      {
        key: "progress",
        label: "Kemajuan",
        render: (item) => getProgressBadge(item.progress),
      },
      { key: "lastUpdated", label: "Terakhir Diperbarui" },
    ];

    return commonColumns;
  };

  // Refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      handleTabChange(activeTab);
      setLoading(false);
    }, 1000);
  };

  // Custom tab navigation component
  const RehabilitasiTabs = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">Kategori Rehabilitasi</h4>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleRefresh}
              className="d-flex align-items-center"
            >
              <FaSync className="me-2" /> Refresh
            </Button>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant={
                activeTab === "fisioterapi" ? "primary" : "outline-primary"
              }
              className="d-flex align-items-center"
              onClick={() => handleTabChange("fisioterapi")}
            >
              <FaRunning className="me-2" /> Fisioterapi
            </Button>
            <Button
              variant={
                activeTab === "terapiOkupasi" ? "primary" : "outline-primary"
              }
              className="d-flex align-items-center"
              onClick={() => handleTabChange("terapiOkupasi")}
            >
              <FaBone className="me-2" /> Terapi Okupasi
            </Button>
            <Button
              variant={
                activeTab === "terapiWicara" ? "primary" : "outline-primary"
              }
              className="d-flex align-items-center"
              onClick={() => handleTabChange("terapiWicara")}
            >
              <FaBrain className="me-2" /> Terapi Wicara
            </Button>
            <Button
              variant={
                activeTab === "terapiKardio" ? "primary" : "outline-primary"
              }
              className="d-flex align-items-center"
              onClick={() => handleTabChange("terapiKardio")}
            >
              <FaHeartbeat className="me-2" /> Rehabilitasi Kardio
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Table configuration
  const tableConfig = {
    title: `Data Pasien ${
      activeTab === "fisioterapi"
        ? "Fisioterapi"
        : activeTab === "terapiOkupasi"
        ? "Terapi Okupasi"
        : activeTab === "terapiWicara"
        ? "Terapi Wicara"
        : "Rehabilitasi Kardio"
    }`,
    columns: getTableColumns(),
    showHeader: false,
    searchName: true,
    icon: FaClipboardList,
    buttonRefresh: true,
    basePath: `/rehabilitasi/${activeTab}/detail`,
    slugConfig: {
      textField: "name",
      idField: "id",
    },
    showActions: true,
    actions: [
      {
        label: "Lihat Detail",
        icon: "eye",
        onClick: (item) => console.log(`View ${item.id}`),
      },
      {
        label: "Catat Perkembangan",
        icon: "edit",
        onClick: (item) => console.log(`Update progress for ${item.id}`),
      },
    ],
  };

  return (
    <BaseDashboard
      // Header configuration
      headerConfig={headerConfig}
      // Statistic cards
      statCards={getStatCards()}
      // Left chart - bar chart of patient distribution
      leftChart={barChartConfig}
      // Right chart - pie chart of diagnosis distribution
      rightChart={pieChartConfig}
      // Custom content - Tab navigation
      customContent={<RehabilitasiTabs />}
      // Table configuration
      tableConfig={tableConfig}
      // Data and state
      data={
        activeTab === "fisioterapi"
          ? fisioterapiData
          : activeTab === "terapiOkupasi"
          ? terapiOkupasiData
          : activeTab === "terapiWicara"
          ? terapiWicaraData
          : terapiKardioData
      }
      filteredData={filteredData}
      setFilteredData={setFilteredData}
      loading={loading}
      // Pagination configuration
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

export default DashboardRehabilitasi;
