import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardIGD from "@/components/view/IGD/Dashboard-IGD/dashboard-igd";
const PageDashboardIGD = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardIGD />
    </div>
  );
});

PageDashboardIGD.displayName = "PageDashboardIGD";

export default PageDashboardIGD;
