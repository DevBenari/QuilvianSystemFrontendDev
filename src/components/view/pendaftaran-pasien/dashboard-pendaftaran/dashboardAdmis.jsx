"use client";

import React from "react";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaDoorOpen,
  FaPills,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPasienSlice,
  fetchPasienWithFilters,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import BaseDashboard from "@/components/features/baseDashboard/base-dashboard";

/**
 * Contoh Cara Menggunakan BaseDashboard dengan Header Kustom
 *
 * 1. Import BaseDashboard dan komponen lain yang diperlukan
 * 2. Buat state untuk mengelola data, filter, dsb
 * 3. Setup objek konfigurasi (header, stat cards, charts, table)
 * 4. Render BaseDashboard dengan konfigurasi tersebut
 */

const DashboardPendaftaranAdmisi = () => {
  const dispatch = useDispatch();

  // Dapatkan data dari Redux state
  const {
    data: dataPasien,
    totalItems,
    totalPages,
    loading,
    currentPage: reduxPage,
  } = useSelector((state) => state.pasien);

  // State lokal
  const [filteredPasien, setFilteredPasien] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const perPage = 5;

  // Fetch data saat komponen dimuat atau halaman berubah
  React.useEffect(() => {
    dispatch(fetchPasienSlice({ page, perPage }));
  }, [dispatch, page]);

  // Update filteredPasien ketika data API berubah
  React.useEffect(() => {
    if (dataPasien) {
      setFilteredPasien(dataPasien);
    }
  }, [dataPasien]);

  // Hitung statistik dashboard
  const calculateStats = () => {
    const totalRegistrations = totalItems || dataPasien?.length || 0;

    // Hitung pasien berdasarkan status
    const completedPatients =
      dataPasien?.filter(
        (patient) =>
          patient.status === "Menikah" || patient.status === "Menikah "
      ).length || 0;

    const inExaminationPatients =
      dataPasien?.filter(
        (patient) => patient.namaLengkap && patient.riwayatPenyakit
      ).length || 0;

    const waitingPatients =
      totalRegistrations - completedPatients - inExaminationPatients;

    return [
      {
        title: "Total Pendaftaran",
        value: totalRegistrations,
        icon: FaUsers,
        color: "primary",
      },
      {
        title: "Pasien Selesai",
        value: completedPatients,
        icon: FaUserMd,
        color: "success",
      },
      {
        title: "Dalam Pemeriksaan",
        value: inExaminationPatients,
        icon: FaCalendarCheck,
        color: "warning",
      },
      {
        title: "Pasien Menunggu",
        value: waitingPatients > 0 ? waitingPatients : 0,
        icon: FaDoorOpen,
        color: "danger",
      },
    ];
  };

  // Siapkan data lokasi untuk chart pie
  const prepareLocationData = () => {
    if (!dataPasien || dataPasien.length === 0) {
      return [];
    }

    const locationData = {};

    // Kumpulkan data lokasi pasien
    dataPasien.forEach((patient) => {
      if (patient.tempatLahir) {
        locationData[patient.tempatLahir] =
          (locationData[patient.tempatLahir] || 0) + 1;
      }
    });

    // Konversi ke format chart
    return Object.keys(locationData).map((location) => ({
      category: location,
      value: locationData[location],
    }));
  };

  // Konfigurasi header dashboard
  const headerConfig = {
    hospitalName: "RS METROPOLITAN MEDICAL CENTRE",
    badgeText: "ADMISI",
    divisionText: "Pendaftaran & Administrasi Pasien",
    icon: FaUserMd,
    bgColor: "#005A9C", // Biru tua elegan
    bgGradient: "linear-gradient(135deg, #005A9C 0%, #0084C9 100%)", // Gradasi biru profesional
    badgeColor: "#E3F2FD", // Biru pastel yang lembut
    badgeTextColor: "#0D47A1", // Biru gelap untuk kontras yang baik
  };

  // Konfigurasi grafik batang
  const barChartConfig = {
    title: "Grafik Kunjungan Admisi",
    type: "bar",
    height: 350,
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          columnWidth: "55%",
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: { opacity: 1 },
      colors: ["#7e57c2", "#9575cd", "#b39ddb"],
    },
    series: [
      {
        name: "Pasien Baru",
        data: [120, 150, 140, 170, 180, 200],
      },
      {
        name: "Pasien Lama",
        data: [80, 95, 85, 120, 100, 90],
      },
    ],
  };

  // Konfigurasi tabel
  const tableConfig = {
    title: "Data Pendaftaran",
    columns: [
      { key: "namaLengkap", label: "Nama Pasien" },
      { key: "noRekamMedis", label: "No Rekam Medis" },
      { key: "jenisKelamin", label: "Jenis Kelamin" },
      { key: "status", label: "Status" },
      { key: "riwayatPenyakit", label: "Riwayat Penyakit" },
    ],
    fetchFunction: fetchPasienWithFilters,
    setFilteredData: setFilteredPasien,
    icon: FaUsers,
    showHeader: false,
    buttonRefresh: true,
    basePath: "/pendaftaran/data-pasien/detail-pasien",
    slugConfig: {
      textField: "namaLengkap",
      idField: "pendaftaranPasienBaruId",
    },
    searchName: true,
  };

  // Fungsi refresh
  const handleRefresh = () => {
    dispatch(fetchPasienSlice({ page, perPage }));
  };

  return (
    <BaseDashboard
      // 1. Konfigurasi Header
      headerConfig={headerConfig}
      // 2. Statistik Cards di bagian atas
      statCards={calculateStats()}
      // 3. Chart Kiri (Bar Chart)
      leftChart={barChartConfig}
      // 4. Chart Kanan (Pie Chart)
      rightChart={{
        title: "Distribusi Pasien berdasarkan Daerah",
        type: "pie",
        data: prepareLocationData(),
        height: 350,
        id: "patient-location-chart",
      }}
      // 5. Konfigurasi Tabel
      tableConfig={tableConfig}
      // 6. Data dan State
      data={dataPasien}
      filteredData={filteredPasien}
      setFilteredData={setFilteredPasien}
      loading={loading}
      pagination={{
        currentPage: page,
        totalPages: totalPages,
        itemPerPage: perPage,
        onPageChange: setPage,
      }}
      // 7. Fungsi Refresh
      onRefresh={handleRefresh}
    />
  );
};

export default DashboardPendaftaranAdmisi;
