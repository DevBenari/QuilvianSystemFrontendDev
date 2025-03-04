import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardAdmisiMCU from "@/components/view/pendaftaran-pasien/medical-chekup/dashboard-mcu";

const PagesFormAdmisiMCU = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardAdmisiMCU />
    </div>
  );
});

PagesFormAdmisiMCU.displayName = "PagesFormAdmisiMCU";

export default PagesFormAdmisiMCU;
