"use client";

import DataTable from "@/components/features/viewDataTables/dataTable";
import DateInput from "@/components/ui/date-input";
import SelectField from "@/components/ui/select-field";
import SearchableSelectField from "@/components/ui/select-field-search";
import TextField from "@/components/ui/text-field";
import { dataOperasiTersedia } from "@/utils/PasienPerjanjian";

import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import {
  dataDepartemen,
  dataDokter,
  dataKelas,
  paketMcu,
  ruangOperasi,
  tipeAnestesiOptions,
} from "@/utils/SearchSelect";
import TimeField from "@/components/ui/time-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Operasi = () => {
  const methods = useForm();
  const [selectedLayanan, setSelectedLayanan] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [searchOperasi, setSearchOperasi] = useState({});

  const handleLayananChange = (value) => {
    setSelectedLayanan(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().slice(0, 10);
    filterData(formattedDate, searchOperasi);
  };

  const handleSearch = (key, value) => {
    // Update state search dengan nilai terbaru
    const newSearchOperasi = { ...searchOperasi, [key]: value };
    setSearchOperasi(newSearchOperasi);

    // FormattedDate untuk mengambil data berdasarkan tanggal terpilih
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const dataTanggal = dataOperasiTersedia[formattedDate] || [];

    // Melakukan filter pada data berdasarkan key dan value yang diinput
    const filtered = dataTanggal.filter((item) =>
      item.ruangan?.toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const filterData = (formattedDate, searchParams) => {
    const dataTanggal = dataOperasiTersedia[formattedDate] || [];
    const filtered = dataTanggal.filter((item) =>
      Object.entries(searchParams).every(([key, val]) =>
        item[key]?.toString().toLowerCase().includes(val.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const header = [
    "No",
    "Jam Mulai",
    "Jam Selesai",
    "Estimasi (Menit)",
    "Dokter Operator",
    "Tindakan",
    "Ruangan",
  ];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    jamMulai: item.jamMulai,
    jamSelesai: item.jamSelesai,
    estimasi: `${item.estimasi} Menit`,
    dokterOperator: item.dokterOperator,
    tindakan: item.tindakan,
    ruangan: item.ruangan,
  }));

  // set nilai

  const [selectedRuangOperasi, setSelectedRuangOperasi] = useState("");
  const [selectedWaktuOperasi, setSelectedWaktuOperasi] = useState("");
  const [selectedEstimasiOperasi, setSelectedEstimasiOperasi] = useState("");
  const [selectedDokterOperasi, setSelectedDokterOperasi] = useState("");
  const [selectedTindakanOperasi, setSelectedTindakanOperasi] = useState("");

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
                  options={[{ label: "Operasi", value: "Operasi" }]}
                  onChangeCallback={handleLayananChange}
                  className="mb-3"
                />
                {selectedLayanan === "Operasi" && (
                  <Row>
                    <Col lg="4">
                      <TextField
                        name="ruangOperasi"
                        label="Ruang Operasi"
                        value={selectedRuangOperasi}
                        className="form-control"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="waktuOperasi"
                        label="Waktu Operasi"
                        value={selectedWaktuOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="estimasi"
                        label="estimasi"
                        value={selectedEstimasiOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="dokter"
                        label="Dokter"
                        value={selectedDokterOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="tindakan"
                        label="Tindakan"
                        value={selectedTindakanOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Col>
          <Col md={6}>
            {selectedLayanan === "Operasi" && (
              <>
                <div className="iq-card">
                  <div className="iq-card-header">
                    <div className="iq-header-title my-3">
                      <h4 className="card-title mb-3">Ruang Operasi</h4>
                    </div>
                    <Row>
                      <Col xs="12" lg="3">
                        <div className="form-group">
                          <label
                            htmlFor="tanggalKunjungan"
                            className="form-label"
                          >
                            Tanggal Kunjungan
                          </label>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                          />
                        </div>
                      </Col>
                      <Col lg="8">
                        <SearchableSelectField
                          name="ruangOperasi.select"
                          label="Ruang Operasi"
                          options={ruangOperasi}
                          placeholder="Pilih ruang operasi"
                          className="mb-3"
                          onChange={(selectedOption) =>
                            handleSearch("ruangan", selectedOption?.value || "")
                          }
                        />
                      </Col>
                    </Row>
                    <DataTable
                      headers={header}
                      data={members}
                      rowsPerPage={4}
                      customActions={[
                        {
                          label: "Booking Operasi",
                          onClick: (row) => {
                            setSelectedRuangOperasi(row.ruangan);
                            setSelectedWaktuOperasi(row.jamMulai);
                            setSelectedEstimasiOperasi(row.estimasi);
                            setSelectedDokterOperasi(row.dokterOperator);
                            setSelectedTindakanOperasi(row.tindakan);
                          },
                          className: "iq-bg-success",
                        },
                      ]}
                    />
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default Operasi;
