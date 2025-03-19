import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardOptik from "@/components/view/Optik/dashboard-optik";

const PageDashboardOptik = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardOptik />
    </div>
  );
});

PageDashboardOptik.displayName = "PageDashboardOptik";

export default PageDashboardOptik;
