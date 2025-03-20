import KodePosAddForm from "@/components/view/MasterData/master-wilayah-view/kode-pos/add-kodePos";
import React, { memo } from "react";

const AddKodePosPage = memo(() => {
  return (
    <div>
      <KodePosAddForm />
    </div>
  );
});

AddKodePosPage.displayName = AddKodePosPage;

export default AddKodePosPage;
