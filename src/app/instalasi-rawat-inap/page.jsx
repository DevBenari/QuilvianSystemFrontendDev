"use client";

import React from "react";
import { Container, Row, Col, Card, Table, Badge, Form } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  FaBed,
  FaUserInjured,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";

// Sample data untuk grafik
const occupancyData = [
  { name: "Jan", occupancy: 75 },
  { name: "Feb", occupancy: 82 },
  { name: "Mar", occupancy: 68 },
  { name: "Apr", occupancy: 85 },
  { name: "May", occupancy: 72 },
  { name: "Jun", occupancy: 78 },
];

const Dashboard = () => {
  return (
    <div className="iq-card">
      <div className="iq-card-body iq-bg-primary rounded-4">
        <Container fluid className="p-4">
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <h2 className="mb-0">Dashboard Rawat Inap</h2>
              <small className="text-muted">
                Last updated: {new Date().toLocaleString()}
              </small>
            </Col>
            <Col xs="auto">
              <Form.Select className="mb-2">
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Bed</h6>
                      <h3 className="mb-0">120</h3>
                    </div>
                    <div className=" p-3 rounded">
                      <FaBed size={24} className="text-primary" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Pasien Dirawat</h6>
                      <h3 className="mb-0">85</h3>
                    </div>
                    <div className="-25 p-3 rounded">
                      <FaUserInjured size={24} className="text-success" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">BOR</h6>
                      <h3 className="mb-0">70.8%</h3>
                    </div>
                    <div className="p-3 rounded">
                      <FaChartLine size={24} className="text-warning" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Bed Tersedia</h6>
                      <h3 className="mb-0">35</h3>
                    </div>
                    <div className=" p-3 rounded">
                      <FaClipboardCheck size={24} className="text-danger" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Status Kamar */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Status Ketersediaan Kamar</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3} className="text-center mb-3">
                      <h6>Kelas VIP</h6>
                      <Badge bg="success" className="px-3 py-2">
                        Tersedia: 5
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Kelas 1</h6>
                      <Badge bg="warning" className="px-3 py-2">
                        Tersedia: 3
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Kelas 2</h6>
                      <Badge bg="danger" className="px-3 py-2">
                        Tersedia: 0
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Kelas 3</h6>
                      <Badge bg="info" className="px-3 py-2">
                        Tersedia: 8
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Grafik dan Tabel */}
          <Row className="g-4">
            <Col md={8}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Grafik Okupansi Bed</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="occupancy"
                          stroke="#0d6efd"
                          name="Okupansi (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Statistik Perawatan</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <h6>Rata-rata Lama Rawat</h6>
                    <h3>4.5 Hari</h3>
                  </div>
                  <div className="mb-3">
                    <h6>Tingkat Kepuasan</h6>
                    <h3>89%</h3>
                  </div>
                  <div>
                    <h6>Total Pasien Bulan Ini</h6>
                    <h3>245</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Tabel Pasien */}
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Daftar Pasien Terkini</h5>
                  <Form.Control
                    type="search"
                    placeholder="Cari pasien..."
                    className="w-auto"
                  />
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>No. RM</th>
                        <th>Nama Pasien</th>
                        <th>Ruangan</th>
                        <th>Dokter</th>
                        <th>Tanggal Masuk</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>RM-001</td>
                        <td>John Doe</td>
                        <td>VIP-101</td>
                        <td>dr. Smith</td>
                        <td>2024-02-01</td>
                        <td>
                          <Badge bg="success">Stabil</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>RM-002</td>
                        <td>Jane Smith</td>
                        <td>K1-203</td>
                        <td>dr. Johnson</td>
                        <td>2024-02-03</td>
                        <td>
                          <Badge bg="warning">Observasi</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
