"use client";
import FormValidations from "@/components/features/formValidations/formValidations";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { addPromo } from "@/lib/hooks/promo/add";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useKecamatans } from "@/lib/hooks/kecamatan/index";
import { getById } from "@/lib/hooks/province/getProvinceId";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import RadioInput from "@/components/ui/radio-input";
import { usePromos } from "@/lib/hooks/promo/index"; // Import the usePromos hook
import SelectField from "@/components/ui/select-field";
import DataTable from "@/components/features/viewDataTables/dataTable";
import dataWilayah from "@/utils/dataWilayah";

export default function PendaftaranRehabilitasiMedik() {
  const { promos, loading, error } = usePromos();
  const [promosState, setPromosState] = useState([]);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  // change provinsi berdasarkan api

  // function handle

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  //  function promo
  useEffect(() => {
    if (promos) {
      setPromosState(promos);
    }
  }, [promos]);
  const formFieldsPromo = [
    {
      name: "promoByNama",
      label: "Search",
      type: "text",
      placeholder: "Search Promo by Name...",
      onChange: (e) => handleSearchByName(e.target.value),
    },
  ];

  const handleSearchByName = (searchValue) => {
    const filteredPromos = promos.filter((promo) =>
      promo.namaPromo.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    setPromosState(filteredPromos.length ? filteredPromos : promos);
  };

  const promoHeaders = ["NO", "PEMERIKSAAN LAB", "JUMLAH", "ACTION"];
  const promoMembers = promosState.map((promo, index) => ({
    no: index + 1,
    id: promo.promoId,
    kodePromo: promo.kodePromo || "-",
    namaPromo: promo.namaPromo || "-",
    keterangan: promo.keterangan || "-",
  }));

  // end promo

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "noRegistrasi",
          label: "No Registrasi",
          name: "noRegistrasi",
          placeholder: "No Registrasi",
          rules: { required: "No Registrasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          rules: { required: "No Rekam Medis is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Nama Pasien",
          rules: { required: "Nama Pasien is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorHP",
          label: "Nomor HP",
          name: "nomorHP",
          placeholder: "Nomor HP",
          rules: { required: "Nomor HP is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "radio",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },
          className: "my-3",
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorTlpn",
          label: "Nomor Telepon",
          name: "nomorTlpn",
          placeholder: "Nomor Telepon",
          rules: { required: "Nomor Telepon is required" },
          colSize: 6,
        },
        {
          type: "email",
          id: "email",
          label: "Email",
          name: "email",
          placeholder: "Email",
          rules: {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Masukkan email yang valid",
            },
          },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamatRumah",
          label: "Alamat Rumah",
          name: "alamatRumah",
          placeholder: "Alamat Rumah",
          rules: { required: "Alamat Rumah is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Dokter Pemeriksa",
          options: [
            { label: "Dr. zainudin", value: "dr_zainudin" },
            { label: "Dr. putri", value: "dr_putri" },
            { label: "Dr. rindu", value: "dr_rindu" },
          ],
          rules: { required: "Dokter Lab is required" },
          colSize: 8,
        },
        {
          type: "text",
          id: "cariTindakan",
          label: "Cari Tindakam:",
          name: "cariTindakan",
          type: "text",
          placeholder: "Cari Tindakan ",
          // onChange: { handleSearchByName },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      const response = await addPromo(data);
      alert("Promo added successfully!");
      router.push("/pendaftaran");
    } catch (error) {
      console.error(error);
      alert("Failed to add promo.");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Optik"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}
