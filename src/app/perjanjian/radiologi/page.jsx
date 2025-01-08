"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataPasienRadiologi } from "@/utils/dataPerjanjian";
import { Col, Row } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";

const PerjanjianRadiologi = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPasienRadiologi);
  const [searchCriteria, setSearchCriteria] = useState({
    dokter: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    noRM: "",
    nama: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPasienRadiologi.filter((item) => {
      return Object.keys(updatedCriteria).every((criteriaKey) => {
        const criteriaValue = updatedCriteria[criteriaKey];
        if (!criteriaValue) return true;

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
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan Nama Pasien...",
          onChange: (e) => handleSearch("nama", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "select",
        //   id: "kategoriPenjamin",
        //   label: "Kategori Penjamin",
        //   name: "kategoriPenjamin",
        //   placeholder: "Pilih Kategori Penjamin",
        //   options: [
        //     { label: "Pribadi", value: "pribadi" },
        //     { label: "Penjamin/Asuransi", value: "asuransi" },
        //   ],
        //   colSize: 6,
        //   onChange: (e) =>
        //     handleFilterChange("kategoriPenjamin", e.target.value),
        // },
        {
          type: "text",
          id: "noRM",
          label: "Nomor RM",
          name: "noRM",
          placeholder: "Masukkan Nomor RM...",
          onChange: (e) => handleSearch("noRM", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "text",
        //   id: "alamat",
        //   label: "Alamat",
        //   name: "alamat",
        //   placeholder: "Masukkan Alamat...",
        //   onChange: (e) => handleSearch("alamat", e.target.value),
        //   colSize: 6,
        // },
      ],
    },
  ];

  const headers = [
    "NO",
    "nomor RM",
    "tanggal Janji",
    "nama",
    "telepon",
    "dokter",
    "konfirmasi",
    "user",
    "user Edit",
    "tanggal Input", // Tambahkan tanggal Input ke header
    "tanggal Edit",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    noRM: item.noRM,
    tanggalJanji: item.tanggalJanji, // Tambahkan tanggalJanji
    nama: item.nama,
    telepon: item.telepon,
    dokter: item.dokter,
    konfirmasi: item.konfirmasi,
    user: item.user,
    userEdit: item.userEdit,
    tanggalInput: item.tanggalInput, // Tambahkan tanggalInput
    tanggalEdit: item.tanggalEdit,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable
        title="Pencarian Pasien Radiologi"
        formConfig={formFields}
      />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="Pasien Radiologi"
      />
    </FormProvider>
  );
});

PerjanjianRadiologi.displayName = "PerjanjianRadiologi";
export default PerjanjianRadiologi;
