"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataSemuaPerjanjian } from "@/utils/dataPerjanjian";
import { Col, Row } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";
import SearchableSelectField from "@/components/ui/select-field-search";

const DashboardPerjanjian = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataSemuaPerjanjian); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nama: "",
    dokter: "",
    departemen: "",
    tipe_perjanjian: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  });
  // State untuk pagination

  // Fungsi untuk menangani pencarian dengan kriteria
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataSemuaPerjanjian.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kriteria kosong

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          // Filter tanggal dalam range
          const itemDate = new Date(item.tanggal).getTime(); // Konversi ke timestamp
          const startDate = new Date(updatedCriteria.tanggalMulai).getTime();
          const endDate = new Date(updatedCriteria.tanggalSelesai).getTime();
          if (criteriaKey === "tanggalMulai" && startDate) {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai" && endDate) {
            return itemDate <= endDate;
          }
        }

        if (criteriaKey === "departemenSelect.select") {
          return item.departemen
            ?.toString()
            .toLowerCase()
            .includes(criteriaValue.toLowerCase());
        }

        // Pencarian default (teks)
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
          type: "text",
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan nama Pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
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
          type: "custom",
          colSize: 6,
          customRender: () => (
            <>
              <Row>
                <Col>
                  <SearchableSelectField
                    name="departemenSelect.select"
                    label="Departemen"
                    options={[
                      { label: "Poli Anak", value: "Poli Anak" },
                      {
                        label: "Poli Penyakit Dalam",
                        value: "Poli Penyakit Dalam",
                      },
                      { label: "Poli Gigi", value: "Poli Gigi" },
                      { label: "Poli Mata", value: "Poli Mata" },
                      { label: "Poli Bedah", value: "Poli Bedah" },
                      { label: "Poli Jantung", value: "Poli Jantung" },
                      { label: "Poli Paru", value: "Poli Paru" },
                      { label: "Poli Saraf", value: "Poli Saraf" },
                      {
                        label: "Poli Kulit dan Kelamin",
                        value: "Poli Kulit dan Kelamin",
                      },
                      { label: "Poli THT", value: "Poli THT" },
                      { label: "Poli Kandungan", value: "Poli Kandungan" },
                      {
                        label: "Poli Rehabilitasi Medis",
                        value: "Poli Rehabilitasi Medis",
                      },
                      { label: "Poli Urologi", value: "Poli Urologi" },
                      { label: "Poli Ortopedi", value: "Poli Ortopedi" },
                      { label: "Poli Geriatri", value: "Poli Geriatri" },
                    ]}
                    placeholder="Pilih Poli"
                    className="mb-3"
                    onChange={(selectedOption) =>
                      handleSearch(
                        "departemenSelect.select",
                        selectedOption?.value || ""
                      )
                    }
                  />
                </Col>
              </Row>
            </>
          ),
        },
        {
          type: "select",
          id: "tipe_perjanjian",
          label: "Tipe Perjanjian",
          placeholder: "Pilih tipe Perjanjian...",
          name: "tipe_perjanjian",
          options: [
            { label: "Rawat Jalan", value: "Rawat Jalan" },
            { label: "Rawat Inap", value: "Rawat Inap" },
            { label: "MCU", value: "MCU" },
            { label: "Operasi", value: "Operasi" },
            { label: "ODC", value: "ODC" },
            { label: "Reguler", value: "Reguler" },
            { label: "Radiologi", value: "Radiologi" },
          ],
          onChange: (e) => handleSearch("tipe_perjanjian", e.target.value),
          colSize: 6,
        },
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
      ],
    },
  ];

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

  return (
    <FormProvider {...methods}>
      <DynamicFormTable
        title="Pasien yang telah registrasi"
        formConfig={formFields}
      />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Pasien Perjanjian"
      />
    </FormProvider>
  );
});

DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
