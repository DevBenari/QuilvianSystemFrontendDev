"use client";

import React, { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaChartLine,
  FaClipboardList,
  FaFlask,
  FaStethoscope,
  FaHospitalUser,
  FaFileMedical,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaRegBell,
  FaSync,
  FaSearch,
  FaFilter,
  FaUserCog,
  FaPrint,
  FaSortAmountDown,
  FaCalendarDay,
  FaUserNurse,
  FaRegHospital,
  FaDiagnoses,
  FaRegChartBar,
  FaProcedures,
} from "react-icons/fa";
import {
  Badge,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Nav,
  ProgressBar,
  Dropdown,
  Container,
  Alert,
  Tabs,
  Tab,
  Modal,
  InputGroup,
  ListGroup,
  Accordion,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample medical check-up patients
const mcuPatientData = [
  {
    id: "MCU-2023-001",
    name: "Ahmad Zulkifli",
    age: 42,
    gender: "Laki-laki",
    package: "Eksekutif Komprehensif",
    date: "2023-11-15",
    time: "08:00",
    status: "In Progress",
    progress: 75,
    stages: [
      { name: "Registrasi", status: "completed" },
      { name: "Anamnesis", status: "completed" },
      { name: "Lab", status: "completed" },
      { name: "Radiologi", status: "in_progress" },
      { name: "Gigi", status: "waiting" },
      { name: "Dokter Spesialis", status: "waiting" },
      { name: "Konsultasi Akhir", status: "waiting" },
    ],
    doctor: "dr. Ratna Sari, Sp.PD",
    notes: "Pasien dengan riwayat hipertensi",
    company: "PT Global Inovasi",
  },
  {
    id: "MCU-2023-002",
    name: "Ratna Dewi",
    age: 35,
    gender: "Perempuan",
    package: "Basic Plus",
    date: "2023-11-15",
    time: "09:15",
    status: "In Progress",
    progress: 50,
    stages: [
      { name: "Registrasi", status: "completed" },
      { name: "Anamnesis", status: "completed" },
      { name: "Lab", status: "in_progress" },
      { name: "Radiologi", status: "waiting" },
      { name: "Konsultasi Akhir", status: "waiting" },
    ],
    doctor: "dr. Indra Wijaya, Sp.PD",
    notes: "Skrining kesehatan tahunan",
    company: "Individual",
  },
  {
    id: "MCU-2023-003",
    name: "Budi Hartono",
    age: 55,
    gender: "Laki-laki",
    package: "Kardiovaskular",
    date: "2023-11-15",
    time: "08:30",
    status: "Completed",
    progress: 100,
    stages: [
      { name: "Registrasi", status: "completed" },
      { name: "Anamnesis", status: "completed" },
      { name: "Lab", status: "completed" },
      { name: "Radiologi", status: "completed" },
      { name: "Treadmill", status: "completed" },
      { name: "Konsultasi Akhir", status: "completed" },
    ],
    doctor: "dr. Anton Wijaya, Sp.JP",
    notes: "Pasien dengan faktor risiko kardiovaskular",
    company: "PT Global Inovasi",
  },
  {
    id: "MCU-2023-004",
    name: "Dian Puspita",
    age: 29,
    gender: "Perempuan",
    package: "Basic",
    date: "2023-11-15",
    time: "10:00",
    status: "Waiting",
    progress: 0,
    stages: [
      { name: "Registrasi", status: "waiting" },
      { name: "Anamnesis", status: "waiting" },
      { name: "Lab", status: "waiting" },
      { name: "Konsultasi Akhir", status: "waiting" },
    ],
    doctor: "dr. Maya Indah, Sp.PD",
    notes: "Medical check up untuk keperluan asuransi",
    company: "Individual",
  },
  {
    id: "MCU-2023-005",
    name: "Farhan Akbar",
    age: 48,
    gender: "Laki-laki",
    package: "Eksekutif Komprehensif",
    date: "2023-11-15",
    time: "09:30",
    status: "In Progress",
    progress: 35,
    stages: [
      { name: "Registrasi", status: "completed" },
      { name: "Anamnesis", status: "completed" },
      { name: "Lab", status: "in_progress" },
      { name: "Radiologi", status: "waiting" },
      { name: "Gigi", status: "waiting" },
      { name: "Dokter Spesialis", status: "waiting" },
      { name: "Konsultasi Akhir", status: "waiting" },
    ],
    doctor: "dr. Ratna Sari, Sp.PD",
    notes: "Pemeriksaan kesehatan berkala tahunan",
    company: "PT Maju Sejahtera",
  },
];

// MCU packages
const mcuPackages = [
  {
    id: "PKG-BAS",
    name: "Basic",
    examinations: 10,
    price: 1500000,
    popular: false,
    color: "info",
  },
  {
    id: "PKG-BAS+",
    name: "Basic Plus",
    examinations: 15,
    price: 2200000,
    popular: true,
    color: "primary",
  },
  {
    id: "PKG-EXE",
    name: "Eksekutif Komprehensif",
    examinations: 25,
    price: 4500000,
    popular: false,
    color: "success",
  },
  {
    id: "PKG-CAR",
    name: "Kardiovaskular",
    examinations: 12,
    price: 3200000,
    popular: false,
    color: "danger",
  },
  {
    id: "PKG-WMN",
    name: "Women Health",
    examinations: 18,
    price: 3800000,
    popular: false,
    color: "warning",
  },
];

// Custom CSS styles
const styles = {
  cardMcu: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardMcuHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  mcuStep: {
    borderRadius: "5px",
    padding: "8px 15px",
    margin: "0 5px",
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    fontWeight: 500,
  },
  mcuStepCompleted: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
    border: "1px solid #047857",
  },
  mcuStepInProgress: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
    border: "1px solid #D97706",
  },
  mcuStepWaiting: {
    backgroundColor: "#E5E7EB",
    color: "#4B5563",
    border: "1px solid #9CA3AF",
  },
  packageCard: {
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  packageCardPopular: {
    transform: "scale(1.05)",
    zIndex: 2,
  },
  iconBox: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
  calendarDay: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    margin: "2px",
    cursor: "pointer",
    fontWeight: 500,
  },
  calendarDayActive: {
    backgroundColor: "#0D6EFD",
    color: "white",
  },
  calendarDayHasAppointment: {
    border: "2px solid #0D6EFD",
  },
  customAlert: {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
  badgeSuccess: {
    backgroundColor: "#10B981",
    color: "white",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "6px",
  },
  badgeWarning: {
    backgroundColor: "#F59E0B",
    color: "white",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "6px",
  },
  badgeDanger: {
    backgroundColor: "#EF4444",
    color: "white",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "6px",
  },
  badgeInfo: {
    backgroundColor: "#3B82F6",
    color: "white",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "6px",
  },
};

const DashboardMCU = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [filteredData, setFilteredData] = useState(mcuPatientData);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);
  const [selectedDate, setSelectedDate] = useState("15");

  // Stats for dashboard
  const stats = {
    today: {
      total: 5,
      completed: 1,
      inProgress: 3,
      waiting: 1,
    },
    thisWeek: {
      total: 28,
      completed: 10,
      inProgress: 8,
      waiting: 10,
    },
    thisMonth: {
      total: 125,
      completed: 78,
      inProgress: 12,
      waiting: 35,
    },
  };

  // Date for calendar display
  const currentMonth = "November 2023";
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const daysWithAppointments = [4, 7, 12, 15, 18, 22, 25, 29];

  // Handle tab change
  const handleTabChange = (tab) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);
    }, 300);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span style={styles.badgeSuccess}>
            <FaCheckCircle className="me-1" />
            {status}
          </span>
        );
      case "In Progress":
        return (
          <span style={styles.badgeWarning}>
            <FaClock className="me-1" />
            {status}
          </span>
        );
      case "Waiting":
        return (
          <span style={styles.badgeInfo}>
            <FaRegBell className="me-1" />
            {status}
          </span>
        );
      case "Cancelled":
        return (
          <span style={styles.badgeDanger}>
            <FaExclamationTriangle className="me-1" />
            {status}
          </span>
        );
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Get progress variant
  const getProgressVariant = (progress) => {
    if (progress >= 100) return "success";
    if (progress > 60) return "primary";
    if (progress > 30) return "info";
    return "warning";
  };

  // Header configuration for MCU
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "MEDICAL CHECK UP",
    divisionText: "Pusat Layanan Medical Check Up",
    icon: FaHeartbeat,
    bgColor: "#0891B2", // Teal blue for MCU
    bgGradient: "linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)",
    badgeColor: "#ECFEFF", // Light cyan for the badge
    badgeTextColor: "#0891B2", // Teal for the text
  };

  // MCU Workflow Timeline component
  const McuTimeline = ({ stages }) => {
    return (
      <div className="d-flex flex-wrap mb-2 mt-2">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            style={{
              ...styles.mcuStep,
              ...(stage.status === "completed"
                ? styles.mcuStepCompleted
                : stage.status === "in_progress"
                ? styles.mcuStepInProgress
                : styles.mcuStepWaiting),
            }}
          >
            {stage.status === "completed" && <FaCheckCircle className="me-1" />}
            {stage.status === "in_progress" && <FaClock className="me-1" />}
            {stage.status === "waiting" && <FaRegBell className="me-1" />}
            {stage.name}
          </div>
        ))}
      </div>
    );
  };

  // Today's MCU dashboard section
  const TodayMCUDashboard = () => {
    return (
      <div>
        <Row className="g-3 mb-4">
          <Col md={6} lg={3}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{ ...styles.iconBox, backgroundColor: "#E0F2FE" }}
                  className="me-3"
                >
                  <FaRegBell className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Menunggu</h6>
                  <h2 className="mb-0">{stats.thisWeek.waiting}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={8}>
            <Card style={styles.cardMcu}>
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Statistik Harian MCU (Minggu Ini)</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Statistik pemeriksaan MCU selama seminggu terakhir
                      </Tooltip>
                    }
                  >
                    <div className="bg-light rounded-circle p-2">
                      <FaRegChartBar className="text-primary" />
                    </div>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                {/* This would be a chart in a real implementation */}
                <div
                  style={{ height: "300px" }}
                  className="bg-light rounded p-3 d-flex flex-column justify-content-around"
                >
                  {/* Placeholder for a weekly bar chart */}
                  <div className="d-flex justify-content-between align-items-end h-75 px-4">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                      (day, idx) => (
                        <div
                          key={idx}
                          className="d-flex flex-column align-items-center"
                          style={{ width: "12%" }}
                        >
                          <div
                            className="d-flex flex-column-reverse"
                            style={{ height: "100%" }}
                          >
                            <div
                              style={{ height: `${30 + Math.random() * 70}%` }}
                              className="w-100 bg-primary rounded-top"
                            ></div>
                            <div
                              style={{ height: `${20 + Math.random() * 40}%` }}
                              className="w-100 bg-success rounded-top mt-1"
                            ></div>
                            <div
                              style={{ height: `${10 + Math.random() * 30}%` }}
                              className="w-100 bg-warning rounded-top mt-1"
                            ></div>
                          </div>
                          <div className="text-muted mt-2">{day}</div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-4 mt-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">Completed</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-success rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">In Progress</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-warning rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">Waiting</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Paket Paling Populer</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Paket MCU terlaris minggu ini</Tooltip>}
                  >
                    <div className="bg-light rounded-circle p-2">
                      <FaChartLine className="text-primary" />
                    </div>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <Accordion defaultActiveKey="0" className="custom-accordion">
                  <Accordion.Item eventKey="0" className="border-0 mb-3">
                    <Accordion.Header className="p-0 border rounded">
                      <div className="d-flex align-items-center w-100 p-2">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#DBEAFE",
                            color: "#1E40AF",
                          }}
                        >
                          <FaRegHospital />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0">Basic Plus</h6>
                          <div className="text-muted small">
                            12 pasien minggu ini
                          </div>
                        </div>
                        <div className="text-primary fw-bold">43%</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light rounded-bottom p-3">
                      <p className="mb-2 fw-bold">Termasuk pemeriksaan:</p>
                      <ul className="mb-0 ps-3">
                        <li>Pemeriksaan fisik lengkap</li>
                        <li>Darah rutin lengkap</li>
                        <li>Fungsi ginjal dan hati</li>
                        <li>Elektrokardiografi (EKG)</li>
                        <li>Rontgen dada</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="border-0 mb-3">
                    <Accordion.Header className="p-0 border rounded">
                      <div className="d-flex align-items-center w-100 p-2">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#D1FAE5",
                            color: "#047857",
                          }}
                        >
                          <FaRegHospital />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0">Eksekutif Komprehensif</h6>
                          <div className="text-muted small">
                            8 pasien minggu ini
                          </div>
                        </div>
                        <div className="text-success fw-bold">28%</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light rounded-bottom p-3">
                      <p className="mb-0">
                        Paket pemeriksaan kesehatan menyeluruh untuk eksekutif
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="border-0 mb-3">
                    <Accordion.Header className="p-0 border rounded">
                      <div className="d-flex align-items-center w-100 p-2">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#FEE2E2",
                            color: "#B91C1C",
                          }}
                        >
                          <FaRegHospital />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0">Kardiovaskular</h6>
                          <div className="text-muted small">
                            5 pasien minggu ini
                          </div>
                        </div>
                        <div className="text-danger fw-bold">18%</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-light rounded-bottom p-3">
                      <p className="mb-0">
                        Paket pemeriksaan khusus kesehatan jantung dan pembuluh
                        darah
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Monthly MCU Statistics
  const MonthlyStats = () => {
    return (
      <Row className="g-4 mb-4">
        <Col md={12}>
          <Card style={styles.cardMcu} className="mb-4">
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Statistik Bulanan MCU</h5>
                <Form.Select style={{ width: "auto" }}>
                  <option>November 2023</option>
                  <option>Oktober 2023</option>
                  <option>September 2023</option>
                </Form.Select>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="g-4 mb-4">
                <Col md={3}>
                  <div className="border rounded p-4 text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#DBEAFE",
                      }}
                    >
                      <FaUsers className="text-primary fs-2" />
                    </div>
                    <h2 className="mb-1">{stats.thisMonth.total}</h2>
                    <p className="mb-0 text-muted">Total Pasien</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="border rounded p-4 text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#D1FAE5",
                      }}
                    >
                      <FaProcedures className="text-success fs-2" />
                    </div>
                    <h2 className="mb-1">5</h2>
                    <p className="mb-0 text-muted">Jenis Paket</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="border rounded p-4 text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#FEE2E2",
                      }}
                    >
                      <FaFileMedical className="text-danger fs-2" />
                    </div>
                    <h2 className="mb-1">423</h2>
                    <p className="mb-0 text-muted">Tes Laboratorium</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="border rounded p-4 text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#FEF3C7",
                      }}
                    >
                      <FaUserMd className="text-warning fs-2" />
                    </div>
                    <h2 className="mb-1">12</h2>
                    <p className="mb-0 text-muted">Dokter MCU</p>
                  </div>
                </Col>
              </Row>

              {/* Chart placeholder */}
              <div
                className="bg-light rounded p-4 mb-4"
                style={{ height: "300px" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-0">Trend MCU Bulanan</h6>
                  <div className="btn-group">
                    <Button variant="outline-primary" size="sm" active>
                      Semua
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      Basic
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      Eksekutif
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      Kardio
                    </Button>
                  </div>
                </div>
                <div className="d-flex align-items-end h-75">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${Math.floor(30 + Math.random() * 70)}%`,
                        width: "3%",
                        margin: "0 0.16%",
                        backgroundColor: i === 14 ? "#0D6EFD" : "#DBEAFE",
                      }}
                      className="rounded-top"
                    ></div>
                  ))}
                </div>
              </div>

              <Row>
                <Col md={8}>
                  <h6 className="mb-3">Demografi Pasien MCU</h6>
                  <Table responsive hover className="border">
                    <thead className="bg-light">
                      <tr>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                        <th>Persentase</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="me-2 rounded-circle bg-primary"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <span>Laki-laki</span>
                          </div>
                        </td>
                        <td>72</td>
                        <td>58%</td>
                        <td>
                          <Badge bg="success">↑ 12%</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="me-2 rounded-circle bg-warning"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <span>Perempuan</span>
                          </div>
                        </td>
                        <td>53</td>
                        <td>42%</td>
                        <td>
                          <Badge bg="success">↑ 8%</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="me-2 rounded-circle bg-success"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <span>Korporat</span>
                          </div>
                        </td>
                        <td>87</td>
                        <td>70%</td>
                        <td>
                          <Badge bg="success">↑ 15%</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="me-2 rounded-circle bg-info"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <span>Individual</span>
                          </div>
                        </td>
                        <td>38</td>
                        <td>30%</td>
                        <td>
                          <Badge bg="danger">↓ 5%</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                  <h6 className="mb-3">Temuan Utama MCU</h6>
                  <div className="border rounded p-3">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Hipertensi</span>
                        <span>32%</span>
                      </div>
                      <ProgressBar
                        now={32}
                        variant="danger"
                        style={{ height: "8px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Dislipidemia</span>
                        <span>28%</span>
                      </div>
                      <ProgressBar
                        now={28}
                        variant="warning"
                        style={{ height: "8px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Obesitas</span>
                        <span>21%</span>
                      </div>
                      <ProgressBar
                        now={21}
                        variant="info"
                        style={{ height: "8px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Gula Darah Tinggi</span>
                        <span>18%</span>
                      </div>
                      <ProgressBar
                        now={18}
                        variant="primary"
                        style={{ height: "8px" }}
                      />
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Gangguan Fungsi Hati</span>
                        <span>12%</span>
                      </div>
                      <ProgressBar
                        now={12}
                        variant="success"
                        style={{ height: "8px" }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const WeeklyStats = () => {
    return (
      <div>
        <Row className="g-3 mb-4">
          <Col md={6} lg={3}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{ ...styles.iconBox, backgroundColor: "#DBEAFE" }}
                  className="me-3"
                >
                  <FaUserMd className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Total Minggu Ini</h6>
                  <h2 className="mb-0">{stats.thisWeek.total}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{ ...styles.iconBox, backgroundColor: "#D1FAE5" }}
                  className="me-3"
                >
                  <FaCheckCircle className="text-success" />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Selesai</h6>
                  <h2 className="mb-0">{stats.thisWeek.completed}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{ ...styles.iconBox, backgroundColor: "#FEF3C7" }}
                  className="me-3"
                >
                  <FaClock className="text-warning" />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Sedang Berlangsung</h6>
                  <h2 className="mb-0">{stats.thisWeek.inProgress}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{ ...styles.iconBox, backgroundColor: "#E0F2FE" }}
                  className="me-3"
                >
                  <FaRegBell className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Menunggu</h6>
                  <h2 className="mb-0">{stats.thisWeek.waiting}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={8}>
            <Card style={styles.cardMcu}>
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Statistik Harian MCU (Minggu Ini)</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Statistik pemeriksaan MCU selama seminggu terakhir
                      </Tooltip>
                    }
                  >
                    <div className="bg-light rounded-circle p-2">
                      <FaRegChartBar className="text-primary" />
                    </div>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                {/* This would be a chart in a real implementation */}
                <div
                  style={{ height: "300px" }}
                  className="bg-light rounded p-3 d-flex flex-column justify-content-around"
                >
                  {/* Placeholder for a weekly bar chart */}
                  <div className="d-flex justify-content-between align-items-end h-75 px-4">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                      (day, idx) => (
                        <div
                          key={idx}
                          className="d-flex flex-column align-items-center"
                          style={{ width: "12%" }}
                        >
                          <div
                            className="d-flex flex-column-reverse"
                            style={{ height: "100%" }}
                          >
                            <div
                              style={{ height: `${30 + Math.random() * 70}%` }}
                              className="w-100 bg-primary rounded-top"
                            ></div>
                            <div
                              style={{ height: `${20 + Math.random() * 40}%` }}
                              className="w-100 bg-success rounded-top mt-1"
                            ></div>
                            <div
                              style={{ height: `${10 + Math.random() * 30}%` }}
                              className="w-100 bg-warning rounded-top mt-1"
                            ></div>
                          </div>
                          <div className="text-muted mt-2">{day}</div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-4 mt-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">Completed</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-success rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">In Progress</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-warning rounded"
                        style={{ width: "15px", height: "15px" }}
                      ></div>
                      <span className="ms-2">Waiting</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={styles.cardMcu} className="h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Performa Dokter</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Performa dokter dalam pemeriksaan MCU minggu ini
                      </Tooltip>
                    }
                  >
                    <div className="bg-light rounded-circle p-2">
                      <FaUserNurse className="text-primary" />
                    </div>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-primary me-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span>dr. Ratna Sari, Sp.PD</span>
                    </div>
                    <span className="fw-bold">12</span>
                  </div>
                  <ProgressBar
                    now={80}
                    variant="primary"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-success me-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span>dr. Indra Wijaya, Sp.PD</span>
                    </div>
                    <span className="fw-bold">9</span>
                  </div>
                  <ProgressBar
                    now={60}
                    variant="success"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-info me-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span>dr. Anton Wijaya, Sp.JP</span>
                    </div>
                    <span className="fw-bold">7</span>
                  </div>
                  <ProgressBar
                    now={47}
                    variant="info"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-warning me-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span>dr. Maya Indah, Sp.PD</span>
                    </div>
                    <span className="fw-bold">5</span>
                  </div>
                  <ProgressBar
                    now={33}
                    variant="warning"
                    style={{ height: "8px" }}
                  />
                </div>

                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-danger me-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span>dr. Budi Santoso, Sp.JP</span>
                    </div>
                    <span className="fw-bold">3</span>
                  </div>
                  <ProgressBar
                    now={20}
                    variant="danger"
                    style={{ height: "8px" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card style={styles.cardMcu}>
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Distribusi Paket MCU</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Persentase penggunaan paket MCU minggu ini
                      </Tooltip>
                    }
                  >
                    <div className="bg-light rounded-circle p-2">
                      <FaClipboardList className="text-primary" />
                    </div>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                {/* This would be a pie chart in a real implementation */}
                <div
                  style={{ height: "250px" }}
                  className="bg-light rounded p-3 d-flex align-items-center justify-content-center"
                >
                  <div
                    className="position-relative"
                    style={{ width: "200px", height: "200px" }}
                  >
                    {/* Placeholder for pie chart */}
                    <div
                      className="rounded-circle position-absolute"
                      style={{
                        width: "200px",
                        height: "200px",
                        background:
                          "conic-gradient(#0D6EFD 0% 43%, #10B981 43% 71%, #EF4444 71% 89%, #3B82F6 89% 100%)",
                      }}
                    ></div>
                    <div
                      className="rounded-circle position-absolute bg-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        top: "60px",
                        left: "60px",
                      }}
                    >
                      <span className="fw-bold">28</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#0D6EFD",
                      }}
                    ></div>
                    <span>Basic Plus (43%)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#10B981",
                      }}
                    ></div>
                    <span>Eksekutif (28%)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#EF4444",
                      }}
                    ></div>
                    <span>Kardiovaskular (18%)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#3B82F6",
                      }}
                    ></div>
                    <span>Lainnya (11%)</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={styles.cardMcu}>
              <Card.Header className="bg-white border-0 pt-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Jadwal MCU Mendatang</h5>
                  <Button variant="outline-primary" size="sm">
                    <FaCalendarCheck className="me-1" /> Lihat Semua
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Table responsive borderless hover>
                  <thead className="bg-light">
                    <tr>
                      <th>Tanggal</th>
                      <th>Pasien</th>
                      <th>Paket</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                            style={{
                              backgroundColor: "#0D6EFD",
                              width: "32px",
                              height: "32px",
                              fontSize: "12px",
                            }}
                          >
                            <FaCalendarDay />
                          </div>
                          <div>
                            <div className="fw-bold">16 Nov</div>
                            <small className="text-muted">08:00</small>
                          </div>
                        </div>
                      </td>
                      <td>Rina Marlina</td>
                      <td>
                        <Badge bg="primary">Basic Plus</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          Terjadwal
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                            style={{
                              backgroundColor: "#0D6EFD",
                              width: "32px",
                              height: "32px",
                              fontSize: "12px",
                            }}
                          >
                            <FaCalendarDay />
                          </div>
                          <div>
                            <div className="fw-bold">16 Nov</div>
                            <small className="text-muted">09:30</small>
                          </div>
                        </div>
                      </td>
                      <td>Hadi Santoso</td>
                      <td>
                        <Badge bg="success">Eksekutif</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          Terjadwal
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                            style={{
                              backgroundColor: "#0D6EFD",
                              width: "32px",
                              height: "32px",
                              fontSize: "12px",
                            }}
                          >
                            <FaCalendarDay />
                          </div>
                          <div>
                            <div className="fw-bold">17 Nov</div>
                            <small className="text-muted">08:00</small>
                          </div>
                        </div>
                      </td>
                      <td>Deni Prasetya</td>
                      <td>
                        <Badge bg="danger">Kardiovaskular</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          Terjadwal
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                            style={{
                              backgroundColor: "#0D6EFD",
                              width: "32px",
                              height: "32px",
                              fontSize: "12px",
                            }}
                          >
                            <FaCalendarDay />
                          </div>
                          <div>
                            <div className="fw-bold">17 Nov</div>
                            <small className="text-muted">10:15</small>
                          </div>
                        </div>
                      </td>
                      <td>Siti Aminah</td>
                      <td>
                        <Badge bg="warning">Women Health</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          Terjadwal
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                            style={{
                              backgroundColor: "#0D6EFD",
                              width: "32px",
                              height: "32px",
                              fontSize: "12px",
                            }}
                          >
                            <FaCalendarDay />
                          </div>
                          <div>
                            <div className="fw-bold">18 Nov</div>
                            <small className="text-muted">09:00</small>
                          </div>
                        </div>
                      </td>
                      <td>Bayu Prasetyo</td>
                      <td>
                        <Badge bg="primary">Basic Plus</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          Terjadwal
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Custom tabs component
  const McuNavTabs = () => {
    return (
      <Nav
        variant="pills"
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-4 custom-nav-pills bg-white shadow-sm p-2 rounded"
      >
        <Nav.Item className="flex-grow-1 text-center">
          <Nav.Link
            eventKey="today"
            className="d-flex flex-column align-items-center justify-content-center py-3"
          >
            <FaCalendarDay className="mb-1" />
            <span>Hari Ini</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-grow-1 text-center">
          <Nav.Link
            eventKey="weekly"
            className="d-flex flex-column align-items-center justify-content-center py-3"
          >
            <FaRegChartBar className="mb-1" />
            <span>Mingguan</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="flex-grow-1 text-center">
          <Nav.Link
            eventKey="monthly"
            className="d-flex flex-column align-items-center justify-content-center py-3"
          >
            <FaChartLine className="mb-1" />
            <span>Bulanan</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  // Advanced Booking Modal
  const BookingModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Jadwalkan Medical Check Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p className="text-muted">
            Lengkapi form berikut untuk menjadwalkan medical check up
          </p>

          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nama Pasien</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama lengkap"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>No. Rekam Medis / ID Pasien</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan nomor RM" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select>
                    <option>Pilih jenis kelamin</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>No. Telepon</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Masukkan nomor telepon"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tanggal MCU</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Waktu MCU</Form.Label>
                  <Form.Select>
                    <option>Pilih waktu</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Paket MCU</Form.Label>
                  <Form.Select>
                    <option>Pilih paket MCU</option>
                    <option>Basic</option>
                    <option>Basic Plus</option>
                    <option>Eksekutif Komprehensif</option>
                    <option>Kardiovaskular</option>
                    <option>Women Health</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Catatan Khusus</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Masukkan catatan khusus jika ada"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Batalkan
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Jadwalkan MCU
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Render the main dashboard
  return (
    <div className="pb-4">
      <BaseDashboard
        // Header configuration
        headerConfig={headerConfig}
        // Minimal options to use just the header
        statCards={[]}
        leftChart={null}
        rightChart={null}
        tableConfig={null}
        // State props (required by base component)
        loading={loading}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        onRefresh={() => {}}
        // Don't show the standard title
        showTitle={false}
      />

      {/* Custom Dashboard Content */}
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <McuNavTabs />
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaCalendarCheck className="me-2" /> Jadwalkan MCU
          </Button>
        </div>

        {activeTab === "today" && <TodayMCUDashboard />}
        {activeTab === "weekly" && <WeeklyStats />}
        {activeTab === "monthly" && <MonthlyStats />}

        <BookingModal />
      </Container>
    </div>
  );
};

export default DashboardMCU;
