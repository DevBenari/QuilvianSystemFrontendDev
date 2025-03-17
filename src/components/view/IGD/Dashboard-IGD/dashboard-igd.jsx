"use client";

import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaUsers,
  FaHospital,
  FaAmbulance,
  FaBed,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Badge, Row, Col } from "react-bootstrap";

import { useForm } from "react-hook-form";
import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";
import BaseStatusComponent from "@/components/features/baseDashboard/status-poli";
import StatusBaseComponent from "@/components/features/baseDashboard/status-poli";
import StatusIGDBaseComponent from "@/components/features/baseDashboard/statusIGD";

// Data dummy untuk daftar pasien IGD
const pasienIGDData = [
  {
    id: "P-2023-001",
    nama: "Ahmad Rizal",
    usia: 45,
    keluhan: "Nyeri dada",
    status: "Menunggu",
    keparahan: "Sedang",
    waktuMasuk: "15:30",
  },
  {
    id: "P-2023-002",
    nama: "Siti Aminah",
    usia: 32,
    keluhan: "Sesak napas",
    status: "Dalam Perawatan",
    keparahan: "Kritis",
    waktuMasuk: "15:15",
  },
  {
    id: "P-2023-003",
    nama: "Budi Santoso",
    usia: 28,
    keluhan: "Demam tinggi",
    status: "Menunggu",
    keparahan: "Ringan",
    waktuMasuk: "15:45",
  },
  {
    id: "P-2023-004",
    nama: "Dewi Putri",
    usia: 56,
    keluhan: "Cedera kepala",
    status: "Dalam Perawatan",
    keparahan: "Sedang",
    waktuMasuk: "15:10",
  },
  {
    id: "P-2023-005",
    nama: "Rudi Hermawan",
    usia: 22,
    keluhan: "Luka sayat",
    status: "Menunggu",
    keparahan: "Ringan",
    waktuMasuk: "15:50",
  },
];

// Data untuk ruangan IGD
const ruanganIGDData = [
  {
    id: "R001",
    nama: "Ruang IGD 1",
    status: "Terpakai",
    pasien: "Siti Aminah",
  },
  { id: "R002", nama: "Ruang IGD 2", status: "Terpakai", pasien: "Dewi Putri" },
  {
    id: "R003",
    nama: "Ruang IGD 3",
    status: "Terpakai",
    pasien: "Eko Prasetyo",
  },
  { id: "R004", nama: "Ruang Resusitasi", status: "Kosong", pasien: "-" },
  {
    id: "R005",
    nama: "Ruang Observasi 1",
    status: "Terpakai",
    pasien: "Rina Wati",
  },
  { id: "R006", nama: "Ruang Observasi 2", status: "Kosong", pasien: "-" },
  {
    id: "R007",
    nama: "Ruang Observasi 3",
    status: "Terpakai",
    pasien: "Joko Widodo",
  },
  { id: "R008", nama: "Ruang Khusus", status: "Terpakai", pasien: "Maya Sari" },
];

const DashboardIGD = () => {
  const [filteredPasien, setFilteredPasien] = useState(pasienIGDData);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mendapatkan warna badge berdasarkan keparahan
  const getKeparahanBadge = (keparahan) => {
    switch (keparahan) {
      case "Kritis":
        return <Badge bg="danger">{keparahan}</Badge>;
      case "Sedang":
        return (
          <Badge bg="warning" text="dark">
            {keparahan}
          </Badge>
        );
      case "Ringan":
        return <Badge bg="success">{keparahan}</Badge>;
      default:
        return <Badge bg="secondary">{keparahan}</Badge>;
    }
  };

  // Konfigurasi header untuk IGD
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "EMERGENCY",
    divisionText: "Instalasi Gawat Darurat",
    icon: FaAmbulance,
    bgColor: "#1a237e",
    bgGradient: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    badgeColor: "#ff3d00",
    badgeTextColor: "white",
  };

  // Konfigurasi statistik
  const statCards = [
    { title: "Pasien Menunggu", value: 12, icon: FaUsers, color: "primary" },
    { title: "Dalam Perawatan", value: 8, icon: FaHospital, color: "success" },
    { title: "Tempat Tidur Tersedia", value: 5, icon: FaBed, color: "info" },
    {
      title: "Pasien Kritis",
      value: 3,
      icon: FaExclamationTriangle,
      color: "danger",
    },
    {
      title: "Waktu Tunggu (menit)",
      value: 25,
      icon: FaClock,
      color: "warning",
    },
    { title: "Staf Bertugas", value: 15, icon: FaUserMd, color: "primary" },
  ];

  // Konfigurasi line chart
  const lineChartConfig = {
    title: "Tren Kunjungan IGD",
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
      colors: ["#dc3545", "#007bff", "#28a745"],
    },
    series: [
      {
        name: "Pasien Kritis",
        data: [30, 40, 35, 50, 49, 60, 70, 65, 80],
      },
      {
        name: "Pasien Sedang",
        data: [120, 130, 125, 140, 145, 150, 155, 160, 170],
      },
      {
        name: "Pasien Ringan",
        data: [180, 185, 190, 175, 185, 195, 160, 200, 210],
      },
    ],
  };

  // Konfigurasi tabel pasien
  const tableConfig = {
    title: "Data Pasien",
    columns: [
      { key: "id", label: "ID" },
      { key: "nama", label: "Nama" },
      { key: "usia", label: "Usia" },
      { key: "keluhan", label: "Keluhan" },
      { key: "status", label: "Status" },
      {
        key: "keparahan",
        label: "Keparahan",
        render: (item) => getKeparahanBadge(item.keparahan),
      },
      { key: "waktuMasuk", label: "Waktu Masuk" },
    ],
    showHeader: false,
    searchName: true,
    icon: FaUsers,
    buttonRefresh: true,
    basePath: "/igd/data-pasien/detail-pasien",
    slugConfig: {
      textField: "nama",
      idField: "id",
    },
  };

  // Komponen custom untuk status ruangan

  // Fungsi simulasi untuk refresh data
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilteredPasien([...pasienIGDData]);
    }, 1000);
  };

  const handlePasienClick = () => {
    console.log("pasien clicked");
  };

  return (
    <BaseDashboard
      // Header konfigurasi
      headerConfig={headerConfig}
      // Statistik cards
      statCards={statCards}
      // Left chart - line chart kunjungan
      leftChart={lineChartConfig}
      // Right chart - pie chart sebaran kasus
      rightChart={{
        title: "Sebaran Kasus IGD",
        type: "pie",
        data: [
          { category: "Trauma/Kecelakaan", value: 320 },
          { category: "Penyakit Jantung", value: 280 },
          { category: "Infeksi", value: 250 },
          { category: "Pernapasan", value: 260 },
          { category: "Lainnya", value: 150 },
        ],
        height: 350,
        id: "igd-chart-01",
      }}
      // Tabel konfigurasi
      tableConfig={tableConfig}
      // Data dan state
      data={pasienIGDData}
      filteredData={filteredPasien}
      setFilteredData={setFilteredPasien}
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
        <StatusIGDBaseComponent
          data={pasienIGDData}
          title="Status Pasien IGD"
          headerBadgeText="Pasien Dalam Penanganan"
          headerBadgeColor="danger"
          onItemClick={handlePasienClick}
          customLabels={{
            usia: "Usia",
            keluhan: "Keluhan Utama",
            waktuMasuk: "Terdaftar Pukul",
          }}
        />
      }
    />
  );
};

export default DashboardIGD;
