import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardRehabilitasi from "@/components/view/Rehabilitasi/dashboard-rehabilitasi";

const PageDashboardRehabilitasi = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardRehabilitasi />
    </div>
  );
});

PageDashboardRehabilitasi.displayName = "PageDashboardRehabilitasi";

export default PageDashboardRehabilitasi;
