import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardMCU from "@/components/view/MCU/dashboard-mcu";

const PageDashboardMCU = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardMCU />
    </div>
  );
});

PageDashboardMCU.displayName = "PageDashboardMCU";

export default PageDashboardMCU;
