import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashBoardAdmisiRadiologi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-radiologi/dashboard-pasien-radiologi";

const PendaftaranRadiologi = memo(() => {
  return (
    <div className={styles.page}>
      <DashBoardAdmisiRadiologi />
    </div>
  );
});

PendaftaranRadiologi.displayName = "PendaftaranRadiologi";

export default PendaftaranRadiologi;
