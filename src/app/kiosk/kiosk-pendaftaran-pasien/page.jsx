'use client'
import React, {  memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import dataWilayah from "@/utils/dataWilayah";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from '@/components/features/dynamic-form/dynamicForm/dynamicFormSteps';
import { Button, Card, Image } from 'react-bootstrap';
import ButtonNav from '@/components/ui/button-navigation';

const KioskPendaftaranPasien = memo(() => {
    const { setValue } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    // fungsi untuk melakukan select provinsi
    const {
        pasienSelectedProvinsi,
        pasienFilteredKabupaten,
        pasienFilteredKecamatan,
        pasienFilteredKelurahan,
        handleChange,
    } = UseSelectWilayah(setValue, dataWilayah);

    const mainFields = [
        {
            type: "text",
            id: "kodePasien",
            label: "Kode Pasien",
            name: "kodePasien",
            placeholder: "Kode Pasien",
            colSize: 6,
            disabled: true,
        },
        {
            type: "text",
            id: "noRekamMedis",
            label: "No. Rekam Medis",
            name: "noRekamMedis",
            placeholder: "No. Rekam Medis",
            colSize: 6,
            disabled: true,
        },
        {
            type: "date",
            id: "tanggalDibuat",
            label: "Tanggal Dibuat",
            name: "tanggalDibuat",
            colSize: 6,
        },
        {
            type: "text",
            id: "creator",
            label: "Dibuat Oleh",
            name: "creator",
            colSize: 6,
            placeholder: "Dibuat Oleh",
        },
    ];
    

    const formFields = 
    [
        {
            section: "Informasi Pasien",
            fields: 
            [
                {
                    type: "select",
                    id: "title",
                    label: "Title",
                    name: "title",
                    placeholder: "Title",
                    options: [
                        { label: "Tn. ", value: "Tn" },
                        { label: "Ny. ", value: "Ny" },
                    ],
                    rules: { required: "Title is required" },
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
                     type:"select",
                     id: "indetitas",
                     label: "Identitas",
                     name:"indetitas",
                     placeholder: "Identitas",
                     options: [ 
                         { label: "KTP", value: "KTP" },
                         { label: "SIM", value: "SIM" },
                         { label: "Passport", value: "Passport" }
                     ],
                     rules: { required: "Identitas is required" },
                     colSize: 6
                },
                {
                    type: "text",
                    id: "noIdentitas",
                    label: "No Identitas",
                    name: "noIdentitas",
                    placeholder: "No Identitas",
                    rules: { required: "No Identitas is required" },
                    colSize: 6
                },
                {
                    type:"text",
                    id: "tempatLahir",
                    label: "Tempat Lahir",
                    name:"tempatLahir",
                    placeholder: "Tempat Lahir",
                    rules: { required: "Tempat Lahir is required" },
                    colSize: 6
                },
                {
                    type: "date",
                    id: "tglLahir",
                    label: "Tanggal Lahir",
                    name: "tglLahir",
                    rules: { required: "Tanggal Lahir is required" },
                    colSize: 6
                },
                {
                    type:"select",
                    id: "jenisKelamin",
                    label: "Jenis Kelamin",
                    name:"jenisKelamin",
                    placeholder: "Jenis Kelamin",
                    options: [ 
                        { label: "Laki-laki", value: "Laki-laki" },
                        { label: "Perempuan", value: "Perempuan" }
                    ],
                    rules: { required: "Jenis Kelamin is required" },
                    colSize: 6
                },
                {
                    type:"select",
                    id: "statusPernikahan",
                    label: "Status Pernikahan",
                    name:"statusPernikahan",
                    placeholder: "Status Pernikahan",
                    options: [
                        { label: "Belum Menikah", value: "Belum Menikah" },
                        { label: "Menikah", value: "Menikah" },
                        { label: "Cerai Hidup", value: "Cerai Hidup" },
                        { label: "Cerai Mati", value: "Cerai Mati" },
                    ],
                    rules: { required: "Status Pernikahan is required" },
                    colSize: 6
                },
                {
                    type:"select",
                    id: "agama",
                    label: "Agama",
                    name:"agama",
                    placeholder: "Agama",
                    options: [
                        { label: "Islam", value: "Islam" },
                        { label: "Kristen", value: "Kristen" },
                        { label: "Katolik", value: "Katolik" },
                        { label: "Hindu", value: "Hindu" },
                        { label: "Budha", value: "Budha" },
                        { label: "Konghucu", value: "Konghucu" },
                    ],
                    rules: { required: "Agama is required" },
                    colSize: 6
                },
                {
                    type: "select",
                    id: "pendidikanTerakhir",
                    label: "Pendidikan Terakhir",
                    name: "pendidikanTerakhir",
                    placeholder: "Pendidikan Terakhir",
                    options: [
                        { label: "SD", value: "SD" },
                        { label: "SMP", value: "SMP" },
                        { label: "SMA", value: "SMA" },
                        { label: "S1", value: "S1" },    
                        { label: "S2", value: "S2" },
                        { label: "S3", value: "S3" },
                    ],
                    colSize: 6
                }
            ]
        },
        {
            section: "Informasi Kontak",
            fields: 
            [
                {
                    type: "text",
                    id: "noTelepon",
                    label: "No Telepon",
                    name: "noTelepon",
                    placeholder: "No Telepon",
                    rules: { required: "No Telepon is required" },
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alamat",
                    label: "Alamat Sesuai Identitas",
                    name: "alamat",
                    placeholder: "Alamat",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alamatDomisili",
                    label: "Alamat Domisili",
                    name: "alamatDomisili",
                    placeholder: "Alamat Domisili",
                    colSize: 6
                },
                {
                    type: "select",
                    id: "negara",
                    label: "Negara",
                    name: "negara",
                    placeholder: "Negara",
                    options: [
                        { label: "Indonesia", value: "Indonesia" },
                        { label: "Amerika", value: "Amerika" },
                        { label: "Malaysia", value: "Malaysia" },
                        { label: "Singapura", value: "Singapura" },
                        { label: "Jepang", value: "Jepang" },
                        { label: "Spanyol", value: "Spanyol" },
                        { label: "Italia", value: "Italia" },
                    ],
                    colSize: 6
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
                    onChangeCallback: (value) => handleChange("pasien","provinsi", value),
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
                    onChangeCallback: (value) => handleChange("pasien","kabupaten", value),
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
                    onChangeCallback: (value) => handleChange("pasien","kecamatan", value),
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
                },
                {
                    type:"text",
                    id: "kodePos",
                    label: "Kode Pos",
                    name: "kodePos",
                    placeholder:"Kode Pos",
                    rules:{required:"Kode Pos is required"},
                    colSize:6
                },
                {
                    type: "email",
                    id: "emailPasien",
                    label: "Email Pasien",
                    name: "emailPasien",
                    placeholder: "Email Pasien",
                    rules: { required: "Email is required", email: "Email is invalid" },
                    colSize: 6
                }
            ]
        },
        {
            section: "Informasi Demografis",
            fields:
            [
                {
                    type: "select",
                    id: "statusKewarganegaraan",
                    label: "Status Kewarganegaraan",
                    name: "statusKewarganegaraan",
                    placeholder: "Pilih Status Kewarganegaraan",
                    options: [
                        { label: "WNI", value: "WNI" },
                        { label: "WNA", value: "WNA" },
                    ],
                    rules: { required: "Status Kewarganegaraan is required" },
                    colSize: 6,

                },
                {
                    type:"select",
                    id:"kewarganegaraan",
                    label:"kewarganegaraan",
                    name:"kewarganegaraan",
                    placeholder:"kewarganegaraan",
                    options:[
                        { label: "Amerika", value: "Amerika" },
                        { label: "Malaysia", value: "Malaysia" },
                        { label: "Singapura", value: "Singapura" },
                        { label: "Jepang", value: "Jepang" },
                        { label: "Spanyol", value: "Spanyol" },
                        { label: "Italia", value: "Italia" },
                    ],
                    rules:{required:"kewarganegaraan is required"},
                    colSize:6,
                    hide: (watchValues) => watchValues.statusKewarganegaraan !== "WNA"
                },
                {
                    type: "text",
                    id: "suku",
                    label: "Suku",
                    name: "suku",
                    placeholder: "Suku",
                    colSize: 6
                }
            ]
        },
        {
            section: "Informasi Pekerjaan",
            fields:
            [
                {
                    type: "select",
                    id: "pekerjaan",
                    label: "Pekerjaan",
                    name: "pekerjaan",
                    placeholder: "Pilih Pekerjaan",
                    options: [
                        { label: "Pegawai Negeri Sipil", value: "Pegawai Negeri Sipil" },
                        { label: "Pegawai Swasta", value: "Pegawai Swasta" },
                        { label: "Wiraswasta", value: "Wiraswasta" },
                        { label: "Pensiunan", value: "Pensiunan" },
                        { label: "Lain-lain", value: "Lain-lain" },
                    ],
                    colSize: 6
                },
                {
                    type: "text",
                    id: "namaPerusahaan",
                    label: "Nama Perusahaan",
                    name: "namaPerusahaan",
                    placeholder: "Nama Perusahaan",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "noTeleponPerusahaan",
                    label: "No Telepon Perusahaan",
                    name: "noTeleponPerusahaan",
                    placeholder: "No Telepon Perusahaan",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alamatPerusahaan",
                    label: "Alamat Perusahaan",
                    name: "alamatPerusahaan",
                    placeholder: "Alamat Perusahaan",
                    colSize: 12
                }
            ]
        },
        {
            section: "Informasi Kesehatan",
            fields:
            [
                {
                    type: "select",
                    id: "asuransi",
                    label: "Asuransi Kesehatan",
                    name: "asuransi",
                    placeholder: "Asuransi Kesehatan",
                    options: [
                        { label: "Askes", value: "Askes" },
                        { label: "JKN", value: "JKN" },
                        { label: "BPJS", value: "BPJS" },
                        { label: "Lain-lain", value: "Lain-lain" },
                    ],
                    colSize: 6
                },
                {
                    type: "select",
                    id: "golonganDarah",
                    label: "Golongan Darah",
                    name: "golonganDarah",
                    placeholder: "Pilih Golongan Darah",
                    options: [
                        { label: "A", value: "A" },
                        { label: "B", value: "B" },
                        { label: "AB", value: "AB" },
                        { label: "O", value: "O" },
                    ],
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alergi",
                    label: "Alergi",
                    name: "alergi",
                    placeholder: "Alergi",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "riwayatPenyakit",
                    label: "Riwayat Penyakit",
                    name: "riwayatPenyakit",
                    placeholder: "Riwayat Penyakit",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "riwayatOperasi",
                    label: "Riwayat Operasi",
                    name: "riwayatOperasi",
                    placeholder: "Riwayat Operasi",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "riwayatPenyakitKeluarga",
                    label: "Riwayat PenyakitKeluarga",
                    name: "riwayatPenyakitKeluarga",
                    placeholder: "Riwayat PenyakitKeluarga",
                    colSize: 6
                }
            ]
        },
        {
            section: "Informasi Darurat",
            fields:
            [
                {
                    type: "text",
                    id: "namaKontakDarurat",
                    label: "Nama Kontak Darurat",
                    name: "namaKontakDarurat",
                    placeholder: "Nama Darurat",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "hubunganPasien",
                    label: "Hubungan Dengan Pasien",
                    name: "hubunganPasien",
                    placeholder: "Hubungan Pasien",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "noIdentitasKontakDarurat",
                    label: "No Identitas Darurat",
                    name: "noIdentitasKontakDarurat",
                    placeholder: "Alamat Darurat",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "noTeleponDarurat",
                    label: "No Telepon Darurat",
                    name: "noTeleponDarurat",
                    placeholder: "No Telepon Darurat",
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alamatKontakDarurat",
                    label: "Alamat Kontak Darurat",
                    name: "alamatKontakDarurat",
                    placeholder: "Alamat Darurat",
                    colSize: 12
                }
            ]
        },
        {
            section: "Informasi Keluarga",
            fields: 
            [
                {
                    type: "text",
                    id: "namaOrangtua",
                    label: "Nama Orang Tua / Wali",
                    name: "namaOrangtua",
                    placeholder: "Nama Orang Tua",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "noIdentitasOrangtua",
                    label: "No Identitas Orang Tua / Wali",
                    name: "noIdentitasOrangtua",
                    placeholder: "No Identitas Orang Tua",
                    colSize: 6
                },
                {
                    type: "text",
                    id: "pekerjaanOrangtua",
                    label: "Pekerjaan Orang Tua / Wali",
                    name: "pekerjaanOrangtua",
                    placeholder: "Pekerjaan Orang Tua",
                    colSize: 6
                },
                {
                    type: "select",
                    id: "hubungandenganPasien",
                    label: "Hubungan Dengan Pasien",
                    name: "hubungandenganPasien",
                    placeholder: "Hubungan Dengan Pasien",
                    options: [
                        { label: "Ayah", value: "Ayah" },
                        { label: "Ibu", value: "Ibu" },
                        { label: "Suami", value: "Suami" },
                        { label: "Istri", value: "Istri" },
                        { label: "Anak", value: "Anak" },
                        { label: "Mertua", value: "Mertua" },
                        { label: "Lain-lain", value: "Lain-lain" },
                    ],
                    colSize: 6
                }
            ]
        }
    ]
    const handleSubmit = (data) => {
        setSubmittedData(data);
        setIsSubmitted(true);
        
    };

    if (submittedData) {
        // Ambil data pasien dari hasil submit
        const { namaPasien, noRekamMedis, noRegistrasi } = submittedData;
      
        return (
          <Card className="m-5 p-4">
            <div className="kiosk-logo">
              <Image src="/Images/pngwing-com.png" className="img-fluid"  alt="logo" />
            </div>
            <h4 className="mb-4 text-success text-center mt-4">Data Pendaftaran Pasien Berhasil Disimpan</h4>
    
      
            {/* Tampilkan informasi pasien dalam format tabel */}
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Nama Pasien</th>
                  <td>{namaPasien || "Tidak tersedia"}</td>
                </tr>
                <tr>
                  <th>No. Rekam Medis</th>
                  <td>{noRekamMedis || "Tidak tersedia"}</td>
                </tr>
                <tr>
                  <th>No. Registrasi</th>
                  <td>{noRegistrasi || "Tidak tersedia"}</td>
                </tr>
              </tbody>
            </table>
      
            {/* Tombol navigasi */}
            <div className="d-flex justify-content-between mt-4">
              <ButtonNav
                label="Kembali ke Halaman Utama"
                className="btn btn-secondary"
                path={"/kiosk"}
              />
              <Button className="btn btn-primary" onClick={() => window.print()}>
                Cetak Kartu Pasien
              </Button>
            </div>
          </Card>
        );
      }

    const handleFormSubmit = (data) => {
        setIsSubmitted(true);
        setSubmittedData(data);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
                <div className="p-4 md:p-6">
                    <DynamicStepForm
                        title="Pendaftaran Pasien"
                        mainFields={mainFields}
                        formConfig={formFields}
                        onSubmit={handleSubmit}
                        onFormSubmit={handleFormSubmit}
                        backPath="/kiosk"
                        isAddMode={true}
                    />
                </div>
            </div>
        </div>
    )
})

KioskPendaftaranPasien.displayName = "KioskPendaftaranPasien"
export default KioskPendaftaranPasien;