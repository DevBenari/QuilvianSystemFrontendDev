"use client";
import React, { useEffect } from "react";
import { Col, Row, Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// eslint-disable-next-line camelcase
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const DashboardMasterData = () => {
  const chart1 = {
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
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      colors: ["#089bab", "#FC9F5B", "#5bc5d1"],
    },
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
    ],
  };

  useEffect(() => {
    if (document.querySelectorAll("#home-chart-03").length) {
      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        const chart = am4core.create("home-chart-03", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0;

        chart.data = [
          {
            country: "USA",
            value: 401,
          },
          {
            country: "India",
            value: 300,
          },
          {
            country: "Australia",
            value: 200,
          },
          {
            country: "Brazil",
            value: 100,
          },
        ];
        chart.rtl = true;
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "country";
        series.colors.list = [
          am4core.color("#089bab"),
          am4core.color("#2ca5b2"),
          am4core.color("#faa264"),
          am4core.color("#fcb07a"),
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
    return () => {};
  }, []);
  return (
    <>
      <Row>
        <Col md="12">
          <Row>
            <Col md="6" lg="3">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-primary rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-primary">
                      <i className="ri-user-fill"></i>
                    </div>
                    <div className="text-end">
                      <h2 className="mb-0">
                        <span className="counter">5600</span>
                      </h2>
                      <h5 className="">Doctors</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="3">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-warning rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-warning">
                      <i className="ri-women-fill"></i>
                    </div>
                    <div className="text-end">
                      <h2 className="mb-0">
                        <span className="counter">3450</span>
                      </h2>
                      <h5 className="">Nurses</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="3">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-danger rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-danger">
                      <i className="ri-group-fill"></i>
                    </div>
                    <div className="text-end">
                      <h2 className="mb-0">
                        <span className="counter">3500</span>
                      </h2>
                      <h5 className="">Patients</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" lg="3">
              <div className="iq-card">
                <div className="iq-card-body iq-bg-info rounded-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rounded-circle iq-card-icon bg-info">
                      <i className="ri-hospital-line"></i>
                    </div>
                    <div className="text-end">
                      <h2 className="mb-0">
                        <span className="counter">4500</span>
                      </h2>
                      <h5 className="">Pharmacists</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/** Activity Static */}
            <Col lg="8">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Activity Statistic</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <Chart
                    options={chart1.options}
                    series={chart1.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </Col>
            <Col lg="4">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Patient Timeline</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="dropdown-toggle text-primary"
                        id="dropdownMenuButton4"
                        data-bs-toggle="dropdown"
                        style={{ border: "none" }}
                      >
                        View All
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton4"
                      >
                        <Dropdown.Item className="dropdown-item" to="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" to="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" to="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" to="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" to="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="iq-timeline">
                    <li>
                      <div className="timeline-dots"></div>
                      <h6 className="float-start mb-1">Patient Checkup</h6>
                      <small className="float-end mt-1">23 November 2019</small>
                      <div className="d-inline-block w-100">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque scelerisque{" "}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots border-success"></div>
                      <h6 className="float-start mb-1">Patient Admit</h6>
                      <small className="float-end mt-1">24 November 2019</small>
                      <div className="d-inline-block w-100">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque scelerisque
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots border-primary"></div>
                      <h6 className="float-start mb-1">Treatment Starts</h6>
                      <small className="float-end mt-1">24 November 2019</small>
                      <div className="d-inline-block w-100">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque scelerisque
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Patient Progress</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="patient-progress m-0 p-0">
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Bud Jet</h6>
                      </div>
                      <span className="badge badge-primary">30%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Barney Cull</h6>
                      </div>
                      <span className="badge badge-success">70%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Eric Shun</h6>
                      </div>
                      <span className="badge badge-danger">15%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Rick Shaw</h6>
                      </div>
                      <span className="badge badge-warning">55%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Ben Effit</h6>
                      </div>
                      <span className="badge badge-info">45%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Rick Shaw</h6>
                      </div>
                      <span className="badge badge-warning">55%</span>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <div className="media-support-info">
                        <h6>Marge Arita</h6>
                      </div>
                      <span className="badge badge-primary">65%</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="media-support-info">
                        <h6>Barry Cudat</h6>
                      </div>
                      <span className="badge badge-danger">15%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Patient overview</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div
                    id="home-chart-03"
                    style={{ height: "280px" }}
                    className="iq-card-body"
                  ></div>
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Visits From Countries </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <div className="iq-details">
                    <span className="title text-dark">United States</span>
                    <div className="percentage float-end text-primary">
                      95 <span>%</span>
                    </div>

                    <div className="iq-progress-bar-linear d-inline-block w-100">
                      <div
                        className="iq-progress-bar progress"
                        style={{ height: "6px" }}
                      >
                        <div
                          className="progress-bar bg-primary"
                          data-toggle="progress-bar"
                          role="progressbar"
                          aria-valuenow="95"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: "95%",
                            transition: "width 2s ease 0s",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="iq-details mt-4">
                    <span className="title text-dark">India</span>
                    <div className="percentage float-end text-warning">
                      75 <span>%</span>
                    </div>
                    <div className="iq-progress-bar-linear d-inline-block w-100">
                      <div
                        className="iq-progress-bar progress"
                        style={{ height: "6px" }}
                      >
                        <span
                          className="bg-warning"
                          data-percent="75"
                          data-toggle="progress-bar"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: "75%",
                            transition: "width 2s ease 0s",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="iq-details mt-4">
                    <span className="title text-dark">Australia</span>
                    <div className="percentage float-end text-success">
                      55 <span>%</span>
                    </div>
                    <div className="iq-progress-bar-linear d-inline-block w-100">
                      <div
                        className="iq-progress-bar progress"
                        style={{ height: "6px" }}
                      >
                        <span
                          className="bg-success"
                          data-percent="55"
                          data-toggle="progress-bar"
                          role="progressbar"
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: "55%",
                            transition: "width 2s ease 0s",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="iq-details mt-4">
                    <span className="title text-dark">Brazil</span>
                    <div className="percentage float-end text-danger">
                      25 <span>%</span>
                    </div>
                    <div className="iq-progress-bar-linear d-inline-block w-100">
                      <div
                        className="iq-progress-bar progress"
                        style={{ height: "6px" }}
                      >
                        <span
                          className="bg-danger"
                          data-percent="25"
                          data-toggle="progress-bar"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: "25%",
                            transition: "width 2s ease 0s",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DashboardMasterData;
