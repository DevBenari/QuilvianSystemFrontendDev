import TableDataFasilitas from "@/components/view/MasterData/master-fasilitas-view/table-fasilitas";
import React, { memo } from "react";

const PageListFasilitas = memo(() => {
  return (
    <div>
      <TableDataFasilitas />
    </div>
  );
});

PageListFasilitas.displayName = "PageListFasilitas";

export default PageListFasilitas;
