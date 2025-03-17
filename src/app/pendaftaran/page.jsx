import React, { Fragment } from "react";
import styles from "../page.module.css";
import DashboardPendaftaranAdmisi from "@/components/view/pendaftaran-pasien/dashboard-pendaftaran/dashboardAdmis";

const PendaftaranPasien = () => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranAdmisi />
    </div>
  );
};

export default PendaftaranPasien;
