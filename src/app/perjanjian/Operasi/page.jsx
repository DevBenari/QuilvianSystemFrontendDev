import React from "react";
import styles from "../../page.module.css";
import DashboardPerjanjianOperasi from "@/components/view/perjanjian/perjanjian-operasi-views";
const PerjanjianOperasi = () => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjianOperasi />
    </div>
  )
};

PerjanjianOperasi.displayName = "PerjanjianOperasi";
export default PerjanjianOperasi;
