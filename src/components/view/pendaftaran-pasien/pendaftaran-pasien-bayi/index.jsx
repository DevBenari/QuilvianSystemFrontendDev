"use client";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";
import DataTable from "@/components/features/viewDataTables/dataTable";
import { pasienBayi } from "@/utils/dataPasien";
import React, { memo, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const DashboardPendaftaranBayi = memo(() => {
  const methods = useForm();
  const router = useRouter();
  const [filteredPatients, setFilteredPatients] = useState(pasienBayi);

  const handleRemovePatient = (id) => {
    const updatedPatients = filteredPatients.filter(
      (patient) => patient.id !== id
    );
    setFilteredPatients(updatedPatients);
  };

  const header = ["NO", "KELAS", "RUANG", "NAMA PASIEN MELAHIRKAN", "DOKTER"];

  const members = filteredPatients.map((item, index) => ({
    id: item.id, // Tambahkan ID agar bisa dilacak
    no: index + 1,
    label: item.label,
    ruang: item.ruang,
    namaBayi: item.namaBayi,
    dokter: item.dokter,
  }));

  const handleRegistrasi = (row) => {
    // Cari data lengkap berdasarkan ID
    const selectedPatient = pasienBayi.find((patient) => patient.id === row.id);

    if (!selectedPatient) {
      console.error("Patient not found");
      return;
    }

    // Encode data lengkap ke query string
    const encodedData = encodeURIComponent(JSON.stringify(selectedPatient));

    // Navigasi ke halaman tujuan dengan data lengkap
    router.push(
      `/pendaftaran/pendaftaran-pasien-bayi/add-pasien-bayi?data=${encodedData}`
    );
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className=" iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching Pasien Bayi </h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => window.location.reload()}
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={pasienBayi}
            setFilteredPatients={setFilteredPatients}
            onFilteredPatients={filteredPatients}
          />
        </Col>
      </Col>
      <div className="mt-5">
        <Row>
          <Col sm="12">
            <DataTable
              headers={header}
              data={members}
              rowsPerPage={5}
              title="Pasien Bayi"
              customActions={[
                {
                  label: "Registrasi",
                  onClick: handleRegistrasi,
                  className: "iq-bg-success",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
});
DashboardPendaftaranBayi.displayName = "DashboardPendaftaranBayi";
export default DashboardPendaftaranBayi;
