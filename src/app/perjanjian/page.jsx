import React from "react";
import styles from "../page.module.css";
import DashboardPerjanjian from "@/components/view/perjanjian-pasien/dashboard-pendaftaran";
import TopNav from "@/components/features/navbars/top-nav";

const perjanjian = () => {
  return (
    <div className={styles.page}>
      <TopNav module={"pendaftaran"} />
      <DashboardPerjanjian />
    </div>
  );
};

export default perjanjian;
