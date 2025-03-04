import React, { memo } from "react";
import styles from "@/app/page.module.css";
import DashboardAdmisiFasilitas from "@/components/view/pendaftaran-pasien/pendaftaran-luar-fasilitas/dashboardPasienFasilitas";

const PagesAdmisiPendaftaranFasilitas = memo(() => {
  return (
    <div className={styles.page}>
      <DashboardAdmisiFasilitas />
    </div>
  );
});

PagesAdmisiPendaftaranFasilitas.displayName = "PagesAdmisiPendaftaranFasilitas";

export default PagesAdmisiPendaftaranFasilitas;
