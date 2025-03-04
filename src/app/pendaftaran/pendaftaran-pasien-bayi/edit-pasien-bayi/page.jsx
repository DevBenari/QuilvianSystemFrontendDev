import React, { memo } from "react";
import styles from "@/app/page.module.css";
import RegisPasienBayi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-bayi/edit-pasien-bayi/regis-pasien-bayi";

const RegistrasiPasienBayi = memo(() => {
  return (
    <div className={styles.page}>
      <RegisPasienBayi />
    </div>
  );
});

RegistrasiPasienBayi.displayName = "RegistrasiPasienBayi";

export default RegistrasiPasienBayi;
