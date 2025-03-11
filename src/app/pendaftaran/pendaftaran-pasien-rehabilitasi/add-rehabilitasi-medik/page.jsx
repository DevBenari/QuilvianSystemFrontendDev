import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashBoardAdmisiRehabilitasiMedik from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-rehabilitasi/tableRehaniltasiMedik";

const PageRehabilitasiMedik = memo(() => {
  return (
    <div>
      <DashBoardAdmisiRehabilitasiMedik />
    </div>
  );
});

PageRehabilitasiMedik.displayName = "PageRehabilitasiMedik";

export default PageRehabilitasiMedik;
