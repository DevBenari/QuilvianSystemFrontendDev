"use client";

import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import DateInput from "@/components/ui/date-input";
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import TextField from "@/components/ui/text-field";
import TextArea from "@/components/ui/textArea-field";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";

const AddPerjanjianReguler = () => {
  const [selectedJenisPerawatan, setSelectedJenisPerawatan] = useState(null); // Untuk jenis perawatan

  const router = useRouter();

  // Fungsi handle untuk mengubah layanan
  const [selectedLayanan, setSelectedLayanan] = useState(null); // Awalnya null

  // Fungsi untuk menangani perubahan layanan
  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state dengan pilihan layanan
  };
  // Fungsi handle untuk perubahan pada radio input
  const handleJenisPerawatanChange = (value) => {
    setSelectedJenisPerawatan(value);
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
          colSize: 6,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Masukkan tempat lahir",
          rules: { required: "Tempat lahir harus diisi" },
          colSize: 6,
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
          type: "radio",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          options: [
            { label: "Laki-Laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis kelamin harus dipilih" },
          colSize: 6,
          className: "mt-3",
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
              <Row className="my-3">
                <Col lg="12">
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
                    value={selectedLayanan} // Tamb
                    onChange={(e) => handleLayananChange(e.target.value)}
                    rules={{ required: "Layanan harus dipilih" }}
                    className={"mb-2"}
                  />
                </Col>

                {/* Form Dinamis Berdasarkan Pilihan */}
                <div className="w-100">
                  <div
                    className={`collapse ${
                      selectedLayanan === "Rawat Inap" ||
                      selectedLayanan === "ODC"
                        ? "show"
                        : ""
                    }`}
                  >
                    <Row>
                      <Col lg="6">
                        <TextField
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="kelas"
                          label="Kelas"
                          options={[
                            { label: "VIP", value: "VIP" },
                            { label: "Kelas 1", value: "Kelas 1" },
                            { label: "Kelas 2", value: "Kelas 2" },
                            { label: "Kelas 3", value: "Kelas 3" },
                          ]}
                          placeholder="Pilih Kelas"
                          rules={{ required: "Kelas harus dipilih" }}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="dokter"
                          label="Dokter Pemeriksa"
                          options={[
                            { label: "dr. Tirta", value: "dr. Tirta" },
                            { label: "dr. Yeni", value: "dr. Yeni" },
                            { label: "dr. Yanto", value: "dr. Yanto" },
                          ]}
                          placeholder="Pilih Dokter"
                          rules={{ required: "Dokter harus dipilih" }}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`collapse ${
                      selectedLayanan === "Rawat Jalan" ? "show" : ""
                    }`}
                  >
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="tglKunjungan"
                          label="Tanggal Kunjungan"
                          rules={{ required: "Tanggal Kunjungan harus diisi" }}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="poliklinik"
                          label="Poliklinik"
                          options={[
                            { label: "Poliklinik Kulit", value: "Kulit" },
                            { label: "Poliklinik Umum", value: "Umum" },
                          ]}
                          placeholder="Pilih Poliklinik"
                          rules={{ required: "Poliklinik harus dipilih" }}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="dokter"
                          label="Dokter Pemeriksa"
                          options={[
                            { label: "dr. Adam", value: "dr. Adam" },
                            { label: "dr. Fina", value: "dr. Fina" },
                          ]}
                          placeholder="Pilih Dokter"
                          rules={{ required: "Dokter harus dipilih" }}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`collapse ${
                      selectedLayanan === "Operasi" ? "show" : ""
                    }`}
                  >
                    <Row>
                      <Col lg="6">
                        <TextField
                          name="ruangOperasi"
                          label="Ruang Operasi"
                          placeholder="Masukkan Ruangan"
                          rules={{ required: "Ruang Operasi harus diisi" }}
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
                        <SelectField
                          name="dokterOperator"
                          label="Dokter Operator"
                          options={[
                            { label: "dr. Surya", value: "dr. Surya" },
                            { label: "dr. Budi", value: "dr. Budi" },
                          ]}
                          placeholder="Pilih Dokter Operator"
                          rules={{ required: "Dokter Operator harus dipilih" }}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`collapse ${
                      selectedLayanan === "Radiologi" ||
                      selectedLayanan === "MCU"
                        ? "show"
                        : ""
                    }`}
                  >
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="tglPelayanan"
                          label="Tanggal Pelayanan"
                          rules={{ required: "Tanggal Pelayanan harus diisi" }}
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="paket"
                          label="Paket Pelayanan"
                          options={[
                            { label: "Paket 1", value: "Paket 1" },
                            { label: "Paket 2", value: "Paket 2" },
                          ]}
                          placeholder="Pilih Paket"
                          rules={{ required: "Paket Pelayanan harus dipilih" }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Row>
            </>
          ),
          colSize: 12,
        },
        // Diagnosa dan Informasi Tambahan
      ],
    },
    {
      section: "",
      fields: [
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Masukkan diagnosa awal",
          colSize: 12,
        },
        {
          type: "textarea",
          id: "informasiLainnya",
          label: "Informasi Lainnya",
          name: "informasiLainnya",
          placeholder: "Masukkan informasi lainnya",
          colSize: 12,
        },
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
      <DynamicForm
        title="Pendaftaran Perjanjian Reguler"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default AddPerjanjianReguler;
