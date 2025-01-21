"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataSemuaPerjanjian } from "@/utils/dataPerjanjian";
import { Col, Row } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";
import SearchableSelectField from "@/components/ui/select-field-search";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";
import { useRouter } from "next/navigation";

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataSemuaPerjanjian); // Gunakan data dummy untuk tabel
  const router = useRouter();
  const headers = [
    "NO",
    "NO RM",
    "NAMA",
    "NO REGISTRASI",
    "PENJAMIN",
    "TIPE PERJANJIAN",
    "TEL REGIS",
    "DOKTER",
    "DEPARTEMEN",
    "USER",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    nomorRekamMedis: item.nomorRekamMedis,
    nama: item.nama,
    no_registrasi: item.no_registrasi,
    penjamin: item.penjamin,
    tipe_perjanjian: item.tipe_perjanjian,
    tanggal_regis: item.tanggal_regis,
    dokter: item.dokter,
    departemen: item.departemen,
    user: item.user,
  }));

  const handleAdd = () => {
    router.push("/perjanjian/add-perjanjian");
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Pasien Bayi </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <CustomSearchFilter
          data={dataSemuaPerjanjian}
          setFilteredPatients={setFilteredData}
          onFilteredPatients={filteredData}
        />
      </Col>

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Pasien Perjanjian"
        onAdd={handleAdd}
        labelAdd="Buat Janji"
      />
    </FormProvider>
  );
});

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
