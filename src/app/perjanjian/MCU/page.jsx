import React from "react";
import DashboardPerjanjianMcu from "@/components/view/perjanjian/perjanjian-mcu-views";
import styles from "../../page.module.css";


const PerjanjianMCU = () => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjianMcu />
    </div>
  )  
};

PerjanjianMCU.displayName = "PerjanjianMCU";
export default PerjanjianMCU;
