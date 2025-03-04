"use client";

import React, { useEffect } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import {
  FaCalendarCheck,
  FaUserClock,
} from "react-icons/fa";

// import Chart from "react-apexcharts";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { poliAnak } from "@/utils/instalasi-poli";
import dynamic from "next/dynamic";

const DashboardRawatJalan = () => {
   const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  // State untuk teks pencarian dan data pasien
  // const [searchText, setSearchText] = useState("");
  // const [filteredPatients, setFilteredPatients] = useState(poliAnak);

  // Fungsi untuk menangani perubahan input pencarian
  // const handleSearchChange = (e) => {
  //   const text = e.target.value.toLowerCase();
  //   setSearchText(text);

  //   // Filter data berdasarkan teks pencarian
  //   const filtered = poliAnak.filter((patient) =>
  //     patient.nama.toLowerCase().includes(text)
  //   );
  //   setFilteredPatients(filtered);
  // };



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
      <Col md="12">
        {/* Header */}

        <Row>
          <Col md="6" lg="3">
            <div className="iq-card">
              <div className="iq-card-body iq-bg-primary rounded-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <i className="ri-group-fill"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">120</span>
                    </h2>
                    <h5 className="">Total Antrian</h5>
                    <small className="text-success">↑ 12% dari kemarin</small>
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
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">15</span>
                    </h2>
                    <small className="text-muted">Dari 20 Dokter</small>
                    <h5 className="">Dokter Bertugas</h5>
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
                    <i className="ri-hospital-line"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">8</span>
                    </h2>
                    <small className="text-muted">Dari 10 Poli</small>
                    <h5 className="">Poli Aktif</h5>
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
                    <i className="ri-time-line"></i>
                  </div>
                  <div className="text-end mx-2">
                    <h2 className="mb-0">
                      <span className="counter">25</span>
                    </h2>
                    <h5 className=""> Rata-rata Waktu Tunggu</h5>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Statistik Cards */}

        {/* Status Antrian per Poli */}
        <Row className="mb-4">
          <Col lg="12">
            <Card>
              <Card.Header className="">
                <div className="d-flex align-items-center ">
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

        <Row>
          <Col lg="8">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Grafik Kunjungan Pasien</h4>
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
            {/* Grafik dan Jadwal */}
            <Row>
              <div className="iq-card">
                <Card className="h-100 p-2">
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <FaCalendarCheck
                        className="text-primary me-2"
                        size={20}
                      />
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
              </div>
            </Row>
          </Col>
        </Row>
        {/* <Row className="mb-4">
          <Col lg="12">
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
                      value={searchText}
                      onChange={handleSearchChange} // Panggil handler saat input berubah
                    />
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <CustomTableComponent
                  data={filteredPatients}
                  columns={[
                    { key: "id", label: "ID" },
                    { key: "nama", label: "Nama" },
                    { key: "jenisKelamin", label: "Jenis Kelamin" },
                    { key: "umur", label: "Kelompok Usia" },
                    { key: "noHp", label: "No Hp" },
                    { key: "antrian", label: "Antrian" },
                  ]}
                  itemsPerPage={3}
                  slugConfig={{ textField: "nama", idField: "id" }}
                  basePath="/instalasi-rawat-jalan/data-poli/detail-poli"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default DashboardRawatJalan;
