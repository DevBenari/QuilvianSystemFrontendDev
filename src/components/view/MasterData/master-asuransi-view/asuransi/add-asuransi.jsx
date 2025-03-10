"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import ButtonNav from "@/components/ui/button-navigation";

import { useDispatch, useSelector } from "react-redux";
import { AddPasienSlice } from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import { fetchPendidikan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import { fetchTitle } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import { fetchPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import { fetchNegara } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { fetchGolongan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { fetchIdentitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import { useRouter } from "next/navigation";
import useAgamaData from "@/lib/hooks/useAgamaData";
import useSelectWilayah from "@/lib/hooks/useSelectWilayah";

import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";

import PrintPatientCard from "@/components/view/kiosk/add-guest-kiosk/patientCard";
import PrintableQueueNumber from "@/components/view/kiosk/add-guest-kiosk/patientAntrian";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiSlice";

const PendaftaranPasienAsuransi = memo(() => {
  const { setValue } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const formFields = [
    {
      section: "Data Asuransi",
      fields: [
        {
          type: "text",
          label: "Kode Asuransi",
          name: "kodeAsuransi",
          placeholder: "Masukkan Kode Asuransi...",
          colSize: 6,
          rules: { required: "Kode Asuransi harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Dibuat",
          name: "createdate",
          colSize: 6,
          rules: { required: "Tanggal Dibuat harus diisi" },
        },
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Jenis Asuransi",
          name: "jenisAsuransi",
          placeholder: "Masukkan Jenis Asuransi...",
          colSize: 6,
          rules: { required: "Jenis Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Kategori Asuransi",
          name: "kategoriAsuransi",
          placeholder: "Masukkan Kategori Asuransi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Status Asuransi",
          name: "statusAsuransi",
          placeholder: "Masukkan Status Asuransi...",
          colSize: 6,
          rules: { required: "Status Asuransi harus diisi" },
        },
      ],
    },
    {
      section: "Kerjasama",
      fields: [
        {
          type: "date",
          label: "Tanggal Mulai Kerjasama",
          name: "tanggalMulaiKerjasama",
          colSize: 6,
          rules: { required: "Tanggal Mulai Kerjasama harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Akhir Kerjasama",
          name: "tanggalAkhirKerjasama",
          colSize: 6,
          rules: { required: "Tanggal Akhir Kerjasama harus diisi" },
        },
        {
          type: "text",
          label: "RS Rekanan",
          name: "rsRekanan",
          placeholder: "Masukkan RS Rekanan...",
          colSize: 6,
        },
        {
          type: "select",
          label: "PKS",
          name: "isPKS",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
        },
        {
          type: "text",
          label: "Metode Klaim",
          name: "metodeKlaim",
          placeholder: "Masukkan Metode Klaim...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Waktu Klaim",
          name: "waktuKlaim",
          colSize: 6,
        },
        {
          type: "number",
          label: "Batas Maksimum Klaim Per Tahun",
          name: "batasMaxKlaimPerTahun",
          placeholder: "Masukkan Batas Maksimum Klaim Per Tahun...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Batas Maksimum Klaim Per Kunjungan",
          name: "batasMaxKlaimPerKunjungan",
          placeholder: "Masukkan Batas Maksimum Klaim Per Kunjungan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokumen Klaim",
          name: "dokumenKlaim",
          placeholder: "Masukkan Dokumen Klaim...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Persentase Biaya Pertanggungan",
          name: "persentasiBiayaPertanggungan",
          placeholder: "Masukkan Persentase Biaya Pertanggungan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Obat yang Ditanggung",
          name: "obatDitanggung",
          placeholder: "Masukkan Obat yang Ditanggung...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Tambahan Tanggungan",
          name: "tambahanTanggungan",
          placeholder: "Masukkan Tambahan Tanggungan...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Biaya Tidak Ditanggung",
          name: "biayaTidakDitanggung",
          placeholder: "Masukkan Biaya Tidak Ditanggung...",
          colSize: 6,
        },
      ],
    },
    {
      section: "Pembayaran dan Informasi Perusahaan",
      fields: [
        {
          type: "text",
          label: "Masa Tunggu",
          name: "masaTunggu",
          placeholder: "Masukkan Masa Tunggu...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Maksimal Usia Pasien",
          name: "maxUsiaPasien",
          placeholder: "Masukkan Maksimal Usia Pasien...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nomor Rekening Rumah Sakit",
          name: "noRekRumahSakit",
          placeholder: "Masukkan Nomor Rekening Rumah Sakit...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Bank",
          name: "namaBank",
          placeholder: "Masukkan Nama Bank...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Cabang Bank",
          name: "namaBankCabang",
          placeholder: "Masukkan Nama Cabang Bank...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Term of Payment",
          name: "termOfPayment",
          placeholder: "Masukkan Term of Payment...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Batas Waktu Pembayaran",
          name: "batasWaktuPembayaran",
          colSize: 6,
        },
        {
          type: "number",
          label: "Penalti Keterlambatan Pembayaran",
          name: "penaltiTerlambatBayar",
          placeholder: "Masukkan Penalti Keterlambatan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Perusahaan Asuransi",
          name: "namaPerusahaanAsuransi",
          placeholder: "Masukkan Nama Perusahaan Asuransi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat Pusat",
          name: "alamatPusat",
          placeholder: "Masukkan Alamat Pusat...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat Cabang",
          name: "alamatCabang",
          placeholder: "Masukkan Alamat Cabang...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nomor Telepon",
          name: "noTelepon",
          placeholder: "Masukkan Nomor Telepon...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email Pusat",
          name: "emailPusat",
          placeholder: "Masukkan Email Pusat...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nomor Hotline Darurat",
          name: "noHotlineDarurat",
          placeholder: "Masukkan Nomor Hotline Darurat...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Perwakilan",
          name: "namaPerwakilan",
          placeholder: "Masukkan Nama Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nomor Telepon Perwakilan",
          name: "noTeleponPerwakilan",
          placeholder: "Masukkan Nomor Telepon Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email Perwakilan",
          name: "emailPerwakilan",
          placeholder: "Masukkan Email Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Jabatan Perwakilan",
          name: "jabatanPerwakilan",
          placeholder: "Masukkan Jabatan Perwakilan...",
          colSize: 6,
        },
      ],
    },
  ];

  if (isSubmitted && submittedData) {
    return (
      <Card className="m-4">
        <Card.Body>
          <div className="kiosk-logo mb-4">
            <Image src="/Images/pngwing-com.png" fluid alt="logo" />
          </div>
          <h4 className="text-success text-center mt-4">
            Data Pendaftaran Pasien Berhasil Disimpan
          </h4>

          <Row className="no-print">
            <Col lg={12}>
              <Card className="d-flex justify-content-center align-items-center">
                <Card.Body>
                  <PrintPatientCard patientData={submittedData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {selectedPrintType === "card" && (
            <div className="print-only">
              <PrintPatientCard patientData={submittedData} />
            </div>
          )}
          {selectedPrintType === "queue" && (
            <div className="print-only">
              <PrintableQueueNumber
                queueData={{
                  queueNumber: submittedData.queueNumber,
                  service: "Poli Umum",
                  date: submittedData.registrationDate,
                  patientName: submittedData.namaPasien,
                }}
              />
            </div>
          )}

          <div className="d-flex justify-content-between mt-4 no-print">
            <ButtonNav
              label="Kembali ke Halaman Utama"
              variant="primary"
              path="/kiosk"
            />
            <Button
              variant="primary"
              onClick={() => handlePrint("card")}
              className="text-center mt-3 ml-5"
            >
              {/* <Printer className="me-2" size={20} /> */}
              Cetak Kartu Pasien
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  const handleFormSubmit = (data) => {
    setIsSubmitted(true);
    setSubmittedData(data);
  };

  const handleSubmitWithApi = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createAsuransi(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        // router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      console.error("Gagal menambahkan asuransi:", error);
      showAlert.error("Gagal menambahkan data asuransi");
    }
  };

  return (
    <Fragment>
      <DynamicStepForm
        title="Pendaftaran Pasien Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmitWithApi}
        onFormSubmit={handleFormSubmit}
        backPath="/MasterData/master-asuransi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranPasienAsuransi.displayName = "PendaftaranPasienAsuransi";
export default PendaftaranPasienAsuransi;
