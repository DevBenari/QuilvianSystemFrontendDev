import React from "react";
import styles from '../../page.module.css'
import DashboardPerjanjianRadiologi from "@/components/view/perjanjian/perjanjian-radiologi-views";
const PerjanjianRadiologi = () => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjianRadiologi />
    </div>
  )
};

PerjanjianRadiologi.displayName = "PerjanjianRadiologi";
export default PerjanjianRadiologi;
