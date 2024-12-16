'use client'
import React, { Fragment } from 'react'
import { Col, Dropdown, Row, Table, Image, Tabs, Tab } from "react-bootstrap";
import Chart from 'react-apexcharts'

import Image1 from "../../../assets/Images/page-img/37.png"
import Image2 from "../../../assets/Images/page-img/34.png"
import Image3 from "../../../assets/Images/page-img/35.png"
import Image4 from "../../../assets/Images/page-img/36.png"

export default function HomeDashboard() {
    const chart1 = {
        options:{
            chart: {
              stacked: true,
              height: 280,
              type: 'bar',
            },
            colors: ['#089bab'],
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                    endingShape: 'rounded',
                    borderRadius:10
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },
    
            grid: {
                row: {
                    colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis: {
                labels: {
                    rotate: -45
                },
                categories: ['A', 'B', 'C', 'D', 'E', 'F',
                    'G', 'H', 'I', 'J'
                ],
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'Servings',
                },
            },
            fill: {
              opacity: 1,
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.85,
                    opacityTo: 0.85,
                    stops: [50, 0, 100]
                },
            }
        },
        series: [{
            name: 'Servings',
            data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31]
        }],
    }
  return (
    <Fragment>
        <Row>
            <Col lg='4'>
                <div className="iq-card iq-user-profile-block">
                <div className="iq-card-body">
                    <div className="user-details-block">
                    <div className="user-profile text-center">
                        <Image
                            src="/images/jamal.jpg"
                            alt="profile-Image"
                            className="avatar-130 Image-fluid"
                        />
                    </div>
                    <div className="text-center mt-3">
                        <h4>
                        <b>Bess Willis</b>
                        </h4>
                        <p>27 years, California</p>
                    </div>
                    <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0 mt-4 mb-0">
                        <li className="text-center">
                        <h6 className="text-primary">Weight</h6>
                        <h3>
                            60<span>kg</span>
                        </h3>
                        </li>
                        <li className="text-center">
                        <h6 className="text-primary">Height</h6>
                        <h3>
                            170<span>cm</span>
                        </h3>
                        </li>
                        <li className="text-center">
                        <h6 className="text-primary">Goal</h6>
                        <h3 className="text-warning">
                            55<span>kg</span>
                        </h3>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </Col>
            <Col lg='8'>
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
                </Row>
                <div className="iq-card">
                    <div className="iq-card-body pb-0">
                        <Row>
                           <Col sm='12'>
                              <div className="iq-card">
                                 <div className="iq-card-body bg-primary rounded-4 pt-2 pb-2 pe-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                       <p className="mb-0">Advice! Connect your Apple Watch for better results.</p>
                                       <div className="rounded-4 iq-card-icon bg-white">
                                          <Image src={"/Images/icon-dashboard.png"} className="Image-fluid" alt="icon" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="iq-card">
                                 <div className="iq-header-title">
                                    <h4 className="card-title text-primary">Detail Pages</h4>
                                    <p>Oct 17, 2021</p>
                                 </div>
                                 <Tabs 
                                    defaultActiveKey={"Dokter"}
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                 >
                                 <Tab eventKey="home" title="Home">
                                 <Table striped="columns">
                                    <thead>
                                    <tr>
                                       <th>#</th>
                                       <th>First Name</th>
                                       <th>Last Name</th>
                                       <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                       <td>1</td>
                                       <td>Mark</td>
                                       <td>Otto</td>
                                       <td>@mdo</td>
                                    </tr>
                                    <tr>
                                       <td>2</td>
                                       <td>Jacob</td>
                                       <td>Thornton</td>
                                       <td>@fat</td>
                                    </tr>
                                    <tr>
                                       <td>3</td>
                                       <td colSpan={2}>Larry the Bird</td>
                                       <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                 </Table>
                                    </Tab>
                                    <Tab eventKey="profile" title="Profile">
                                    Tab content for Profile
                                    </Tab>
                                    <Tab eventKey="contact" title="Contact" disabled>
                                    Tab content for Contact
                                    </Tab>
                                 </Tabs>
                              </div>
                           </Col>
                           <Col lg='8'>
                              <div className="iq-card">
                                 <div className="iq-card-header d-flex justify-content-between p-0 bg-white">
                                    <div className="iq-header-title">
                                       <h4 className="card-title text-primary">Activity Statistic</h4>
                                       
                                    </div>
                                 </div>
                                 <div className="iq-card-body p-0">
                                    <Chart options={chart1.options} series={chart1.series} type="bar" height={280} />
                                 </div>
                              </div>
                           </Col>
                           <div className="col-lg-4">
                              <div className="iq-card mb-0">
                                 <div className="iq-card-header d-flex justify-content-between p-0 bg-white">
                                    <div className="iq-header-title">
                                       <h4 className="card-title text-primary">My Training</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                       <Dropdown>
                                          <Dropdown.Toggle variant="dropdown-toggle iq-bg-primary btn" id="dropdownMenuButton4" data-bs-toggle="dropdown" style={{border:'none'}}>
                                          <i className="ri-add-line m-0 text-primary"></i>
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton4">
                                             <Dropdown.Item className="dropdown-item" href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                             <Dropdown.Item className="dropdown-item" href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                             <Dropdown.Item className="dropdown-item" href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                             <Dropdown.Item className="dropdown-item" href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                             <Dropdown.Item className="dropdown-item" href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                       </Dropdown>
                                    </div>
                                 </div>
                                 <div className="iq-card-body p-0">
                                    <Table className="mb-0 table-box-shadow" borderless>
                                       <thead>
                                          <tr>
                                             <th scope="col">Training</th>
                                             <th scope="col">TRX Cardio</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>Burned</td>
                                             <td>350 kcal</td>
                                          </tr>
                                          <tr>
                                             <td>Spend</td>
                                             <td>1hr 45m</td>
                                          </tr>
                                       </tbody>
                                    </Table>
                                    <Table className="mb-0 mt-4 table-box-shadow" borderless>
                                       <thead>
                                          <tr>
                                             <th scope="col">Training</th>
                                             <th scope="col">Stretching</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>Burned</td>
                                             <td>180 kcal</td>
                                          </tr>
                                          <tr>
                                             <td>Spend</td>
                                             <td>30m</td>
                                          </tr>
                                       </tbody>
                                    </Table>
                                 </div>
                              </div>
                           </div>
                           <Col md='6'>
                              <div className="iq-card">
                                 <div className="iq-card-header d-flex justify-content-between p-0 bg-white min-height-auto mb-1">
                                    <div className="iq-header-title">
                                       <h4 className="card-title text-primary">Heart Rate</h4>
                                    </div>
                                 </div>
                                 <div className="iq-card-body p-0">
                                    <div className="d-flex align-items-center">
                                       <div className="me-3">
                                          <h4 className="">75 bpm</h4>
                                          <p className="mb-0 text-primary">Health Zone</p>
                                       </div>
                                       <div className="rounded-circle iq-card-icon iq-bg-primary"><i className="ri-windy-fill"></i></div>
                                    </div>
                                 </div>
                              </div>
                           </Col>
                           <Col md='6'>
                              <div className="iq-card">
                                 <div className="iq-card-header d-flex justify-content-between p-0 bg-white min-height-auto mb-1">
                                    <div className="iq-header-title">
                                       <h4 className="card-title text-primary">Water Balance</h4>
                                    </div>
                                 </div>
                                 <div className="iq-card-body p-0">
                                    <div className="d-flex align-items-center">
                                       <div className="me-3 text-start">
                                          <p className="mb-0">Drunk</p>
                                          <h4 className="">1250 ml/ 2000 ml</h4>
                                       </div>
                                       <div className="rounded-circle iq-card-icon iq-bg-primary"><i className="ri-add-fill"></i></div>
                                    </div>
                                 </div>
                              </div>
                           </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </Fragment>
  )
}
