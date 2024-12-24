
import TopNav from "@/components/features/navbars/top-nav"
import DashboardPendaftaran from "@/components/view/pendaftaran-pasien/dashboard-pendaftaran"
import React, { Fragment } from "react"



const PendaftaranPasien = () => {
    return (
        <Fragment>
            <TopNav />
            <DashboardPendaftaran />
        </Fragment>
    )
}

export default PendaftaranPasien