import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardRadiology from "@/components/view/Radialogi/dashboard-radiologi";

const PageDashboardRadiology = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardRadiology />
    </div>
  );
});

PageDashboardRadiology.displayName = "PageDashboardRadiology";

export default PageDashboardRadiology;
