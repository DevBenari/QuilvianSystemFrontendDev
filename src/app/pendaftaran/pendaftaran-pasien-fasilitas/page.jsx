import PendaftaranPasienLuarFasilitas from "@/components/view/pendaftaran-pasien/pendaftaran-luar-fasilitas/page";
import React, { memo } from "react";
import styles from "@/app/page.module.css";

const PendaftaranLuarFasilitas = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienLuarFasilitas />
    </div>
  );
});

PendaftaranLuarFasilitas.displayName = "PendaftaranLuarFasilitas";

export default PendaftaranLuarFasilitas;
