import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienLuarOptik from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-optik/pasien-optik";
const PagesFormAdmisiOptik = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienLuarOptik />
    </div>
  );
});

PagesFormAdmisiOptik.displayName = "PagesFormAdmisiOptik";

export default PagesFormAdmisiOptik;
