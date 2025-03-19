import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardRawatJalan from "@/components/view/Rawat-Jalan/dashboard-rawat-jalan";

const PageDashboardRawatJalan = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardRawatJalan />
    </div>
  );
});

PageDashboardRawatJalan.displayName = "PageDashboardRawatJalan";

export default PageDashboardRawatJalan;
