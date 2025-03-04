import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardAdmisiAmbulance from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-ambulance/dashboard-pendaftaran-ambulance";

const PendaftaranAmbulance = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardAdmisiAmbulance />
    </div>
  );
});

PendaftaranAmbulance.displayName = "PendaftaranAmbulance";

export default PendaftaranAmbulance;
