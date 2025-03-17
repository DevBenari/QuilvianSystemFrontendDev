"use client";

import React, { useState, useEffect } from "react";
import {
  FaXRay,
  FaUserInjured,
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
  FaUserMd,
  FaHospital,
  FaBriefcaseMedical,
  FaCheckCircle,
  FaHourglass,
  FaChartLine,
  FaClipboardList,
  FaSync,
} from "react-icons/fa";
import { Badge, Row, Col, Card, Button } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample data for radiology examinations
const radiologyExamsData = [
  {
    id: "RAD001",
    patientName: "Joko Widodo",
    patientId: "P-2023-112",
    examType: "Chest X-Ray",
    modalityType: "X-Ray",
    requestedBy: "dr. Bambang Sutrisno",
    priority: "Normal",
    status: "Completed",
    requestDate: "2023-11-15 08:30",
    scheduledDate: "2023-11-15 10:00",
    completionDate: "2023-11-15 10:15",
    reportStatus: "Reported",
  },
  {
    id: "RAD002",
    patientName: "Megawati Soekarno",
    patientId: "P-2023-089",
    examType: "Brain MRI",
    modalityType: "MRI",
    requestedBy: "dr. Nina Dewi",
    priority: "Urgent",
    status: "In Progress",
    requestDate: "2023-11-15 09:00",
    scheduledDate: "2023-11-15 11:30",
    completionDate: "-",
    reportStatus: "Pending",
  },
  {
    id: "RAD003",
    patientName: "Susilo Yudhoyono",
    patientId: "P-2023-056",
    examType: "Abdominal CT Scan",
    modalityType: "CT Scan",
    requestedBy: "dr. Eko Purnomo",
    priority: "STAT",
    status: "Waiting",
    requestDate: "2023-11-15 09:45",
    scheduledDate: "2023-11-15 10:30",
    completionDate: "-",
    reportStatus: "Pending",
  },
  {
    id: "RAD004",
    patientName: "Prabowo Subianto",
    patientId: "P-2023-124",
    examType: "Lumbar Spine MRI",
    modalityType: "MRI",
    requestedBy: "dr. Siti Rahayu",
    priority: "Normal",
    status: "Scheduled",
    requestDate: "2023-11-15 10:15",
    scheduledDate: "2023-11-16 09:00",
    completionDate: "-",
    reportStatus: "Pending",
  },
  {
    id: "RAD005",
    patientName: "Jusuf Kalla",
    patientId: "P-2023-078",
    examType: "Knee X-Ray",
    modalityType: "X-Ray",
    requestedBy: "dr. Bambang Sutrisno",
    priority: "Normal",
    status: "Completed",
    requestDate: "2023-11-15 08:15",
    scheduledDate: "2023-11-15 09:00",
    completionDate: "2023-11-15 09:10",
    reportStatus: "Reported",
  },
  {
    id: "RAD006",
    patientName: "Ani Yudhoyono",
    patientId: "P-2023-103",
    examType: "Mammography",
    modalityType: "Mammography",
    requestedBy: "dr. Siti Rahayu",
    priority: "Normal",
    status: "Completed",
    requestDate: "2023-11-14 15:30",
    scheduledDate: "2023-11-15 08:30",
    completionDate: "2023-11-15 08:45",
    reportStatus: "Awaiting Review",
  },
  {
    id: "RAD007",
    patientName: "B.J. Habibie",
    patientId: "P-2023-115",
    examType: "Coronary CT Angiography",
    modalityType: "CT Scan",
    requestedBy: "dr. Nina Dewi",
    priority: "Urgent",
    status: "In Progress",
    requestDate: "2023-11-15 09:30",
    scheduledDate: "2023-11-15 12:00",
    completionDate: "-",
    reportStatus: "Pending",
  },
  {
    id: "RAD008",
    patientName: "Sri Mulyani",
    patientId: "P-2023-098",
    examType: "Thyroid Ultrasound",
    modalityType: "Ultrasound",
    requestedBy: "dr. Eko Purnomo",
    priority: "Normal",
    status: "Scheduled",
    requestDate: "2023-11-15 10:30",
    scheduledDate: "2023-11-15 14:00",
    completionDate: "-",
    reportStatus: "Pending",
  },
];

// Sample data for modality distribution
const modalityData = [
  { category: "X-Ray", value: 42 },
  { category: "CT Scan", value: 28 },
  { category: "MRI", value: 15 },
  { category: "Ultrasound", value: 35 },
  { category: "Mammography", value: 12 },
];

const DashboardRadiology = () => {
  const [filteredExams, setFilteredExams] = useState(radiologyExamsData);
  const [loading, setLoading] = useState(false);

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "In Progress":
        return <Badge bg="info">{status}</Badge>;
      case "Waiting":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Scheduled":
        return <Badge bg="primary">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Function to get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "STAT":
        return <Badge bg="danger">{priority}</Badge>;
      case "Urgent":
        return (
          <Badge bg="warning" text="dark">
            {priority}
          </Badge>
        );
      case "Normal":
        return <Badge bg="info">{priority}</Badge>;
      default:
        return <Badge bg="secondary">{priority}</Badge>;
    }
  };

  // Function to get report status badge
  const getReportStatusBadge = (status) => {
    switch (status) {
      case "Reported":
        return <Badge bg="success">{status}</Badge>;
      case "Awaiting Review":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Pending":
        return <Badge bg="secondary">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Refresh data function
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredExams([...radiologyExamsData]);
    }, 1000);
  };

  // Header configuration for Radiology
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "RADIOLOGY",
    divisionText: "Departemen Radiologi & Pencitraan",
    icon: FaXRay,
    bgColor: "#4A148C", // Deep purple for radiology
    bgGradient: "linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)", // Purple gradient
    badgeColor: "#F3E5F5", // Light purple for the badge
    badgeTextColor: "#4A148C", // Purple for the text
  };

  // Statistics cards
  const statCards = [
    { title: "Today's Exams", value: 32, icon: FaXRay, color: "primary" },
    {
      title: "Waiting Patients",
      value: 8,
      icon: FaUserInjured,
      color: "warning",
    },
    {
      title: "Completed Today",
      value: 24,
      icon: FaCheckCircle,
      color: "success",
    },
    {
      title: "Urgent Cases",
      value: 5,
      icon: FaExclamationTriangle,
      color: "danger",
    },
    { title: "Avg. Wait Time", value: "32m", icon: FaClock, color: "info" },
    {
      title: "Radiologists on Duty",
      value: 4,
      icon: FaUserMd,
      color: "secondary",
    },
  ];

  // Line chart for exam counts by hour
  const lineChartConfig = {
    title: "Radiology Exams by Hour",
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
          "6AM",
          "7AM",
          "8AM",
          "9AM",
          "10AM",
          "11AM",
          "12PM",
          "1PM",
          "2PM",
          "3PM",
          "4PM",
          "5PM",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Exams",
        },
      },
      colors: ["#673AB7", "#2196F3", "#4CAF50"],
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Scheduled",
        data: [2, 5, 8, 12, 10, 8, 6, 9, 11, 7, 5, 3],
      },
      {
        name: "In Progress",
        data: [1, 3, 6, 10, 8, 7, 5, 7, 9, 5, 4, 2],
      },
      {
        name: "Completed",
        data: [0, 2, 5, 8, 10, 9, 7, 6, 8, 10, 6, 4],
      },
    ],
  };

  // Pie chart for modality types
  const pieChartConfig = {
    title: "Exams by Modality",
    type: "pie",
    data: modalityData,
    height: 350,
    id: "radiology-chart-01",
  };

  // Table configuration for radiology exams
  const tableConfig = {
    title: "Radiology Examination Requests",
    columns: [
      { key: "id", label: "Exam ID" },
      { key: "patientName", label: "Patient Name" },
      { key: "examType", label: "Examination" },
      { key: "modalityType", label: "Modality" },
      { key: "requestedBy", label: "Requested By" },
      {
        key: "priority",
        label: "Priority",
        render: (item) => getPriorityBadge(item.priority),
      },
      {
        key: "status",
        label: "Status",
        render: (item) => getStatusBadge(item.status),
      },
      {
        key: "reportStatus",
        label: "Report",
        render: (item) => getReportStatusBadge(item.reportStatus),
      },
      { key: "scheduledDate", label: "Scheduled" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaClipboardList,
    buttonRefresh: true,
    basePath: "/radiology/exam-details",
    slugConfig: {
      textField: "patientName",
      idField: "id",
    },
    showActions: true,
    actions: [
      {
        label: "View Images",
        icon: "eye",
        onClick: (item) => console.log(`View images for ${item.id}`),
      },
      {
        label: "Update Status",
        icon: "edit",
        onClick: (item) => console.log(`Update status for ${item.id}`),
      },
      {
        label: "Report",
        icon: "file-text",
        onClick: (item) => console.log(`Create/view report for ${item.id}`),
      },
    ],
  };

  // Custom component for modality status
  const ModalityStatusComponent = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title">Modality Status & Workload</h4>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleRefresh}
              className="d-flex align-items-center"
            >
              <FaSync className="me-2" /> Refresh
            </Button>
          </div>

          <Row>
            <Col md={6} xl={3} className="mb-3">
              <Card className="border rounded h-100">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-primary mb-1">X-Ray Room 1</h6>
                      <Badge bg="success" className="mb-2">
                        Operational
                      </Badge>
                    </div>
                    <FaXRay size={24} className="text-primary" />
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Todays exams:</small>
                      <small className="fw-bold">18</small>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Waiting:</small>
                      <small className="fw-bold">2</small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Next available:</small>
                      <small className="fw-bold text-success">Now</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} xl={3} className="mb-3">
              <Card className="border rounded h-100">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-primary mb-1">CT Scanner</h6>
                      <Badge bg="success" className="mb-2">
                        Operational
                      </Badge>
                    </div>
                    <FaXRay size={24} className="text-primary" />
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Todays exams:</small>
                      <small className="fw-bold">12</small>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Waiting:</small>
                      <small className="fw-bold">3</small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Next available:</small>
                      <small className="fw-bold text-warning">30 min</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} xl={3} className="mb-3">
              <Card className="border rounded h-100">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-primary mb-1">MRI Scanner</h6>
                      <Badge bg="warning" text="dark" className="mb-2">
                        Maintenance
                      </Badge>
                    </div>
                    <FaXRay size={24} className="text-primary" />
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Todays exams:</small>
                      <small className="fw-bold">7</small>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Rescheduled:</small>
                      <small className="fw-bold text-danger">3</small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Available at:</small>
                      <small className="fw-bold text-danger">14:00</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} xl={3} className="mb-3">
              <Card className="border rounded h-100">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-primary mb-1">Ultrasound</h6>
                      <Badge bg="success" className="mb-2">
                        Operational
                      </Badge>
                    </div>
                    <FaXRay size={24} className="text-primary" />
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Todays exams:</small>
                      <small className="fw-bold">15</small>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Waiting:</small>
                      <small className="fw-bold">1</small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Next available:</small>
                      <small className="fw-bold text-success">15 min</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={6}>
              <div className="p-3 border rounded bg-light">
                <h6 className="text-primary">Radiologist Assignments</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-2">
                    <span>dr. Ahmad Radiologi, Sp.Rad</span>
                    <Badge bg="primary">On Duty</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>dr. Budi Pencitraan, Sp.Rad</span>
                    <Badge bg="primary">On Duty</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>dr. Citra Imaging, Sp.Rad</span>
                    <Badge bg="primary">On Duty</Badge>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>dr. Diana Xray, Sp.Rad</span>
                    <Badge bg="primary">On Duty</Badge>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 border rounded bg-light">
                <h6 className="text-primary">Today s Priorities</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-2">
                    <span>STAT Requests</span>
                    <Badge bg="danger">3 pending</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Urgent Requests</span>
                    <Badge bg="warning" text="dark">
                      5 pending
                    </Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Reports Awaiting Review</span>
                    <Badge bg="info">8 pending</Badge>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Contrast Studies</span>
                    <Badge bg="primary">4 scheduled</Badge>
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
      // Left chart - line chart of exam volume
      leftChart={lineChartConfig}
      // Right chart - pie chart of modality types
      rightChart={pieChartConfig}
      // Custom content - Modality status component
      customContent={<ModalityStatusComponent />}
      // Table configuration
      tableConfig={tableConfig}
      // Data and state
      data={radiologyExamsData}
      filteredData={filteredExams}
      setFilteredData={setFilteredExams}
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

export default DashboardRadiology;
