"use client";
import React from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranRadiologi from "@/components/view/pendaftaran-pasien/pendaftaran-radiologi";


const PagePendaftaranRadiologi = () => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranRadiologi />
    </div>
  )
}

export default PagePendaftaranRadiologi