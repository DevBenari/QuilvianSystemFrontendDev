import PendaftaranPasienLuarMedicalCheckUp from "@/components/view/pendaftaran-pasien/medical-chekup/pendaftaran-medical-chekup";

import React, { memo } from "react";
import styles from "@/app/page.module.css";

const PendaftaranMedicalCheckUp = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienLuarMedicalCheckUp />
    </div>
  );
});

PendaftaranMedicalCheckUp.displayName = "PendaftaranMedicalCheckUp";

export default PendaftaranMedicalCheckUp;
