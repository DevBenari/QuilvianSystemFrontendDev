"use client";

import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaGlasses,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaClock,
  FaSearchPlus,
  FaHistory,
  FaChartLine,
  FaSync,
  FaRegLightbulb,
  FaClipboardList,
  FaRegCheckCircle,
  FaStoreAlt,
  FaShoppingCart,
  FaRegClock,
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

// Sample data for optical patients
const appointmentData = [
  {
    id: "OPT-2023-001",
    patientName: "Agus Riyanto",
    age: 42,
    appointmentType: "Pemeriksaan Mata Lengkap",
    doctor: "dr. Sinta Dewi, Sp.M",
    date: "2023-11-15",
    time: "09:30",
    status: "Scheduled",
    notes: "Keluhan mata kering dan kabur saat membaca",
    lastVisit: "2022-05-20",
  },
  {
    id: "OPT-2023-002",
    patientName: "Budi Santoso",
    age: 56,
    appointmentType: "Evaluasi Lensa Kontak",
    doctor: "dr. Hendra Wijaya, Sp.M",
    date: "2023-11-15",
    time: "10:15",
    status: "In Progress",
    notes: "Evaluasi lensa kontak setelah 2 minggu pemakaian",
    lastVisit: "2023-11-01",
  },
  {
    id: "OPT-2023-003",
    patientName: "Citra Dewi",
    age: 35,
    appointmentType: "Pemeriksaan Mata Rutin",
    doctor: "dr. Sinta Dewi, Sp.M",
    date: "2023-11-15",
    time: "11:00",
    status: "Waiting",
    notes: "Pasien dengan riwayat miopia",
    lastVisit: "2022-11-10",
  },
  {
    id: "OPT-2023-004",
    patientName: "Dian Ayu",
    age: 28,
    appointmentType: "Fitting Kacamata",
    doctor: "Rizky Pratama, S.Opt",
    date: "2023-11-15",
    time: "13:30",
    status: "Scheduled",
    notes: "Pengambilan kacamata baru",
    lastVisit: "2023-10-30",
  },
  {
    id: "OPT-2023-005",
    patientName: "Erik Kurniawan",
    age: 62,
    appointmentType: "Pemeriksaan Glaukoma",
    doctor: "dr. Hendra Wijaya, Sp.M",
    date: "2023-11-15",
    time: "14:15",
    status: "Scheduled",
    notes: "Pasien dengan riwayat keluarga glaukoma",
    lastVisit: "2023-08-05",
  },
];

// Sample data for optical products
const productsData = [
  {
    id: "P-001",
    name: "Lensa Progresif Premium",
    category: "Lensa",
    price: 2500000,
    stock: 15,
    sales: 28,
    supplier: "OptiLux",
    status: "Available",
  },
  {
    id: "P-002",
    name: "Frame Titanium Classic",
    category: "Frame",
    price: 1800000,
    stock: 8,
    sales: 32,
    supplier: "VisionCraft",
    status: "Low Stock",
  },
  {
    id: "P-003",
    name: "Lensa Kontak Berwarna",
    category: "Lensa Kontak",
    price: 450000,
    stock: 45,
    sales: 62,
    supplier: "ColorVision",
    status: "Available",
  },
  {
    id: "P-004",
    name: "Kacamata Pelindung UV",
    category: "Kacamata",
    price: 750000,
    stock: 20,
    sales: 25,
    supplier: "SunGuard",
    status: "Available",
  },
  {
    id: "P-005",
    name: "Lensa Anti Bluelight",
    category: "Lensa",
    price: 1200000,
    stock: 5,
    sales: 40,
    supplier: "BluShield",
    status: "Low Stock",
  },
];

// Sample data for prescriptions
const prescriptionsData = [
  {
    id: "RX-2023-001",
    patientName: "Agus Riyanto",
    date: "2023-11-15",
    rx: {
      right: { sphere: "-2.50", cylinder: "-0.75", axis: "180", add: "+2.00" },
      left: { sphere: "-2.25", cylinder: "-0.50", axis: "175", add: "+2.00" },
    },
    pd: "64",
    doctor: "dr. Sinta Dewi, Sp.M",
    status: "New",
  },
  {
    id: "RX-2023-002",
    patientName: "Fani Oktavia",
    date: "2023-11-14",
    rx: {
      right: { sphere: "+1.25", cylinder: "-0.50", axis: "90", add: "" },
      left: { sphere: "+1.50", cylinder: "-0.75", axis: "85", add: "" },
    },
    pd: "62",
    doctor: "dr. Hendra Wijaya, Sp.M",
    status: "Processed",
  },
  {
    id: "RX-2023-003",
    patientName: "Guntur Prakoso",
    date: "2023-11-13",
    rx: {
      right: { sphere: "-3.75", cylinder: "-1.25", axis: "10", add: "" },
      left: { sphere: "-4.00", cylinder: "-1.00", axis: "170", add: "" },
    },
    pd: "66",
    doctor: "dr. Sinta Dewi, Sp.M",
    status: "Completed",
  },
];

// Sample data for optical orders
const ordersData = [
  {
    id: "ORD-2023-001",
    patientName: "Agus Riyanto",
    orderDate: "2023-11-15",
    items: [
      { name: "Lensa Progresif Premium", qty: 1, price: 2500000 },
      { name: "Frame Titanium Classic", qty: 1, price: 1800000 },
    ],
    total: 4300000,
    status: "Processing",
    estimatedCompletion: "2023-11-22",
    progress: 25,
  },
  {
    id: "ORD-2023-002",
    patientName: "Fani Oktavia",
    orderDate: "2023-11-14",
    items: [
      { name: "Lensa Anti Bluelight", qty: 1, price: 1200000 },
      { name: "Frame Modern Square", qty: 1, price: 950000 },
    ],
    total: 2150000,
    status: "Manufacturing",
    estimatedCompletion: "2023-11-21",
    progress: 60,
  },
  {
    id: "ORD-2023-003",
    patientName: "Guntur Prakoso",
    orderDate: "2023-11-13",
    items: [
      { name: "Lensa Kontak Berwarna", qty: 2, price: 900000 },
      { name: "Cairan Pembersih", qty: 1, price: 150000 },
    ],
    total: 1050000,
    status: "Ready for Pickup",
    estimatedCompletion: "2023-11-18",
    progress: 100,
  },
];

const DashboardOptik = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [filteredData, setFilteredData] = useState(appointmentData);
  const [loading, setLoading] = useState(false);
  const [todaySummary, setTodaySummary] = useState({
    totalPatients: 5,
    completed: 0,
    inProgress: 1,
    waiting: 1,
    upcoming: 3,
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
        case "appointments":
          setFilteredData(appointmentData);
          break;
        case "products":
          setFilteredData(productsData);
          break;
        case "prescriptions":
          setFilteredData(prescriptionsData);
          break;
        case "orders":
          setFilteredData(ordersData);
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
      case "Scheduled":
        return <Badge bg="info">{status}</Badge>;
      case "In Progress":
        return <Badge bg="primary">{status}</Badge>;
      case "Waiting":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "Available":
        return <Badge bg="success">{status}</Badge>;
      case "Low Stock":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Out of Stock":
        return <Badge bg="danger">{status}</Badge>;
      case "New":
        return <Badge bg="info">{status}</Badge>;
      case "Processed":
        return <Badge bg="primary">{status}</Badge>;
      case "Processing":
        return <Badge bg="info">{status}</Badge>;
      case "Manufacturing":
        return <Badge bg="primary">{status}</Badge>;
      case "Ready for Pickup":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Header configuration for Optical
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "OPTICAL",
    divisionText: "Pusat Optik & Klinik Mata",
    icon: FaEye,
    bgColor: "#512DA8", // Deep purple for optical
    bgGradient: "linear-gradient(135deg, #512DA8 0%, #673AB7 100%)",
    badgeColor: "#EDE7F6", // Light purple for the badge
    badgeTextColor: "#512DA8", // Purple for the text
  };

  // Refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      handleTabChange(activeTab);
      setLoading(false);
    }, 1000);
  };

  // Enhanced Cards for Today's Overview
  const TodayOverview = () => {
    return (
      <div className="mb-4">
        <Card className="iq-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="card-title mb-0">Ringkasan Hari Ini</h4>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2" />
                <span className="fw-bold">15 November 2023</span>
              </div>
            </div>

            <Row>
              <Col md={3}>
                <div className="p-3 border rounded text-center position-relative mb-3 bg-light">
                  <div className="display-4 text-primary mb-2">
                    <FaUsers />
                  </div>
                  <h2 className="mb-1">{todaySummary.totalPatients}</h2>
                  <p className="mb-0">Total Pasien</p>
                </div>
              </Col>
              <Col md={9}>
                <Row>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-success bg-opacity-10">
                      <h3 className="text-success mb-1">
                        {todaySummary.completed}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaRegCheckCircle className="me-1 text-success" />
                        <span>Selesai</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-primary bg-opacity-10">
                      <h3 className="text-primary mb-1">
                        {todaySummary.inProgress}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaUserMd className="me-1 text-primary" />
                        <span>Berlangsung</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-warning bg-opacity-10">
                      <h3 className="text-warning mb-1">
                        {todaySummary.waiting}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaRegClock className="me-1 text-warning" />
                        <span>Menunggu</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="p-3 border rounded text-center mb-3 bg-info bg-opacity-10">
                      <h3 className="text-info mb-1">
                        {todaySummary.upcoming}
                      </h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaCalendarAlt className="me-1 text-info" />
                        <span>Akan Datang</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mt-2">
                  <h5 className="mb-2">Jadwal Hari Ini</h5>
                  <Table responsive hover size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>Waktu</th>
                        <th>Pasien</th>
                        <th>Dokter</th>
                        <th>Jenis</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentData.slice(0, 3).map((apt, idx) => (
                        <tr key={idx}>
                          <td>{apt.time}</td>
                          <td>{apt.patientName}</td>
                          <td>{apt.doctor.split(",")[0]}</td>
                          <td>
                            {apt.appointmentType.length > 15
                              ? apt.appointmentType.substring(0, 15) + "..."
                              : apt.appointmentType}
                          </td>
                          <td>{getStatusBadge(apt.status)}</td>
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
  const OptikTabs = () => {
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
              eventKey="appointments"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                    <FaCalendarAlt className="text-primary" />
                  </div>
                  <span>Janji Temu</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Daftar Janji Temu</h5>
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
                      <th>Pasien</th>
                      <th>Waktu</th>
                      <th>Jenis</th>
                      <th>Dokter</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentData.map((apt, idx) => (
                      <tr key={idx}>
                        <td>{apt.id}</td>
                        <td>{apt.patientName}</td>
                        <td>
                          {apt.date.split("-")[2]}/{apt.date.split("-")[1]}{" "}
                          {apt.time}
                        </td>
                        <td>{apt.appointmentType}</td>
                        <td>{apt.doctor.split(",")[0]}</td>
                        <td>{getStatusBadge(apt.status)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                          >
                            <FaSearchPlus />
                          </Button>
                          <Button variant="outline-success" size="sm">
                            <FaRegCheckCircle />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            <Tab
              eventKey="products"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-success bg-opacity-10 p-2 me-2">
                    <FaGlasses className="text-success" />
                  </div>
                  <span>Produk</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Inventaris Produk Optik</h5>
                  <Button
                    variant="outline-success"
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
                      <th>Nama Produk</th>
                      <th>Kategori</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th>Status</th>
                      <th>Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map((product, idx) => (
                      <tr key={idx}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>Rp {product.price.toLocaleString()}</td>
                        <td>{product.stock}</td>
                        <td>{getStatusBadge(product.status)}</td>
                        <td>{product.supplier}</td>
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
                  <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-2">
                    <FaClipboardList className="text-warning" />
                  </div>
                  <span>Resep</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Resep Kacamata</h5>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={handleRefresh}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" /> Refresh
                  </Button>
                </div>

                {prescriptionsData.map((rx, idx) => (
                  <Card key={idx} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-1">{rx.patientName}</h5>
                          <div className="text-muted small">
                            {rx.id} | {rx.date.split("-")[2]}/
                            {rx.date.split("-")[1]}/{rx.date.split("-")[0]} |
                            Dokter: {rx.doctor.split(",")[0]}
                          </div>
                        </div>
                        <div>{getStatusBadge(rx.status)}</div>
                      </div>

                      <Table size="sm" bordered className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Mata</th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                            <th>ADD</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="fw-bold">OD (Kanan)</td>
                            <td>{rx.rx.right.sphere}</td>
                            <td>{rx.rx.right.cylinder}</td>
                            <td>{rx.rx.right.axis}</td>
                            <td>{rx.rx.right.add}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">OS (Kiri)</td>
                            <td>{rx.rx.left.sphere}</td>
                            <td>{rx.rx.left.cylinder}</td>
                            <td>{rx.rx.left.axis}</td>
                            <td>{rx.rx.left.add}</td>
                          </tr>
                        </tbody>
                      </Table>

                      <div className="mt-2">
                        <span className="text-muted me-3">PD: {rx.pd} mm</span>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                        >
                          <FaSearchPlus className="me-1" /> Detail
                        </Button>
                        <Button variant="outline-success" size="sm">
                          <FaShoppingCart className="me-1" /> Buat Pesanan
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>

            <Tab
              eventKey="orders"
              title={
                <div className="d-flex align-items-center py-2">
                  <div className="rounded-circle bg-info bg-opacity-10 p-2 me-2">
                    <FaShoppingCart className="text-info" />
                  </div>
                  <span>Pesanan</span>
                </div>
              }
            >
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Pesanan Kacamata & Produk Optik</h5>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleRefresh}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" /> Refresh
                  </Button>
                </div>

                {ordersData.map((order, idx) => (
                  <Card key={idx} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-1">{order.patientName}</h5>
                          <div className="text-muted small">
                            {order.id} | Tanggal:{" "}
                            {order.orderDate.split("-")[2]}/
                            {order.orderDate.split("-")[1]}/
                            {order.orderDate.split("-")[0]} | Estimasi Selesai:{" "}
                            {order.estimatedCompletion.split("-")[2]}/
                            {order.estimatedCompletion.split("-")[1]}/
                            {order.estimatedCompletion.split("-")[0]}
                          </div>
                        </div>
                        <div>{getStatusBadge(order.status)}</div>
                      </div>

                      <div className="mb-3">
                        <label className="text-muted mb-1">
                          Progress Pesanan:
                        </label>
                        <ProgressBar
                          now={order.progress}
                          label={`${order.progress}%`}
                          variant={
                            order.progress < 30
                              ? "info"
                              : order.progress < 70
                              ? "primary"
                              : "success"
                          }
                        />
                      </div>

                      <Table size="sm" bordered className="mb-3">
                        <thead className="table-light">
                          <tr>
                            <th>Item</th>
                            <th className="text-center">Jumlah</th>
                            <th className="text-end">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, i) => (
                            <tr key={i}>
                              <td>{item.name}</td>
                              <td className="text-center">{item.qty}</td>
                              <td className="text-end">
                                Rp {item.price.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                          <tr className="table-light">
                            <td colSpan="2" className="text-end fw-bold">
                              Total
                            </td>
                            <td className="text-end fw-bold">
                              Rp {order.total.toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                        >
                          <FaSearchPlus className="me-1" /> Detail
                        </Button>
                        <Button variant="outline-success" size="sm">
                          <FaRegCheckCircle className="me-1" /> Update Status
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  };

  // Sales Analytics component
  const SalesAnalytics = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <h4 className="card-title mb-4">Analisis Pendapatan Bulanan</h4>
          <div style={{ height: "300px" }} className="position-relative">
            {/* Placeholder for chart - in actual implementation this would be a real chart */}
            <div className="bg-light rounded p-3 h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="text-primary mb-0">Rp 125,450,000</h5>
                  <small className="text-success">+15.6% dari bulan lalu</small>
                </div>
                <div className="text-end">
                  <div className="btn-group">
                    <Button variant="outline-secondary" size="sm" active>
                      1M
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      3M
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      6M
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      1Y
                    </Button>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-end justify-content-between mt-4">
                {/* Simple bar chart simulation */}
                {[75, 60, 80, 65, 90, 85, 70, 95, 85, 80].map((height, idx) => (
                  <div
                    key={idx}
                    style={{ width: "8%" }}
                    className="d-flex flex-column align-items-center"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className={`w-100 rounded-top ${
                        idx === 8 ? "bg-primary" : "bg-primary bg-opacity-25"
                      }`}
                    ></div>
                    <small className="text-muted mt-1">{idx + 1}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Top Products component
  const TopProducts = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">Produk Terlaris</h4>
            <Button variant="link" className="text-decoration-none p-0">
              Lihat Semua
            </Button>
          </div>

          <Table responsive className="table-borderless">
            <thead className="table-light">
              <tr>
                <th>Produk</th>
                <th className="text-center">Terjual</th>
                <th className="text-end">Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Lensa Kontak Berwarna", sales: 62, revenue: 27900000 },
                {
                  name: "Frame Titanium Classic",
                  sales: 32,
                  revenue: 57600000,
                },
                { name: "Lensa Anti Bluelight", sales: 40, revenue: 48000000 },
                { name: "Kacamata Pelindung UV", sales: 25, revenue: 18750000 },
              ].map((product, idx) => (
                <tr key={idx}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded bg-${
                          ["info", "primary", "success", "warning"][idx]
                        } bg-opacity-10 p-2 me-3`}
                      >
                        <FaGlasses
                          className={`text-${
                            ["info", "primary", "success", "warning"][idx]
                          }`}
                        />
                      </div>
                      <div>{product.name}</div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {product.sales} unit
                  </td>
                  <td className="text-end align-middle">
                    Rp {product.revenue.toLocaleString()}
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
        <TodayOverview />

        {/* Main Content with Tabs */}
        <OptikTabs />

        {/* Analytics Row */}
        <Row>
          <Col lg={8}>
            <SalesAnalytics />
          </Col>
          <Col lg={4}>
            <TopProducts />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardOptik;
