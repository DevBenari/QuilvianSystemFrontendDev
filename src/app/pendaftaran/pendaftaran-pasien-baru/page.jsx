"use client";
import TextField from "@/components/ui/text-field";
import React, { useEffect, useState, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
import { dataWilayah } from "@/utils/config";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
const PendaftaranPasienBaru = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      no_rm: "",
      no_ktp: "",
      namaLengkapPasien: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      pasienPrioritas: "",
      statusPasien: "",
      suku: "",
      agama: "",
      kewarganegaraan: "",
      negara: "",
      pasien_provinsi: "",
      pasien_kabupaten: "",
      pasien_kecamatan: "",
      pasien_kelurahan: "",
      // Data keluarga
      keluarga_provinsi: "",
      keluarga_kabupaten: "",
      keluarga_kecamatan: "",
      keluarga_kelurahan: "",
      photoPasien: "",
    },
    mode: "onSubmit",
  });

  const { setValue, watch } = methods;
  const title = watch("title");
  const kewarganegaraan = watch("kewarganegaraan");
  const negara = watch("negara");

  useEffect(() => {
    // Hanya memanggil setValue jika nilai title berubah
    if (title === "Mr" || title === "Tn" || title === "Ms") {
      setValue("jenisKelamin", "Laki-Laki");
    } else if (
      title === "Mrs" ||
      title === "Miss" ||
      title === "Ny" ||
      title === "Nn"
    ) {
      setValue("jenisKelamin", "Perempuan");
    } else {
      setValue("jenisKelamin", "");
    }
  }, [title, setValue]);

  useEffect(() => {
    // Mengoptimalkan pemanggilan setValue berdasarkan kewarganegaraan dan negara
    if (kewarganegaraan === "WNI" && negara !== "Indonesia") {
      setValue("negara", "Indonesia");
    } else if (kewarganegaraan === "WNA" && negara !== negara) {
      setValue("negara", negara);
    }
  }, [kewarganegaraan, negara, setValue]);

  const [pasienSelectedProvinsi, setPasienSelectedProvinsi] = useState("");
  const [pasienFilteredKabupaten, setPasienFilteredKabupaten] = useState([]);
  const [pasienFilteredKecamatan, setPasienFilteredKecamatan] = useState([]);
  const [pasienFilteredKelurahan, setPasienFilteredKelurahan] = useState([]);

  const [keluargaSelectedProvinsi, setKeluargaSelectedProvinsi] = useState("");
  const [keluargaFilteredKabupaten, setKeluargaFilteredKabupaten] = useState(
    []
  );
  const [keluargaFilteredKecamatan, setKeluargaFilteredKecamatan] = useState(
    []
  );
  const [keluargaFilteredKelurahan, setKeluargaFilteredKelurahan] = useState(
    []
  );

  // Gunakan useCallback untuk mencegah pembuatan ulang fungsi handleProvinsiChange
  const handleChange = useCallback(
    (type, field, value) => {
      if (type === "pasien") {
        if (field === "provinsi") {
          setPasienSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setPasienFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("pasien_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = pasienFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setPasienFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("pasien_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = pasienFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setPasienFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("pasien_kecamatan", value);
        }
      } else if (type === "keluarga") {
        if (field === "provinsi") {
          setKeluargaSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setKeluargaFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("keluarga_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = keluargaFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("keluarga_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = keluargaFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("keluarga_kecamatan", value);
        }
      }
    },
    [
      pasienFilteredKabupaten,
      pasienFilteredKecamatan,
      keluargaFilteredKabupaten,
      keluargaFilteredKecamatan,
      setValue,
    ]
  );

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <Col lg="12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className="card-title tracking-wide">
                {" "}
                Form Pendaftaran Identitas Pasien Baru
              </h3>
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="iq-card-header m-1">
                <SelectField
                  name="penjamin"
                  label="Penjamin"
                  options={[
                    { label: "BPJS", value: "bpjs" },
                    { label: "Non BPJS", value: "non-bpjs" },
                  ]}
                  placeholder="Pilih Penjamin"
                  rules={{ required: "Penjamin is required" }}
                  className="mb-3"
                />
              </div>
              <div className="iq-card-header m-1">
                <div className="iq-header-title">
                  <h4 className="card-title my-2 "> Identitas Pasien *</h4>
                </div>
                <Row>
                  <Col lg="12" className="my-3 ">
                    <div className="d-flex gap-5 ">
                      <RadioInput
                        name="title"
                        label="Title *"
                        options={[
                          { label: "Tn.", value: "Tn" },
                          { label: "Ny.", value: "Ny" },
                          { label: "Nn.", value: "Nn" },
                          { label: "An.", value: "An" },
                          { label: "By.", value: "By" },
                          { label: "Sdr.", value: "Sdr" },
                          { label: "Mr.", value: "Mr" },
                          { label: "Mrs.", value: "Mrs" },
                          { label: "Miss.", value: "Miss" },
                        ]}
                        rules={{ required: "title is required" }}
                        className="d-flex gap-5 "
                      />
                    </div>
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="No.RM Lama :"
                      name="no_rm"
                      type="text"
                      placeholder="Enter No RM"
                      className="form-control mb-0"
                      rules={{
                        required: "No RM Lama is required",
                        pattern: {
                          value: 2,
                          message: "Invalid username format",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nama Lengkap :"
                      name="namaLengkapPasien"
                      type="text"
                      placeholder="Enter Nama Lengkap Sendiri"
                      className="form-control mb-0"
                      rules={{
                        required: "Nama Lengkap Sendiri is required",
                        pattern: {
                          value: 2,
                          message: "Invalid Nama Lengkap Sendiri",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="No Identitas Penduduk :"
                      name="no_ktp"
                      type="text"
                      placeholder="Enter No Identitas Penduduk "
                      className="form-control mb-0"
                      rules={{
                        required: "Nama Lengkap Sendiri is required",
                        pattern: {
                          value: 2,
                          message: "Invalid Nama Lengkap Sendiri",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasienPrioritas"
                      label="Pasien Prioritas"
                      options={[
                        { label: "Ya", value: "Ya" },
                        { label: "Tidak", value: "Tidak" },
                      ]}
                      placeholder="Pilih Pasien Prioritas"
                      rules={{ required: "Pasien Prioritas is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Tempat Lahir :"
                      name="tempatLahir"
                      type="text"
                      placeholder="Enter Nama Lengkap Sendiri"
                      className="form-control mb-0"
                      rules={{
                        required: "Nama Lengkap Sendiri is required",
                        pattern: {
                          value: 2,
                          message: "Invalid Nama Lengkap Sendiri",
                        },
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <DateInput
                      name="tanggalLahir"
                      label="Tanggal Lahir"
                      placeholder={"Enter Tanggal Lahir"}
                      rules={{ required: "Tanggal lahir harus diisi" }} // Aturan validasi
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="jenisKelamin"
                      label="Jenis Kelamin"
                      options={[
                        { label: "Laki-Laki", value: "Laki-Laki" },
                        { label: "Perempuan", value: "Perempuan" },
                      ]}
                      placeholder="Pilih Jenis Kelamin"
                      rules={{ required: "Jenis Kelamin is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="statusPasien"
                      label="Status"
                      options={[
                        { label: "Belum Menikah", value: "Belum Menikah" },
                        { label: "Menikah ", value: "Menikah" },
                        { label: "Duda Keren", value: "Duda Keren" },
                        { label: "Janda Anggun", value: "Janda Anggun" },
                      ]}
                      placeholder="Pilih Status"
                      rules={{ required: "Status is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Suku :"
                      name="suku"
                      type="text"
                      placeholder="Enter Suku"
                      className="form-control mb-0"
                      rules={{
                        required: "suku is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="agama"
                      label="Agama"
                      options={[
                        { label: "Islam", value: "Islam" },
                        { label: "Kristen ", value: "Kristen" },
                        { label: "Protestan", value: "Protestan" },
                        { label: "Katolik", value: "Katolik" },
                        { label: "Hindu", value: "Hindu" },
                        { label: "Budha", value: "Budha" },
                        { label: "Konghucu", value: "Konghucu" },
                      ]}
                      placeholder="Pilih Agama"
                      rules={{ required: "Agama is required" }}
                      className="mb-3"
                    />
                  </Col>

                  <Col lg="12" className="my-3 ">
                    <div className="d-flex gap-5 ">
                      <RadioInput
                        name="kewarganegaraan"
                        label="Kewarganegaraan *"
                        options={[
                          { label: "WNI", value: "WNI" },
                          { label: "WNA", value: "WNA" },
                        ]}
                        rules={{ required: "kewarganegaraan is required" }}
                        className="d-flex gap-5 "
                      />
                    </div>
                    {kewarganegaraan === "WNA" && (
                      <Col lg="6">
                        <SelectField
                          name="negara"
                          label="Negara"
                          options={[
                            { label: "Amerika", value: "amerika" },
                            { label: "Papua Nugini", value: "papuaNugini" },
                            { label: "Nigeria", value: "nigeria" },
                            { label: "Mesir", value: "mesir" },
                            { label: "Selandia Baru", value: "selandiaBaru" },
                            { label: "Thailand", value: "thailand" },
                          ]}
                          placeholder="Pilih Negara"
                          rules={{ required: "Negara is required" }}
                          className="mb-3"
                        />
                      </Col>
                    )}
                  </Col>

                  <Col lg="12">
                    <Col lg="6">
                      <SelectField
                        name="namaPendidikanTerakhir"
                        label="Pendidikan Terakhir"
                        options={[
                          { label: "Magister", value: "magister" },
                          { label: "Sarjana", value: "Sarjana" },
                          { label: "SMA", value: "SMA" },
                          { label: "SMP", value: "SMP" },
                          { label: "SD", value: "sd" },
                        ]}
                        placeholder="Pilih Pendidikan Terakhir"
                        rules={{ required: "Pendidikan Terakhir is required" }}
                        className="mb-3"
                      />
                    </Col>
                  </Col>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <TextArea
                          label="Alamat Domisili"
                          name="alamatDomisili"
                          placeholder="Masukkan alamat Domisili Pasien..."
                          rules={{
                            required: "alamat Domisili Pasien harus diisi",
                          }}
                          rows={5}
                        />
                      </Col>
                      <Col lg="6">
                        <TextArea
                          label="Informasi Alamat *"
                          name="informasiAlamat"
                          placeholder="Masukkan Informasi Alamat Pasien..."
                          rules={{
                            required: "Informasi Alamat Pasien harus diisi",
                          }}
                          rows={5}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_provinsi"
                      label="Provinsi Pasien"
                      options={dataWilayah.map((item) => ({
                        label: item.provinsi,
                        value: item.provinsi,
                      }))}
                      placeholder="Pilih Provinsi"
                      rules={{ required: "Provinsi pasien harus diisi" }}
                      className="mb-3"
                      onChangeCallback={(value) =>
                        handleChange("pasien", "provinsi", value)
                      } // gunakan `onChangeCallback`
                    />
                  </Col>

                  <Col lg="6">
                    <SelectField
                      name="pasien_kabupaten"
                      label="Kabupaten"
                      options={pasienFilteredKabupaten.map((item) => ({
                        label: item.nama,
                        value: item.nama,
                      }))}
                      placeholder="Pilih Kabupaten"
                      rules={{ required: "Kabupaten is required" }}
                      className="mb-3"
                      onChangeCallback={(value) =>
                        handleChange("pasien", "kabupaten", value)
                      }
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_kecamatan"
                      label="Kecamatan"
                      options={pasienFilteredKecamatan.map((item) => ({
                        label: item.nama,
                        value: item.nama,
                      }))}
                      placeholder="Pilih Kecamatan"
                      rules={{ required: "Kecamatan is required" }}
                      className="mb-3"
                      onChangeCallback={(value) =>
                        handleChange("pasien", "kecamatan", value)
                      }
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pasien_kelurahan"
                      label="Kelurahan"
                      options={pasienFilteredKelurahan.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      placeholder="Pilih Kelurahan"
                      rules={{ required: "Kelurahan is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="12">
                    <Col lg="3">
                      <TextField
                        label="Kode Pos :"
                        name="kodePos"
                        type="text"
                        placeholder="Enter Kode Pos..."
                        className="form-control mb-0"
                        rules={{
                          required: "Kode Pos is required",
                        }}
                      />
                    </Col>
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="No Telp :"
                      name="noTelp"
                      type="text"
                      placeholder="Enter your no Telp..."
                      className="form-control mb-0"
                      rules={{
                        required: "No Telp is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="No Hp :"
                      name="noHp"
                      type="text"
                      placeholder="Enter your no Hp..."
                      className="form-control mb-0"
                      rules={{
                        required: "No Hp is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Email :"
                      name="email"
                      type="email"
                      placeholder="Enter email Pasien..."
                      className="form-control mb-0"
                      rules={{
                        required: "Email is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="pekerjaan"
                      label="Pekerjaan"
                      options={[
                        { label: "Anggota DPR", value: "Anggota DPR" },
                        { label: "Anggota DPRD", value: "Anggota DPRD" },
                        { label: "BIARAWAN/TI", value: "BIARAWAN/TI" },
                        { label: "BUMN", value: "BUMN" },
                        { label: "BURUH", value: "BURUH" },
                        { label: "DOKTER", value: "DOKTER" },
                        { label: "GURU / DOSEN", value: "GURU / DOSEN" },
                        { label: "MAHASISWA", value: "MAHASISWA" },
                      ]}
                      placeholder="Pilih Pekerjaan"
                      rules={{ required: "Pekerjaan is required" }}
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nama Kantor :"
                      name="kantor"
                      type="text"
                      placeholder="Enter kantor Pasien..."
                      className="form-control mb-0"
                      rules={{
                        required: "kantor is required",
                      }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      label="Nomor Telepon Kantor :"
                      name="kantor"
                      type="text"
                      placeholder="Enter nomor telepon kantor Pasien..."
                      className="form-control mb-0"
                      rules={{
                        required: "nomor telepon kantor is required",
                      }}
                    />
                  </Col>
                  <Col lg="12">
                    <Col lg="6">
                      <TextArea
                        label="Alamat Kantor Pasien :"
                        name="alamatKantor"
                        placeholder="Masukkan Alamat Kantor Pasien..."
                        rules={{ required: "Alamat Kantor Pasien harus diisi" }}
                        rows={5}
                      />
                    </Col>
                  </Col>
                </Row>
              </div>
              <div className="iq-card-header m-1">
                <div className="iq-header-title">
                  <h4 className="card-title my-2 "> Keterangan Kesehatan *</h4>
                </div>
                <Col lg="2" className="my-3">
                  <TextField
                    label="Golongan Darah :"
                    name="golonganDarah"
                    type="text"
                    placeholder="Enter Golongan Darah..."
                    className="form-control mb-0"
                    rules={{
                      required: "Golongan Darah is required",
                    }}
                  />
                </Col>
                <Col lg="6" className="my-3">
                  <TextArea
                    label="Alergi :"
                    name="alergi"
                    placeholder="Enter riwayat alergi Pasien..."
                    rules={{
                      required: "data riwayat alergi pasien harus diisi",
                    }}
                    rows={5}
                  />
                </Col>
              </div>
              <div className="iq-card-header m-1">
                <div className="iq-header-title">
                  <h4 className="card-title my-2 "> Keterangan Keluarga *</h4>
                </div>
                <Col lg="6">
                  <TextField
                    label="Keluarga Terdekat yang dapat dihubungi :"
                    name="keluargaTerdekat"
                    type="text"
                    placeholder="Enter Keluarga Terdekat..."
                    className="form-control mb-0"
                    rules={{
                      required: "Keluarga Terdekat is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <SelectField
                    name="hubunganKeluarga"
                    label="Hubungan Keluarga * : "
                    options={[
                      { label: "Kandung", value: "Kandung" },
                      { label: "Ipar ", value: "Ipar" },
                      { label: "Paman", value: "Paman" },
                      { label: "Lainnya", value: "Lainnya" },
                    ]}
                    placeholder="Pilih Hubungan Keluarga"
                    rules={{ required: 'Hubungan Keluarga" is required' }}
                    className="mb-3"
                  />
                </Col>
                <Col lg="6">
                  <TextField
                    label="Karyawan Rumah Sakit :"
                    name="karyawanRumahSakit"
                    type="text"
                    placeholder="Enter Karyawan Rumah Sakit..."
                    className="form-control mb-0"
                    rules={{
                      required: "Karyawan Rumah Sakit is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <TextArea
                    label="Alamat Keluarga / Domisili Sekarang :*"
                    name="alamatKeluargaDomisili"
                    placeholder="Masukkan alamatKeluarga Domisili Saat ini..."
                    rules={{ required: "alamat Keluarga Domisili harus diisi" }}
                    rows={5}
                  />
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="6">
                      <SelectField
                        name="keluarga_provinsi"
                        label="Provinsi"
                        options={dataWilayah.map((item) => ({
                          label: item.provinsi,
                          value: item.provinsi,
                        }))}
                        placeholder="Pilih Provinsi"
                        rules={{ required: "Provinsi is required" }}
                        className="mb-3"
                        onChange={(e) =>
                          handleChange("keluarga", "provinsi", e.target.value)
                        }
                      />
                    </Col>
                    <Col lg="6">
                      <SelectField
                        name="keluarga_kabupaten"
                        label="Kabupaten"
                        options={keluargaFilteredKabupaten.map((item) => ({
                          label: item.nama,
                          value: item.nama,
                        }))}
                        placeholder="Pilih Kabupaten"
                        rules={{ required: "Kabupaten is required" }}
                        className="mb-3"
                        onChange={(e) =>
                          handleChange("keluarga", "kabupaten", e.target.value)
                        }
                      />
                    </Col>
                    <Col lg="6">
                      <SelectField
                        name="keluarga_kecamatan"
                        label="Kecamatan"
                        options={keluargaFilteredKecamatan.map((item) => ({
                          label: item.nama,
                          value: item.nama,
                        }))}
                        placeholder="Pilih Kecamatan"
                        rules={{ required: "Kecamatan is required" }}
                        className="mb-3"
                        onChange={(e) =>
                          handleChange("keluarga", "kecamatan", e.target.value)
                        }
                      />
                    </Col>
                    <Col lg="6">
                      <SelectField
                        name="keluarga_kelurahan"
                        label="Kelurahan"
                        options={keluargaFilteredKelurahan.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        placeholder="Pilih Kelurahan"
                        rules={{ required: "Kelurahan is required" }}
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Row>
                    <Col lg="6">
                      <TextField
                        label="No Telp :"
                        name="noTelp"
                        type="text"
                        placeholder="Enter your no Telp..."
                        className="form-control mb-0"
                        rules={{
                          required: "No Telp is required",
                        }}
                      />
                    </Col>
                    <Col lg="6">
                      <TextField
                        label="No Hp :"
                        name="noHp"
                        type="text"
                        placeholder="Enter your no Hp..."
                        className="form-control mb-0"
                        rules={{
                          required: "No Hp is required",
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg="6">
                  <TextField
                    label="Nama Ayah :"
                    name="ayah"
                    type="text"
                    placeholder="Enter your ayah..."
                    className="form-control mb-0"
                    rules={{
                      required: "Ayah is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <TextField
                    label="Nama Ibu :"
                    name="Ibu"
                    type="text"
                    placeholder="Enter your Ibu..."
                    className="form-control mb-0"
                    rules={{
                      required: "Ibu is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <TextField
                    label="Nama Sutri :"
                    name="Sutri"
                    type="text"
                    placeholder="Enter your Sutri..."
                    className="form-control mb-0"
                    rules={{
                      required: "Sutri is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <TextField
                    label="No KTP / Passport Sutri :"
                    name="indentitasSutri"
                    type="text"
                    placeholder="Enter your No KTP / Passport Sutri..."
                    className="form-control mb-0"
                    rules={{
                      required: "No KTP / Passport Sutri is required",
                    }}
                  />
                </Col>
                <Col lg="6">
                  <UploadPhotoField
                    name="fotoPasien"
                    label="Upload Photo"
                    rules={{ required: "This field is required" }} // Optional validation rules
                  />
                </Col>
              </div>
            </Form>
          </div>
        </div>
      </Col>
    </FormProvider>
  );
};

export default PendaftaranPasienBaru;
