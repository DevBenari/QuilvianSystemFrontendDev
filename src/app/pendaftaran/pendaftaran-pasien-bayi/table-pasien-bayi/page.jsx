import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardPendaftaranBayi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-bayi/tables-pasien-bayi";

export const TablePasienBayi = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardPendaftaranBayi />
    </div>
  );
});

TablePasienBayi.displayName = "TablePasienBayi";

export default TablePasienBayi;
