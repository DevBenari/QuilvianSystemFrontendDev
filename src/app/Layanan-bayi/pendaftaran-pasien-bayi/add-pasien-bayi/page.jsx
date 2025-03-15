import React, { memo } from "react";
import styles from "@/app/page.module.css";
import AddPasienBayi from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-bayi/regis-pasien-bayi";

export const AddPasienBayiPage = memo(() => {
  return (
    <div className={styles.page}>
      <AddPasienBayi />
    </div>
  );
});

AddPasienBayiPage.displayName = "AddPasienBayiPage";

export default AddPasienBayiPage;
