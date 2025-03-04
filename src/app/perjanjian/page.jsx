import React from "react";
import styles from "../page.module.css";
import DashboardPerjanjian from "@/components/view/perjanjian-pasien/dashboard-pendaftaran";

const perjanjian = () => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjian />
    </div>
  );
};

export default perjanjian;
