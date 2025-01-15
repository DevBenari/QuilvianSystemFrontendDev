"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";

import { dataFasilitas } from "@/utils/dataTindakan";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import { Row, Col } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";
import { dataDokter } from "@/utils/SearchSelect";
import TextField from "@/components/ui/text-field";
import DataTable from "@/components/features/viewDataTables/dataTable";

export const PendaftaranPasienBayi = () => {
  // =============================Start Kelas ODC dan Rawat Inap ====================
  // fungsi Untuk Kelas

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

  // =============================END Kelas ODC dan Rawat Inap ====================

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "namaBayi",
          label: "Nama Bayi",
          name: "namaBayi",
          placeholder: "Nama Bayi",
          rules: { required: "Nama Bayi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama Keluarga",
          rules: { required: "Nama Keluarga is required" },
          colSize: 6,
        },
        {
          type: "custom",
          rules: { required: "paketMcu is required" },
          customRender: () => (
            <>
              <Row>
                <Col lg="6">
                  <SearchableSelectField
                    name="dokterPenanggungJawab"
                    label="Dokter Penanggung Jawab"
                    options={dataDokter}
                    placeholder="Pilih Dokter Penanggung Jawab"
                    rules={{
                      required: "Dokter Penanggung Jawab harus dipilih",
                    }}
                    className={"mb-3"}
                  />
                </Col>
                <Col lg="6">
                  <SearchableSelectField
                    name="dokterPenolong"
                    label="Dokter Penolong"
                    options={dataDokter}
                    placeholder="Pilih Dokter Penolong"
                    rules={{ required: "Dokter Penolong harus dipilih" }}
                    className={"mb-3"}
                  />
                </Col>
              </Row>
            </>
          ),
          colSize: 12,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Tempat Lahir",
          rules: { required: "Tempat Lahir is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          placeholder: "Tanggal Lahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "time",
          id: "jamLahir",
          label: "Jam Lahir",
          name: "jamLahir",
          placeholder: "Jam Lahir",
          rules: { required: "Jam Lahir is required" },
          colSize: 3,
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
          type: "select",
          id: "kondisiBayi",
          label: "Bayi Terlahir Dalam Keadaaan",
          name: "kondisiBayi",
          placeholder: "Bayi Terlahir Dalam Keadaaan",
          options: [
            { label: "Hidup", value: "Hidup" },
            { label: "Meninggal", value: "Meninggal" },
          ],
          rules: { required: "Bayi Terlahir Dalam Keadaaan is required" },

          colSize: 6,
        },
      ],
    },
    {
      section: "Ruangan",
      fields: [
        {
          type: "custom",
          customRender: () => (
            <>
              {selectedLayanan === "Rawat Inap" && (
                <>
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title my-3">
                        <h4 className="card-title mb-3">Ketersediaan Kelas</h4>
                        <Col lg="12">
                          <TextField
                            name="KelasODC"
                            label="Kelas"
                            type="text"
                            className="form-control"
                            value={selectedKelas}
                            readOnly
                          />
                        </Col>
                        <Col lg="12">
                          <TextField
                            label="Cari Kelas"
                            name="kelas"
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
                      rowsPerPage={10}
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
            </>
          ),
          colSize: 12,
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
        title="Registrasi Pasien Luar Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default PendaftaranPasienBayi;
