import React, { memo } from "react";
import styles from "@/app/page.module.css";
import FormAdmisiFasilitas from "@/components/view/pendaftaran-pasien/pendaftaran-luar-fasilitas/add-pasien-luar-fasilitas";

const PendaftaranLuarFasilitas = memo(() => {
  return (
    <div className={styles.page}>
      <FormAdmisiFasilitas />
    </div>
  );
});

PendaftaranLuarFasilitas.displayName = "PendaftaranLuarFasilitas";

export default FormAdmisiFasilitas;
