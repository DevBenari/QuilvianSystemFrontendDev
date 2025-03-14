"use client";
import React, { useState } from "react";
import ButtonNav from "@/components/ui/button-navigation";
import { Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import CustomSearchFilter from "@/components/features/custom-search/CustomSearchComponen/custom-search-filter";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import { poliAnak } from "@/utils/instalasi-poli";
import { FaHospitalUser } from "react-icons/fa";

const TablePoliRawatJalan = () => {
  const methods = useForm();
  const [filteredPatients, setFilteredPatients] = useState(poliAnak);

  // Fungsi untuk memindahkan pasien ke urutan terakhir saat tombol "Skip" diklik

  const handleSkipAction = (id) => {
    const patientIndex = filteredPatients.findIndex(
      (patient) => patient.id === id
    );

    if (patientIndex !== -1) {
      const patient = filteredPatients[patientIndex];
      const updatedPatients = [
        ...filteredPatients.slice(0, patientIndex),
        ...filteredPatients.slice(patientIndex + 1),
        patient, // Pindahkan pasien ke posisi terakhir
      ];

      setFilteredPatients(updatedPatients);
    }

    alert(`Pasien dengan ID ${id} dipindahkan ke urutan terakhir.`);
  };

  // Fungsi untuk menghapus pasien dari daftar
  const handleSelesaiAction = (id) => {
    const updatedPatients = filteredPatients.filter(
      (patient) => patient.id !== id
    );
    setFilteredPatients(updatedPatients);

    alert(`Pasien dengan ID ${id} telah dihapus.`);
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <CustomTableComponent
          headerTitle="Data Antrean Poli Rawat Jalan"
          headerSubtitle="Manajemen Pasien Poli Anak"
          icon={FaHospitalUser} // Icon untuk Poli
          iconBgColor="bg-primary-subtle" // Warna background ikon
          iconColor="text-primary" // Warna ikon
          data={filteredPatients}
          columns={[
            { key: "id", label: "ID" },
            { key: "nama", label: "Nama Poli Anak" },
            { key: "jenisKelamin", label: "Jenis Kelamin" },
            { key: "umur", label: "Kelompok Usia" },
            { key: "noHp", label: "No Hp" },
            { key: "antrian", label: "Antrian" },
          ]}
          itemsPerPage={10}
          slugConfig={{ textField: "nama", idField: "id" }}
          basePath="/instalasi-rawat-jalan/data-poli/detail-poli"
          onCustomAction={(id, actionType) => {
            if (actionType === "skip") handleSkipAction(id);
            if (actionType === "selesai") handleSelesaiAction(id);
          }}
          actions={[
            { type: "skip", label: "Skip", variant: "success" },
            { type: "selesai", label: "Selesai", variant: "danger" },
          ]}
          showActions={true}
        />
      </Col>
    </FormProvider>
  );
};
export default TablePoliRawatJalan;
