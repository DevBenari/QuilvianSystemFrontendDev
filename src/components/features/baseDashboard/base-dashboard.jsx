"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Badge, Button } from "react-bootstrap";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaSearch,
  FaHospital,
  FaDoorOpen,
  FaChartLine,
  FaBriefcaseMedical,
  FaUserInjured,
  FaClipboardList,
  FaFileMedical,
} from "react-icons/fa";
import Chart from "react-apexcharts";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FormProvider, useForm } from "react-hook-form";
import { DashboardHeader } from "./dashboard-header";

am4core.useTheme(am4themes_animated);

/**
 * BaseDashboard Component
 * Reusable dashboard base component with configurable sections and components
 *
 * @param {Object} props Component properties
 * @param {Object} props.headerConfig Configuration for the dashboard header
 * @param {Array} props.statCards Array of statistic cards to display (must have title, value, icon, color)
 * @param {Object} props.leftChart Left chart configuration
 * @param {Object} props.rightChart Right chart configuration
 * @param {Object} props.tableConfig Table configuration object
 * @param {Function} props.fetchData Function to fetch data for the dashboard
 * @param {Boolean} props.loading Loading state
 * @param {React.ReactNode} props.customContent Custom content to be rendered below charts
 * @param {String} props.title Dashboard title
 * @returns {React.ReactElement} BaseDashboard component
 */

const BaseDashboard = ({
  // Header configuration
  headerConfig = {
    hospitalName: "RS INTERNAL",
    badgeText: "DASHBOARD",
    divisionText: "Dashboard Sistem Informasi",
    icon: FaHospital,
    bgColor: "#1a237e",
    bgGradient: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    badgeColor: "#ff3d00",
    badgeTextColor: "white",
  },

  // Stat cards (tiles) at the top
  statCards = [
    { title: "Total", value: 0, icon: FaUsers, color: "primary" },
    { title: "Completed", value: 0, icon: FaHospital, color: "success" },
    { title: "In Progress", value: 0, icon: FaCalendarCheck, color: "warning" },
    { title: "Waiting", value: 0, icon: FaDoorOpen, color: "danger" },
  ],

  // Left chart (bar, line, area, etc)
  leftChart = null,

  // Right chart (pie, donut, etc)
  rightChart = null,

  // Table configuration
  tableConfig = {
    title: "Data Table",
    columns: [],
    fetchFunction: null,
    setFilteredData: null,
    showHeader: false,
    showSearch: true,
    buttonRefresh: true,
    basePath: "/",
    searchName: true,
    slugConfig: { textField: "name", idField: "id" },
  },

  // Data fetching and state
  fetchData = null,
  data = [],
  filteredData = [],
  setFilteredData = () => {},
  loading = false,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    itemPerPage: 10,
    onPageChange: () => {},
  },

  // Additional custom content
  customContent = null,

  // Refresh function
  onRefresh = () => {},

  // Show standard dashboard title below header
  showTitle = false,
  title = "Dashboard",
}) => {
  const methods = useForm();
  const [searchText, setSearchText] = useState("");

  // Handle search change
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    if (text && data) {
      const searchField = tableConfig.slugConfig.textField;
      const filtered = data.filter(
        (item) =>
          item[searchField] && item[searchField].toLowerCase().includes(text)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // Initialize AM Charts (if used)
  useEffect(() => {
    // Check if rightChart exists and is of type pie
    if (
      rightChart &&
      rightChart.type === "pie" &&
      rightChart.id &&
      document.getElementById(rightChart.id)
    ) {
      am4core.ready(function () {
        am4core.useTheme(am4themes_animated);

        const chart = am4core.create(rightChart.id, am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0;

        // Set chart data
        chart.data =
          rightChart.data && rightChart.data.length > 0
            ? rightChart.data
            : [
                { category: "Category 1", value: 30 },
                { category: "Category 2", value: 25 },
                { category: "Category 3", value: 20 },
                { category: "Category 4", value: 15 },
                { category: "Category 5", value: 10 },
              ];

        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        // Configure series
        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "category";

        // Default colors if not specified
        series.colors.list = rightChart.colors || [
          am4core.color("#089bab"),
          am4core.color("#2ca5b2"),
          am4core.color("#faa264"),
          am4core.color("#fcb07a"),
          am4core.color("#5bc5d1"),
        ];

        series.slices.template.cornerRadius = 0;
        series.slices.template.innerCornerRadius = 0;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        chart.legend = new am4charts.Legend();
      });
    }

    // Cleanup function
    return () => {
      am4core.disposeAllCharts();
    };
  }, [rightChart]);

  // inin

  return (
    <>
      <FormProvider {...methods}>
        {/* Custom Header */}
        <DashboardHeader
          hospitalName={headerConfig.hospitalName}
          badgeText={headerConfig.badgeText}
          divisionText={headerConfig.divisionText}
          icon={headerConfig.icon}
          bgColor={headerConfig.bgColor}
          bgGradient={headerConfig.bgGradient}
          badgeColor={headerConfig.badgeColor}
          badgeTextColor={headerConfig.badgeTextColor}
        />

        {/* Optional Title Bar (if showTitle is true) */}
        {showTitle && (
          <div className="iq-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fw-bold">{title}</h2>
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
                onClick={onRefresh}
              >
                <i className="ri-refresh-line me-1"></i>
                Refresh
              </Button>
            </div>
          </div>
        )}

        <Row>
          <Col md="12">
            {/* Stats Cards */}
            <Row className="mb-4">
              {statCards.map((card, index) => (
                <Col key={`stat-card-${index}`} md="6" lg="3" className="mb-3">
                  <div className="iq-card">
                    <div
                      className={`iq-card-body iq-bg-${card.color} rounded-4`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div
                          className={`rounded-circle iq-card-icon bg-${card.color}`}
                        >
                          {card.icon && React.createElement(card.icon)}
                        </div>
                        <div className="text-end mx-2">
                          <h2 className="mb-0">
                            <span className="counter">{card.value}</span>
                          </h2>
                          <h5 className="">{card.title}</h5>
                          {card.subtitle && (
                            <small
                              className={`text-${
                                card.subtitleColor || "success"
                              }`}
                            >
                              {card.subtitle}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Charts Row - Only rendered if at least one chart exists */}
            {(leftChart || rightChart) && (
              <Row className="mb-4">
                {/* Left Chart */}
                {leftChart && (
                  <Col lg={rightChart ? "6" : "12"} className="mb-3">
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between">
                        <h4 className="card-title">{leftChart.title}</h4>
                      </div>
                      <div className="iq-card-body">
                        <Chart
                          options={leftChart.options}
                          series={leftChart.series}
                          type={leftChart.type}
                          height={leftChart.height}
                        />
                      </div>
                    </div>
                  </Col>
                )}

                {/* Right Chart */}
                {rightChart && (
                  <Col lg={leftChart ? "6" : "12"} className="mb-3">
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h4 className="card-title">{rightChart.title}</h4>
                        </div>
                      </div>
                      <div className="iq-card-body">
                        <div
                          id={rightChart.id}
                          style={{ height: rightChart.height }}
                          className="iq-card-body"
                        ></div>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            )}

            {/* Custom Content */}
            {customContent && (
              <Row className="mb-4">
                <Col md="12">{customContent}</Col>
              </Row>
            )}

            {/* Data Table */}
            {tableConfig && (
              <Row className="mb-4">
                <CustomTableComponent
                  showHeader={tableConfig.showHeader}
                  tableTitle={tableConfig.title}
                  searchName={tableConfig.searchName}
                  searchValue={searchText}
                  onSearchChange={handleSearchChange}
                  fetchFunction={tableConfig.fetchFunction}
                  setFilteredData={setFilteredData}
                  TableIcon={tableConfig.icon || FaUsers}
                  buttonRefresh={tableConfig.buttonRefresh}
                  onRefresh={onRefresh}
                  data={filteredData}
                  loading={loading}
                  columns={tableConfig.columns}
                  itemsPerPage={pagination.itemPerPage}
                  slugConfig={tableConfig.slugConfig}
                  basePath={tableConfig.basePath}
                  paginationProps={pagination}
                  showActions={tableConfig.showActions}
                  actions={tableConfig.actions}
                />
              </Row>
            )}
          </Col>
        </Row>
      </FormProvider>
    </>
  );
};

export default BaseDashboard;
