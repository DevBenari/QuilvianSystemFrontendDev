import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienAmbulance from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-ambulance/pendaftaran-ambulance";

const PendaftaranAmbulance = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienAmbulance />
    </div>
  );
});

PendaftaranAmbulance.displayName = "PendaftaranAmbulance";

export default PendaftaranAmbulance;
