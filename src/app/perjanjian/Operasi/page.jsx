"use client";

import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataTable from "@/components/features/viewDataTables/dataTable";
import DynamicFormTable from "@/components/features/dynamicFormTable/dynamicFormTable";
import { dataPerjanjianOperasi } from "@/utils/dataPerjanjian"; // Pastikan dataPerjanjianOperasi diimpor dengan benar
import { Row, Col } from "react-bootstrap";
import DateInput from "@/components/ui/date-input";
import SearchableSelectField from "@/components/ui/select-field-search";

const PerjanjianOperasi = memo(() => {
  const methods = useForm();
  const [filteredData, setFilteredData] = useState(dataPerjanjianOperasi);
  const [searchCriteria, setSearchCriteria] = useState({
    tanggalMulai: "",
    tanggalSelesai: "",
    dokter: "",
    nomorRekamMedis: "",
    pasien: "",
    statusRegistrasi: "",
    ruangOperasi: "",
    noRegistrasi: "",
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
          id: "noRegistrasi",
          label: "Nomor Registrasi",
          name: "noRegistrasi",
          placeholder: "Masukkan Nomor Registrasi...",
          onChange: (e) => handleSearch("noRegistrasi", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Masukkan Nama Pasien...",
          onChange: (e) => handleSearch("pasien", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "select",
        //   id: "statusRegistrasi",
        //   label: "Status Registrasi",
        //   name: "statusRegistrasi",
        //   placeholder: "Status Registrasi",
        //   options: [
        //     { label: "Aktif", value: "Aktif" },
        //     { label: "Non-Aktif", value: "Non-Aktif" },
        //   ],
        //   onChange: (e) => handleSearch("statusRegistrasi", e.target.value),
        //   colSize: 6,
        // },
        {
          type: "select",
          id: "ruangOperasi",
          label: "Ruang Operasi",
          name: "ruangOperasi",
          placeholder: "Pilih ruang operasi",
          options: [
            { label: "OK I", value: "OK I" },
            { label: "OK II", value: "OK II" },
            { label: "OK III", value: "OK III" },
            { label: "OK IV", value: "OK IV" },
            { label: "OK V", value: "OK V" },
            { label: "ENDOSCOPY II", value: "ENDOSCOPY II" },
            { label: "ENDOSCOPY III", value: "ENDOSCOPY III" },
            { label: "ENDOSCOPY I", value: "ENDOSCOPY I" },
            { label: "RR", value: "RR" },
            { label: "CCVC", value: "CCVC" },
          ],
          onChange: (e) => handleSearch("ruangOperasi", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "custom",
        //   colSize: 6,
        //   customRender: () => (
        //     <>
        //       <Row>
        //         <Col>
        //           <SearchableSelectField
        //             name="kelasSelect.select"
        //             label="kelas Kamar"
        //             options={[
        //               { label: "SUITE", value: "SUITE" },
        //               { label: "LUXURY", value: "LUXURY" },
        //               {
        //                 label: "ISOLASI LAVENDER SVIP",
        //                 value: "ISOLASI LAVENDER SVIP",
        //               },
        //               { label: "VIP SUPERIOR", value: "VIP SUPERIOR" },
        //               {
        //                 label: "ISOLASI CHRISANT SVIP",
        //                 value: "ISOLASI CHRISANT SVIP",
        //               },
        //               { label: "CHRISANT SVIP", value: "CHRISANT SVIP" },
        //               { label: "VIP DELUXE", value: "VIP DELUXE" },
        //               { label: "VIP 8.3", value: "VIP 8.3" },
        //               {
        //                 label: "ISOLASI CHRISANT VIP DELUXE",
        //                 value: "ISOLASI CHRISANT VIP DELUXE",
        //               },
        //               {
        //                 label: "CHRISANT VIP DELUXE",
        //                 value: "CHRISANT VIP DELUXE",
        //               },
        //               { label: "VVIP", value: "VVIP" },
        //               { label: "GRAND ROYAL", value: "GRAND ROYAL" },
        //               { label: "CHRISANT VIP", value: "CHRISANT VIP" },
        //               { label: "VIP 8.1", value: "VIP 8.1" },
        //               {
        //                 label: "ISOLASI LAVENDER VIP",
        //                 value: "ISOLASI LAVENDER VIP",
        //               },
        //               {
        //                 label: "ISOLASI BOUGENVIL VIP",
        //                 value: "ISOLASI BOUGENVIL VIP",
        //               },
        //               {
        //                 label: "ISOLASI CHRISANT VIP",
        //                 value: "ISOLASI CHRISANT VIP",
        //               },
        //               { label: "VIP", value: "VIP" },
        //               { label: "kelas 1", value: "kelas 1" },
        //               { label: "VIP 8.2", value: "VIP 8.2" },
        //             ]}
        //             placeholder="Pilih kelas Kamar"
        //             className="mb-3"
        //             onChange={(selectedOption) =>
        //               handleSearch(
        //                 "kelasSelect.select",
        //                 selectedOption?.value || ""
        //               )
        //             }
        //           />
        //         </Col>
        //       </Row>
        //     </>
        //   ),
        // },
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
