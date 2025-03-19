import DashboardOperasi from "@/components/view/Operasi/dashboard-operasi/DashboardOperasi";
import React, { memo } from "react";

const DashboardOperasiPage = memo(() => {
  return (
    <div>
      <DashboardOperasi />
    </div>
  );
});

DashboardOperasiPage.displayName = "DashboardOperasiPage";

export default DashboardOperasiPage;
