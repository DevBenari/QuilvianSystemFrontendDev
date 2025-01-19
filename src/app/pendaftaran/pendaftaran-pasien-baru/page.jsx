import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienBaru from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-baru/pendaftaran-pasien-baru";

const FormPendaftaranPasienBaru = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienBaru />
    </div>
  );
});

FormPendaftaranPasienBaru.displayName = "FormPendaftaranPasienBaru";

export default FormPendaftaranPasienBaru;
