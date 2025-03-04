import AutocompleteTextField from '@/components/ui/search-textField-ui'
import SelectField from '@/components/ui/select-field'
import TextField from '@/components/ui/text-field'
import TextArea from '@/components/ui/textArea-field'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'

const ResepDokter = memo(() => {
    const methods = useForm({
        defaultValues: {
            name: "",
            tipeObat: "",
            alternatifObat: [],
        },
        mode: "onSubmit"
    });

    const data = ["Amoxicillin", "Paracetamol", "Ibuprofen"];
    const tipeObat = ["sirup", "tablet", "generik"];

    const obatAlternatifData = [
        { id: 1, name: 'Clavulanic Acid', ingredients: 'Amoxicillin' },
        { id: 2, name: 'Azithromycin', ingredients: 'Amoxicillin' },
        { id: 3, name: 'Cefalexin', ingredients: 'Amoxicillin' },
    ];

    const [alternatifObat, setAlternatifObat] = useState([]);
    const [selectedObat, setSelectedObat] = useState('');
    const [selectedTipeObat, setSelectedTipeObat] = useState('');
    const [obatInTable, setObatInTable] = useState([]);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const handleObatChange = (value) => {
        setSelectedObat(value);

        // Simulate searching for alternative drugs based on selected drug
        const filteredAlternatives = obatAlternatifData.filter(obat => obat.ingredients === value);
        setAlternatifObat(filteredAlternatives);
    };

    const handleAddAlternatifObat = () => {
        if (selectedObat && selectedTipeObat) {
            const obatToAdd = {
                name: selectedObat,
                tipe: selectedTipeObat
            };
            setObatInTable([...obatInTable, obatToAdd]);
            methods.setValue('alternatifObat', [...methods.getValues('alternatifObat'), obatToAdd]);
        }
    };

    const handleSave = () => {
        // Send obatInTable to the server or database
        console.log("Saving obat data:", obatInTable);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Card className='shadow-md mt-4'>
                    <Card.Body>
                        <Col xs={12} className='p-3 shadow-sm mt-3 g-0'>
                            <Row>
                                <Col md={6}>
                                    <TextField
                                        name="noRegistrasi"
                                        label="No Registrasi Pasien :  * "
                                        placeholder={'No Registrasi Pasien '}
                                        rules={{ required: 'No Registrasi Pasien harus diisi' }}
                                        disabled={true}
                                        value={"RG - 08-24-2023-001"}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <TextField
                                        name="instalasiUnit"
                                        label="Instalasi Unit Farmasi :  * "
                                        placeholder={''}
                                        rules={{ required: 'No Registrasi Pasien harus diisi' }}
                                        disabled={true}
                                        value={"Farmasi Rawat Jalan"}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <TextArea
                                        label="Resep Manual / Racikan Obat :  * "
                                        name="resepManual"
                                        placeholder="Masukkan Racikan Resep Obat Pilihan Dokter..."
                                        rules={{ required: 'Racikan Resep Obat Pilihan Dokter harus diisi' }}
                                        rows={5}
                                    />
                                </Col>
                                <Col md="6">
                                    <AutocompleteTextField
                                        name="name"
                                        label="Cari Obat :  * "
                                        data={data}
                                        placeholder=""
                                        rules={{ required: "This field is required" }}
                                        className="mb-3"
                                        onChange={handleObatChange}
                                    />
                                </Col>
                                <Col md="6">
                                    <AutocompleteTextField
                                        name="tipeObat"
                                        label="Cari tipe Obat :  * "
                                        data={tipeObat}
                                        placeholder=""
                                        rules={{ required: "This field is required" }}
                                        className="mb-3"
                                        onChange={(value) => setSelectedTipeObat(value)}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <SelectField
                                        name="templateResep"
                                        label="Template Resep :  * "
                                        options={[]}
                                        rules={{ required: 'Jenis Obat harus diisi' }}
                                        placeholder={'Template Resep'}
                                    />
                                </Col>

                                {/* Table for selected drugs */}
                                <Col xs={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nama Obat</th>
                                                <th>Tipe Obat</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {obatInTable.map((obat, index) => (
                                                <tr key={index}>
                                                    <td>{obat.name}</td>
                                                    <td>{obat.tipe}</td>
                                                    <td>
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => {
                                                                const newObatInTable = obatInTable.filter((_, i) => i !== index);
                                                                setObatInTable(newObatInTable);
                                                            }}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>

                                {/* Button to Add and Save */}
                                <Col xs={12} className="mt-3">
                                    <button
                                        className='btn btn-primary'
                                        type="button"
                                        onClick={handleAddAlternatifObat}
                                    >
                                        Add to Table
                                    </button>
                                    <button
                                        className='btn btn-success ms-3'
                                        type="button"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Card.Body>
                </Card>
            </Form>
        </FormProvider>
    )
});
ResepDokter.displayName = "ResepDokter";
export default ResepDokter;
