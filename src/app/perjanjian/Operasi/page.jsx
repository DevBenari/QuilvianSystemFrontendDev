"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataPerjanjianOperasi } from "@/utils/dataPerjanjian"; // Pastikan dataPerjanjianOperasi diimpor dengan benar
import { Row, Col } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";

const PerjanjianOperasi = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPerjanjianOperasi);
  const [searchCriteria, setSearchCriteria] = useState({
    tanggalMulai: "",
    tanggalSelesai: "",
    dokter: "",
    nomorRekamMedis: "",
    namaPasien: "",
    statusRegistrasi: "",
    ruangOperasi: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPerjanjianOperasi.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true;

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggalOperasi).getTime();
          const startDate = new Date(updatedCriteria.tanggalMulai).getTime();
          const endDate = new Date(updatedCriteria.tanggalSelesai).getTime();
          if (criteriaKey === "tanggalMulai" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai" && endDate) {
            return itemDate <= endDate;
          }
        }

        return item[criteriaKey]
          ?.toString()
          .toLowerCase()
          .includes(criteriaValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const formFields = [
    {
      fields: [
        {
          type: "custom",
          colSize: 6,
          customRender: () => (
            <>
              <Row className="mb-3">
                <Col>
                  <DateInput
                    name="tanggalMulai"
                    label="Tanggal Mulai"
                    placeholder="Enter Tanggal Mulai"
                    onChange={(e) =>
                      handleSearch("tanggalMulai", e.target.value)
                    } // Perbaikan penulisan onChange
                  />
                </Col>
                <Col>
                  <DateInput
                    name="tanggalSelesai"
                    label="Tanggal Selesai"
                    placeholder="Enter Tanggal Selesai"
                    onChange={(e) =>
                      handleSearch("tanggalSelesai", e.target.value)
                    } // Perbaikan penulisan onChange
                  />
                </Col>
              </Row>
            </>
          ),
        },
        {
          type: "text",
          id: "dokter",
          label: "Dokter",
          name: "dokter",
          placeholder: "Masukkan nama dokter...",
          onChange: (e) => handleSearch("dokter", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRekamMedis",
          label: "Nomor RM",
          name: "nomorRekamMedis",
          placeholder: "Masukkan Nomor RM...",
          onChange: (e) => handleSearch("nomorRekamMedis", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Masukkan Nama Pasien...",
          onChange: (e) => handleSearch("namaPasien", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "statusRegistrasi",
          label: "Status Registrasi",
          name: "statusRegistrasi",
          options: [
            { label: "All", value: "" },
            { label: "Aktif", value: "Aktif" },
            { label: "Non-Aktif", value: "Non-Aktif" },
          ],
          onChange: (e) => handleSearch("statusRegistrasi", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "ruangOperasi",
          label: "Ruang Operasi",
          name: "ruangOperasi",
          options: [
            { label: "Pilih Ruang Operasi", value: "" },
            { label: "Ruang Operasi A", value: "Ruang Operasi A" },
            { label: "Ruang Operasi B", value: "Ruang Operasi B" },
            { label: "Ruang Operasi C", value: "Ruang Operasi C" },
          ],
          onChange: (e) => handleSearch("ruangOperasi", e.target.value),
          colSize: 6,
        },
      ],
    },
  ];

  const headers = [
    "NO",
    "RUANG OPERASI",
    "NO REGISTRASI",
    "TANGGAL OPERASI",
    "JAM OPERASI",
    "PASIEN",
    "NO HP",
    "SEX",
    "KELAS",
    "DIAGNOSIS",
    "TINDAKAN",
    "KETERANGAN",
    "OPERATOR",
    "TIPE ANESTHESI",
    "JAMINAN",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    ruangOperasi: item.ruangOperasi,
    noRegistrasi: item.noRegistrasi,
    tanggalOperasi: item.tanggalOperasi,
    jamOperasi: item.jamOperasi,
    pasien: item.pasien,
    noHP: item.noHP,
    sex: item.sex,
    kelas: item.kelas,
    diagnosis: item.diagnosis,
    tindakan: item.tindakan,
    keterangan: item.keterangan,
    operator: item.operator,
    tipeAnestesi: item.tipeAnestesi,
    jaminan: item.jaminan,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput,
    tanggalEdit: item.tanggalEdit,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian Operasi" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Perjanjian Operasi"
      />
    </FormProvider>
  );
});

PerjanjianOperasi.displayName = "PerjanjianOperasi";
export default PerjanjianOperasi;
