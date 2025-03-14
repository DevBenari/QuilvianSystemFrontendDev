import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienRadiologi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-radiologi/pendaftaran-pasien-radiologi";

const PendaftaranRadiologi = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienRadiologi />
    </div>
  );
});

PendaftaranRadiologi.displayName = "PendaftaranRadiologi";

export default PendaftaranRadiologi;
