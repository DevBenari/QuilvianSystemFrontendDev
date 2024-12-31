"use client";

import DataTable from "@/components/view/pendaftarn-pasien-bayi/table/dataTable";
import { Fragment, useEffect } from "react";
export const PendaftaranPasienBayi = () => {
  const headers = [
    "NO RM",
    "KELAS",
    "Ruang",
    "NAMA PASIEN MELAHIRKAN",
    "DOKTER",
  ];

  return (
    <Fragment>
      <DataTable
        headers={headers}
        id="id"
        actions={{
          edit: (row) => handleEdit(row.id),
        }}
      />
    </Fragment>
  );
};

export default PendaftaranPasienBayi;
