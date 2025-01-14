"use client";
import React from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranFasilitas from "@/components/view/pendaftaran-pasien/pendaftaran-luar-fasilitas/tables-fasilitas/dashboard-fasilitas";

export const PendaftaranLuarFasilitas = () => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranFasilitas />
    </div>
  );
};

export default PendaftaranLuarFasilitas;
