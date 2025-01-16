"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";

import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";

import { Row, Col, Button, Modal } from "react-bootstrap";

import SearchableSelectField from "@/components/ui/select-field-search";
import { dataDokter, dataKelas } from "@/utils/SearchSelect";
import TextField from "@/components/ui/text-field";
import DataTable from "@/components/features/viewDataTables/dataTable";
import { dataKelasTersedia } from "@/utils/PasienPerjanjian";
import DynamicFormAnimasi from "@/components/features/dynamicFormAnimasi/dynamicFormAnimasi";
import DynamicFormGrid from "@/components/dynamicFormGrid/dynamicFormGrid";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import DateInput from "@/components/ui/date-input";
import TimeField from "@/components/ui/time-input";
import SelectField from "@/components/ui/select-field";
import { pasienBayi } from "@/utils/dataPasien";

import { useSearchParams } from "next/navigation";

export const AddPasienBayi = () => {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState({
    namaBayi: "",
    namaKeluarga: "",
    pilihKelas: "",
    ruangan: "",
    dokter: "",
    nomorTempatTidur: "",
    noRekamMedis: "",
  });

  useEffect(() => {
    // Ambil data dari query string
    const encodedData = searchParams.get("data");

    if (encodedData) {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      console.log("Decoded Data:", decodedData);

      // Set data ke state
      setFormValues({
        namaBayi: decodedData.namaBayi || "",
        namaKeluarga: decodedData.namaKeluarga || "",
        pilihKelas: decodedData.label || "",
        ruangan: decodedData.ruang || "",
        dokter: decodedData.dokter || "",
        nomorTempatTidur: decodedData.NoTempatTidur || "",
        noRekamMedis: decodedData.noRekamMedis || "",
      });
    }
  }, [searchParams]);

  // untuk edit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Perbarui nilai berdasarkan nama field
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;

    // Temukan opsi yang sesuai berdasarkan nilai yang dipilih
    const selectedOption = formFields[0].fields[0].options.find(
      (option) => option.value === value
    );

    if (selectedOption) {
      setFormValues((prevValues) => ({
        ...prevValues,
        pilihKelas: selectedOption.value, // Update pilihKelas
        ruangan: selectedOption.ruang || prevValues.ruangan, // Perbarui ruangan
        nomorTempatTidur:
          selectedOption.nomorTempatTidur || prevValues.nomorTempatTidur, // Perbarui nomor tempat tidur
      }));
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "namaBayi",
          label: "Nama Bayi",
          name: "namaBayi",
          placeholder: "Nama Bayi",
          value: formValues.namaBayi,
          colSize: 6,
          onChange: handleInputChange, // Tambahkan onChange
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama Keluarga",
          value: formValues.namaKeluarga,
          colSize: 6,
          onChange: handleInputChange, // Tambahkan onChange
        },
        {
          type: "text",
          id: "dokteran",
          label: "dokter",
          name: "dokter",
          placeholder: "dokter",
          value: formValues.dokter,
          colSize: 6,
          onChange: handleInputChange, // Tambahkan onChange
        },

        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Tempat Lahir",
          rules: { required: "Tempat Lahir is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          placeholder: "Tanggal Lahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "time",
          id: "jamLahir",
          label: "Jam Lahir",
          name: "jamLahir",
          placeholder: "Jam Lahir",
          rules: { required: "Jam Lahir is required" },
          colSize: 3,
        },

        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },

          colSize: 6,
        },
        {
          type: "select",
          id: "kondisiBayi",
          label: "Bayi Terlahir Dalam Keadaaan",
          name: "kondisiBayi",
          placeholder: "Bayi Terlahir Dalam Keadaaan",
          options: [
            { label: "Hidup", value: "Hidup" },
            { label: "Meninggal", value: "Meninggal" },
          ],
          rules: { required: "Bayi Terlahir Dalam Keadaaan is required" },

          colSize: 6,
        },
      ],
    },
    {
      section: "Ruangan",
      fields: [
        {
          type: "select",
          id: "pilihKelas",
          label: "Pilih Kelas Rawat Bayi",
          name: "pilihKelas",
          placeholder: formValues.pilihKelas,
          options: [
            {
              label: formValues.pilihKelas,
              value: formValues.pilihKelas,
            },
            {
              label: "Kelas 1",
              value: "Kelas 1",
            },
            {
              label: "Isolasi",
              value: "Isolasi 1",
            },
          ],
          rules: { required: "Pilih Kelas Rawat Bayi is required" },
          colSize: 6,
        },
        {
          type: "select",
          label: "Pilih Kelas Rawat Bayi",
          name: "ruangan",
          placeholder: formValues.ruangan,
          options: [
            {
              label: formValues.ruangan,
              value: formValues.ruangan,
            },
            {
              label: "Kelas 1 101",
              value: "Kelas 1 101",
            },
            {
              label: "Isolasi 201",
              value: "Isolasi 201",
            },
          ],
          rules: { required: "Pilih Kelas Rawat Bayi is required" },
          colSize: 6,
        },

        {
          type: "select",
          label: "Pilih Kelas Rawat Bayi",
          name: "Nomor Tempat Tidur",
          placeholder: formValues.nomorTempatTidur,
          options: [
            {
              label: formValues.nomorTempatTidur,
              value: formValues.nomorTempatTidur,
            },
            {
              label: "107",
              value: "107",
            },
            {
              label: "205",
              value: "205",
            },
          ],
          rules: { required: "Pilih Kelas Rawat Bayi is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form Data Dikirim:", { ...formValues, ...data });
  };
  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Pasien Luar Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default AddPasienBayi;
