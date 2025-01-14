"use client";
import React from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranLab from "@/components/view/pendaftaran-pasien/pendaftaran-lab/dashboard-lab";


export const PendaftaranLuarLaboratorium = () => {
  
  return (
    <div className={styles.page}>
      <DashboardPendaftaranLab />
    </div>
  );
};

export default PendaftaranLuarLaboratorium;
