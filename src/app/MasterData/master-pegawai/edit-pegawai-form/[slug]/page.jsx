"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useForm } from "react-hook-form";
import {
  editPegawai,
  PegawaiById,
} from "@/lib/hooks/masterData/master-pegawai";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";

const PegawaiEditForm = ({ params }) => {
  const { setValue } = useForm();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Received slug:", params.slug);

        // Extract ID from slug
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        if (!id) {
          throw new Error("Invalid ID extracted from slug");
        }

        // Fetch data by ID
        const user = await PegawaiById(id);
        console.log("Fetched user data:", user);

        if (!user) {
          throw new Error("User not found");
        }

        // Set user data
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug, router]);

  const handleSubmit = async (data) => {
    console.log("data", data);
    // try {
    //     const id = extractIdFromSlug(params.slug);

    //     const response = await fetch(`/api/users/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     if (!response.ok) throw new Error('Update failed');

    //     setIsEditing(false);
    //     toast.success('User updated successfully');
    //     // Refresh user data
    //     const updatedData = await response.json();
    //     setUserData(updatedData);
    // } catch (error) {
    //     console.error('Error updating:', error);
    //     toast.error('Failed to update user');
    // }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // fungsi untuk melakukan select provinsi
  const {
    pasienSelectedProvinsi,
    pasienFilteredKabupaten,
    pasienFilteredKecamatan,
    pasienFilteredKelurahan,
    handleChange,
  } = UseSelectWilayah(setValue, dataWilayah);

  const formFields = [
    {
      fields: [
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
          id: "noIdentitas",
          label: "No Identitas / KTP",
          name: "noIdentitas",
          placeholder: "Enter No Identitas / KTP",
          rules: { required: "No Identitas / KTP is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nik",
          label: "Nomer Identitas Keluarga / NIK",
          name: "nik",
          placeholder: "NIK",
          rules: { required: "NIK is required" },
          colSize: 6,
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
          id: "tanggalLahir",
          label: "Tanggal Lahir",
          name: "tanggalLahir",
          placeholder: "Tanggal Lahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama Keluarga",
          rules: { required: "Nama Keluarga is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaKel",
          label: "Nama Ayah/Ibu/Suami/Istri",
          name: "namaKel",
          placeholder: "Nama Ayah/Ibu/Suami/Istri",
          rules: { required: "Nama Ayah/Ibu/Suami/Istri is required" },
          colSize: 6,
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
          id: "agama",
          label: "Agama",
          name: "agama",
          placeholder: "Agama",
          options: [
            { label: "Islam", value: "Islam" },
            { label: "Kristen", value: "Kristen" },
            { label: "Katolik", value: "Katolik" },
            { label: "Hindu", value: "Hindu" },
            { label: "Buddha", value: "Buddha" },
            { label: "Konghucu", value: "Konghucu" },
          ],
          rules: { required: "Agama is required" },
          colSize: 6,
        },
        {
          type: "radio",
          id: "kewarganegaraan",
          label: "Kewarganegaraan",
          name: "kewarganegaraan",
          options: [
            { label: "WNI", value: "WNI" },
            { label: "WNA", value: "WNA" },
          ],
          rules: { required: "Agama is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "negara",
          label: "Negara",
          name: "negara",
          placeholder: "Negara",
          options: [
            { label: "Amerika", value: "Amerika" },
            { label: "Malaysia", value: "Malaysia" },
            { label: "Singapura", value: "Singapura" },
            { label: "Jepang", value: "Jepang" },
            { label: "Spanyol", value: "Spanyol" },
            { label: "Italia", value: "Italia" },
          ],
          rules: { required: "Negara is required" },
          colSize: 6,
          hide: (watchValues) => watchValues.kewarganegaraan !== "WNA",
        },
        {
          type: "select",
          id: "pendidikanTerakhir",
          label: "Pendidikan Terakhir",
          name: "pendidikanTerakhir",
          placeholder: "Pendidikan Terakhir",
          options: [
            { label: "SD", value: "SD" },
            { label: "SMP", value: "SMP" },
            { label: "SMA", value: "SMA" },
            { label: "S1", value: "S1" },
            { label: "S2", value: "S2" },
            { label: "S3", value: "S3" },
          ],
          rules: { required: "Pendidikan Terakhir is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noTelepon",
          label: "No Telepon",
          name: "noTelepon",
          placeholder: "No Telepon",
          rules: { required: "No Telepon is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "pekerjaan",
          label: "Pekerjaan",
          name: "pekerjaan",
          placeholder: "Pekerjaan",
          rules: { required: "Pekerjaan is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tenagaKesehatan",
          label: "Tenaga Medis/Non-Medis",
          name: "tenagaKesehatan",
          placeholder: "Pilih Tenaga Medis/Non-Medis",
          options: [
            { label: "Tenaga Medis", value: "Tenaga Medis" },
            { label: "Non-Medis", value: "Non-Medis" },
          ],
          rules: { required: "Tenaga Medis/Non-Medis is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Alamat Pegawai",
      fields: [
        {
          type: "textarea",
          id: "alamat",
          label: "Alamat Domisili Pegawai",
          name: "alamat",
          placeholder: "Alamat",
          rules: { required: "Alamat is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "pasien_provinsi",
          label: "Provinsi Pasien",
          name: "pasien_provinsi",
          placeholder: "Pilih Provinsi",
          options: dataWilayah.map((item) => ({
            label: item.provinsi,
            value: item.provinsi,
          })),
          rules: { required: "Provinsi is required" },
          colSize: 6,
          onChangeCallback: (value) =>
            handleChange("pasien", "provinsi", value),
        },
        {
          type: "select",
          id: "pasien_kabupaten",
          label: "Kabupaten Pasien",
          name: "pasien_kabupaten",
          placeholder: "Pilih Kabupaten",
          options: pasienFilteredKabupaten.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          rules: { required: "Kabupaten is required" },
          colSize: 6,
          onChangeCallback: (value) =>
            handleChange("pasien", "kabupaten", value),
        },
        {
          type: "select",
          id: "pasien_kecamatan",
          label: "Kecamatan Pasien",
          name: "pasien_kecamatan",
          placeholder: "Pilih Kecamatan",
          options: pasienFilteredKecamatan.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          rules: { required: "Kecamatan is required" },
          colSize: 6,
          onChangeCallback: (value) =>
            handleChange("pasien", "kecamatan", value),
        },
        {
          type: "select",
          id: "pasien_kelurahan",
          label: "Kelurahan Pasien",
          name: "pasien_kelurahan",
          placeholder: "Pilih Kelurahan",
          options: pasienFilteredKelurahan.map((item) => ({
            label: item,
            value: item,
          })),
          rules: { required: "Kelurahan is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "kodePos",
          label: "Kode Pos",
          name: "kodePos",
          placeholder: "Kode Pos",
          rules: { required: "Kode Pos is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Deskripsi Pekerjaan",
      fields: [
        {
          type: "text",
          id: "title",
          label: "Title",
          name: "title",
          placeholder: "Title",
          rules: { required: "Title is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "departement",
          label: "Departement",
          name: "departement",
          placeholder: "Departement",
          options: [
            { label: "Farmasi", value: "farmasi" },
            { label: "Gizi", value: "gizi" },
            { label: "Radiologi", value: "radiologi" },
            { label: "Laboratorium", value: "laboratorium" },
            { label: "Bedah", value: "bedah" },
            { label: "Rawat Inap", value: "rawatInap" },
            { label: "Poli Anak", value: "poliAnak" },
            { label: "Poli Penyakit Dalam", value: "poliPenyakitDalam" },
          ],
          rules: { required: "Departement is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "jenisKontrak",
          label: "Jenis Kontrak",
          name: "jenisKontrak",
          placeholder: "Jenis Kontrak",
          rules: { required: "Jenis Kontrak is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalMasuk",
          label: "Tanggal Masuk",
          name: "tanggalMasuk",
          placeholder: "Tanggal Masuk",
          rules: { required: "Tanggal Masuk is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalKeluar",
          label: "Tanggal Keluar",
          name: "tanggalKeluar",
          placeholder: "Tanggal Keluar",
          rules: { required: "Tanggal Keluar is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalAwalKontrak",
          label: "Tanggal Awal Kontrak",
          name: "tanggalAwalKontrak",
          placeholder: "Tanggal Awal Kontrak",
          rules: { required: "Tanggal Awal Kontrak is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalAkhirKontrak",
          label: "Tanggal Akhir Kontrak",
          name: "tanggalAkhirKontrak",
          placeholder: "Tanggal Akhir Kontrak",
          rules: { required: "Tanggal Akhir Kontrak is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "asuransi",
          label: "Asuransi",
          name: "asuransi",
          placeholder: "Asuransi",
          rules: { required: "Asuransi is required" },
          colSize: 6,
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="iq-card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">
            User not found or error loading data
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Pegawai"
        formConfig={formFields.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Isi field dengan userData
          })),
        }))}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-pegawai/daftar-pegawai"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default PegawaiEditForm;
