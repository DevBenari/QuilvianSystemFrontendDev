import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienIgd from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-igd/pasien-igd";

const PasienIgd = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienIgd />
    </div>
  );
});

PasienIgd.displayName = "PasienIgd";

export default PasienIgd;
