import TableDataDokterAsuransi from "@/components/view/MasterData/master-dokter-view/dokter-asuransi/table-dokter-asuransi";
import React, { memo } from "react";

const PageListDokterAsuransi = memo(() => {
  return (
    <div>
      <TableDataDokterAsuransi />
    </div>
  );
});

PageListDokterAsuransi.displayName = "PageListDokterAsuransi";

export default PageListDokterAsuransi;
