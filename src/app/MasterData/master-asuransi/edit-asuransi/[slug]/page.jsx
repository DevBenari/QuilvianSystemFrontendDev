'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import DynamicForm from '@/components/features/dynamic-form/dynamicForm/dynamicForm';
import { extractIdFromSlug } from '@/utils/slug';
import { dataPasienRadiologi } from '@/utils/dataPerjanjian';

const AsuransiEditPage = ({params}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(dataPasienRadiologi);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for slug:', params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log('Extracted ID:', id);
    
        const user = dataPasienRadiologi.find((u) => u.id === parseInt(id, 10));
        console.log('Found User:', user);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        setUserData(user);
      } catch (error) {
          console.error('Error fetching user:', error);
          router.push('/404');
      } finally {
          setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.slug, router]);
    
  const handleSubmit = async (data) => {
    console.log("data", data);
  };
  

  const formFields = [
    {
      fields:
      [
        {
          type: "text",
          id: "kodePerusahaan",
          label: "Kode Perusahaan",
          name: "kodePerusahaan",
          placeholder: "Kode Perusahaan",
          rules: { required: "Kode Perusahaan is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPerusahaan",
          label: "Nama Perusahaan",
          name: "namaPerusahaan",
          placeholder: "Nama Perusahaan",
          rules: { required: "Nama Perusahaan is required" },
          colSize: 6,
        },
        {
          type:"text",
          id: "tarifGolongan",
          label: "Tarif Golongan Perusahaan",
          name: "tarifGolongan",
          placeholder: "Tarif Golongan Perusahaan",
          rules: { required: "Tarif Golongan Perusahaan is required" },
          colSize: 6,
        },
        {
          type:"select",
          id: "bankAccount",
          label:"Nama Bank",
          name: "bankAccount",
          placeholder: "Nama Bank",
          options:[
            {label:"BCA",value:"bca"},
            {label:"BNI",value:"bni"},
            {label:"BRI",value:"bri"},
            {label:"Mandiri",value:"mandiri"},
            {label:"Permata",value:"permata"},
          ],
          rules: { required: "Nama Bank is required" },
          colSize: 6,
      },
                {
                    type:"number",
                    id : "discount",
                    label: "Discount",
                    name: "discount",
                    placeholder: "Discount",
                    rules: { required: "Discount is required" },
                    colSize: 6,
                 },
                 {
                    type:"select",
                    id: "statusPenjamin",
                    label: "Termasuk Penjamin",
                    name: "statusPenjamin",
                    placeholder: "Status Penjamin",
                    options:[
                        {label:"Ya",value:"Ya"},
                        {label:"Tidak ",value:"tidak "},
                    ],
                    rules: { required: "Status Penjamin is required" },
                    colSize: 6,
                 },
                 {
                    type:"select",
                    id: "penjaminKaryawanRs",
                    label: "Termasuk Penjamin Karyawan RS",
                    name: "penjaminKaryawanRs",
                    placeholder: "Penjamin",
                    options:[
                        {label:"Ya",value:"Ya"},
                        {label:"Tidak ",value:"tidak "},
                    ],
                    rules: { required: "Status Asuransi is required" },
                    colSize: 6,
                 },
                 {
                    type:"text",
                    id: "perusahaanPenjamin",
                    label: "Perusahaan Penjamin",
                    name: "perusahaanPenjamin",
                    placeholder: "Perusahaan Penjamin",
                    rules: { required: "Perusahaan Penjamin is required" },
                    colSize: 6,
                 },
                 {
                    type:"textarea",
                    id: "alamatPerusahaan",
                    label: "Alamat Perusahaan Penjamin",
                    name: "alamatPerusahaan",
                    placeholder: "Alamat Perusahaan Penjamin",
                    rules: { required: "Alamat Perusahaan Penjamin is required" },
                    colSize: 12,
                 },
                 {
                    type:"text",
                    id: "kota",
                    label: "Kota",
                    name: "kota",
                    placeholder: "Kota",
                    rules: { required: "Kota is required" },
                    colSize: 6,
                 },
                 {
                    type:"text",
                    id: "kodePos",
                    label: "Kode Pos",
                    name: "kodePos",
                    placeholder: "Kode Pos",
                    rules: { required: "Kode Pos is required" },
                    colSize: 6,
                 },
                 {
                    type:"text",
                    id: "noTelp",
                    label: "No Telepon",
                    name: "noTelp",
                    placeholder: "No Telepon",
                    rules: { required: "No Telepon is required" },
                    colSize: 6,
                 },
                 {
                    type:"text",
                    id: "noFax",
                    label: "No Fax",
                    name: "noFax",
                    placeholder: "No Fax",
                    rules: { required: "No Fax is required" },
                    colSize: 6,
                 },
                 {
                    type: "text",
                    id: "penanggungJawab",
                    label: "Penanggung Jawab Bank Account",
                    name: "penanggungJawab",
                    placeholder: "Penanggung Jawab Bank Account",
                    rules: { required: "Penanggung Jawab Bank Account is required" },
                    colSize: 6,
                 },
                 {
                    type: "text",
                    id: "cabangBank",
                    label: "Cabang Bank",
                    name: "cabangBank",
                    placeholder: "Cabang Bank",
                    rules: { required: "Cabang Bank is required" },
                    colSize: 6,
                 },
                 {
                    type: "date",
                    id: "awalKerjasama",
                    label: "Tanggal Awal Kerjasama",
                    name: "awalKerjasama",
                    rules: { required: "Tanggal Awal Kerjasama is required" },
                    colSize: 6,
                 },
                 {
                    type: "date",
                    id: "akhirKerjasama",
                    label: "Tanggal Akhir Kerjasama",
                    name: "akhirKerjasama",
                    rules: { required: "Tanggal Akhir Kerjasama is required" },
                    colSize: 6,
                 }
            ]
        },
        {
            section:"Keterangan Perusahaan Penjamin",
            fields: 
            [
                {
                    type: "select",
                    id: "jenisPerusahaan",
                    label: "Jenis Perusahaan",
                    name: "jenisPerusahaan",
                    placeholder: "Jenis Perusahaan",
                    options:[
                        {label:"Asuransi",value:"asuransi"},
                        {label:"Perusahaan",value:"perusahaan"},
                        {label:"Kedutaan",value:"kedutaan"},
                        {label:"Perusahaan Kartu Kredit",value:"perusahaan kartu kredit"},
                        {label:"Rekanan",value:"rekanan"},
                        {label:"TPA",value:"tpa"},
                    ],
                    rules: { required: "Jenis Perusahaan is required" },
                    colSize: 6,
                },
                {
                    type:"email",
                    id: "emailPerusahaan",
                    label: "Email Perusahaan",
                    name: "emailPerusahaan",
                    placeholder: "Email Perusahaan",
                    rules: {
                        required: "Email Kontak is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Masukkan email yang valid",
                        },
                    },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "direktur",
                    label: "Direktur",
                    name: "direktur",
                    placeholder: "Direktur",
                    rules: { required: "Direktur is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "namaKontak",
                    label: "Nama Kontak",
                    name: "namaKontak",
                    placeholder: "Nama Kontak",
                    rules: { required: "Nama Kontak is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "jabatan",
                    label: "Jabatan",
                    name: "jabatan",
                    placeholder: "Jabatan",
                    rules: { required: "Jabatan is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id:"noFax",
                    label: "No Fax",
                    name: "noFax",
                    placeholder: "No Fax",
                    rules: { required: "No Fax is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "noTelp",
                    label: "No Telepon",
                    name: "noTelp",
                    placeholder: "No Telepon",
                    rules: { required: "No Telepon is required" },
                    colSize: 6,
                },
                {
                    type: "email",
                    id: "emailKontak",
                    label: "Email Kontak",
                    name: "emailKontak",
                    placeholder: "Email Kontak",
                    rules: {
                        required: "Email Kontak is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Masukkan email yang valid",
                        },
                    },
                    colSize: 6,
                },
                {
                    type : "select",
                    id: "status",
                    label: "Status",
                    name: "status",
                    placeholder: "Status",
                    options: [
                        { label: "Aktif", value: "aktif" },
                        { label: "Tidak Aktif", value: "tidak aktif" },
                    ],
                    rules: { required: "Status is required" },
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "jenisKerjasama",
                    label: "Jenis Kerjasama",
                    name: "jenisKerjasama",
                    placeholder: "Jenis Kerjasama",
                    options: [
                        { label: "Rawat Jalan", value: "rawat jalan" },
                        { label: "Rawat Inap", value: "rawat inap" },
                        { label: "MCU", value: "mcu" },
                    ],
                    rules: { required: "Jenis Kerjasama is required" },
                    colSize: 6,
                },
                {
                    type : "select",
                    id: "jenisKontrak",
                    label: "Jenis Kontrak",
                    name: "jenisKontrak",
                    placeholder: "Jenis Kontrak",
                    options: [
                        { label: "Kontrak", value: "kontrak" },
                        { label: "Non-Kontrak", value: "non-kontrak" },
                    ],
                    rules: { required: "Jenis Kontrak is required" },
                    colSize: 6,
                },
                {
                    type:"number",
                    id: "jatuhTempo",
                    label: "Jatuh Tempo",
                    name: "jatuhTempo",
                    placeholder: "Jatuh Tempo",
                    rules: { required: "Jatuh Tempo is required" },
                    colSize: 6,
                },
                {
                    type:"text",
                    id: "kriteriaPembiayaan",
                    label: "Kriteria Pembiayaan",
                    name: "kriteriaPembiayaan",
                    placeholder: "Kriteria Pembiayaan",
                    rules: { required: "Kriteria Pembiayaan is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id: "menjaminPasienOTC",
                    label: "Menjamin Pasien OTC",
                    name: "menjaminPasienOTC",
                    placeholder: "Penjamin",
                    options:[
                        {label:"Ya",value:"Ya"},
                        {label:"Tidak ",value:"tidak "},
                    ],
                    rules: { required: "Penjaminan Pasien is required" },
                    colSize: 6,
                 },
                 {
                    type: "text",
                    id: "pinalty",
                    label: "Pinalty",
                    name: "pinalty",
                    placeholder: "Pinalty",
                    rules: { required: "Pinalty is required" },
                    colSize: 6,
                 }
            ]
        }
  ]
      if (isLoading) {
        return (
            <div className="iq-card">
                <div className="card-body text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="iq-card">
                <div className="card-body">
                    <div className="alert alert-danger">
                        User not found or error loading data
                    </div>
                </div>
            </div>
        );
    }

    return (
      <Fragment>
        <DynamicForm
            title="Edit Data Asuransi"
            formConfig={formFields.map((section) => ({
                ...section,
                fields: section.fields.map((field) => ({
                ...field,
                value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
                })),
            }))} 
            onSubmit={handleSubmit}
            backPath={`/MasterData/master-asuransi/daftar-asuransi`}
            isAddMode={false}
        />
      </Fragment>
    )
}

export default AsuransiEditPage