'use client'
import TextField from "@/components/ui/text-field";
import React from "react"
import {
    Col,
    Form,
    Row,
  } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";;
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
const PendaftaranPasienBaru = () => {
    const methods = useForm({
        defaultValues:{
            title: '',
            no_rm: '',
            no_ktp: '',
            namaLengkapPasien: '',
            tempatLahir: '',
            tanggalLahir: '',
            jenisKelamin: '',
            pasienPrioritas: '',
            statusPasien: '',
            suku: '',
            agama: '',
            kewaranegaraan: '',
            negara: '',
            
        },
        mode: 'onSubmit'
    })

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <FormProvider {...methods} >
            <Col lg="12">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title tracking-wide"> Form Pendaftaran Identitas Pasien Baru</h4>
                        </div>
                    </div>
                    <div className="card-body">
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="iq-card-header m-1">
                                <SelectField 
                                     name="penjamin"
                                     label="Penjamin"
                                     options={[
                                        { label: "BPJS", value: "bpjs" },
                                        { label: "Non BPJS", value: "non-bpjs" },
                                     ]}
                                     placeholder="Pilih Penjamin"
                                     rules={{ required: 'Penjamin is required' }}
                                     className="mb-3"
                                />
                            </div>
                            <div className="iq-card-header m-1">
                                <div className="iq-header-title">
                                    <h5 className="card-title my-2 "> Identitas Pasien</h5>
                                </div>
                                <Row>
                                    <Col lg="12" className="my-3 ">
                                        <div className="d-flex gap-5 ">
                                            <RadioInput
                                                name="title"
                                                label="Title *"
                                                options={[{ label: "Tn.", value: "Tn" },
                                                    { label: "Ny.", value: "Ny" },
                                                    { label: "Nn.", value: "Nn" },
                                                    { label: "An.", value: "An" },
                                                    { label: "By.", value: "By" },
                                                    { label: "Sdr.", value: "Sdr" },
                                                    { label: "Mr.", value: "Mr" },
                                                    { label: "Mrs.", value: "Mrs" },
                                                    { label: "Miss.", value: "Miss" },
                                                ]}
                                                rules={{ required: 'title is required' }}
                                                className="d-flex gap-5 "
                                            />
                                        </div>
                                    </Col>
                                    <Col lg="6" >
                                        <TextField
                                            label="No.RM Lama :"
                                            name="no_rm"
                                            type="text"
                                            placeholder="Enter No RM"
                                            className="form-control mb-0"
                                            rules={{
                                            required: 'No RM Lama is required',
                                            pattern: {
                                                value:2,
                                                message: 'Invalid username format',
                                            },
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <TextField
                                            label="Nama Lengkap :"
                                            name="namaLengkapPasien"
                                            type="text"
                                            placeholder="Enter Nama Lengkap Sendiri"
                                            className="form-control mb-0"
                                            rules={{
                                            required: 'Nama Lengkap Sendiri is required',
                                            pattern: {
                                                value:2,
                                                message: 'Invalid Nama Lengkap Sendiri',
                                            },
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <TextField
                                            label="No Identitas Penduduk :"
                                            name="no_ktp"
                                            type="text"
                                            placeholder="Enter No Identitas Penduduk "
                                            className="form-control mb-0"
                                            rules={{
                                            required: 'Nama Lengkap Sendiri is required',
                                            pattern: {
                                                value:2,
                                                message: 'Invalid Nama Lengkap Sendiri',
                                            },
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6" >
                                        <SelectField 
                                            name="pasienPrioritas"
                                            label="Pasien Prioritas"
                                            options={[
                                                {label: "Ya", value: "Ya"},
                                                {label: "Tidak", value: "Tidak"},
                                            ]}
                                            placeholder="Pilih Pasien Prioritas"
                                            rules={{ required: 'Pasien Prioritas is required' }}
                                            className="mb-3"
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <TextField
                                            label="Tempat Lahir :"
                                            name="tempatLahir"
                                            type="text"
                                            placeholder="Enter Nama Lengkap Sendiri"
                                            className="form-control mb-0"
                                            rules={{
                                            required: 'Nama Lengkap Sendiri is required',
                                            pattern: {
                                                value:2,
                                                message: 'Invalid Nama Lengkap Sendiri',
                                            },
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <DateInput
                                            name="tanggalLahir"
                                            label="Tanggal Lahir"
                                            placeholder={'Enter Tanggal Lahir'}
                                            rules={{ required: 'Tanggal lahir harus diisi' }} // Aturan validasi
                                        />
                                    </Col>
                                    <Col lg="6" >
                                        <SelectField 
                                            name="jenisKelamin"
                                            label="Jenis Kelamin"
                                            options={[
                                                {label: "Laki-Laki", value: "Laki-Laki"},
                                                {label: "Perempuan", value: "Perempuan"},
                                            ]}
                                            placeholder="Pilih Jenis Kelamin"
                                            rules={{ required: 'Jenis Kelamin is required' }}
                                            className="mb-3"
                                        />
                                    </Col>
                                    <Col lg="6" >
                                        <SelectField 
                                            name="statusPasien"
                                            label="Status"
                                            options={[
                                                {label: "Belum Menikah", value: "Belum Menikah"},
                                                {label: "Menikah ", value: "Menikah"},
                                                {label: "Duda Keren", value: "Duda Keren"},
                                                {label: "Janda Anggun", value: "Janda Anggun"},
                                            ]}
                                            placeholder="Pilih Status"
                                            rules={{ required: 'Status is required' }}
                                            className="mb-3"
                                        />
                                    </Col>
                                    <Col lg="6" >
                                        <TextField 
                                            label="Suku :"
                                            name="suku"
                                            type="text"
                                            placeholder="Enter Suku"
                                            className="form-control mb-0"
                                            rules={{
                                            required: 'suku is required',
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6" >
                                        <SelectField 
                                            name="agama"
                                            label="Agama"
                                            options={[
                                                {label: "Islam", value: "Islam"},
                                                {label: "Kristen ", value: "Kristen"},
                                                {label: "Protestan", value: "Protestan"},
                                                {label: "Katolik", value: "Katolik"},
                                                {label: "Hindu", value: "Hindu"},
                                                {label: "Budha", value: "Budha"},
                                                {label: "Konghucu", value: "Konghucu"},
                                            ]}
                                            placeholder="Pilih Agama"
                                            rules={{ required: 'Agama is required' }}
                                            className="mb-3"
                                        />
                                    </Col>
                                    
                                    <Col lg="12" className="my-3 ">
                                        <div className="d-flex gap-5 ">
                                            <RadioInput
                                                name="kewarganegaraan"
                                                label="Kewarganegaraan *"
                                                options={[
                                                    { label: "WNI", value: "WNI" },
                                                    { label: "WNA", value: "WNA" },
                                                    
                                                ]}
                                                rules={{ required: 'kewarganegaraan is required' }}
                                                className="d-flex gap-5 "
                                            />
                                        </div>
                                        <Col lg="6" >
                                            <SelectField 
                                                name="namaNegara"
                                                label="Negara"
                                                options={[
                                                    {label: "Indonesia", value: "indonesia"},
                                                    {label: "Amerika ", value: "amerika"},
                                                    {label: "Papua Nuginie", value: "papuaNuginie"},
                                                    {label: "Nigeria", value: "nigeria"},
                                                    {label: "Mesir", value: "mesir"},
                                                    {label: "Selandia Baru", value: "selandiaBaru"},
                                                    {label: "Thailand", value: "thailand"},
                                                ]}
                                                placeholder="Pilih Negara"
                                                rules={{ required: 'Negara is required' }}
                                                className="mb-3"
                                            />
                                        </Col>
                                    </Col>

                                    <Col lg="12" className="my-3">
                                        <Col lg="6">
                                            <SelectField 
                                                name="namaPendidikanTerakhir"
                                                label="Pendidikan Terakhir"
                                                options={[
                                                    {label: "Magister", value: "magister"},
                                                    {label: "Sarjana", value: "Sarjana"},
                                                    {label: "SMA", value: "SMA"},
                                                    {label: "SMP", value: "SMP"},
                                                    {label: "SD", value: "sd"},
                                                ]}
                                                placeholder="Pilih Pendidikan Terakhir"
                                                rules={{ required: 'Pendidikan Terakhir is required' }}
                                                className="mb-3"
                                            />
                                        </Col>
                                    </Col>
                                    <Col lg="12" className="my-3">
                                        <Col lg="6">
                                        <TextArea
                                            label="Alamat Domisili"
                                            name="alamatDomisili"
                                            placeholder="Masukkan alamat Domisili Pasien..."
                                            rules={{ required: 'alamat Domisili Pasien harus diisi' }}
                                            rows={5}
                                        />
                                        </Col>
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Form>
                    </div>
                </div>
            </Col>
        </FormProvider>
    )
}

export default PendaftaranPasienBaru