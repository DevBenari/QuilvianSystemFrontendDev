"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataRawatInap } from "@/utils/dataPerjanjian"; // Pastikan dataRawatInap diimpor dengan benar
import DateInput from "@/components/ui/date-input";
import { Col, Row } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";

const PerjanjianRawatInap = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataRawatInap); // Gunakan data dummy untuk tabel
  const [searchCriteria, setSearchCriteria] = useState({
    nomorRekamMedis: "",
    nama: "",
    alamat: "",
    dokter: "",
    departemen: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    penjamin: "",
    telepon: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataRawatInap.filter((item) => {
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

        if (criteriaKey === "kelasSelect.select") {
          return item.kelas
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
          label: " Nama Dokter",
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
          label: "Medical Record ID",
          name: "nomorRekamMedis",
          placeholder: "Masukkan Medical Record ID...",
          onChange: (e) => handleSearch("nomorRekamMedis", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "telepon",
          label: "Nomor Hp",
          name: "telepon",
          placeholder: "Masukkan Nomor Hp...",
          onChange: (e) => handleSearch("telepon", e.target.value),
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
                    name="kelasSelect.select"
                    label="kelas Kamar"
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
                      { label: "kelas 1", value: "kelas 1" },
                      { label: "VIP 8.2", value: "VIP 8.2" },
                    ]}
                    placeholder="Pilih kelas Kamar"
                    className="mb-3"
                    onChange={(selectedOption) =>
                      handleSearch(
                        "kelasSelect.select",
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
    "NO RM",
    "TANGGAL JANJI",
    "TANGGAL MASUK",
    "NAMA",
    "TELEPON",
    "DIAGNOSA",
    "DOKTER",
    "KELAS",
    "KONFIRMASI",
    "USER",
    "USER EDIT",
    "TANGGAL INPUT",
    "TANGGAL EDIT",
    "INFORMASI LAIN",
  ];

  // Format data untuk ditampilkan di tabel
  const members = filteredData.map((item, index) => ({
    no: index + 1,
    nomorRekamMedis: item.nomorRekamMedis,
    tanggalJanji: item.tanggalJanji,
    tanggalMasuk: item.tanggalMasuk,
    nama: item.nama,
    telepon: item.telepon, // Tambahkan telepon setelah nama
    diagnosis: item.diagnosis,
    dokter: item.dokter,
    kelas: item.kelas,
    konfirmasi: item.konfirmasi,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput,
    tanggalEdit: item.tanggalEdit,
    informasiLain: item.informasiLain,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian Rawat Inap" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="List Pasien Rawat Inap"
      />
    </FormProvider>
  );
});

PerjanjianRawatInap.displayName = "PerjanjianRawatInap";
export default PerjanjianRawatInap;
