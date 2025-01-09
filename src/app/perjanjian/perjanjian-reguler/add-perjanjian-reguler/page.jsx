"use client";

import DynamicDuaForm from "@/components/features/dynamicDuaForm.jsx/dynamicDuaForm";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import TableTindakan from "@/components/features/tindakanTable/tindakantTable";
import DateInput from "@/components/ui/date-input";
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import SearchableSelectField from "@/components/ui/select-field-search";
import TextField from "@/components/ui/text-field";
import TextArea from "@/components/ui/textArea-field";
import { pemeriksaRadiologi } from "@/utils/dataTindakan";
import {
  dataDepartemen,
  dataDokter,
  dataKelas,
  paketMcu,
  ruangOperasi,
} from "@/utils/SearchSelect";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";

const AddPerjanjianReguler = () => {
  const router = useRouter();
  // Fungsi handle untuk perubahan pada radio input
  const [selectedLayanan, setSelectedLayanan] = useState(""); // Awalnya null
  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state lokal
  };

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        // Informasi Pasien
        {
          type: "text",
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan nama pasien",
          rules: { required: "Nama pasien harus diisi" },
          colSize: 3,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Masukkan tempat lahir",
          rules: { required: "Tempat lahir harus diisi" },
          colSize: 3,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          rules: { required: "Tanggal lahir harus diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Pilih jenis kelamin",
          options: [
            { label: "Laki-Laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis kelamin harus dipilih" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamat",
          label: "Alamat Rumah",
          name: "alamat",
          placeholder: "Masukkan alamat rumah",
          rules: { required: "Alamat rumah harus diisi" },
          colSize: 12,
        },

        {
          type: "text",
          id: "noHp",
          label: "No HP",
          name: "noHp",
          placeholder: "Masukkan nomor HP",
          rules: { required: "Nomor HP harus diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipepenjamin",
          name: "tipePenjamin",
          label: "Tipe penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "BPJS", value: "bpjs" },
            { label: "Non BPJS", value: "non-bpjs" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
        },
        // Layanan
        // Pilihan Layanan
      ],
    },
    {
      section: "Perjanjian Pasien",
      fields: [
        {
          type: "custom",
          id: "layanan",
          label: "",
          name: "layanan",
          customRender: () => (
            <>
              <Col lg="6">
                <SelectField
                  name="layanan"
                  label="Pilih Layanan"
                  placeholder="Pilih Layanan"
                  options={[
                    { label: "Rawat Inap", value: "Rawat Inap" },
                    { label: "Rawat Jalan", value: "Rawat Jalan" },
                    { label: "ODC", value: "ODC" },
                    { label: "Radiologi", value: "Radiologi" },
                    { label: "Operasi", value: "Operasi" },
                    { label: "MCU", value: "MCU" },
                  ]}
                  // value={selectedLayanan} // Gunakan nilai dari react-hook-form
                  onChangeCallback={handleLayananChange}
                  rules={{ required: "Layanan harus dipilih" }}
                  className={"mb-2"}
                />
              </Col>

              {/* Form Dinamis Berdasarkan Pilihan */}

              {selectedLayanan === "Rawat Inap" && (
                <Row>
                  <Col lg="6">
                    <DateInput
                      name="janjiTanggal"
                      label="Janji Tanggal"
                      placeholder="Masukkan Tanggal"
                      rules={{ required: "Janji Tanggal harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="kelasSelect.select"
                      label="kelas Kamar"
                      options={dataKelas}
                      placeholder="Pilih kelas Kamar"
                      className="mb-6"
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="dokter"
                      label="Dokter Pemeriksa"
                      options={dataDokter}
                      placeholder="Pilih Dokter"
                      rules={{ required: "Dokter harus dipilih" }}
                    />
                  </Col>
                </Row>
              )}

              {selectedLayanan === "Rawat Jalan" && (
                <Row>
                  <Col lg="6">
                    <DateInput
                      name="tglKunjungan"
                      label="Tanggal Kunjungan"
                      placeholder="Masukkan Tanggal Kunjungan"
                      rules={{ required: "Tanggal Kunjungan harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="departemenSelect.select"
                      label="Departemen"
                      options={dataDepartemen}
                      placeholder="Pilih Poli"
                      className="mb-6"
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="dokter"
                      label="Dokter Pemeriksa"
                      options={dataDokter}
                      placeholder="Pilih Dokter"
                      rules={{ required: "Dokter harus dipilih" }}
                    />
                  </Col>
                </Row>
              )}

              {selectedLayanan === "Operasi" && (
                <Row>
                  <Col lg="6">
                    <SearchableSelectField
                      name="ruangOperasi.select"
                      label="Ruang Operasi"
                      options={ruangOperasi}
                      placeholder="Pilih ruang operasi"
                      className="mb-3"
                      // onChange={(selectedOption) =>
                      //   handleSearch(
                      //     "ruangOperasi.select",
                      //     selectedOption?.value || ""
                      //   )
                      // }
                    />
                  </Col>
                  <Col lg="6">
                    <DateInput
                      name="tglOperasi"
                      label="Tanggal Operasi"
                      rules={{ required: "Tanggal Operasi harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="dokterOperator"
                      label="Dokter Operator"
                      options={dataDokter}
                      placeholder="Pilih Dokter Operator"
                      rules={{ required: "Dokter Operator harus dipilih" }}
                    />
                  </Col>
                </Row>
              )}

              {selectedLayanan === "ODC" && (
                <Row>
                  <Col lg="6">
                    <DateInput
                      name="tglKunjungan"
                      label="Tanggal Kunjungan"
                      rules={{ required: "Tanggal Kunjungan harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="departemenSelect.select"
                      label="Departemen"
                      options={dataDepartemen}
                      placeholder="Pilih Poli"
                      className="mb-3"
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="dokter"
                      label="Dokter Pemeriksa"
                      options={dataDokter}
                      placeholder="Pilih Dokter"
                      rules={{ required: "Dokter harus dipilih" }}
                    />
                  </Col>
                </Row>
              )}

              {selectedLayanan === "Radiologi" && (
                <Row>
                  <Col lg="6">
                    <DateInput
                      name="tglJanji"
                      label="Tanggal Janji"
                      rules={{ required: "Tanggal Pelayanan harus diisi" }}
                      className="mb-3"
                    />
                  </Col>
                  <TableTindakan tindakan={pemeriksaRadiologi} />,
                </Row>
              )}
              {selectedLayanan === "MCU" && (
                <Row>
                  <Col lg="6">
                    <DateInput
                      name="tglPelayanan"
                      label="Tanggal Pelayanan"
                      rules={{ required: "Tanggal Pelayanan harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SearchableSelectField
                      name="paketMcuSelect.select"
                      label="Paket MCU"
                      options={paketMcu}
                      placeholder="Pilih Paket MCU"
                      className="mb-3"
                    />
                  </Col>
                </Row>
              )}
            </>
          ),
        },
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Masukkan diagnosa awal",
        },
        {
          type: "textarea",
          id: "informasiLainnya",
          label: "Informasi Lainnya",
          name: "informasiLainnya",
          placeholder: "Masukkan informasi lainnya",
        },

        // Diagnosa dan Informasi Tambahan
      ],
    },
  ];

  const handleSubmit = async (data) => {
    console.log("Data yang disubmit:", data);
    alert("Perjanjian berhasil dibuat!");
    router.push("/perjanjian");
  };

  return (
    <Fragment>
      <DynamicDuaForm
        title="Pendaftaran Perjanjian Reguler"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default AddPerjanjianReguler;
