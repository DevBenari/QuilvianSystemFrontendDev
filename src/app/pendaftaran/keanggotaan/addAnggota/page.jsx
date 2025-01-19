import React, { memo } from "react";
import styles from "@/app/page.module.css";
import PendaftaranPasienAnggota from "@/components/view/pendaftaran-pasien/keanggotaan/addAnggota/add-anggota";

const PendaftaranAnggota = memo(() => {
  return (
    <div className={styles.page}>
      <PendaftaranPasienAnggota />
    </div>
  );
});

PendaftaranAnggota.displayName = "PendaftaranAnggota";

export default PendaftaranAnggota;
