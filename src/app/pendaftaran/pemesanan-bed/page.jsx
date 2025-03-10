import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PemesananBed from "@/components/view/pemesanan-bed-view/pemesananBed";

const DataPemesananPage = memo(() => {
  return (
    <div className={styles.page}>
      <PemesananBed />
    </div>
  );
});

DataPemesananPage.displayName = "DataPemesananPage";

export default DataPemesananPage;
