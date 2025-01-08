"use client";

import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { addPromo } from "@/lib/hooks/keanggotaan/add";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FormProvider, useForm } from "react-hook-form";
import { usePromos } from "@/lib/hooks/promo/index"; // Import the usePromos hook
import dataWilayah from "@/utils/dataWilayah";
import { Col, Row } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";

export default function PendaftaranFasilitas() {
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
        {
          type: "custom",
          colSize: 12,
          customRender: () => (
            <>
              <Row>
                <Col>
                  <SearchableSelectField
                    name="departemenSelect.select"
                    label="Departemen"
                    options={[
                      { label: "Poli Anak", value: "Poli Anak" },
                      {
                        label: "Poli Penyakit Dalam",
                        value: "Poli Penyakit Dalam",
                      },
                      { label: "Poli Gigi", value: "Poli Gigi" },
                      { label: "Poli Mata", value: "Poli Mata" },
                      { label: "Poli Bedah", value: "Poli Bedah" },
                      { label: "Poli Jantung", value: "Poli Jantung" },
                      { label: "Poli Paru", value: "Poli Paru" },
                      { label: "Poli Saraf", value: "Poli Saraf" },
                      {
                        label: "Poli Kulit dan Kelamin",
                        value: "Poli Kulit dan Kelamin",
                      },
                      { label: "Poli THT", value: "Poli THT" },
                      { label: "Poli Kandungan", value: "Poli Kandungan" },
                      {
                        label: "Poli Rehabilitasi Medis",
                        value: "Poli Rehabilitasi Medis",
                      },
                      { label: "Poli Urologi", value: "Poli Urologi" },
                      { label: "Poli Ortopedi", value: "Poli Ortopedi" },
                      { label: "Poli Geriatri", value: "Poli Geriatri" },
                    ]}
                    placeholder="Pilih Poli"
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <SearchableSelectField
                    name="komponenSelect.select"
                    label="komponen"
                    options={[
                      {
                        label: "AMBULANCE ZONA 1 (0-5KM)",
                        value: "ambulance_zona_1",
                      },
                      {
                        label: "AMBULANCE ZONA 2 (5-15KM)",
                        value: "ambulance_zona_2",
                      },
                      {
                        label: "AMBULANCE ZONA 3 (15-25KM)",
                        value: "ambulance_zona_3",
                      },
                      {
                        label: "AMBULANCE ZONA 4 (25-30KM)",
                        value: "ambulance_zona_4",
                      },
                      {
                        label: "JASA 1 PERAWAT RESCUE PASIEN",
                        value: "perawat_rescue_pasien",
                      },
                      {
                        label: "JASA 1 PERAWAT HOME VISIT DALAM KOTA",
                        value: "perawat_home_visit_dalam_kota",
                      },
                      {
                        label: "JASA DOKTER STANDBY AMBULANCE PER JAM",
                        value: "dokter_standby_ambulance",
                      },
                      {
                        label: "JASA DOKTER HOME VISIT DALAM KOTA",
                        value: "dokter_home_visit_dalam_kota",
                      },
                      {
                        label: "JASA DOKTER RESCUE PASIEN",
                        value: "dokter_rescue_pasien",
                      },
                    ]}
                    placeholder="Pilih Poli"
                    className="mb-3"
                  />
                </Col>
              </Row>
            </>
          ),
        },

        {
          type: "text",
          id: "daerahTujuan",
          label: "Daerah Tujuan",
          name: "daerahTujuan",
          placeholder: "daerah Tujuan",
          rules: { required: "Daerah Tujuan is required" },
          colSize: 3,
        },
        // {
        //   name: "jarak",
        //   placeholder: "Masukkan jarak",
        //   customRender: () => (
        //     <>
        //       <Row>
        //         <Col lg="3">
        //           <TextField
        //             id="kilometer"
        //             label="Kilometer"
        //             name="kilometer"
        //             type="number"
        //             placeholder="kilometer"
        //             rules={{
        //               required: "kilometer is required",
        //             }}
        //           />
        //         </Col>
        //         <Col lg="3">
        //           <TimeField
        //             type="time"
        //             id="kelebihanWaktu"
        //             label="Kelebihan Waktu"
        //             name="kelebihanWaktu"
        //             rules={{ required: "kelebihan waktu is required" }}
        //           />
        //         </Col>
        //       </Row>
        //     </>
        //   ),
        //   colSize: 6,
        // },
        {
          type: "distance",
          id: "kelebihanJarak",
          label: "kelebihan Jarak",
          name: "kelebihanJarak",
          placeholder: "kilometer",
          rules: { required: "kelebihan jarak is required" },
          colSize: 3,
        },
        {
          type: "time",
          id: "kelebihanWaktu",
          label: "Kelebihan Waktu",
          name: "kelebihanWaktu",
          placeholder: "Kelebihan Waktu",
          rules: { required: "Kelebihan Waktu is required" },
          colSize: 3,
        },
        {
          type: "distance",
          id: "paramedis",
          label: "Jumlah Paramedis",
          name: "pararmedis",
          placeholder: "Paramedis",
          rules: { required: "Paramedis is required" },
          colSize: 3,
        },
        {
          type: "textarea",
          id: "catatan",
          label: "catatan",
          name: "catatan",
          placeholder: "catatan",
          rules: { required: "catatan is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "antarJemput",
          label: "Antar Jemput",
          name: "antarJemput",
          placeholder: "Pilih Antar Jemput",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak", value: "tidak" },
          ],
          rules: { required: "Antar Jemput is required" },
          className: "my-3",
          colSize: 6,
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
        title="Registrasi Ambulance"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}
