"use client";
import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranBayi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-bayi";

export const PendaftaranPasienBayi = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranBayi />
    </div>
  );
});

PendaftaranPasienBayi.displayName = "PendaftaranPasienBayi";

export default PendaftaranPasienBayi;
