"use client";

import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaBed,
  FaProcedures,
  FaSyringe,
  FaHeartbeat,
  FaUserCog,
  FaCalendarCheck,
} from "react-icons/fa";
import { Badge } from "react-bootstrap";

import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";
import { StatusOperasiBaseComponent } from "@/components/features/status/status-operasi";

// Data dummy untuk daftar operasi
const operasiData = [
  {
    id: "OP-2023-001",
    pasien: "Ahmad Rizal",
    usia: 45,
    jenisTindakan: "Appendektomi",
    ruangOperasi: "OK 01",
    status: "Dalam Persiapan",
    prioritas: "Normal",
    jadwalMulai: "10:30",
    estimasiDurasi: "1.5 jam",
    dokterBedah: "dr. Surya Dharma, Sp.B",
  },
  {
    id: "OP-2023-002",
    pasien: "Siti Aminah",
    usia: 32,
    jenisTindakan: "Sectio Caesarea",
    ruangOperasi: "OK 03",
    status: "Dalam Operasi",
    prioritas: "Segera",
    jadwalMulai: "09:00",
    estimasiDurasi: "2 jam",
    dokterBedah: "dr. Ratna Wulan, Sp.OG",
  },
  {
    id: "OP-2023-003",
    pasien: "Budi Santoso",
    usia: 58,
    jenisTindakan: "Total Hip Replacement",
    ruangOperasi: "OK 02",
    status: "Terjadwal",
    prioritas: "Elektif",
    jadwalMulai: "13:00",
    estimasiDurasi: "3 jam",
    dokterBedah: "dr. Hendra Wijaya, Sp.OT",
  },
  {
    id: "OP-2023-004",
    pasien: "Dewi Putri",
    usia: 29,
    jenisTindakan: "Laparoskopi Kolesistektomi",
    ruangOperasi: "OK 04",
    status: "Selesai",
    prioritas: "Normal",
    jadwalMulai: "08:00",
    estimasiDurasi: "1 jam",
    dokterBedah: "dr. Surya Dharma, Sp.B",
  },
  {
    id: "OP-2023-005",
    pasien: "Rudi Hermawan",
    usia: 62,
    jenisTindakan: "Coronary Artery Bypass Grafting",
    ruangOperasi: "OK 05",
    status: "Dalam Operasi",
    prioritas: "Segera",
    jadwalMulai: "07:30",
    estimasiDurasi: "4 jam",
    dokterBedah: "dr. Indra Kusuma, Sp.BTKV",
  },
];

// Data untuk ruangan operasi
const ruanganOperasiData = [
  {
    id: "OK01",
    nama: "Ruang Operasi 1",
    status: "Terpakai",
    pasien: "Ahmad Rizal",
    tindakan: "Appendektomi",
  },
  {
    id: "OK02",
    nama: "Ruang Operasi 2",
    status: "Terpakai",
    pasien: "Budi Santoso",
    tindakan: "Total Hip Replacement",
  },
  {
    id: "OK03",
    nama: "Ruang Operasi 3",
    status: "Terpakai",
    pasien: "Siti Aminah",
    tindakan: "Sectio Caesarea",
  },
  {
    id: "OK04",
    nama: "Ruang Operasi 4",
    status: "Kosong",
    pasien: "-",
    tindakan: "-",
  },
  {
    id: "OK05",
    nama: "Ruang Operasi 5",
    status: "Terpakai",
    pasien: "Rudi Hermawan",
    tindakan: "CABG",
  },
  {
    id: "OK06",
    nama: "Ruang Operasi 6",
    status: "Dibersihkan",
    pasien: "-",
    tindakan: "-",
  },
  {
    id: "OK07",
    nama: "Ruang Operasi Khusus Kardiovaskular",
    status: "Dalam Persiapan",
    pasien: "Hasan Sadikin",
    tindakan: "Valve Replacement",
  },
  {
    id: "OK08",
    nama: "Ruang Operasi Mini",
    status: "Kosong",
    pasien: "-",
    tindakan: "-",
  },
];

const DashboardOperasi = () => {
  const [filteredOperasi, setFilteredOperasi] = useState(operasiData);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mendapatkan warna badge berdasarkan prioritas
  const getPrioritasBadge = (prioritas) => {
    switch (prioritas) {
      case "Segera":
        return <Badge bg="danger">{prioritas}</Badge>;
      case "Normal":
        return (
          <Badge bg="warning" text="dark">
            {prioritas}
          </Badge>
        );
      case "Elektif":
        return <Badge bg="success">{prioritas}</Badge>;
      default:
        return <Badge bg="secondary">{prioritas}</Badge>;
    }
  };

  // Fungsi untuk mendapatkan warna badge berdasarkan status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Dalam Operasi":
        return <Badge bg="danger">{status}</Badge>;
      case "Dalam Persiapan":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Terjadwal":
        return <Badge bg="info">{status}</Badge>;
      case "Selesai":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Konfigurasi header untuk Operasi
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "SURGERY",
    divisionText: "Departemen Bedah & Operasi",
    icon: FaProcedures,
    bgColor: "#00695C", // Hijau tua, melambangkan ruang operasi
    bgGradient: "linear-gradient(135deg, #00695C 0%, #00897B 100%)", // Gradasi hijau untuk area steril
    badgeColor: "#E0F2F1", // Hijau pastel yang lembut
    badgeTextColor: "#00695C", // Hijau tua untuk kontras
  };

  // Konfigurasi statistik
  const statCards = [
    {
      title: "Operasi Terjadwal",
      value: 8,
      icon: FaCalendarAlt,
      color: "primary",
    },
    { title: "Dalam Operasi", value: 3, icon: FaProcedures, color: "danger" },
    {
      title: "Ruang Operasi Tersedia",
      value: 2,
      icon: FaBed,
      color: "success",
    },
    {
      title: "Operasi Selesai Hari Ini",
      value: 5,
      icon: FaCalendarCheck,
      color: "info",
    },
    {
      title: "Rata-rata Durasi (jam)",
      value: 2.1,
      icon: FaClock,
      color: "warning",
    },
    {
      title: "Tim Bedah Bertugas",
      value: 12,
      icon: FaUserMd,
      color: "primary",
    },
  ];

  // Konfigurasi line chart
  const lineChartConfig = {
    title: "Tren Operasi Bulanan",
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
      colors: ["#9C27B0", "#2196F3", "#4CAF50"],
    },
    series: [
      {
        name: "Operasi Kardiovaskular",
        data: [12, 15, 13, 18, 16, 20, 22, 19, 21],
      },
      {
        name: "Operasi Digestif",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "Operasi Ortopedi",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59],
      },
    ],
  };

  // Konfigurasi tabel operasi
  const tableConfig = {
    title: "Jadwal Operasi",
    columns: [
      { key: "id", label: "ID" },
      { key: "pasien", label: "Pasien" },
      { key: "usia", label: "Usia" },
      { key: "jenisTindakan", label: "Tindakan" },
      { key: "ruangOperasi", label: "Ruang" },
      {
        key: "status",
        label: "Status",
        render: (item) => getStatusBadge(item.status),
      },
      {
        key: "prioritas",
        label: "Prioritas",
        render: (item) => getPrioritasBadge(item.prioritas),
      },
      { key: "jadwalMulai", label: "Jadwal" },
      { key: "estimasiDurasi", label: "Durasi" },
      { key: "dokterBedah", label: "Dokter Bedah" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaUsers,
    buttonRefresh: true,
    basePath: "/operasi/jadwal-operasi/detail-operasi",
    slugConfig: {
      textField: "pasien",
      idField: "id",
    },
  };

  // Fungsi simulasi untuk refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredOperasi([...operasiData]);
    }, 1000);
  };

  const handleOperasiClick = () => {
    console.log("operasi clicked");
  };

  // Komponen custom untuk status operasi, diasumsikan sudah ada

  return (
    <BaseDashboard
      // Header konfigurasi
      headerConfig={headerConfig}
      // Statistik cards
      statCards={statCards}
      // Left chart - line chart operasi
      leftChart={lineChartConfig}
      // Right chart - pie chart sebaran jenis operasi
      rightChart={{
        title: "Sebaran Jenis Operasi",
        type: "pie",
        data: [
          { category: "Operasi Digestif", value: 156 },
          { category: "Operasi Ortopedi", value: 132 },
          { category: "Operasi Obstetri & Ginekologi", value: 124 },
          { category: "Operasi Kardiovaskular", value: 89 },
          { category: "Operasi Urologi", value: 75 },
          { category: "Lainnya", value: 98 },
        ],
        height: 350,
        id: "operasi-chart-01",
      }}
      // Tabel konfigurasi
      tableConfig={tableConfig}
      // Data dan state
      data={operasiData}
      filteredData={filteredOperasi}
      setFilteredData={setFilteredOperasi}
      loading={loading}
      // Pagination dummy (tidak digunakan dalam contoh ini)
      pagination={{
        currentPage: 1,
        totalPages: 1,
        itemPerPage: 10,
        onPageChange: () => {},
      }}
      // Fungsi refresh
      onRefresh={handleRefresh}
      // Custom content - ditambahkan setelah charts dan sebelum tabel
      customContent={
        <StatusOperasiBaseComponent
          data={operasiData}
          title="Status Operasi"
          headerBadgeText="Operasi Sedang Berlangsung"
          headerBadgeColor="danger"
          onItemClick={handleOperasiClick}
          customLabels={{
            usia: "Usia",
            jenisTindakan: "Jenis Tindakan",
            ruangOperasi: "Ruang Operasi",
            dokterBedah: "Dokter Bedah",
          }}
        />
      }
    />
  );
};

export default DashboardOperasi;
