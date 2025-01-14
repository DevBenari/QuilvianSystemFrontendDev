"use client";
import React from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranBayi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-bayi";

export const PendaftaranPasienBayi = () => {
  // const headers = [
  //   "NO RM",
  //   "KELAS",
  //   "Ruang",
  //   "NAMA PASIEN MELAHIRKAN",
  //   "DOKTER",
  // ];

  return (
    <div className={styles.page}>
      <DashboardPendaftaranBayi />
    </div>
  );
});

PendaftaranPasienBayi.displayName = "PendaftaranPasienBayi";

export default PendaftaranPasienBayi;
