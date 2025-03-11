import React, { memo } from "react";
import styles from "@/app/page.module.css";
import TablePasienIGD from "@/components/view/IGD/table-pasien-igd/table-pasien-igd";

const PageTablePasienIGD = memo(() => {
  return (
    <div className={styles.page}>
      <TablePasienIGD />
    </div>
  );
});

PageTablePasienIGD.displayName = "PageTablePasienIGD";

export default PageTablePasienIGD;
