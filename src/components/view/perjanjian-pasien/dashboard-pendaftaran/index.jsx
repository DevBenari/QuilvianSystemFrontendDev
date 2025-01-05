"use client";

import DynamicForm from "@/components/features/dynamicFormTable/dynamicFormTable";
import DataTableAnggota from "@/components/view/anggota/dataTable";
import DateInput from "@/components/ui/date-input";
import TextField from "@/components/ui/text-field";
import { dataPasien } from "@/utils/config";

import axios from "axios";
import Link from "next/link";
import React, { memo, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import DataTablePerjanjian from "../tablePerjanjian/table";
import DataAnggota from "@/lib/hooks/keanggotaan/data";

const DashboardPerjanjian = memo(() => {
  const { getMembers } = DataAnggota();

  const members = getMembers();

  const methods = useForm();
  // const [isFilteredPasien, setIsFilteredPasien] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  // const handleInputChange = async (e) => {
  //     const query = e.target.valuel;

  //     if(query.trim() === "") {
  //         setIsFilteredPasien([])
  //         return;
  //     }
  //     setIsLoading(true)
  //     try{
  //         const response = await axios.get(`/api/patients?search=${query}`)
  //         setIsFilteredPasien(response.data);
  //     }catch(error){
  //         console.log(error)
  //     }finally{
  //         setIsLoading(false)
  //     }

  // }

  const [filters, setFilters] = useState({
    noRekamMedis: "",
    nama: "",
    noTelp: "",
  });
  const [filteredPatients, setFilteredPatients] = useState(dataPasien);

  // Fungsi untuk mengupdate filter
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Fungsi untuk memfilter data pasien
  const applyFilters = (filters) => {
    const filtered = dataPasien.filter((patient) => {
      const matchNoRekamMedis = filters.noRekamMedis
        ? patient.noRekamMedis
            ?.toLowerCase()
            .includes(filters.noRekamMedis.toLowerCase())
        : true;
      const matchNama = filters.nama
        ? patient.nama?.toLowerCase().includes(filters.nama.toLowerCase())
        : true;
      const matchNoTelp = filters.noTelp
        ? patient.noTelp?.toLowerCase().includes(filters.noTelp.toLowerCase())
        : true;

      return matchNoRekamMedis && matchNama && matchNoTelp;
    });
    setFilteredPatients(filtered);
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "dokter",
          label: "Dokter",
          name: "dokter",
          placeholder: "Enter your No Rekam Medis...",
          onChange: (e) => handleFilterChange("dokter", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "Enter your No Rekam Medis...",
          onChange: (e) => handleFilterChange("noRekamMedis", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "departemen",
          label: "Departemen",
          name: "departemen",
          placeholder: "Enter your departemen Pasien...",
          onChange: (e) => handleFilterChange("departemen", e.target.value),
          colSize: 6,
        },
        {
          type: "text",
          id: "tipePerjanjian",
          label: "Tipe Perjanjian",
          name: "tipePerjanjian",
          placeholder: "Enter your tipe Perjanjian Pasien...",
          onChange: (e) => handleFilterChange("tipePerjanjian", e.target.value),
          colSize: 6,
        },
        // {
        //   type: "date",
        //   id: "tanggalstart",
        //   label: "Tanggal Lahir",
        //   name: "tanggalstart",
        //   placeholder: "Enter Tanggal Lahir",
        //   rules: { required: "Tanggal lahir harus diisi" },
        //   colSize: 6,
        // },
      ],
    },
  ];

  const headers = [
    "NO",
    "URUTAN",
    "NO RM",
    "NAMA",
    "NO REGISTRASI",
    "PENJAMIN",
    "TANGGAL REGIS",
    "DOKTER",
    "DEPARTEMENT",
    "USER",
  ];

  return (
    <FormProvider {...methods}>
      <DynamicForm title="Perjanjian" formConfig={formFields} />
      <DataTablePerjanjian headers={headers} data={members} />
    </FormProvider>
  );
});
DashboardPerjanjian.displayName = "DashboardPerjanjian";
export default DashboardPerjanjian;
