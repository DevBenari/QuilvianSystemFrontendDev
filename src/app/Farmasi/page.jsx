import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardFarmasi from "@/components/view/Farmasi/dashboard-farmasi";

const PageDashboardFarmasi = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardFarmasi />
    </div>
  );
});

PageDashboardFarmasi.displayName = "PageDashboardFarmasi";

export default PageDashboardFarmasi;
