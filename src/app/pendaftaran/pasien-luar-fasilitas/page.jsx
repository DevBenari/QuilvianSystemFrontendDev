"use client";

import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { addPromo } from "@/lib/hooks/keanggotaan/add";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FormProvider, useForm } from "react-hook-form";

import dataWilayah from "@/utils/dataWilayah";
import FasilitasTable from "@/components/view/fasilitas/fasilitasTable";
import { dataFasilitas } from "@/utils/dataFasilitas";
export default function PendaftaranRehabilitasiMedik() {
  // const { promos, loading, error } = usePromos();
  // const [promosState, setPromosState] = useState([]);
  const router = useRouter();
  // const [selectedOption, setSelectedOption] = useState(null);
  // change provinsi berdasarkan api

  // function handle

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const { setValue } = useForm();

  const [pasienSelectedProvinsi, setPasienSelectedProvinsi] = useState("");
  const [pasienFilteredKabupaten, setPasienFilteredKabupaten] = useState([]);
  const [pasienFilteredKecamatan, setPasienFilteredKecamatan] = useState([]);
  const [pasienFilteredKelurahan, setPasienFilteredKelurahan] = useState([]);

  const handleChange = useCallback(
    (field, value) => {
      if (field === "provinsi") {
        // Set provinsi yang dipilih
        setPasienSelectedProvinsi(value);

        // Filter data kabupaten berdasarkan provinsi
        const selectedProvinsi = dataWilayah.find(
          (item) => item.provinsi === value
        );
        setPasienFilteredKabupaten(
          selectedProvinsi ? selectedProvinsi.kabupaten : []
        );

        // Reset kecamatan dan kelurahan jika provinsi berubah
        setPasienFilteredKecamatan([]);
        setPasienFilteredKelurahan([]);
        setValue("pasien_provinsi", value);
        setValue("pasien_kabupaten", ""); // Reset kabupaten
        setValue("pasien_kecamatan", ""); // Reset kecamatan
        setValue("pasien_kelurahan", ""); // Reset kelurahan
      } else if (field === "kabupaten") {
        // Filter data kecamatan berdasarkan kabupaten
        const selectedKabupaten = pasienFilteredKabupaten.find(
          (item) => item.nama === value
        );
        setPasienFilteredKecamatan(
          selectedKabupaten ? selectedKabupaten.kecamatan : []
        );

        // Reset kelurahan jika kabupaten berubah
        setPasienFilteredKelurahan([]);
        setValue("pasien_kabupaten", value);
        setValue("pasien_kecamatan", ""); // Reset kecamatan
        setValue("pasien_kelurahan", ""); // Reset kelurahan
      } else if (field === "kecamatan") {
        // Filter data kelurahan berdasarkan kecamatan
        const selectedKecamatan = pasienFilteredKecamatan.find(
          (item) => item.nama === value
        );
        setPasienFilteredKelurahan(
          selectedKecamatan ? selectedKecamatan.kelurahan : []
        );
        setValue("pasien_kecamatan", value);
        setValue("pasien_kelurahan", ""); // Reset kelurahan
      } else if (field === "kelurahan") {
        // Set kelurahan yang dipilih
        setValue("pasien_kelurahan", value);
      }
    },
    [pasienFilteredKabupaten, pasienFilteredKecamatan, setValue]
  );

  //  function promo
  // useEffect(() => {
  //   if (promos) {
  //     setPromosState(promos);
  //   }
  // }, [promos]);
  // const formFieldsPromo = [
  //   {
  //     name: "promoByNama",
  //     label: "Search",
  //     type: "text",
  //     placeholder: "Search Promo by Name...",
  //     onChange: (e) => handleSearchByName(e.target.value),
  //   },
  // ];

  // const handleSearchByName = (searchValue) => {
  //   const filteredPromos = promos.filter((promo) =>
  //     promo.namaPromo.toLowerCase().includes(searchValue.trim().toLowerCase())
  //   );
  //   setPromosState(filteredPromos.length ? filteredPromos : promos);
  // };

  // const promoHeaders = ["NO", "PEMERIKSAAN LAB", "JUMLAH", "ACTION"];
  // const promoMembers = promosState.map((promo, index) => ({
  //   no: index + 1,
  //   id: promo.promoId,
  //   kodePromo: promo.kodePromo || "-",
  //   namaPromo: promo.namaPromo || "-",
  //   keterangan: promo.keterangan || "-",
  // }));

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
          type: "custom",
          label: "Fasilitas",
          customRender: () => <FasilitasTable tindakan={dataFasilitas} />,
          colSize: 12,
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
        title="Registrasi Pasien Luar Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}
