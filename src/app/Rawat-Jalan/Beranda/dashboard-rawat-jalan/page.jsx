"use client";

import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaHospital,
  FaClock,
  FaStethoscope,
  FaClipboardCheck,
} from "react-icons/fa";
import { Badge, Row, Col, Card } from "react-bootstrap";
import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";
import BaseStatusComponent from "@/components/features/baseDashboard/status-poli";
import StatusPoliComponent from "@/components/features/baseDashboard/status-poli";

// Data dummy untuk daftar pasien rawat jalan
const pasienRawatJalanData = [
  {
    id: "RJ-2023-001",
    nama: "Ahmad Rizal",
    umur: 45,
    jenisKelamin: "Laki-laki",
    poli: "Poli Umum",
    dokter: "dr. John Doe",
    antrian: 1,
    status: "Selesai",
    waktuDaftar: "08:15",
  },
  {
    id: "RJ-2023-002",
    nama: "Siti Aminah",
    umur: 32,
    jenisKelamin: "Perempuan",
    poli: "Poli Anak",
    dokter: "dr. Jane Smith",
    antrian: 2,
    status: "Menunggu Dokter",
    waktuDaftar: "08:30",
  },
  {
    id: "RJ-2023-003",
    nama: "Budi Santoso",
    umur: 28,
    jenisKelamin: "Laki-laki",
    poli: "Poli Gigi",
    dokter: "drg. Mike Johnson",
    antrian: 3,
    status: "Dalam Pemeriksaan",
    waktuDaftar: "08:45",
  },
  {
    id: "RJ-2023-004",
    nama: "Dewi Putri",
    umur: 56,
    jenisKelamin: "Perempuan",
    poli: "Poli Mata",
    dokter: "dr. Sarah Wilson",
    antrian: 1,
    status: "Menunggu Obat",
    waktuDaftar: "09:00",
  },
  {
    id: "RJ-2023-005",
    nama: "Rudi Hermawan",
    umur: 22,
    jenisKelamin: "Laki-laki",
    poli: "Poli Umum",
    dokter: "dr. John Doe",
    antrian: 2,
    status: "Menunggu Dokter",
    waktuDaftar: "09:15",
  },
];

const DashboardRawatJalan = () => {
  const [filteredPasien, setFilteredPasien] = useState(pasienRawatJalanData);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mendapatkan warna badge berdasarkan status pasien
  const getStatusBadge = (status) => {
    switch (status) {
      case "Selesai":
        return <Badge bg="success">{status}</Badge>;
      case "Menunggu Dokter":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Dalam Pemeriksaan":
        return <Badge bg="primary">{status}</Badge>;
      case "Menunggu Obat":
        return <Badge bg="info">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Konfigurasi header untuk Rawat Jalan
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "RAWAT JALAN",
    divisionText: "Instalasi Rawat Jalan",
    icon: FaStethoscope,
    bgColor: "#1a237e",
    bgGradient: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    badgeColor: "#00c853",
    badgeTextColor: "white",
  };

  // Konfigurasi statistik
  const statCards = [
    {
      title: "Total Antrian",
      value: 120,
      icon: FaUsers,
      color: "primary",
      subtitle: "↑ 12% dari kemarin",
      subtitleColor: "success",
    },
    {
      title: "Dokter Bertugas",
      value: 15,
      icon: FaUserMd,
      color: "warning",
      subtitle: "Dari 20 Dokter",
      subtitleColor: "muted",
    },
    {
      title: "Poli Aktif",
      value: 8,
      icon: FaHospital,
      color: "danger",
      subtitle: "Dari 10 Poli",
      subtitleColor: "muted",
    },
    {
      title: "Rata-rata Waktu Tunggu",
      value: 25,
      icon: FaClock,
      color: "info",
      subtitle: "menit",
      subtitleColor: "muted",
    },
    {
      title: "Total Kunjungan Hari Ini",
      value: 85,
      icon: FaClipboardCheck,
      color: "success",
      subtitle: "Sudah dilayani",
      subtitleColor: "muted",
    },
    {
      title: "Jadwal Hari Ini",
      value: 12,
      icon: FaCalendarCheck,
      color: "primary",
      subtitle: "jadwal dokter",
      subtitleColor: "muted",
    },
  ];

  // Konfigurasi line chart
  const lineChartConfig = {
    title: "Tren Kunjungan Rawat Jalan",
    type: "line",
    height: 350,
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
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
        name: "Poli Umum",
        data: [120, 130, 125, 140, 145, 150, 155, 160, 170],
      },
      {
        name: "Poli Anak",
        data: [90, 100, 95, 105, 110, 115, 120, 125, 130],
      },
      {
        name: "Poli Gigi",
        data: [60, 65, 70, 75, 80, 85, 90, 95, 100],
      },
    ],
  };

  // Konfigurasi tabel pasien
  const tableConfig = {
    title: "Daftar Antrian Aktif",
    columns: [
      { key: "id", label: "ID" },
      { key: "nama", label: "Nama" },
      { key: "umur", label: "Umur" },
      { key: "jenisKelamin", label: "Jenis Kelamin" },
      { key: "poli", label: "Poli" },
      { key: "dokter", label: "Dokter" },
      { key: "antrian", label: "No. Antrian" },
      {
        key: "status",
        label: "Status",
        render: (item) => getStatusBadge(item.status),
      },
      { key: "waktuDaftar", label: "Waktu Daftar" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaUsers,
    buttonRefresh: true,
    basePath: "/instalasi-rawat-jalan/data-poli/detail-poli",
    slugConfig: {
      textField: "nama",
      idField: "id",
    },
  };

  // Fungsi simulasi untuk refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredPasien([...pasienRawatJalanData]);
    }, 1000);
  };

  const dataPoli = [
    {
      id: "P001",
      nama: "Poli Jantung",
      dokter: "dr. Hendra Wijaya, Sp.JP",
      antrianSaatIni: 12,
      totalAntrian: 25,
      status: "Aktif",
      waktuBuka: "08:00 - 14:00",
      estimasiWaktu: 15,
      borderColor: "#dc3545", // Merah untuk jantung
    },
    {
      id: "P002",
      nama: "Poli Mata",
      dokter: "dr. Ratna Dewi, Sp.M",
      antrianSaatIni: 8,
      totalAntrian: 20,
      status: "Aktif",
      waktuBuka: "08:00 - 15:00",
      estimasiWaktu: 12,
      borderColor: "#5bc0de", // Biru muda untuk mata
    },
    {
      id: "P003",
      nama: "Poli Bedah Umum",
      dokter: "dr. Budi Santoso, Sp.B",
      antrianSaatIni: 5,
      totalAntrian: 15,
      status: "Aktif",
      waktuBuka: "09:00 - 13:00",
      estimasiWaktu: 30,
      borderColor: "#f0ad4e", // Oranye untuk bedah
    },
    {
      id: "P004",
      nama: "Poli Paru",
      dokter: "dr. Siti Aminah, Sp.P",
      antrianSaatIni: 14,
      totalAntrian: 28,
      status: "Aktif",
      waktuBuka: "08:00 - 16:00",
      estimasiWaktu: 10,
      borderColor: "#5cb85c", // Hijau untuk paru
    },
    {
      id: "P005",
      nama: "Poli Gigi",
      dokter: "drg. Rudi Hartono",
      antrianSaatIni: 3,
      totalAntrian: 18,
      status: "Aktif",
      waktuBuka: "08:30 - 15:30",
      estimasiWaktu: 20,
      borderColor: "#33b5e5", // Biru untuk gigi
    },
    {
      id: "P006",
      nama: "Poli Umum",
      dokter: "dr. Diana Putri",
      antrianSaatIni: 10,
      totalAntrian: 40,
      status: "Aktif",
      waktuBuka: "07:30 - 16:00",
      estimasiWaktu: 8,
      borderColor: "#007bff", // Biru default
    },
    {
      id: "P007",
      nama: "Poli Anak",
      dokter: "dr. Surya Aditya, Sp.A",
      antrianSaatIni: 7,
      totalAntrian: 22,
      status: "Aktif",
      waktuBuka: "08:00 - 14:30",
      estimasiWaktu: 10,
      borderColor: "#ff69b4", // Pink untuk anak
    },
    {
      id: "P008",
      nama: "Poli Kandungan",
      dokter: "dr. Maya Lestari, Sp.OG",
      antrianSaatIni: 6,
      totalAntrian: 19,
      status: "Aktif",
      waktuBuka: "08:00 - 14:00",
      estimasiWaktu: 25,
      borderColor: "#8e44ad", // Ungu untuk kandungan
    },
    {
      id: "P009",
      nama: "Poli Saraf",
      dokter: "dr. Agus Setiawan, Sp.S",
      antrianSaatIni: 9,
      totalAntrian: 17,
      status: "Aktif",
      waktuBuka: "09:00 - 15:00",
      estimasiWaktu: 18,
      borderColor: "#ff9800", // Jingga untuk saraf
    },
    {
      id: "P010",
      nama: "Poli THT",
      dokter: "dr. Lina Rahmawati, Sp.THT",
      antrianSaatIni: 4,
      totalAntrian: 14,
      status: "Aktif",
      waktuBuka: "08:00 - 13:30",
      estimasiWaktu: 15,
      borderColor: "#795548", // Coklat untuk THT
    },
  ];

  const handlePoliClick = (poli) => {
    console.log("Detail poli:", poli);
    // Implementasi navigasi ke halaman detail atau tampilkan modal
  };

  return (
    <BaseDashboard
      // Header konfigurasi
      headerConfig={headerConfig}
      // Statistik cards
      statCards={statCards}
      // Left chart - line chart kunjungan
      leftChart={lineChartConfig}
      // Right chart - pie chart sebaran pasien
      rightChart={{
        title: "Distribusi Pasien per Poli",
        type: "pie",
        data: [
          { category: "Poli Umum", value: 320 },
          { category: "Poli Anak", value: 280 },
          { category: "Poli Gigi", value: 200 },
          { category: "Poli Mata", value: 160 },
          { category: "Poli Lainnya", value: 240 },
        ],
        height: 350,
        id: "rawat-jalan-chart-01",
      }}
      // Tabel konfigurasi
      tableConfig={tableConfig}
      // Data dan state
      data={pasienRawatJalanData}
      filteredData={filteredPasien}
      setFilteredData={setFilteredPasien}
      loading={loading}
      // Pagination
      pagination={{
        currentPage: 1,
        totalPages: 1,
        itemPerPage: 10,
        onPageChange: () => {},
      }}
      // Fungsi refresh
      onRefresh={handleRefresh}
      // Custom content - status poli dan jadwal dokter
      customContent={
        <StatusPoliComponent
          data={dataPoli}
          title="Status Antrian Poliklinik"
          showEstimasiWaktu={true}
          onItemClick={handlePoliClick}
          headerBadgeText="Poli Aktif"
        />
      }
      // Title
      showTitle={false}
    />
  );
};

export default DashboardRawatJalan;
