import FormAddFasilitas from "@/components/view/MasterData/master-fasilitas-view/add-fasilitas";
import React, { memo } from "react";

const PageListFasilitas = memo(() => {
  return (
    <div>
      <FormAddFasilitas />
    </div>
  );
});

PageListFasilitas.displayName = "PageListFasilitas";

export default PageListFasilitas;
