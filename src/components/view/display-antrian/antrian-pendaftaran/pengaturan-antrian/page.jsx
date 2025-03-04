import TopNav from "@/components/features/navbars/top-nav";
import DashboardPendaftaran from "@/components/view/pengaturan-antrian/page";
import React, { Fragment } from "react";

const Promo = () => {
  return (
    <Fragment>
      <TopNav />
      <DashboardPendaftaran />
    </Fragment>
  );
};

export default Promo;
