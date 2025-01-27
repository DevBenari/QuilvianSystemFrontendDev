"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useAnggota } from "@/lib/hooks/keanggotaan";
import { useRouter } from "next/navigation";
import { Col } from "react-bootstrap";

import DataTable from "@/components/features/custom-table/viewDataTables/dataTable";
import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard";

const TableAnggota = memo(() => {
  const methods = useForm();
  const { anggota, loading, error } = useAnggota();
  const [filteredAnggota, setFilteredAnggota] = useState(anggota);
  const router = useRouter();

  // Sinkronisasi data awal saat `anggota` berubah
  useEffect(() => {
    setFilteredAnggota(anggota);
    console.log("Data API diterima:", anggota); // Debugging: Data API
  }, [anggota]);

  const handleAdd = () => {
    router.push("/pendaftaran/keanggotaan/addAnggota");
  };

  const headers = ["NO", "NAMA", "NO RM", "TANGGAL MULAI", "JENIS", "STATUS"];

  // Format data untuk ditampilkan di tabel
  const members = filteredAnggota.map((anggota, index) => ({
    no: index + 1,
    nama: anggota.nama,
    noRekamMedis: anggota.noRekamMedis,
    periodeMulai: anggota.periodeMulai,
    tipeMember: anggota.tipeMember,
    statusMember: anggota.statusMember,
  }));

  return (
    <FormProvider {...methods}>
      <>
        <Col lg="12" className=" iq-card p-4">
          <div className="d-flex justify-content-between iq-card-header">
            <h2 className="mb-3">Searching Anggota</h2>
            <button
              className="btn btn-dark my-3 mx-3"
              onClick={() => window.location.reload()}
            >
              <i className="ri-refresh-line"></i>
            </button>
          </div>
          <Col lg="12" className="mt-2">
            <CustomSearchFilter
              data={anggota}
              setFilteredPatients={setFilteredAnggota}
              onFilteredPatients={filteredAnggota}
            />
          </Col>
        </Col>
        {loading && <div>Loading...</div>}
        {error && <div className="text-danger">{error}</div>}
        {!loading && !error && (
          <DataTable
            headers={headers}
            data={members}
            id="id"
            onAdd={handleAdd}
            rowsPerPage={5}
            title="Anggota"
          />
        )}
      </>
    </FormProvider>
  );
});

TableAnggota.displayName = "TableAnggota";
export default TableAnggota;
