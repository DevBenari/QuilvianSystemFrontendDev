import React from 'react'
import styles from '../page.module.css'
import DashboardMasterData from '@/components/view/MasterData/dashboard-MasterData'

const PageMasterData = () => {
    return (
        <div className={styles.page}>
            <DashboardMasterData />     
        </div>
    )
}

export default PageMasterData