"use client";

import React, { memo, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataODC } from "@/utils/dataPerjanjian";
import SearchableSelectField from "@/components/ui/select-field-search";
import { Col, Row } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";

const PerjanjianOdc = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataODC); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nomorRekamMedis: "",
    nama: "",
    alamat: "",
    kelasKamar: "",
    dokter: "",
    departemen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataODC.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true; // Abaikan jika kosong

        if (
          criteriaKey === "tanggalMulai" ||
          criteriaKey === "tanggalSelesai"
        ) {
          const itemDate = new Date(item.tanggalInput).getTime();
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

        if (criteriaKey === "kelasKamarSelect.select") {
          return item.kelasKamar
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
          type: "custom",
          colSize: 12,
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
                <Col>
                  <SearchableSelectField
                    name="kelasKamarSelect.select"
                    label="Kelas Kamar"
                    options={[
                      { label: "SUITE", value: "SUITE" },
                      { label: "LUXURY", value: "LUXURY" },
                      {
                        label: "ISOLASI LAVENDER SVIP",
                        value: "ISOLASI LAVENDER SVIP",
                      },
                      { label: "VIP SUPERIOR", value: "VIP SUPERIOR" },
                      {
                        label: "ISOLASI CHRISANT SVIP",
                        value: "ISOLASI CHRISANT SVIP",
                      },
                      { label: "CHRISANT SVIP", value: "CHRISANT SVIP" },
                      { label: "VIP DELUXE", value: "VIP DELUXE" },
                      { label: "VIP 8.3", value: "VIP 8.3" },
                      {
                        label: "ISOLASI CHRISANT VIP DELUXE",
                        value: "ISOLASI CHRISANT VIP DELUXE",
                      },
                      {
                        label: "CHRISANT VIP DELUXE",
                        value: "CHRISANT VIP DELUXE",
                      },
                      { label: "VVIP", value: "VVIP" },
                      { label: "GRAND ROYAL", value: "GRAND ROYAL" },
                      { label: "CHRISANT VIP", value: "CHRISANT VIP" },
                      { label: "VIP 8.1", value: "VIP 8.1" },
                      {
                        label: "ISOLASI LAVENDER VIP",
                        value: "ISOLASI LAVENDER VIP",
                      },
                      {
                        label: "ISOLASI BOUGENVIL VIP",
                        value: "ISOLASI BOUGENVIL VIP",
                      },
                      {
                        label: "ISOLASI CHRISANT VIP",
                        value: "ISOLASI CHRISANT VIP",
                      },
                      { label: "VIP", value: "VIP" },
                      { label: "VIP 8.2", value: "VIP 8.2" },
                    ]}
                    placeholder="Pilih Kelas Kamar"
                    className="mb-3"
                    onChange={(selectedOption) =>
                      handleSearch(
                        "kelasKamarSelect.select",
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
    "NOMOR REKAM MEDIS",
    "JAM MASUK",
    "NAMA",
    "PENJAMIN",
    "ALAMAT",
    "TELEPON",
    "DOKTER",
    "KELAS KAMAR",
    "DEPARTEMEN",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "KONTRAK",
    "INFORMASI LAIN",
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
    kelasKamar: item.kelasKamar,
    departemen: item.departemen,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput,
    tanggalEdit: item.tanggalEdit,
    kontrak: item.kontrak,
    informasiLain: item.informasiLain,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Perjanjian ODC" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="Pasien ODC"
      />
    </FormProvider>
  );
});

PerjanjianOdc.displayName = "PerjanjianOdc";
export default PerjanjianOdc;
