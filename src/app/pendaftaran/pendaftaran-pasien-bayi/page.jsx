"use client";

import DataTable from "@/components/view/pendaftaran-pasien-bayi/table/dataTable";
import { Fragment, memo, useEffect } from "react";
export const PendaftaranPasienBayi = memo(() => {
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
});

PendaftaranPasienBayi.displayName = "PendaftaranPasienBayi";

export default PendaftaranPasienBayi;
