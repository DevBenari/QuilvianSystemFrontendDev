import SukuAddForm from "@/components/view/MasterData/master-informasi/master-suku-view/add-suku-view";
import React, { memo } from "react";

const PageListSuku = memo(() => {
  return (
    <div>
      <SukuAddForm />
    </div>
  );
});

PageListSuku.displayName = PageListSuku;

export default PageListSuku;
