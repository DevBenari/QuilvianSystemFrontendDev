import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardBayi from "@/components/view/PasienBayi/dashboard-bayi";

const PageDashboardBayi = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardBayi />
    </div>
  );
});

PageDashboardBayi.displayName = "PageDashboardBayi";

export default PageDashboardBayi;
