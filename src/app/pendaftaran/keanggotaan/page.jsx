import React, { memo } from "react";
import styles from "@/app/page.module.css";
import TableAnggota from "@/components/view/pendaftaran-pasien/keanggotaan/table-anggota";

const DataAnggotaPage = memo(() => {
  return (
    <div className={styles.page}>
      <TableAnggota />
    </div>
  );
});

DataAnggotaPage.displayName = "DataAnggotaPage";

export default DataAnggotaPage;
