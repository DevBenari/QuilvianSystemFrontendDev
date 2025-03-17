"use client";

import React, { useState, useEffect } from "react";
import {
  FaDatabase,
  FaUsers,
  FaBuilding,
  FaBoxes,
  FaUserTag,
  FaLayerGroup,
  FaChartBar,
  FaSync,
  FaClipboardList,
} from "react-icons/fa";
import { Badge, Row, Col, Card, Button } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

// Sample master data for demonstration
const usersData = [
  {
    id: "U001",
    name: "Agus Pratama",
    department: "IT",
    role: "System Admin",
    status: "Active",
    lastUpdated: "2023-10-15",
  },
  {
    id: "U002",
    name: "Budi Santoso",
    department: "Finance",
    role: "Manager",
    status: "Active",
    lastUpdated: "2023-09-22",
  },
  {
    id: "U003",
    name: "Citra Dewi",
    department: "HR",
    role: "Staff",
    status: "Inactive",
    lastUpdated: "2023-11-05",
  },
  {
    id: "U004",
    name: "Dian Kusuma",
    department: "Marketing",
    role: "Executive",
    status: "Active",
    lastUpdated: "2023-10-28",
  },
  {
    id: "U005",
    name: "Eko Prasetyo",
    department: "Operations",
    role: "Supervisor",
    status: "Active",
    lastUpdated: "2023-11-10",
  },
  {
    id: "U006",
    name: "Fina Maharani",
    department: "Finance",
    role: "Staff",
    status: "Active",
    lastUpdated: "2023-10-12",
  },
  {
    id: "U007",
    name: "Gunawan Wibowo",
    department: "IT",
    role: "Developer",
    status: "Active",
    lastUpdated: "2023-11-01",
  },
  {
    id: "U008",
    name: "Hesti Indah",
    department: "HR",
    role: "Manager",
    status: "Active",
    lastUpdated: "2023-10-05",
  },
];

const departmentsData = [
  {
    id: "D001",
    name: "Information Technology",
    code: "IT",
    totalEmployees: 42,
    status: "Active",
    lastUpdated: "2023-10-10",
  },
  {
    id: "D002",
    name: "Human Resources",
    code: "HR",
    totalEmployees: 18,
    status: "Active",
    lastUpdated: "2023-09-15",
  },
  {
    id: "D003",
    name: "Finance",
    code: "FIN",
    totalEmployees: 25,
    status: "Active",
    lastUpdated: "2023-11-03",
  },
  {
    id: "D004",
    name: "Marketing",
    code: "MKT",
    totalEmployees: 30,
    status: "Active",
    lastUpdated: "2023-10-22",
  },
  {
    id: "D005",
    name: "Operations",
    code: "OPS",
    totalEmployees: 55,
    status: "Active",
    lastUpdated: "2023-10-30",
  },
  {
    id: "D006",
    name: "Customer Service",
    code: "CS",
    totalEmployees: 38,
    status: "Active",
    lastUpdated: "2023-11-08",
  },
];

const itemsData = [
  {
    id: "I001",
    name: "Desktop Computer",
    category: "Hardware",
    stock: 45,
    status: "Available",
    lastUpdated: "2023-10-18",
  },
  {
    id: "I002",
    name: "Laptop",
    category: "Hardware",
    stock: 32,
    status: "Low Stock",
    lastUpdated: "2023-11-02",
  },
  {
    id: "I003",
    name: "Office Software",
    category: "Software",
    stock: 120,
    status: "Available",
    lastUpdated: "2023-10-05",
  },
  {
    id: "I004",
    name: "Wireless Mouse",
    category: "Peripherals",
    stock: 8,
    status: "Low Stock",
    lastUpdated: "2023-11-10",
  },
  {
    id: "I005",
    name: "Ergonomic Chair",
    category: "Furniture",
    stock: 15,
    status: "Available",
    lastUpdated: "2023-09-28",
  },
  {
    id: "I006",
    name: "Desk Lamp",
    category: "Furniture",
    stock: 22,
    status: "Available",
    lastUpdated: "2023-10-25",
  },
  {
    id: "I007",
    name: "Printer Toner",
    category: "Supplies",
    stock: 5,
    status: "Low Stock",
    lastUpdated: "2023-11-08",
  },
  {
    id: "I008",
    name: "Whiteboard",
    category: "Office Equipment",
    stock: 12,
    status: "Available",
    lastUpdated: "2023-10-15",
  },
];

const DashboardMasterData = () => {
  // State management
  const [activeTab, setActiveTab] = useState("users");
  const [filteredData, setFilteredData] = useState(usersData);
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
        case "users":
          setFilteredData(usersData);
          break;
        case "departments":
          setFilteredData(departmentsData);
          break;
        case "items":
          setFilteredData(itemsData);
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
      case "Inactive":
        return <Badge bg="danger">{status}</Badge>;
      case "Available":
        return <Badge bg="success">{status}</Badge>;
      case "Low Stock":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Header configuration for Master Data
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "MASTER DATA",
    divisionText: `Master Data Management - ${
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    }`,
    icon: FaDatabase,
    bgColor: "#1565C0", // Deep blue for data management
    bgGradient: "linear-gradient(135deg, #1565C0 0%, #1976D2 100%)",
    badgeColor: "#E3F2FD", // Light blue for the badge
    badgeTextColor: "#1565C0", // Blue for the text
  };

  // Stat cards config
  const statCards = [
    {
      title: "Total Users",
      value: usersData.length,
      icon: FaUsers,
      color: "primary",
    },
    {
      title: "Departments",
      value: departmentsData.length,
      icon: FaBuilding,
      color: "success",
    },
    { title: "Items", value: itemsData.length, icon: FaBoxes, color: "info" },
    { title: "Roles", value: 12, icon: FaUserTag, color: "warning" },
  ];

  // Bar chart config
  const barChartConfig = {
    title: "Data Distribution by Department",
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
          "IT",
          "HR",
          "Finance",
          "Marketing",
          "Operations",
          "Customer Service",
        ],
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " entries";
          },
        },
      },
      colors: ["#4e73df", "#1cc88a", "#f6c23e"],
    },
    series: [
      {
        name: "Users",
        data: [42, 18, 25, 30, 55, 38],
      },
      {
        name: "Items",
        data: [35, 12, 20, 25, 40, 30],
      },
      {
        name: "Transactions",
        data: [60, 35, 45, 50, 70, 55],
      },
    ],
  };

  // Pie chart config
  const pieChartConfig = {
    title: "Data Category Distribution",
    type: "pie",
    data: [
      { category: "Users", value: usersData.length },
      { category: "Departments", value: departmentsData.length },
      { category: "Items", value: itemsData.length },
      { category: "Roles", value: 12 },
      { category: "Locations", value: 8 },
    ],
    height: 350,
    id: "master-data-chart-01",
  };

  // Table column configurations based on active tab
  const getTableColumns = () => {
    switch (activeTab) {
      case "users":
        return [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "department", label: "Department" },
          { key: "role", label: "Role" },
          {
            key: "status",
            label: "Status",
            render: (item) => getStatusBadge(item.status),
          },
          { key: "lastUpdated", label: "Last Updated" },
        ];
      case "departments":
        return [
          { key: "id", label: "ID" },
          { key: "name", label: "Department Name" },
          { key: "code", label: "Code" },
          { key: "totalEmployees", label: "Total Employees" },
          {
            key: "status",
            label: "Status",
            render: (item) => getStatusBadge(item.status),
          },
          { key: "lastUpdated", label: "Last Updated" },
        ];
      case "items":
        return [
          { key: "id", label: "ID" },
          { key: "name", label: "Item Name" },
          { key: "category", label: "Category" },
          { key: "stock", label: "Stock" },
          {
            key: "status",
            label: "Status",
            render: (item) => getStatusBadge(item.status),
          },
          { key: "lastUpdated", label: "Last Updated" },
        ];
      default:
        return [];
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

  // Custom tab navigation component
  const MasterDataTabs = () => {
    return (
      <Card className="iq-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-0">Master Data Categories</h4>
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
              variant={activeTab === "users" ? "primary" : "outline-primary"}
              className="d-flex align-items-center"
              onClick={() => handleTabChange("users")}
            >
              <FaUsers className="me-2" /> Users
            </Button>
            <Button
              variant={
                activeTab === "departments" ? "primary" : "outline-primary"
              }
              className="d-flex align-items-center"
              onClick={() => handleTabChange("departments")}
            >
              <FaBuilding className="me-2" /> Departments
            </Button>
            <Button
              variant={activeTab === "items" ? "primary" : "outline-primary"}
              className="d-flex align-items-center"
              onClick={() => handleTabChange("items")}
            >
              <FaBoxes className="me-2" /> Items
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Table configuration
  const tableConfig = {
    title: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data`,
    columns: getTableColumns(),
    showHeader: false,
    searchName: true,
    icon: FaClipboardList,
    buttonRefresh: true,
    basePath: `/master-data/${activeTab}/detail`,
    slugConfig: {
      textField: "name",
      idField: "id",
    },
    showActions: false,
    actions: [
      {
        label: "Edit",
        icon: "edit",
        onClick: (item) => console.log(`Edit ${item.id}`),
      },
      {
        label: "Delete",
        icon: "trash",
        onClick: (item) => console.log(`Delete ${item.id}`),
      },
    ],
  };

  return (
    <BaseDashboard
      // Header configuration
      headerConfig={headerConfig}
      // Statistic cards
      statCards={statCards}
      // Left chart - bar chart of data distribution
      leftChart={barChartConfig}
      // Right chart - pie chart of category distribution
      rightChart={pieChartConfig}
      // Custom content - Tab navigation
      customContent={<MasterDataTabs />}
      // Table configuration
      tableConfig={tableConfig}
      // Data and state
      data={
        activeTab === "users"
          ? usersData
          : activeTab === "departments"
          ? departmentsData
          : itemsData
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

export default DashboardMasterData;
