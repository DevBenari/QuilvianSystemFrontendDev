"use client";
import FormValidations from "@/components/features/formValidations/formValidations";

import React, { Fragment, useState, useEffect, useCallback, memo } from "react";
import { addPromo } from "@/lib/hooks/keanggotaan/add";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useKecamatans } from "@/lib/hooks/kecamatan/index";
import { getById } from "@/lib/hooks/province/getProvinceId";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import RadioInput from "@/components/ui/radio-input";
import { usePromos } from "@/lib/hooks/promo/index"; // Import the usePromos hook
import SelectField from "@/components/ui/select-field";
import dataWilayah from "@/utils/dataWilayah";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import SearchableSelectField from "@/components/ui/select-field-search";
import { dataDokter, paketMcu } from "@/utils/SearchSelect";

const PendaftaranPasienLuarMedicalCheckUp = memo(() => {
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
      ],
    },
    {
      section: "Detatil Konsultasi ",
      fields: [
        {
          type: "select",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Tipe Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipepenjamin",
          name: "tipePenjamin",
          hide: (watchValues) => watchValues.penjamin !== "penjamin",

          label: "Tipe penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "BPJS", value: "bpjs" },
            { label: "Non BPJS", value: "non-bpjs" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglRegistrasi",
          label: "Tanggal Registrasi",
          name: "tglRegistrasi",
          rules: { required: "Tanggal Registrasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tindakanMedik",
          name: "tindakanMedik",
          label: "Daftar Tindakan Rehabilitasi Medik",
          placeholder: "Daftar Tindakan Rehabilitasi Medik",
          options: [
            { label: "jasa suntik", value: "jasaSuntik" },
            { label: "jasa medik", value: "jasaMedik" },
            { label: "latihan ambulasi", value: "latihanAmbulasi" },
            { label: "latihan lingkup gerak", value: "latihanLingkupGerak" },
          ],
          rules: { required: "Daftar Tindakan Rehabilitasi Medik is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Dokter Pemeriksa",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          rules: { required: "Dokter Lab is required" },
          colSize: 6,
        },

        {
          type: "custom",
          id: "paketMcu",
          label: "paketMcu",
          name: "paketMcu",
          placeholder: "paketMcu",
          rules: { required: "paketMcu is required" },
          customRender: () => (
            <>
              <Row>
                <Col lg="6">
                  <SearchableSelectField
                    name="paketMcu"
                    label="Paket MCU"
                    options={paketMcu}
                    placeholder="Pilih paketMcu"
                    rules={{ required: "paketMcu harus dipilih" }}
                  />
                </Col>
                <Col lg="6">
                  <SearchableSelectField
                    name="dokter"
                    label="Dokter Pemeriksa"
                    options={dataDokter}
                    placeholder="Pilih Dokter"
                    rules={{ required: "Dokter harus dipilih" }}
                    className={"mb-3"}
                  />
                </Col>
              </Row>
            </>
          ),
          colSize: 12,
        },
        {
          type: "select",
          id: "pilihPromoo",
          label: "Pilih Promo",
          name: "pilihPromoo",
          placeholder: "Pilih Promo",
          options: [
            { label: "Voucher Potongan", value: "voucher_potongan" },
            { label: "RS MMC Dokter", value: "rs_mmc_dokter" },
            { label: "RS MMC Tunai (10%)", value: "rs_mmc_tunai" },
            { label: "VIP BKM Tanpa Part", value: "vip_bkm" },
          ],
          rules: { required: "Pilih Promo is required" },
          colSize: 6,
        },

        {
          type: "select",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          placeholder: "Surat Rujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },
      ],
    },

    {
      section: "Dirujuk",
      fields: [
        {
          type: "select",
          id: "dirujuk",
          name: "dirujuk",
          label: "Pilih Rujukan",
          placeholder: "Pilih Rujukan",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          colSize: 12,
          className: "mb-3",
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          name: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "konsul", // Tampilkan hanya untuk "konsul"
          colSize: 6,
          className: "mb-3",
        },
        {
          type: "select",
          id: "tipeRs",
          name: "tipeRs",
          label: "Tipe RSU/RS/RB",
          placeholder: "Pilih Tipe RSU/RS/RB",
          options: [
            { label: "Puskesmas", value: "puskesmas" },
            { label: "Dr/Drg", value: "dr_drg" },
            { label: "Maramedik", value: "maramedik" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "namaLuarRs",
          name: "namaLuarRs",
          label: "Nama",
          placeholder: "Masukkan Nama",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "teleponLuarRs",
          name: "teleponLuarRs",
          label: "Nomor Telepon",
          placeholder: "Masukkan Nomor Telepon",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
          className: "mb-3",
        },
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Diagnosa Awal",
          rules: { required: "Diagnosa Awal is required" },
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
        title="Registrasi Pasien Medical CheckUp"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
});

PendaftaranPasienLuarMedicalCheckUp.displayName =
  "PendaftaranPasienLuarMedicalCheckUp";

export default PendaftaranPasienLuarMedicalCheckUp;
