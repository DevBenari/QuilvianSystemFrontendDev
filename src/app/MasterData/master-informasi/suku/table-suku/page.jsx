import TableDataSuku from "@/components/view/MasterData/master-informasi/master-suku-view/table-suku-view";
import React, { memo } from "react";

const PageListSuku = memo(() => {
  return (
    <div>
      <TableDataSuku />
    </div>
  );
});

PageListSuku.displayName = PageListSuku;

export default PageListSuku;
