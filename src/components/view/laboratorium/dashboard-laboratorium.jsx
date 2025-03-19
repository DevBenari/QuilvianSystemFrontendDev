"use client";

import React, { useState, useEffect } from "react";
import {
  FaFlask,
  FaVial,
  FaUserMd,
  FaUsers,
  FaClipboardCheck,
  FaClock,
  FaExclamationTriangle,
  FaCalendarCheck,
  FaCheckCircle,
  FaHourglass,
  FaChartLine,
} from "react-icons/fa";
import { Badge, Row, Col, Card } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample data for laboratory tests
const labTestsData = [
  {
    id: "LT001",
    patientName: "Andi Wijaya",
    patientId: "P-2023-042",
    testName: "Complete Blood Count",
    requestedBy: "dr. Ratna Sari",
    priority: "Normal",
    status: "Completed",
    requestDate: "2023-11-15 08:30",
    completionDate: "2023-11-15 10:45",
  },
  {
    id: "LT002",
    patientName: "Budi Setiawan",
    patientId: "P-2023-078",
    testName: "Liver Function Test",
    requestedBy: "dr. Hadi Purnomo",
    priority: "Urgent",
    status: "In Progress",
    requestDate: "2023-11-15 09:15",
    completionDate: "-",
  },
  {
    id: "LT003",
    patientName: "Citra Lestari",
    patientId: "P-2023-103",
    testName: "Urinalysis",
    requestedBy: "dr. Nia Kurniawan",
    priority: "Normal",
    status: "Waiting",
    requestDate: "2023-11-15 09:45",
    completionDate: "-",
  },
  {
    id: "LT004",
    patientName: "Dedi Kusuma",
    patientId: "P-2023-056",
    testName: "Blood Glucose",
    requestedBy: "dr. Santoso",
    priority: "STAT",
    status: "In Progress",
    requestDate: "2023-11-15 10:00",
    completionDate: "-",
  },
  {
    id: "LT005",
    patientName: "Eva Muliana",
    patientId: "P-2023-098",
    testName: "Electrolytes Panel",
    requestedBy: "dr. Ratna Sari",
    priority: "Normal",
    status: "Completed",
    requestDate: "2023-11-15 08:00",
    completionDate: "2023-11-15 09:30",
  },
  {
    id: "LT006",
    patientName: "Firman Hidayat",
    patientId: "P-2023-112",
    testName: "Lipid Profile",
    requestedBy: "dr. Nia Kurniawan",
    priority: "Urgent",
    status: "Waiting",
    requestDate: "2023-11-15 10:30",
    completionDate: "-",
  },
  {
    id: "LT007",
    patientName: "Gita Pratiwi",
    patientId: "P-2023-067",
    testName: "Thyroid Function",
    requestedBy: "dr. Hadi Purnomo",
    priority: "Normal",
    status: "Waiting",
    requestDate: "2023-11-15 11:00",
    completionDate: "-",
  },
  {
    id: "LT008",
    patientName: "Hendra Wijaya",
    patientId: "P-2023-073",
    testName: "Kidney Function Test",
    requestedBy: "dr. Santoso",
    priority: "STAT",
    status: "In Progress",
    requestDate: "2023-11-15 09:30",
    completionDate: "-",
  },
];

// Sample data for today's workload by test type
const testTypeData = [
  { category: "Hematology", value: 45 },
  { category: "Chemistry", value: 35 },
  { category: "Microbiology", value: 15 },
  { category: "Urinalysis", value: 25 },
  { category: "Immunology", value: 20 },
];

const DashboardLaboratory = () => {
  const [filteredTests, setFilteredTests] = useState(labTestsData);
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

  // Refresh data function
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredTests([...labTestsData]);
    }, 1000);
  };

  // Header configuration for Laboratory
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "LABORATORY",
    divisionText: "Departemen Laboratorium Klinik",
    icon: FaFlask,
    bgColor: "#2E7D32", // Deep green for laboratory
    bgGradient: "linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)", // Green gradient
    badgeColor: "#E8F5E9", // Light green for the badge
    badgeTextColor: "#2E7D32", // Green for the text
  };

  // Statistics cards
  const statCards = [
    { title: "Tests Today", value: 87, icon: FaVial, color: "primary" },
    { title: "Pending Tests", value: 32, icon: FaHourglass, color: "warning" },
    {
      title: "Completed Today",
      value: 55,
      icon: FaCheckCircle,
      color: "success",
    },
    {
      title: "STAT Requests",
      value: 8,
      icon: FaExclamationTriangle,
      color: "danger",
    },
    {
      title: "Avg. Turnaround Time",
      value: "45m",
      icon: FaClock,
      color: "info",
    },
    {
      title: "Lab Staff on Duty",
      value: 12,
      icon: FaUserMd,
      color: "secondary",
    },
  ];

  // Line chart for test volume by hour
  const lineChartConfig = {
    title: "Test Volume by Hour",
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
          text: "Number of Tests",
        },
      },
      colors: ["#4e73df", "#f6c23e", "#1cc88a"],
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Test Requests",
        data: [5, 12, 25, 30, 28, 20, 18, 22, 24, 28, 15, 8],
      },
      {
        name: "Tests in Progress",
        data: [2, 8, 20, 25, 30, 22, 16, 18, 20, 22, 12, 4],
      },
      {
        name: "Completed Tests",
        data: [0, 4, 15, 22, 28, 30, 25, 20, 18, 22, 18, 10],
      },
    ],
  };

  // Pie chart for test types
  const pieChartConfig = {
    title: "Today's Tests by Type",
    type: "pie",
    data: testTypeData,
    height: 350,
    id: "lab-chart-01",
  };

  // Table configuration for lab tests
  const tableConfig = {
    title: "Laboratory Test Requests",
    columns: [
      { key: "id", label: "Test ID" },
      { key: "patientName", label: "Patient Name" },
      { key: "patientId", label: "Patient ID" },
      { key: "testName", label: "Test Name" },
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
      { key: "requestDate", label: "Request Date" },
      { key: "completionDate", label: "Completion Date" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaClipboardCheck,
    buttonRefresh: true,
    basePath: "/laboratory/test-details",
    slugConfig: {
      textField: "patientName",
      idField: "id",
    },
    showActions: true,
    actions: [
      {
        label: "View Results",
        icon: "eye",
        onClick: (item) => console.log(`View results for ${item.id}`),
      },
      {
        label: "Update Status",
        icon: "edit",
        onClick: (item) => console.log(`Update status for ${item.id}`),
      },
    ],
  };

  // Custom summary component for laboratory statistics
  const LaboratorySummary = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <h4 className="card-title mb-4">Laboratory Performance</h4>
          <Row>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Today s Efficiency</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">92%</h2>
                  <small className="text-success">+2.5%</small>
                </div>
                <p className="text-muted small">
                  Target completion rate achieved
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Test Accuracy</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">99.7%</h2>
                  <small className="text-success">+0.1%</small>
                </div>
                <p className="text-muted small">Quality control pass rate</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stats-item mb-3">
                <h5 className="text-muted">Average TAT</h5>
                <div className="d-flex align-items-center">
                  <h2 className="mb-0 me-2">45m</h2>
                  <small className="text-danger">+3m</small>
                </div>
                <p className="text-muted small">
                  Average turnaround time for routine tests
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <div className="p-3 border rounded bg-light">
                <h6 className="text-primary">Top Critical Tests Today</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-2">
                    <span>Troponin I</span>
                    <Badge bg="danger">7 tests</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>D-Dimer</span>
                    <Badge bg="warning" text="dark">
                      5 tests
                    </Badge>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Arterial Blood Gas</span>
                    <Badge bg="warning" text="dark">
                      4 tests
                    </Badge>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 border rounded bg-light">
                <h6 className="text-primary">Equipment Status</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-2">
                    <span>Clinical Chemistry Analyzer</span>
                    <Badge bg="success">Operational</Badge>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Hematology Analyzer</span>
                    <Badge bg="success">Operational</Badge>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Mass Spectrometer</span>
                    <Badge bg="warning" text="dark">
                      Maintenance
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
      // Left chart - line chart of test volume
      leftChart={lineChartConfig}
      // Right chart - pie chart of test types
      rightChart={pieChartConfig}
      // Custom content - Lab performance summary
      customContent={<LaboratorySummary />}
      // Table configuration
      tableConfig={tableConfig}
      // Data and state
      data={labTestsData}
      filteredData={filteredTests}
      setFilteredData={setFilteredTests}
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

export default DashboardLaboratory;
