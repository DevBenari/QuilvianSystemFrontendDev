
import React from "react";
import styles from "../../page.module.css"
import DashboardPerjanjianRawatInap from "@/components/view/perjanjian/perjanjian-rawat-inap-views";


const PerjanjianRawatInap = () => {
  return (
    <div className={styles.page}>
      <DashboardPerjanjianRawatInap />
    </div>
  )
}
 
PerjanjianRawatInap.displayName = "PerjanjianRawatInap";
export default PerjanjianRawatInap;
