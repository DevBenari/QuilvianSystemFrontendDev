import React from "react";
import styles from "../page.module.css";
import DashboardIGD from "@/components/view/IGD/Dashboard-IGD/dashboard-igd";

const PageIGD = () => {
  return (
    <div className={styles.page}>
      <DashboardIGD />
    </div>
  );
};

export default PageIGD;
