"use client";

import React from "react";
import { Container, Row, Col, Card, Table, Badge, Form } from "react-bootstrap";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaChartBar,
  FaSearch,
  FaHospital,
  FaClock,
  FaUserClock,
} from "react-icons/fa";
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

// Sample data untuk grafik kunjungan
const visitData = [
  { name: "Jan", kunjungan: 750 },
  { name: "Feb", kunjungan: 820 },
  { name: "Mar", kunjungan: 680 },
  { name: "Apr", kunjungan: 850 },
  { name: "May", kunjungan: 720 },
  { name: "Jun", kunjungan: 780 },
];

const Dashboard = () => {
  return (
    <div className="iq-card">
      <div className="iq-card-body iq-bg-primary rounded-4">
        <Container fluid className="p-4">
          {/* Header */}
          <Row className="mb-4 align-items-center">
            <Col>
              <div className="d-flex align-items-center">
                <FaHospital className="text-primary me-2" size={24} />
                <div>
                  <h2 className="mb-0">Dashboard Rawat Jalan</h2>
                  <small className="text-muted">
                    Last updated: {new Date().toLocaleString()}
                  </small>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Form.Select className="mb-2">
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Statistik Cards */}
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Antrian</h6>
                      <h3 className="mb-0">120</h3>
                      <small className="text-success">↑ 12% dari kemarin</small>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <FaUsers size={24} className="text-primary" />
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
                      <h6 className="text-muted mb-2">Dokter Bertugas</h6>
                      <h3 className="mb-0">15</h3>
                      <small className="text-muted">Dari 20 Dokter</small>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <FaUserMd size={24} className="text-success" />
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
                      <h6 className="text-muted mb-2">Poli Aktif</h6>
                      <h3 className="mb-0">8</h3>
                      <small className="text-muted">Dari 10 Poli</small>
                    </div>
                    <div className="bg-warning bg-opacity-10 p-3 rounded">
                      <FaHospital size={24} className="text-warning" />
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
                      <h6 className="text-muted mb-2">
                        Rata-rata Waktu Tunggu
                      </h6>
                      <h3 className="mb-0">25</h3>
                      <small className="text-danger">↑ 5 menit</small>
                    </div>
                    <div className="bg-danger bg-opacity-10 p-3 rounded">
                      <FaClock size={24} className="text-danger" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Status Antrian per Poli */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <FaUserClock className="text-primary me-2" size={20} />
                    <h5 className="mb-0">Status Antrian per Poli</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3} className="text-center mb-3">
                      <h6>Poli Umum</h6>
                      <Badge bg="primary" className="px-3 py-2">
                        Antri: 15
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Poli Gigi</h6>
                      <Badge bg="success" className="px-3 py-2">
                        Antri: 8
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Poli Anak</h6>
                      <Badge bg="warning" className="px-3 py-2">
                        Antri: 12
                      </Badge>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <h6>Poli Mata</h6>
                      <Badge bg="info" className="px-3 py-2">
                        Antri: 6
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Grafik dan Jadwal */}
          <Row className="g-4 mb-4">
            <Col md={8}>
              <Card className="h-100">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <FaChartBar className="text-primary me-2" size={20} />
                    <h5 className="mb-0">Grafik Kunjungan Pasien</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="kunjungan"
                          stroke="#0d6efd"
                          name="Jumlah Kunjungan"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <FaCalendarCheck className="text-primary me-2" size={20} />
                    <h5 className="mb-0">Jadwal Dokter Hari Ini</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="jadwal-list">
                    <div className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
                      <div>
                        <h6 className="mb-1">dr. John Doe</h6>
                        <small className="text-muted">Poli Umum</small>
                      </div>
                      <Badge bg="success">08:00 - 12:00</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
                      <div>
                        <h6 className="mb-1">dr. Jane Smith</h6>
                        <small className="text-muted">Poli Anak</small>
                      </div>
                      <Badge bg="success">09:00 - 14:00</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
                      <div>
                        <h6 className="mb-1">dr. Mike Johnson</h6>
                        <small className="text-muted">Poli Gigi</small>
                      </div>
                      <Badge bg="warning">13:00 - 17:00</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Daftar Antrian */}
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaUsers className="text-primary me-2" size={20} />
                  <h5 className="mb-0">Daftar Antrian Aktif</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FaSearch className="text-muted me-2" />
                  <Form.Control
                    type="search"
                    placeholder="Cari pasien..."
                    className="w-auto"
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No. Antrian</th>
                    <th>Nama Pasien</th>
                    <th>Poli</th>
                    <th>Dokter</th>
                    <th>Waktu Daftar</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A-001</td>
                    <td>John Smith</td>
                    <td>Poli Umum</td>
                    <td>dr. Sarah Johnson</td>
                    <td>08:00</td>
                    <td>
                      <Badge bg="success">Dalam Pemeriksaan</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>A-002</td>
                    <td>Jane Doe</td>
                    <td>Poli Gigi</td>
                    <td>dr. Mike Wilson</td>
                    <td>08:15</td>
                    <td>
                      <Badge bg="warning">Menunggu</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
