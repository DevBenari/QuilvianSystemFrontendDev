"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";

import { Col, Row } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";
import { dataRawatJalan } from "@/utils/dataPerjanjian";
import DateInput from "@/components/ui/date-input";

const PerjanjianRawatJalan = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataRawatJalan); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nomorRekamMedis: "",
    nama: "",
    alamat: "",
    dokter: "",
    departemen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    penjamin: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataRawatJalan.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kosong

        // Filter berdasarkan tanggal
        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggalInput).getTime(); // Pastikan tanggalInput sesuai format valid
          const startDate = new Date(
            updatedCriteria.tanggalMulai || "1970-01-01"
          ).getTime(); // Default awal waktu
          const endDate = new Date(
            updatedCriteria.tanggalSelesai || "9999-12-31"
          ).getTime(); // Default akhir waktu

          if (criteriaKey === "tanggalMulai") {
            return itemDate >= startDate;
          }
          if (criteriaKey === "tanggalSelesai") {
            return itemDate <= endDate;
          }
        }

        if (criteriaKey === "departemenSelect.select") {
          return item.departemen
            ?.toString()
            .toLowerCase()
            .includes(criteriaValue.toLowerCase());
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
          type: "text",
          id: "dokter",
          label: "Pilih Nama Dokter",
          placeholder: "Masukkan Nama Dokter...",
          name: "dokter",
          onChange: (e) => handleSearch("dokter", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan Nama Pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorRekamMedis",
          label: "Nomor Rekam Medis",
          name: "nomorRekamMedis",
          placeholder: "Masukkan Nomor Rekam Medis...",
          onChange: (e) => handleSearch("nomorRekamMedis", e.target.value),
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
          id: "adaPembatalanDokter ",
          label: "Ada Pembatalan Dokter ",
          name: "adaPembatalanDokter ",
          placeholder: "Pilih Ada Pembatalan Dokter ",
          options: [
            { label: "Ya", value: "Ya" },
            { label: "Tidak", value: "Tidak" },
          ],
          onChange: (e) => handleSearch("adaPembatalanDokter ", e.target.value),
          colSize: 6,
        },
        {
          type: "select",
          id: "penjamin",
          label: "Penjamin",
          name: "penjamin",
          placeholder: "Pilih Penjamin",
          options: [
            { label: "Pribadi", value: "Pribadi" },
            { label: "BPJS", value: "BPJS" },
            { label: "Mandiri", value: "Mandiri" },
          ],
          onChange: (e) => handleSearch("penjamin", e.target.value),
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
    "NO LIST",
    "NO RM",
    "JAM MASUK",
    "NAMA",
    "PENJAMIN",
    "ALAMAT",
    "TELEPON",
    "DOKTER",
    "DEPARTEMEN",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "KONTRAK",
    "INFORMASI LAIN",
    "CATATAN",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    nomorRekamMedis: item.nomorRekamMedis,
    jamMasuk: item.jamMasuk,
    nama: item.nama,
    penjamin: item.penjamin,
    alamat: item.alamat,
    telepon: item.telepon,
    dokter: item.dokter,
    departemen: item.departemen,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput,
    tanggalEdit: item.tanggalEdit,
    kontrak: item.kontrak,
    informasiLain: item.informasiLain,
    catatan: item.catatan,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable
        title="Perjanjian Rawat Jalan"
        formConfig={formFields}
      />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="Pasien Rawat Jalan"
      />
    </FormProvider>
  );
});

PerjanjianRawatJalan.displayName = "PerjanjianRawatJalan";
export default PerjanjianRawatJalan;
