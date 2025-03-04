import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranRehabilitasiMedik from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-rehabilitasi/rehabiltasi-medik";

const RehabilitasiMedik = memo(() => {
  return (
    <div >
      <PendaftaranRehabilitasiMedik />
    </div>
  );
});

RehabilitasiMedik.displayName = "RehabilitasiMedik";

export default RehabilitasiMedik;
