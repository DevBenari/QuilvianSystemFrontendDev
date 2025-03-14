import TableDataPasien from "@/components/view/pendaftaran-pasien/pendaftaran-pasien-baru/table-pasien-baru-view";
import React, { memo } from "react";

const PageTableDataPasienOperasi = memo(() => {
  return (
    <div>
      <TableDataPasien />
    </div>
  );
});

PageTableDataPasienOperasi.displayName = "PageTableDataPasienOperasi";

export default PageTableDataPasienOperasi;
