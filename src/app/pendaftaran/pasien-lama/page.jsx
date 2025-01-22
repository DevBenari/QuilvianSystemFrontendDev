import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PasienLama from "@/components/view/pendaftaran-pasien/pasien-lama/pasien-lama";

const DataPasienLama = memo(() => {
  return (
    <div className={styles.page}>
      <PasienLama />
    </div>
  );
});

DataPasienLama.displayName = "DataPasienLama";

export default DataPasienLama;
