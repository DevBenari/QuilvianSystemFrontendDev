"use client";

import DynamicForm from "@/components/features/dynamicFormAnimasi/dynamicFormAnimasi";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";
import { dataAmbulance, dataDepartemen } from "@/utils/SearchSelect";

export default function PendaftaranPasienAmbulance() {
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
                    options={dataDepartemen}
                    placeholder="Pilih Poli"
                    className="mb-3"
                    rules={{ required: "Departemen is required" }}
                  />
                </Col>
                <Col>
                  <SearchableSelectField
                    name="komponenSelect.select"
                    label="komponen"
                    options={dataAmbulance}
                    placeholder="Pilih Ambulance"
                    className="mb-3"
                    rules={{ required: "Departemen is required" }}
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

        {
          type: "number",
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
          type: "number",
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

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Ambulance"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={'/pendaftaran/pendaftaran-pasien-ambulance'}
      />
    </Fragment>
  );
}
