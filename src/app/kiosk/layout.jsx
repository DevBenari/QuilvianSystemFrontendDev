import React from "react";
import styles from "@/app/page.module.css";

const ModulKiosk = ({ children }) => {
  return (
    <div className={styles.page}>
      {children}
    </div>
  )  
}

export default ModulKiosk;