"use client";

import DataTable from "@/components/features/viewDataTables/dataTable";
import DateInput from "@/components/ui/date-input";
import SelectField from "@/components/ui/select-field";
import SearchableSelectField from "@/components/ui/select-field-search";
import TextField from "@/components/ui/text-field";
import { dataKelasTersedia } from "@/utils/PasienPerjanjian";

import { dataDokter, dataKelas } from "@/utils/SearchSelect";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const RawatInap = () => {
  const [selectedLayanan, setSelectedLayanan] = useState(""); // Correct placement of useState
  const methods = useForm();

  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state lokal
  };

  // untuk mencari kelas

  const [filteredData, setFilteredData] = useState(dataKelasTersedia);

  const [selectedKelas, setSelectedKelas] = useState("");

  const [searchKelas, setSearchKelas] = useState({
    Kelas: "",
  });

  const handleSearch = (key, value) => {
    const updatedKelas = { ...searchKelas, [key]: value };
    setSearchKelas(updatedKelas);

    const filtered = dataKelasTersedia.filter((item) => {
      return Object.keys(updatedKelas).every((KelasKey) => {
        const KelasValue = updatedKelas[KelasKey];
        if (!KelasValue) return true; // Abaikan jika kosong

        return item[KelasKey]?.toString()
          .toLowerCase()
          .includes(KelasValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const header = [
    "No",
    "Kelas ",
    "Keterangan",
    "Jml Ruang",
    "JML Tempat Tidur",
    "jml Terisi",
    "Jml reservasi",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    kelas: item.Kelas,
    keterangan: item.Keterangan,
    jmlRuang: item.JmlRuang,
    jmlTempatTidur: item.JmlTempatTidur,
    jmlTerisi: item.JmlTerisi,
    jmlReservasi: item.JmlReservasi,
  }));

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Row className="mt-3">
          <Col md={6}>
            <div className="iq-card">
              <div className="iq-card-body">
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
                  onChangeCallback={handleLayananChange}
                  className="mb-3"
                  rules={{ required: "Layanan harus dipilih" }}
                />
                {selectedLayanan === "Rawat Inap" && (
                  <Row>
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                    </Row>
                    <Col lg="12">
                      <TextField
                        name="Kelas"
                        label="Kelas"
                        type="text"
                        className="form-control"
                        value={selectedKelas}
                        readOnly
                      />
                    </Col>
                    <Col lg="12">
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
              </div>
            </div>
          </Col>
          <Col md={6}>
            {selectedLayanan === "Rawat Inap" && (
              <>
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title my-3">
                      <h4 className="card-title mb-3">Ketersediaan Kelas</h4>
                      <Col lg="12">
                        <TextField
                          label="Cari Kelas"
                          name="kelasRawatInap"
                          type="text"
                          placeholder="Cari Kelas"
                          className="form-control"
                          onChange={(e) =>
                            handleSearch("Kelas", e.target.value)
                          }
                        />
                      </Col>
                    </div>
                  </div>
                  <DataTable
                    headers={header}
                    data={members}
                    rowsPerPage={4}
                    actions={{
                      booking: (row) => handleEdit(row.id),
                    }}
                    customActions={[
                      {
                        label: "Booking Kelas",
                        onClick: (row) => setSelectedKelas(row.kelas),
                        className: "iq-bg-success",
                      },
                    ]}
                  />
                </div>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default RawatInap;
