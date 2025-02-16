'use client'
import React, {  Fragment, memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from '@/components/features/dynamic-form/dynamicForm/dynamicFormSteps';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import ButtonNav from '@/components/ui/button-navigation';
import PrintPatientCard from './patientCard';
import PrintableQueueNumber from './patientAntrian';
import { useDispatch, useSelector } from 'react-redux';
import { AddPasienSlice } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';
import { fetchAgama } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice';
import { fetchPendidikan } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice';
import { fetchTitles } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice';
import { fetchPekerjaan } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice';
import { GetNegaraSlice } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice';
import { fetchGolongan } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice';
import { GetProvinsiSlice } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/provinsiSlice';
import { fetchIdentitas } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice';


const KioskPendaftaranPasien = memo(() => {
    const { setValue } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [selectedPrintType, setSelectedPrintType] = useState(null);
    // fungsi untuk melakukan select provinsi
    // const {
    //     provinsi,
    //     kabupaten,
    //     kecamatan,
    //     kelurahan,
    //     // loadingProvinsi,
    //     // loadingKabupaten,
    //     // loadingKecamatan,
    //     handleChange,
    // } = UseSelectWilayah(setValue);


    const dispatch = useDispatch();

    const {data: agamaData, loading, error} = useSelector((state) => state.agama)
    const {data: pendidikanData} = useSelector((state) => state.pendidikan)
    const {data: titles} = useSelector((state) => state.titles)
    const {data: pekerjaanData} = useSelector((state) => state.pekerjaan)
    const {data: negara} = useSelector((state) => state.negara)
    const {data: GolonganDarah} = useSelector((state) => state.golongan)
    const {data: provinsi} = useSelector((state) => state.provinsi)
    const {data: identitas} = useSelector((state) => state.identitas)

    useEffect(() => {
        dispatch(fetchAgama())
        dispatch(fetchPendidikan())
        dispatch(fetchTitles())
        dispatch(fetchPekerjaan())
        dispatch(GetNegaraSlice())
        dispatch(fetchGolongan())
        dispatch(GetProvinsiSlice())
        dispatch(fetchIdentitas())
    }, [dispatch]);
    if (loading) {
        return <div>Loading data pasien...</div>;
    }

    // Tampilkan pesan error jika ada kesalahan
    if (error) {
        return <div>Error: {error}</div>;
    }

    const titlesOptions = titles?.data.map(item => ({
        label: item.kodeTitle, // Label seperti "Tn", "Ny", "Mr"
        value: item.titleId    // ID untuk value
      })) || [];

    const formFields = 
    [
        {
            section: "Informasi Pasien",
            fields: 
            [
                {
                    type: "select",
                    id: "titlesId",
                    label: "Title",
                    name: "titlesId",
                    placeholder: "Title",
                    options: titlesOptions,
                    rules: { required: "Title is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "namaLengkap",
                    label: "Nama Pasien",
                    name: "namaLengkap",
                    placeholder: "Nama Pasien",
                    rules: { required: "Nama Pasien is required" },
                    colSize: 6,
                },
                {
                     type:"select",
                     id: "identitasId",
                     label: "Identitas",
                     name:"identitasId",
                     placeholder: "Identitas",
                     options: identitas?.data.map(item => ({ label: item.jenisIdentitas, value: item.identitasId })),
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
                    id: "tanggalLahir",
                    label: "Tanggal Lahir",
                    name: "tanggalLahir",
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
                        { label: "Laki-laki", value: "Laki-Laki" },
                        { label: "Perempuan", value: "Perempuan" }
                    ],
                    rules: { required: "Jenis Kelamin is required" },
                    colSize: 6
                },
                {
                    type:"select",
                    id: "status",
                    label: "Status Pernikahan",
                    name:"status",
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
                    id: "agamaId",
                    label: "Agama",
                    name:"agamaId",
                    placeholder: "Agama",
                    options: agamaData?.data.map(item => ({ label: item.namaAgama, value: item.agamaId })) || [],
                    rules: { required: "Agama is required" },
                    colSize: 6
                },
                {
                    type: "select",
                    id: "pendidikanTerakhirId",
                    label: "Pendidikan Terakhir",
                    name: "pendidikanTerakhirId",
                    placeholder: "Pendidikan Terakhir",
                    options: pendidikanData?.data.map(item => ({ label: item.namaPendidikan, value: item.pendidikanId })) || [],
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
                    id: "alamatIdentitas",
                    label: "alamat Sesuai Identitas",
                    name: "alamatIdentitas",
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
                    id: "negaraId",
                    label: "Negara",
                    name: "negaraId",
                    placeholder: "Negara",
                    options: negara?.data.map(item => ({label: item.namaNegara, value: item.negaraId})) || [],
                    colSize: 6
                },
                {
                    type: "select",
                    id: "provinsiId",
                    label: "Provinsi Pasien",
                    name: "provinsiId",
                    placeholder: "Pilih Provinsi",
                    options: provinsi?.data.map((item) => ({
                      label: item.namaProvinsi,
                      value: item.provinsiId,
                    })),
                    rules: { required: "Provinsi is required" },
                    colSize: 6,
                    // onChangeCallback: (value) => handleChange("pasien","provinsi", value),
                },
                // {
                //     type: "select",
                //     id: "kabupatenId",
                //     label: "Kabupaten/Kota",
                //     name: "kabupatenId",
                //     placeholder: "Pilih Kabupaten/Kota",
                //     options: kabupaten.map(item => ({ label: item.kabupatenKotaName, value: item.kabupatenKotaId })),
                //     rules: { required: "Kabupaten is required" },
                //     colSize: 6,
                //     onChangeCallback: (value) => handleChange("pasien", "kabupaten", value),
                // },
                // {
                //     type: "select",
                //     id: "kecamatanId",
                //     label: "Kecamatan",
                //     name: "kecamatanId",
                //     placeholder: "Pilih Kecamatan",
                //     options: kecamatan.map(item => ({ label: item.kecamatanName, value: item.kecamatanId })),
                //     rules: { required: "Kecamatan is required" },
                //     colSize: 6,
                // },
                // {
                //     type: "select",
                //     id: "kelurahanId",
                //     label: "Kelurahan",
                //     name: "kelurahanId",
                //     placeholder: "Pilih Kelurahan",
                //     options: kelurahan ? kelurahan.map((item) => ({
                //         label: item.kelurahanName,
                //         value: item.kelurahanId,
                //     })) : [], // Cegah error jika kelurahan masih undefined
                //     rules: { required: "Kelurahan is required" },
                //     colSize: 6,
                // },
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
                    id: "email",
                    label: "Email Pasien",
                    name: "email",
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
                    id:"kewarganegaraanId",
                    label:"kewarganegaraan",
                    name:"kewarganegaraanId",
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
                    options: pekerjaanData?.data?.map(item => ({label:item.namaPekerjaan, value:item.pekerjaanId})),
                    colSize: 6,
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
                    type: "number",
                    id: "noTeleponPerusahaan",
                    label: "No Telepon Perusahaan",
                    name: "noTeleponPerusahaan",
                    placeholder: "No Telepon Perusahaan",
                    rules: {
                        required: "No Telepon Perusahaan is required",
                        validate: (value) => {
                        if (value > 2147483647 || value < 0) {
                            return "Nomor telepon terlalu panjang untuk tipe integer";
                        }
                        return true;
                        },
                    },
                    colSize: 6,
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
                    id: "golonganDarahId",
                    label: "Golongan Darah",
                    name: "golonganDarahId",
                    placeholder: "Pilih Golongan Darah",
                    options: GolonganDarah?.data.map(item => ({label:item.namaGolonganDarah, value:item.golonganDarahId})),
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
                    id: "noIdentitasDarurat",
                    label: "No Identitas Darurat",
                    name: "noIdentitasDarurat",
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
                    id: "alamatDarurat",
                    label: "Alamat Darurat",
                    name: "alamatDarurat",
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
                    id: "identitasOrangtua",
                    label: "No Identitas Orang Tua / Wali",
                    name: "identitasOrangtua",
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
                    id: "hubunganAnak",
                    label: "Hubungan Dengan Pasien",
                    name: "hubunganAnak",
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
        dispatch(AddPasienSlice(data))
            .then((result) => {
                if (AddPasienSlice.fulfilled.match(result)) {
                    console.log("Data pasien berhasil dikirim:", result.payload);
                    alert("Data pasien berhasil dikirim!");
                } else {
                    console.error("Gagal mengirim data:", result.error.message);
                    alert("Gagal mengirim data pasien!");
                }
            })
            .catch((error) => {
                console.error("Error saat dispatch:", error);
                alert("Terjadi kesalahan saat mengirim data pasien!");
            });

        const enhancedData = {
            ...data,
            noRekamMedis: `RM-${new Date().getTime()}`,
            queueNumber: `A-${Math.floor(Math.random() * 100)}`,
            registrationDate: new Date().toLocaleDateString('id-ID'),
            noIdentitas: `${data.noIdentitas}`,
        };

        setSubmittedData(enhancedData);
        setIsSubmitted(true);
    };

      const handlePrint = (type) => {
        setSelectedPrintType(type);
        setTimeout(() => {
          window.print();
          setSelectedPrintType(null);
        }, 100);
      };

      if (isSubmitted && submittedData) {
        return (
          <Card className="m-4">
            <Card.Body>
              <div className="kiosk-logo mb-4">
                <Image src="/Images/pngwing-com.png" fluid alt="logo" />
              </div>
                <h4 className="text-success text-center mt-4">Data Pendaftaran Pasien Berhasil Disimpan</h4>
    
              <Row className="no-print">
                <Col lg={12}>
                <Card className="d-flex justify-content-center align-items-center">
                  <Card.Body>
                    <PrintPatientCard patientData={submittedData} />
                  </Card.Body>
                </Card>
                </Col>
              </Row>
    
              {selectedPrintType === 'card' && (
                <div className="print-only">
                  <PrintPatientCard patientData={submittedData} />
                </div>
              )}
              {selectedPrintType === 'queue' && (
                <div className="print-only">
                  <PrintableQueueNumber 
                    queueData={{
                      queueNumber: submittedData.queueNumber,
                      service: "Poli Umum",
                      date: submittedData.registrationDate,
                      patientName: submittedData.namaPasien
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
                <Button variant="primary" onClick={() => handlePrint('card')} className="text-center mt-3 ml-5">
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
    }

    return (
        <Fragment>
            <DynamicStepForm
                title="Pendaftaran Pasien"
                formConfig={formFields}
                onSubmit={handleSubmit}
                onFormSubmit={handleFormSubmit}
                externalOptions={{ titles: titlesOptions }}
                backPath="/kiosk"
                isAddMode={true}
            />
        </Fragment>
    )
})

KioskPendaftaranPasien.displayName = "KioskPendaftaranPasien"
export default KioskPendaftaranPasien;