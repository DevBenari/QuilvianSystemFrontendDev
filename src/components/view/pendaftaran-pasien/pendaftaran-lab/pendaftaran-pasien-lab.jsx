"use client";

import React, { Fragment, useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import dataWilayah from "@/utils/dataWilayah";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import {  tindakanDataConfig } from "@/utils/dataTindakan";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
export default function PendaftaranPasienLab() {
  const { setValue } = useForm();
  // fungsi untuk melakukan select provinsi
  const {
    selectedNegara,
    setSelectedNegara,
    selectedProvinsi,
    setSelectedProvinsi,
    selectedKabupaten,
    setSelectedKabupaten,
    selectedKecamatan,
    setSelectedKecamatan,
    selectedKelurahan,
    setSelectedKelurahan,
    negaraOptions,
    provinsiOptions,
    kabupatenOptions,
    kecamatanOptions,
    kelurahanOptions,
    negaraLoading,
    provinsiLoading,
    kabupatenLoading,
    kecamatanLoading,
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupaten,
    handleLoadMoreKecamatan,
    handleLoadMoreKelurahan
  } = UseSelectWilayah();

  useEffect(() => {
          if (selectedNegara) {
            const isIndonesia = negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia';
            if (!isIndonesia) {
              // Reset nilai provinsi dan kabupaten jika bukan Indonesia
              setValue('provinsiId', null);
              setValue('kabupatenKotaId', null);
            }
          }
        }, [selectedNegara, setValue, negaraOptions]);
      console.log(selectedKecamatan)

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
          type: "select",
          id: "negaraId",
          label: "Negara",
          name: "negaraId",
          placeholder: "Pilih Negara",
          options: negaraOptions,
          isLoading: negaraLoading,
          onChange: (selected) => {
            setSelectedNegara(selected?.value);
            // Reset nilai provinsi dan kabupaten
            setValue('provinsiId', null);
            setValue('kabupatenKotaId', null);
          },
          onMenuScrollToBottom: handleLoadMoreNegara,
          rules: { required: "Negara harus dipilih" },
          colSize: 6
        },
        {
            type: "select",
            id: "provinsiId",
            label: "Provinsi",
            name: "provinsiId",
            placeholder: "Pilih Provinsi",
            options: provinsiOptions,
            isLoading: provinsiLoading,
            onChange: (selected) => {
                setSelectedProvinsi(selected?.value);
                // Reset nilai kabupaten ketika provinsi berubah
                setValue('kabupatenKotaId', null);
            },
            onMenuScrollToBottom: handleLoadMoreProvinsi,
            disabled: !selectedNegara || (
                negaraOptions.find(opt => opt.value === selectedNegara)?.label !== 'Indonesia'
            ),
            rules: { 
                required: {
                value: selectedNegara && negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia',
                message: "Provinsi harus dipilih untuk warga Indonesia"
                }
            },
            colSize: 6
        },
        {
            type: "select",
            id: "kabupatenKotaId",
            label: "Kabupaten/Kota",
            name: "kabupatenKotaId",
            placeholder: "Pilih Kabupaten/Kota",
            options: kabupatenOptions,
            // isLoading: kabupatenLoading,
            onChange: (selected) => setSelectedKabupaten(selected?.value),
            onMenuScrollToBottom: handleLoadMoreKabupaten,
            disabled: !selectedProvinsi,
            rules: { 
                required: {
                value: selectedNegara && negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia',
                message: "Kabupaten/Kota harus dipilih untuk warga Indonesia"
                }
            },
            colSize: 6
        },
        {
            type: "select",
            id: "kecamatanId",
            label: "Kecamatan",
            name: "kecamatanId",
            placeholder: "Pilih Kecamatan",
            options: kecamatanOptions,
            // isLoading: kecamatanLoading,
            onChange: (selected) => setSelectedKecamatan(selected?.value),
            onMenuScrollToBottom: handleLoadMoreKecamatan,
            disabled: !selectedKabupaten,
            rules: { 
                required: {
                    value: selectedNegara && negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia',
                    message: "Provinsi harus dipilih untuk warga Indonesia"
                }
            },
            colSize: 6
        },
        {
            type: "select",
            id: "kelurahanId",
            label: "Kelurahan",
            name: "kelurahanId",
            placeholder: "Pilih Kelurahan",
            options: kelurahanOptions,
            onChange: (selected) => setSelectedKelurahan(selected?.value),
            onMenuScrollToBottom: handleLoadMoreKelurahan,
            disabled: !selectedKecamatan,
            rules: { 
                required: {
                    value: selectedNegara && negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia',
                    message: "Provinsi harus dipilih untuk warga Indonesia"
                }
            },
            colSize: 6
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
      fields: [
        {
          type: "select",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 8,
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
      ],
    },
    {
      section: "Dirujuk",
      fields: [
        {
          type: "select",
          id: "dirujuk",
          name: "dirujuk",
          placeholder: "Pilihan Rujukan ",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          colSize: 8,
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
      ],
    },
    {
      section: "Kode Member",
      fields: [
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
          id: "tipePemeriksaan",
          label: "Tipe Pemeriksaan",
          name: "tipePemeriksaan",
          placeholder: "Tipe Pemeriksaan",
          options: [
            { label: "Patologi Klinik", value: "patologi_klinik" },
            { label: "Patologi Anatomi", value: "patologi_anatomi" },
            { label: "Mikrobiologi", value: "mikrobiologi" },
          ],
          rules: { required: "Tipe Pemeriksaan is required" },
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
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Diagnosa Awal",
          rules: { required: "Diagnosa Awal is required" },
          colSize: 12,
        },

        {
          type: "date",
          id: "tglSampling",
          label: "Tanggal Sampling",
          name: "tglSampling",
          rules: { required: "Tanggal Sampling is required" },
          colSize: 4,
        },
        {
          type: "time",
          id: "timeSampling",
          label: "Jam",
          name: "timeSampling",
          rules: { required: "time Sampling is required" },
          colSize: 2,
        },
      ],
    },
    {
      section: "Tindakan",
      fields: [
        {
          type: "custom",
          label: "Tindakan Data Table",
          customRender: () => (
            <TindakanTableHarga
              tindakan={tindakanDataConfig}
              placeholder="Masukkan Nama Tindakan"
              label="Tindakan Laboratorium"
              labelKey="name"
              ValueKey="id"
              hargaKey="harga"
              rules={{ required: "Tindakan Laboratorium is required" }}
            />
          ),
          colSize: 12,
        },
      ],
    },
    {
      fields: [
        {
          type: "select",
          id: "dokterLab",
          label: "Dokter Lab",
          name: "dokterLab",
          placeholder: "Pilih Dokter",
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
          type: "select",
          id: "pemeriksaanTestCito",
          label: "Pemeriksaan Test Cito",
          name: "pemeriksaanTestCito",
          placeholder: "Pemeriksaan Test Cito",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi laboratorium"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/pendaftaran/pendaftaran-pasien-laboratorium"}
        isAddMode={true}
      />
    </Fragment>
  );
}
