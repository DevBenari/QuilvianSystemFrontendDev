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

export default function PendaftaranPasienLab() {
  const { kecamatans } = useKecamatans();
  const { promos, loading, error } = usePromos();
  const [promosState, setPromosState] = useState([]);
  const datas = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [province, setProvince] = useState("");
  const changeProvince = (val) => {
    setProvince("");
    kecamatans.forEach((kecamatan) => {
      if (kecamatan.subDistrictId === val) {
        // let province = getById(kecamatan.provinceId);
        // setProvince(province.namaProvinsi);
        setProvince(kecamatan.provinceId);
      }
    });
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  // fungsi provinsi

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

  // provinsi

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

  const promoHeaders = [
    "NO",
    "PEMERIKSAAN RADIOLOGI",
    "DOKTER PEMERIKSA",
    "HARGA",
    "ACTION",
  ];
  const promoMembers = promosState.map((promo, index) => ({
    no: index + 1,
    id: promo.promoId,
    kodePromo: promo.kodePromo || "-",
    namaPromo: promo.namaPromo || "-",
    keterangan: promo.keterangan || "-",
  }));
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
          onChange: (e) => handleChange("provinsi", e.target.value),
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
          onChange: (e) => handleChange("kabupaten", e.target.value),
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
          onChange: (e) => handleChange("kecamatan", e.target.value),
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
          onChange: (e) => handleChange("kelurahan", e.target.value),
        },
      ],
    },
    {
      section: "Detail Konsultasi",
      fields: [
        {
          type: "radio",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 12,
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
          colSize: 8,
        },
        {
          type: "date",
          id: "tglRegistrasi",
          label: "Tanggal Registrasi",
          name: "tglRegistrasi",
          rules: { required: "Tanggal Registrasi is required" },
          colSize: 8,
        },
        {
          type: "custom",
          id: "dirujuk",
          label: "Dirujuk",
          name: "dirujuk",
          placeholder: "Dirujuk",
          rules: { required: "Dirujuk is required" },
          customRender: () => (
            <>
              <div className="iq-header-title">
                <h4 className="card-title my-2"> Dirujuk </h4>
              </div>
              <Row>
                <Col lg="6">
                  <RadioInput
                    name="konsul"
                    options={[{ label: "Konsul", value: "konsul" }]}
                    className="d-flex gap-5 mt-2"
                    onChange={() => handleRadioChange("konsul")}
                  />
                </Col>
                <Col lg="12">
                  <SelectField
                    name="pilihDokter"
                    options={[
                      { label: "Dr. A", value: "dr_a" },
                      { label: "Dr. B", value: "dr_b" },
                      { label: "Dr. C", value: "dr_c" },
                    ]}
                    placeholder="Pilih Dokter"
                    className="mb-3"
                    onChange={(e) => handleSelectChange("konsul")}
                    disabled={selectedOption && selectedOption !== "konsul"}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <RadioInput
                    name="LuarRs"
                    options={[{ label: "Luar Rs", value: "LuarRs" }]}
                    className="d-flex gap-5 mt-2"
                    onChange={() => handleRadioChange("LuarRs")}
                  />
                </Col>
                <Col lg="12">
                  <SelectField
                    name="pilihRs"
                    options={[
                      { label: "Puskesmas", value: "puskesmas" },
                      { label: "Dr/Drg", value: "dr_drg" },
                      { label: "Maramedik", value: "maramedik" },
                      { label: "Dukun Terlatih", value: "dukun_terlatih" },
                      { label: "Kasus Polisi", value: "kasus_polisi" },
                      { label: "Keluarga", value: "keluarga" },
                    ]}
                    placeholder="Tipe RSU/RS/RB"
                    className="mb-3"
                    onChange={(e) => handleSelectChange("LuarRs")}
                    disabled={selectedOption && selectedOption !== "LuarRs"}
                  />
                </Col>
                <Row hidden={selectedOption !== "LuarRs"}>
                  <Col lg="6">
                    <TextField
                      label="Nama : "
                      name="namaLuarRs"
                      type="text"
                      placeholder="Enter Nama "
                      className="form-control mb-0"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nomor Telepon Luar Rs :"
                      name="Luar Rs"
                      type="text"
                      placeholder="Enter nomor telepon Luar Rs "
                      className="form-control mb-0"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Alamat  :"
                      name="alamatLuarRs"
                      type="text"
                      placeholder="Enter Alamat "
                      className="form-control mb-0"
                    />
                  </Col>
                </Row>
              </Row>
              <Row>
                <Col lg="12">
                  <RadioInput
                    name="atasPermintaanSendiri"
                    options={[
                      {
                        label: "Atas Permintaan Sendiri",
                        value: "atasPermintaanSendiri",
                      },
                    ]}
                    className="d-flex gap-5 mt-2 mb-3"
                    onChange={() => handleRadioChange("atasPermintaanSendiri")}
                  />
                </Col>
              </Row>
            </>
          ),
          colSize: 6,
        },
      ],
    },
    // {
    //   section: "Dirujuk",
    //   layout: "inline",
    //   fields: [
    //     {
    //       type: "radio",
    //       id: "dirujukOption",
    //       label: "Dirujuk",
    //       name: "dirujukOption",
    //       options: [
    //         { label: "Kursul", value: "kursul" },
    //         { label: "Luar Rs", value: "luarRs" },
    //         {
    //           label: "Atas Permintaan Sendiri",
    //           value: "atasPermintaanSendiri",
    //         },
    //       ],
    //       inline: true,
    //       rules: { required: "Please select an option for Dirujuk" },
    //       colSize: 4,
    //     },
    //     {
    //       type: "select",
    //       id: "kursulPromo",
    //       label: "Pilih Promo",
    //       name: "kursulPromo",
    //       placeholder: "Pilih Kursul",
    //       options: [
    //         { label: "Bad Anak Discount 20%", value: "badAnak" },
    //         { label: "Bad Dewasa Discount 10%", value: "badDewasa" },
    //       ],
    //       rules: { required: "Pilih Kursul is required" },
    //       colSize: 6,
    //       // Enable/disable based on selected radio option
    //       disabled: (watchValues) => watchValues.dirujukOption !== "kursul",
    //     },
    //     {
    //       type: "select",
    //       id: "rsType",
    //       label: "Pilih RS",
    //       name: "rsType",
    //       placeholder: "Pilih RS",
    //       options: [
    //         { label: "Rsu", value: "rsu" },
    //         { label: "Rsk", value: "rsk" },
    //         { label: "Rb", value: "rb" },
    //       ],
    //       rules: { required: "Pilih RS is required" },
    //       colSize: 6,
    //       disabled: (watchValues) => watchValues.dirujukOption !== "luarRs",
    //     },
    //   ],
    // },
    {
      section: "Kode Member",
      fields: [
        {
          type: "select",
          id: "pilihPromoo",
          label: "Pilih Promo",
          name: "pilihPromoo",
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
          options: [
            { label: "Patologi Klinik", value: "patologi_klinik" },
            { label: "Patologi Anatomi", value: "patologi_anatomi" },
            { label: "Mikrobiologi", value: "mikrobiologi" },
          ],
          rules: { required: "Tipe Pemeriksaan is required" },
          colSize: 6,
        },
        {
          type: "radio",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Diagnosa Awal",
          rules: { required: "Diagnosa Awal is required" },
          colSize: 6,
        },

        {
          type: "date",
          id: "tglSampling",
          label: "Tanggal Sampling",
          name: "tglSampling",
          rules: { required: "Tanggal Sampling is required" },
          colSize: 5,
        },
        {
          type: "time",
          id: "timeSampling",
          label: "Jam",
          name: "timeSampling",
          rules: { required: "time Sampling is required" },
          colSize: 2,
        },
        {
          type: "text",
          id: "cariNamaPemeriksa",
          label: "Cari Nama Pemeriksa:",
          name: "cariNamaPemeriksa",
          type: "text",
          placeholder: "Cari Nama Pemeriksa by name...",
          // onChange: { handleSearchByName },
        },
        {
          type: "custom",
          id: "setRadiologi",
          label: "setRadiologi Table",
          customRender: () => (
            <Container fluid>
              <Row>
                {/* <Col xs="12" lg="6">
                  <TextField
                    label="Cari Nama Pemeriksa:"
                    name="searchPromo"
                    type="text"
                    placeholder="Cari Nama Pemeriksa by name..."
                    onChange={(e) => handleSearchByName(e.target.value)}
                  />
                </Col> */}
                <Col lg="12" className="d-flex justify-content-center">
                  <Button className="btn btn-primary">
                    Set Pemeriksaan Radiologi
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  {loading && <div>Loading promos...</div>}
                  {error && <div className="text-danger">{error}</div>}
                  {!loading && !error && (
                    <DataTable
                      headers={promoHeaders}
                      data={promoMembers}
                      id="id"
                    />
                  )}
                </Col>
              </Row>
            </Container>
          ),
          colSize: 12,
        },
      ],
    },
    {
      fields: [
        {
          type: "table",
          id: "tableTindakan",
          label: "Table Tindakan",
          name: "tableTindakan",
          columns: ["Pemeriksaan Lab", "Jumlah", "Action"],
          rules: { required: "Table Tindakan is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "dokterLab",
          label: "Dokter Lab",
          name: "dokterLab",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. X", value: "dr_x" },
            { label: "Dr. Y", value: "dr_y" },
            { label: "Dr. Z", value: "dr_z" },
          ],
          rules: { required: "Dokter Lab is required" },
          colSize: 6,
        },
        {
          type: "radio",
          id: "pemeriksaanTestCito",
          label: "Pemeriksaan Test Cito",
          name: "pemeriksaanTestCito",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 12,
        },
        {
          type: "radio",
          id: "cetakkartu",
          label: "Cetak Kartu",
          name: "cetakkartu",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "Surat Rujukan is required" },
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
        title="Registrasi Radiologi"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}
