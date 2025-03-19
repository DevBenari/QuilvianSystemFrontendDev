import React, { memo } from "react";
import styles from "../page.module.css";
import DashboardLaboratory from "@/components/view/laboratorium/dashboard-laboratorium";

const PageDashboardLaboratory = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardLaboratory />
    </div>
  );
});

PageDashboardLaboratory.displayName = "PageDashboardLaboratory";

export default PageDashboardLaboratory;
