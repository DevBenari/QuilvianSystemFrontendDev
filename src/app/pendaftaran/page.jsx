import React, { Fragment, memo } from "react";
import DashboardPendaftaranAdmisi from "@/components/view/pendaftaran-pasien/dashboard-pendaftaran/dashboardAdmis";
import styles from "../page.module.css";

const PendaftaranPasien = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranAdmisi />
    </div>
  );
});

PendaftaranPasien.displayName = "PendaftaranPasien";

export default PendaftaranPasien;
