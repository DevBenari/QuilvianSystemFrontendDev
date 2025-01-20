import React, { memo } from "react";
import DashboardPerjanjianRawatJalan from "@/components/view/perjanjian/perjanjian-rawat-jalan/Index";
import styles from '../../page.module.css'
const PerjanjianRawatJalan = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjianRawatJalan />
    </div>
  )
});

PerjanjianRawatJalan.displayName = "PerjanjianRawatJalan";
export default PerjanjianRawatJalan;
