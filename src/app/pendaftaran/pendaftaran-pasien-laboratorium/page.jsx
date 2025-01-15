import PendaftaranPasienLab from "@/components/view/pendaftaran-pasien/pendaftaran-lab/pendaftaran-pasien-lab";
import React, { memo } from "react";
import styles from "@/app/page.module.css";

const PendaftaranPasienLaboratorium = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienLab />
    </div>
  );
});

PendaftaranPasienLaboratorium.displayName = "PendaftaranPasienLaboratorium";

export default PendaftaranPasienLaboratorium;
