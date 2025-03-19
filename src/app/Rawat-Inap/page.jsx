import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardRawatInap from "@/components/view/Rawat-Inap/dashboard-rawat-inap";

const PageDashboardRawatInap = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardRawatInap />
    </div>
  );
});

PageDashboardRawatInap.displayName = "PageDashboardRawatInap";

export default PageDashboardRawatInap;
