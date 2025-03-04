import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardAdmisiOptik from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-optik/dashboard-pendaftaran-optik";
const PagesAdmisiOptik = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardAdmisiOptik />
    </div>
  );
});

PagesAdmisiOptik.displayName = "PagesAdmisiOptik";

export default PagesAdmisiOptik;
