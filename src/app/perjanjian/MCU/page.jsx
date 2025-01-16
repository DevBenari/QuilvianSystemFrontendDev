"use client";

import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DateInput from "@/components/ui/date-input";
import { dataPasienMCU } from "@/utils/dataPerjanjian";

import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const PerjanjianMCU = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPasienMCU);
  const [searchCriteria, setSearchCriteria] = useState({
    tanggalMulai: "",
    tanggalSelesai: "",
    nama: "",
    noRM: "",
    alamat: "",
  });

  // Fungsi untuk menangani pencarian
  const handleSearch = (key, value) => {
    const updatedCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(updatedCriteria);

    const filtered = dataPasienMCU.filter((item) => {
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
          id: "noRM",
          label: "Nomor Rekam Medis",
          name: "noRM",
          placeholder: "Masukkan Nomor Rekam Medis",
          colSize: 6,
          onChange: (e) => handleSearch("noRM", e.target.value),
        },
        {
          type: "text",
          id: "nama",
          label: "Nama",
          name: "nama",
          placeholder: "Masukkan Nama",
          colSize: 6,
          onChange: (e) => handleSearch("nama", e.target.value),
        },
        {
          type: "text",
          id: "alamat",
          label: "Alamat",
          name: "alamat",
          placeholder: "Masukkan Alamat",
          colSize: 6,
          onChange: (e) => handleSearch("alamat", e.target.value),
        },
      
      ],
    },
  ];

  const headers = [
    "NO",
    "NO. RM",
    "NAMA",
    "ALAMAT",
    "TELEPON",
    "TGL JANJI",
    "STATUS",
    "USER",
    "USER EDIT",
    "WAKTU INPUT",
    "WAKTU EDIT",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    noRM: item.noRM,
    nama: item.nama,
    alamat: item.alamat,
    telepon: item.telepon,
    tanggalJanji: item.tanggalJanji,
    status: item.status,
    user: item.user,
    userEdit: item.userEdit,
    waktuInput: item.waktuInput,
    waktuEdit: item.waktuEdit,
  }));

  return (
    <FormProvider {...methods}>
      <DynamicFormTable title="Pencarian MCU" formConfig={formFields} />

      <DataTable
        headers={headers}
        data={members}
        id="id"
        rowsPerPage={5}
        title="Perjanjian MCU"
      />
    </FormProvider>
  );
});

PerjanjianMCU.displayName = "PerjanjianMCU";
export default PerjanjianMCU;
