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
import ButtonNav from "@/components/ui/button-navigation";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataSemuaPerjanjian); // Gunakan data dummy untuk tabel
  // const router = useRouter();
  // const headers = [
  //   "NO",
  //   "NO RM",
  //   "NAMA",
  //   "NO REGISTRASI",
  //   "PENJAMIN",
  //   "TIPE PERJANJIAN",
  //   "TEL REGIS",
  //   "DOKTER",
  //   "DEPARTEMEN",
  //   "USER",
  // ];

  // // Format data untuk ditampilkan di tabel
  // const members = filteredData.map((item, index) => ({
  //   no: index + 1,
  //   nomorRekamMedis: item.nomorRekamMedis,
  //   nama: item.nama,
  //   no_registrasi: item.no_registrasi,
  //   penjamin: item.penjamin,
  //   tipe_perjanjian: item.tipe_perjanjian,
  //   tanggal_regis: item.tanggal_regis,
  //   dokter: item.dokter,
  //   departemen: item.departemen,
  //   user: item.user,
  // }));

  const handleRemovePatient = (id) => {
    const updatedPatients = filteredData.filter((patient) => patient.id !== id);
    setFilteredData(updatedPatients);
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Perjanjian</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={dataSemuaPerjanjian}
            setFilteredPatients={setFilteredData}
            onFilteredPatients={filteredData}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">
                    Tabel Perjanjian Pasien
                  </h4>
                </div>
                <ButtonNav
                  path="/perjanjian/add-perjanjian"
                  label="Buat Janji"
                  icon="ri-add-fill"
                  size="sm"
                  variant=""
                  className="btn btn-sm iq-bg-success"
                />
              </div>
              <div className="iq-card-body">
                <CustomTableComponent
                  data={filteredData}
                  columns={[
                    { key: "id", label: "ID" },
                    { key: "nomorRekamMedis", label: "No Rekam Medis" },
                    { key: "nama", label: "Nama" },
                    { key: "no_registrasi", label: "No Registrasi" },
                    { key: "tipe_perjanjian", label: "Tipe Perjanjian" },
                    { key: "tanggal_regis", label: "Tanggal Regis" },
                    { key: "dokter", label: "Dokter" },
                    { key: "departemen", label: "Departemen" },
                    { key: "penjamin", label: "Penjamin" },
                    { key: "user", label: "User" },
                  ]}
                  itemsPerPage={10}
                  onRemove={handleRemovePatient}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
});

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
