
import TopNav from "@/components/features/navbars/top-nav"
import DashboardPendaftaran from "@/components/view/pendaftaran-pasien/dashboard-pendaftaran"
import React, { Fragment } from "react"
import styles from "../page.module.css"



const PendaftaranPasien = () => {
    return (
        <div className={styles.page} >
            <DashboardPendaftaran />
        </div>
    )
}

export default PendaftaranPasien