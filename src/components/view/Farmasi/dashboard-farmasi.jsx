"use client";

import React, { useState, useEffect } from "react";
import {
  FaPills,
  FaClipboardList,
  FaCalendarAlt,
  FaMedkit,
  FaUserMd,
  FaUsers,
  FaClock,
  FaSearchPlus,
  FaHistory,
  FaChartLine,
  FaSync,
  FaHospitalAlt,
  FaFlask,
  FaPrescriptionBottleAlt,
  FaRegCheckCircle,
  FaBoxes,
  FaShoppingCart,
  FaRegClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  Badge,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Table,
  ProgressBar,
} from "react-bootstrap";
import Image from "next/image";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample data for medications inventory
const medicationsData = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Analgesik",
    stock: 1250,
    minStock: 200,
    supplier: "PT Pharma Utama",
    expiry: "2025-06-15",
    location: "Rak A1",
    status: "Available",
    price: 2500,
  },
  {
    id: "MED-002",
    name: "Amoxicillin 500mg",
    category: "Antibiotik",
    stock: 850,
    minStock: 300,
    supplier: "PT Medika Farma",
    expiry: "2024-12-20",
    location: "Rak B3",
    status: "Available",
    price: 5200,
  },
  {
    id: "MED-003",
    name: "Omeprazole 20mg",
    category: "Antasida",
    stock: 320,
    minStock: 250,
    supplier: "PT Bina Medika",
    expiry: "2025-03-10",
    location: "Rak C2",
    status: "Low Stock",
    price: 4800,
  },
  {
    id: "MED-004",
    name: "Insulin Lantus 100IU",
    category: "Hormon",
    stock: 75,
    minStock: 50,
    supplier: "PT Global Medika",
    expiry: "2024-09-30",
    location: "Kulkas K1",
    status: "Available",
    price: 425000,
  },
  {
    id: "MED-005",
    name: "Metformin 500mg",
    category: "Antidiabetik",
    stock: 180,
    minStock: 200,
    supplier: "PT Pharma Utama",
    expiry: "2025-01-20",
    location: "Rak D4",
    status: "Low Stock",
    price: 3500,
  },
  {
    id: "MED-006",
    name: "Captopril 25mg",
    category: "Antihipertensi",
    stock: 25,
    minStock: 100,
    supplier: "PT Medika Farma",
    expiry: "2024-10-15",
    location: "Rak E2",
    status: "Critical Stock",
    price: 2900,
  },
];

// Sample data for prescriptions
const prescriptionsData = [
  {
    id: "RX-2023-001",
    patientId: "P-10542",
    patientName: "Ahmad Subagja",
    age: 45,
    doctor: "dr. Budi Santoso, Sp.PD",
    date: "2023-11-15",
    status: "Pending",
    department: "Poli Penyakit Dalam",
    items: [
      {
        name: "Metformin 500mg",
        qty: 30,
        instruction: "1 tab post meals, 3x daily",
      },
      {
        name: "Amlodipine 5mg",
        qty: 15,
        instruction: "1 tab once daily, before breakfast",
      },
    ],
    priority: "Normal",
  },
  {
    id: "RX-2023-002",
    patientId: "P-10622",
    patientName: "Siti Nurbaiti",
    age: 32,
    doctor: "dr. Dewi Anggraini, Sp.A",
    date: "2023-11-15",
    status: "Processing",
    department: "Poli Anak",
    items: [
      {
        name: "Amoxicillin Syrup 125mg/5ml",
        qty: 1,
        instruction: "5ml, 3x daily for 5 days",
      },
      {
        name: "Paracetamol Syrup 120mg/5ml",
        qty: 1,
        instruction: "5ml, 3x daily when needed",
      },
    ],
    priority: "Normal",
  },
  {
    id: "RX-2023-003",
    patientId: "P-11055",
    patientName: "Rudi Hermanto",
    age: 58,
    doctor: "dr. Joko Widodo, Sp.JP",
    date: "2023-11-15",
    status: "Ready",
    department: "Poli Jantung",
    items: [
      { name: "Captopril 25mg", qty: 30, instruction: "1 tab, 2x daily" },
      {
        name: "Simvastatin 20mg",
        qty: 30,
        instruction: "1 tab once daily, after dinner",
      },
      {
        name: "Aspirin 80mg",
        qty: 30,
        instruction: "1 tab once daily after breakfast",
      },
    ],
    priority: "Normal",
  },
  {
    id: "RX-2023-004",
    patientId: "P-10231",
    patientName: "Endang Kusuma",
    age: 29,
    doctor: "dr. Ratna Wijaya, Sp.OG",
    date: "2023-11-15",
    status: "Completed",
    department: "Poli Kebidanan",
    items: [
      { name: "Folic Acid 1mg", qty: 30, instruction: "1 tab once daily" },
      { name: "Vitamin B Complex", qty: 30, instruction: "1 tab once daily" },
    ],
    priority: "Normal",
  },
  {
    id: "RX-2023-005",
    patientId: "P-10982",
    patientName: "Hadi Wijaya",
    age: 62,
    doctor: "dr. Surya Dharma, Sp.PD",
    date: "2023-11-15",
    status: "Pending",
    department: "Unit Gawat Darurat",
    items: [
      {
        name: "Diazepam 5mg",
        qty: 5,
        instruction: "1 tab, when needed for anxiety",
      },
      {
        name: "Ranitidine 150mg",
        qty: 10,
        instruction: "1 tab, 2x daily before meals",
      },
    ],
    priority: "Urgent",
  },
];

// Sample data for transactions history
const transactionsData = [
  {
    id: "TRX-2023-001",
    patientName: "Ahmad Subagja",
    date: "2023-11-15",
    time: "09:45",
    items: 2,
    total: 125000,
    status: "Completed",
    paymentMethod: "BPJS",
    receiptNo: "R-23-11-001",
  },
  {
    id: "TRX-2023-002",
    patientName: "Siti Nurbaiti",
    date: "2023-11-15",
    time: "10:20",
    items: 2,
    total: 85000,
    status: "Completed",
    paymentMethod: "Cash",
    receiptNo: "R-23-11-002",
  },
  {
    id: "TRX-2023-003",
    patientName: "Rudi Hermanto",
    date: "2023-11-15",
    time: "11:05",
    items: 3,
    total: 215000,
    status: "Processing",
    paymentMethod: "BPJS",
    receiptNo: "R-23-11-003",
  },
  {
    id: "TRX-2023-004",
    patientName: "Endang Kusuma",
    date: "2023-11-15",
    time: "13:30",
    items: 2,
    total: 75000,
    status: "Completed",
    paymentMethod: "Asuransi",
    receiptNo: "R-23-11-004",
  },
  {
    id: "TRX-2023-005",
    patientName: "Hadi Wijaya",
    date: "2023-11-15",
    time: "14:15",
    items: 2,
    total: 45000,
    status: "Pending",
    paymentMethod: "Cash",
    receiptNo: "R-23-11-005",
  },
];

// Sample data for expiring medications
const expiringMedsData = [
  {
    id: "MED-231",
    name: "Ceftriaxone 1g Inj",
    category: "Antibiotik",
    stock: 42,
    expiry: "2023-12-15",
    daysToExpiry: 30,
    supplier: "PT Medika Farma",
  },
  {
    id: "MED-156",
    name: "Ketorolac 30mg Inj",
    category: "Analgesik",
    stock: 38,
    expiry: "2023-12-20",
    daysToExpiry: 35,
    supplier: "PT Pharma Utama",
  },
  {
    id: "MED-089",
    name: "Ranitidine 25mg/ml Inj",
    category: "Antasida",
    stock: 25,
    expiry: "2024-01-10",
    daysToExpiry: 56,
    supplier: "PT Bina Medika",
  },
  {
    id: "MED-305",
    name: "Furosemide 10mg/ml Inj",
    category: "Diuretik",
    stock: 16,
    expiry: "2024-01-15",
    daysToExpiry: 61,
    supplier: "PT Global Medika",
  },
];

const DashboardFarmasi = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [filteredData, setFilteredData] = useState(medicationsData);
  const [loading, setLoading] = useState(false);
  const [todaySummary, setTodaySummary] = useState({
    totalPrescriptions: 5,
    pending: 2,
    processing: 1,
    ready: 1,
    completed: 1,
    urgent: 1,
  });

  // Get data based on active tab
  useEffect(() => {
    handleTabChange(activeTab);
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setLoading(true);
    setTimeout(() => {
      switch (tab) {
        case "inventory":
          setFilteredData(medicationsData);
          break;
        case "prescriptions":
          setFilteredData(prescriptionsData);
          break;
        case "transactions":
          setFilteredData(transactionsData);
          break;
        default:
          setFilteredData([]);
      }
      setActiveTab(tab);
      setLoading(false);
    }, 500);
  };

  // Header configuration for Pharmacy
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "FARMASI",
    divisionText: "Instalasi Farmasi Rumah Sakit",
    icon: FaPills,
    bgColor: "#1565C0", // Dark blue for pharmacy
    bgGradient: "linear-gradient(135deg, #1565C0 0%, #1976D2 100%)",
    badgeColor: "#E3F2FD", // Light blue for the badge
    badgeTextColor: "#1565C0", // Blue for the text
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Available":
        return <Badge bg="success">{status}</Badge>;
      case "Low Stock":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Critical Stock":
        return <Badge bg="danger">{status}</Badge>;
      case "Out of Stock":
        return <Badge bg="dark">{status}</Badge>;
      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Processing":
        return <Badge bg="primary">{status}</Badge>;
      case "Ready":
        return <Badge bg="info">{status}</Badge>;
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "Urgent":
        return <Badge bg="danger">{status}</Badge>;
      case "Normal":
        return <Badge bg="secondary">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      handleTabChange(activeTab);
      setLoading(false);
    }, 1000);
  };

  // Today's Prescriptions Overview Component
  const TodayPrescriptionsOverview = () => {
    return (
      <div className="mb-4">
        <Card className="iq-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="card-title mb-0">Ringkasan Resep Hari Ini</h4>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2" />
                <span className="fw-bold">15 November 2023</span>
              </div>
            </div>

            <Row>
              <Col md={3}>
                <div className="p-3 border rounded text-center position-relative mb-3 bg-light">
                  <div className="display-4 text-primary mb-2">
                    <FaPrescriptionBottleAlt />
                  </div>
                  <h2 className="mb-1">{todaySummary.totalPrescriptions}</h2>
                  <p className="mb-0">Total Resep</p>
                </div>
              </Col>
              <Col md={9}>
                <Row>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-warning bg-opacity-10">
                      <h3 className="text-warning mb-1">
                        {todaySummary.pending}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaClipboardList className="me-1 text-warning" />
                        <span>Menunggu</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-primary bg-opacity-10">
                      <h3 className="text-primary mb-1">
                        {todaySummary.processing}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaFlask className="me-1 text-primary" />
                        <span>Diproses</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-info bg-opacity-10">
                      <h3 className="text-info mb-1">{todaySummary.ready}</h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaRegCheckCircle className="me-1 text-info" />
                        <span>Siap</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-success bg-opacity-10">
                      <h3 className="text-success mb-1">
                        {todaySummary.completed}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaMedkit className="me-1 text-success" />
                        <span>Selesai</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mt-2">
                  <h5 className="mb-2">Resep Prioritas Hari Ini</h5>
                  <Table responsive hover size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Pasien</th>
                        <th>Dokter</th>
                        <th>Poli</th>
                        <th>Status</th>
                        <th>Prioritas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionsData
                        .filter((p) => p.priority === "Urgent")
                        .map((rx, idx) => (
                          <tr key={idx}>
                            <td>{rx.id}</td>
                            <td>{rx.patientName}</td>
                            <td>{rx.doctor.split(",")[0]}</td>
                            <td>{rx.department}</td>
                            <td>{getStatusBadge(rx.status)}</td>
                            <td>{getStatusBadge(rx.priority)}</td>
                          </tr>
                        ))}
                      {prescriptionsData
                        .filter(
                          (p) =>
                            p.priority === "Normal" &&
                            (p.status === "Pending" ||
                              p.status === "Processing")
                        )
                        .slice(0, 2)
                        .map((rx, idx) => (
                          <tr key={`normal-${idx}`}>
                            <td>{rx.id}</td>
                            <td>{rx.patientName}</td>
                            <td>{rx.doctor.split(",")[0]}</td>
                            <td>{rx.department}</td>
                            <td>{getStatusBadge(rx.status)}</td>
                            <td>{getStatusBadge(rx.priority)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  };

  // Custom tab navigation component with visually enhanced design
  const FarmasiTabs = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => handleTabChange(k)}
            className="mb-0 nav-justified nav-tabs-custom"
            fill
          >
            <Tab
              eventKey="inventory"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                    <FaBoxes className="text-primary" />
                  </div>
                  <span>Inventaris Obat</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Daftar Inventaris Obat</h5>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleRefresh}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" /> Refresh
                  </Button>
                </div>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Obat</th>
                      <th>Kategori</th>
                      <th>Stok</th>
                      <th>Min. Stok</th>
                      <th>Lokasi</th>
                      <th>Kadaluarsa</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicationsData.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.id}</td>
                        <td>{med.name}</td>
                        <td>{med.category}</td>
                        <td>{med.stock.toLocaleString()}</td>
                        <td>{med.minStock}</td>
                        <td>{med.location}</td>
                        <td>
                          {med.expiry.split("-")[2]}/{med.expiry.split("-")[1]}/
                          {med.expiry.split("-")[0].substring(2)}
                        </td>
                        <td>{getStatusBadge(med.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                          >
                            <FaSearchPlus />
                          </Button>
                          <Button variant="outline-success" size="sm">
                            <FaShoppingCart />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            <Tab
              eventKey="prescriptions"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-success bg-opacity-10 p-2 me-2">
                    <FaClipboardList className="text-success" />
                  </div>
                  <span>Resep</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Daftar Resep</h5>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleRefresh}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" /> Refresh
                  </Button>
                </div>

                {prescriptionsData.map((rx, idx) => (
                  <Card
                    key={idx}
                    className={`mb-3 ${
                      rx.priority === "Urgent" ? "border-danger" : ""
                    }`}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-1">
                            {rx.patientName}{" "}
                            {rx.priority === "Urgent" && (
                              <Badge bg="danger">URGENT</Badge>
                            )}
                          </h5>
                          <div className="text-muted small">
                            {rx.id} | Pasien ID: {rx.patientId} | Umur: {rx.age}{" "}
                            | Tanggal: {rx.date.split("-")[2]}/
                            {rx.date.split("-")[1]}/{rx.date.split("-")[0]} |
                            Dokter: {rx.doctor.split(",")[0]} | Poli:{" "}
                            {rx.department}
                          </div>
                        </div>
                        <div>{getStatusBadge(rx.status)}</div>
                      </div>

                      <Table size="sm" bordered className="mb-3">
                        <thead className="table-light">
                          <tr>
                            <th>Nama Obat</th>
                            <th className="text-center">Jumlah</th>
                            <th>Aturan Pakai</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rx.items.map((item, i) => (
                            <tr key={i}>
                              <td>{item.name}</td>
                              <td className="text-center">{item.qty}</td>
                              <td>{item.instruction}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div>
                        <Button
                          variant={
                            rx.status === "Pending"
                              ? "primary"
                              : "outline-primary"
                          }
                          size="sm"
                          className="me-1"
                          disabled={rx.status !== "Pending"}
                        >
                          <FaFlask className="me-1" /> Proses
                        </Button>
                        <Button
                          variant={
                            rx.status === "Processing"
                              ? "success"
                              : "outline-success"
                          }
                          size="sm"
                          className="me-1"
                          disabled={rx.status !== "Processing"}
                        >
                          <FaRegCheckCircle className="me-1" /> Siap
                        </Button>
                        <Button
                          variant={
                            rx.status === "Ready" ? "info" : "outline-info"
                          }
                          size="sm"
                          disabled={rx.status !== "Ready"}
                        >
                          <FaMedkit className="me-1" /> Selesai
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>

            <Tab
              eventKey="transactions"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-info bg-opacity-10 p-2 me-2">
                    <FaShoppingCart className="text-info" />
                  </div>
                  <span>Transaksi</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Riwayat Transaksi</h5>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleRefresh}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" /> Refresh
                  </Button>
                </div>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Pasien</th>
                      <th>Tanggal & Waktu</th>
                      <th>Jumlah Item</th>
                      <th>Total</th>
                      <th>Metode Pembayaran</th>
                      <th>No. Kuitansi</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsData.map((tx, idx) => (
                      <tr key={idx}>
                        <td>{tx.id}</td>
                        <td>{tx.patientName}</td>
                        <td>
                          {tx.date.split("-")[2]}/{tx.date.split("-")[1]}/
                          {tx.date.split("-")[0]} {tx.time}
                        </td>
                        <td className="text-center">{tx.items}</td>
                        <td>Rp {tx.total.toLocaleString()}</td>
                        <td>{tx.paymentMethod}</td>
                        <td>{tx.receiptNo}</td>
                        <td>{getStatusBadge(tx.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                          >
                            <FaSearchPlus />
                          </Button>
                          <Button
                            variant={
                              tx.status !== "Completed"
                                ? "outline-success"
                                : "outline-secondary"
                            }
                            size="sm"
                            disabled={tx.status === "Completed"}
                          >
                            <FaRegCheckCircle />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  };

  // Medication Usage Analytics component
  const MedicationUsageAnalytics = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <h4 className="card-title mb-4">Analisis Penggunaan Obat</h4>
          <div style={{ height: "300px" }} className="position-relative">
            {/* Placeholder for chart - in actual implementation this would be a real chart */}
            <div className="bg-light rounded p-3 h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="text-primary mb-0">1,258 Items</h5>
                  <small className="text-success">+12.3% dari bulan lalu</small>
                </div>
                <div className="text-end">
                  <div className="btn-group">
                    <Button variant="outline-secondary" size="sm" active>
                      Harian
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Mingguan
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Bulanan
                    </Button>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-end justify-content-between mt-4">
                {/* Simple bar chart simulation */}
                {[65, 78, 60, 80, 74, 65, 75, 85, 60, 68, 75, 71].map(
                  (height, idx) => (
                    <div
                      key={idx}
                      style={{ width: "8%" }}
                      className="d-flex flex-column align-items-center"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className={`w-100 rounded-top ${
                          idx === 7 ? "bg-primary" : "bg-primary bg-opacity-25"
                        }`}
                      ></div>
                      <small className="text-muted mt-1">{idx + 1}</small>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Expiring Medications Component
  const ExpiringMedications = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">Obat Mendekati Kadaluarsa</h4>
            <Badge bg="warning" text="dark">
              Dalam 90 hari
            </Badge>
          </div>

          <Table responsive className="table-borderless">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nama Obat</th>
                <th>Kategori</th>
                <th>Stok</th>
                <th>Tanggal Kadaluarsa</th>
                <th>Sisa Hari</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {expiringMedsData.map((med, idx) => (
                <tr key={idx}>
                  <td className="align-middle">{med.id}</td>
                  <td className="align-middle">{med.name}</td>
                  <td className="align-middle">{med.category}</td>
                  <td className="align-middle">{med.stock}</td>
                  <td className="align-middle">
                    {med.expiry.split("-")[2]}/{med.expiry.split("-")[1]}/
                    {med.expiry.split("-")[0].substring(2)}
                  </td>
                  <td className="align-middle">
                    <Badge
                      bg={
                        med.daysToExpiry <= 30
                          ? "danger"
                          : med.daysToExpiry <= 60
                          ? "warning"
                          : "info"
                      }
                      text={med.daysToExpiry <= 30 ? "light" : "dark"}
                    >
                      {med.daysToExpiry} hari
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <Button variant="outline-warning" size="sm">
                      <FaExclamationTriangle className="me-1" />
                      Notifikasi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  // Most Dispensed Medications Component
  const MostDispensedMedications = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">Obat Paling Banyak Digunakan</h4>
            <Button variant="link" className="text-decoration-none p-0">
              Lihat Semua
            </Button>
          </div>

          <Table responsive className="table-borderless">
            <thead className="table-light">
              <tr>
                <th>Nama Obat</th>
                <th className="text-center">Qty Terjual</th>
                <th className="text-end">Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Paracetamol 500mg", qty: 1250, revenue: 3125000 },
                { name: "Amoxicillin 500mg", qty: 850, revenue: 4420000 },
                { name: "Metformin 500mg", qty: 720, revenue: 2520000 },
                { name: "Captopril 25mg", qty: 680, revenue: 1972000 },
              ].map((med, idx) => (
                <tr key={idx}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded bg-${
                          ["primary", "success", "info", "warning"][idx]
                        } bg-opacity-10 p-2 me-3`}
                      >
                        <FaPills
                          className={`text-${
                            ["primary", "success", "info", "warning"][idx]
                          }`}
                        />
                      </div>
                      <div>{med.name}</div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {med.qty.toLocaleString()} unit
                  </td>
                  <td className="text-end align-middle">
                    Rp {med.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  // Render the main dashboard
  return (
    <div className="pb-4">
      <BaseDashboard
        // Header configuration
        headerConfig={headerConfig}
        // No need for basic stat cards as we're replacing with custom components
        statCards={[]}
        // No basic charts
        leftChart={null}
        rightChart={null}
        // No need for basic table config
        tableConfig={null}
        // State props (required by base component)
        loading={loading}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        onRefresh={handleRefresh}
        // Don't show the standard title
        showTitle={false}
      />

      {/* Custom Dashboard Content */}
      <div className="container-fluid">
        {/* Today's Overview */}
        <TodayPrescriptionsOverview />

        {/* Main Content with Tabs */}
        <FarmasiTabs />

        {/* Analytics Row */}
        <Row>
          <Col lg={7}>
            <MedicationUsageAnalytics />
          </Col>
          <Col lg={5}>
            <MostDispensedMedications />
          </Col>
        </Row>

        {/* Expiring Medications */}
        <Row>
          <Col lg={12}>
            <ExpiringMedications />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardFarmasi;
