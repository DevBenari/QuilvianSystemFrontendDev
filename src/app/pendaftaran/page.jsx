import FormValidations from "@/components/features/formValidations/formValidations"
import DashboardPendaftaran from "@/components/view/pendaftaran-pasien/dashboard-pendaftaran"
import React, { Fragment } from "react"
import { FormProvider } from "react-hook-form"


const PendaftaranPasien = () => {
    return (
        <Fragment>
            <DashboardPendaftaran />
        </Fragment>
    )
}

export default PendaftaranPasien