import CoveranAsuransiAddForm from "@/components/view/MasterData/master-asuransi-view/asuransi-coveran/add-coveran-asuransi";
import React, { memo } from "react";

const PagesAddDaftarCoveranAsuransi = memo(() => {
  return (
    <div>
      <CoveranAsuransiAddForm />
    </div>
  );
});

PagesAddDaftarCoveranAsuransi.displayName = "PagesAddDaftarCoveranAsuransi";

export default PagesAddDaftarCoveranAsuransi;
