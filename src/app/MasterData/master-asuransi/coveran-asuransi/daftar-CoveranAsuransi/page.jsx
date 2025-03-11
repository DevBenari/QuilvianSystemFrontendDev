import TableDataCoveranAsuransi from "@/components/view/MasterData/master-asuransi-view/asuransi-coveran/table-coveran-asuransi.";
import React, { memo } from "react";

const PageListDaftarCoveranAsuransi = memo(() => {
  return (
    <div>
      <TableDataCoveranAsuransi />
    </div>
  );
});

PageListDaftarCoveranAsuransi.displayName = "PageListDaftarCoveranAsuransi";

export default PageListDaftarCoveranAsuransi;
