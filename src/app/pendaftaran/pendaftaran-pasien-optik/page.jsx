import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienLuarOptik from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-optik/pasien-optik";
PendaftaranPasienLuarOptik;
const PendaftaranOptik = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienLuarOptik />
    </div>
  );
});

PendaftaranOptik.displayName = "PendaftaranOptik";

export default PendaftaranOptik;
