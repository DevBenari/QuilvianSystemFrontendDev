import React from "react"
import styles from "@/app/page.module.css";
import DashboardPerjanjianOdc from "@/components/view/perjanjian/perjanjian-odc";
const PagePerjanjianODC = () => {
    return (
        <div className={styles.page}>
           <DashboardPerjanjianOdc />
        </div>
    )
}

export default PagePerjanjianODC