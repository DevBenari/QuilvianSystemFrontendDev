import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Table, Card, Form, Col, Row } from 'react-bootstrap';
import SelectField from '@/components/ui/select-field';
import TextField from '@/components/ui/text-field';
import TextArea from '@/components/ui/textArea-field';


const PrescriptionForm = () => {
  const methods = useForm({
    defaultValues: {
      selectedMedicine: '',
      frequency: '',
      duration: '',
      tipeObat: '',
      alternatifObat: [],
    },
  });

  const medicines = [
    { value: 'Paracetamol', label: 'Paracetamol (500mg)' },
    { value: 'Amoxicillin', label: 'Amoxicillin (250mg)' },
    { value: 'Omeprazole', label: 'Omeprazole (20mg)' },
    { value: 'Cetirizine', label: 'Cetirizine (10mg)' },
  ];

  const tipeObat = [
    {value: "sirup", label: "Sirup"},
    {value: "tablet", label: "Tablet"},
    {value: "capsul", label: "Capsul"},
    {value: "injeksi", label: "Injeksi"},
    {value: "gel", label: "Gel"},
  ];
  const obatAlternatifData = [
    { id: 1, name: 'Clavulanic Acid', ingredients: 'Amoxicillin' },
    { id: 2, name: 'Azithromycin', ingredients: 'Amoxicillin' },
    { id: 3, name: 'Cefalexin', ingredients: 'Amoxicillin' },
  ];

  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [alternatifObat, setAlternatifObat] = useState([]);
  const [selectedTipeObat, setSelectedTipeObat] = useState('');

  const handleAddMedicine = (data) => {
    const selectedMedicine = medicines.find(
      (medicine) => medicine.value === data.selectedMedicine
    );

    if (!selectedMedicine || !data.frequency || !data.duration) {
      alert('Mohon lengkapi semua data obat');
      return;
    }

    const newItem = {
      id: Date.now(),
      medicineName: selectedMedicine.label.split(' ')[0],
      dosage: selectedMedicine.label.match(/\((.*?)\)/)[1],
      frequency: data.frequency,
      duration: data.duration,
      tipeObat: selectedTipeObat,
    };

    setPrescriptionItems((prev) => [...prev, newItem]);
    methods.reset();
  };

  const handleObatChange = (selectedObat) => {
    const value = selectedObat ? selectedObat.value : '';
    const alternatives = obatAlternatifData.filter((obat) => obat.ingredients === value);
  
    setAlternatifObat(alternatives);
    methods.setValue('selectedMedicine', value); // Perbarui form field
  };
  

  const removeItem = (id) => {
    setPrescriptionItems((prev) => prev.filter((item) => item.id !== id));
  };

  const savePrescription = () => {
    if (prescriptionItems.length === 0) {
      alert('Mohon tambahkan minimal satu obat');
      return;
    }

    console.log('Menyimpan resep:', prescriptionItems);
    alert('Resep berhasil disimpan!');
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleAddMedicine)}>
        <Card className="shadow-md mt-4">
          <Card.Header as="h5">Input Resep Pasien</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <TextField
                  name="noRegistrasi"
                  label="No Registrasi Pasien: *"
                  value="RG - 08-24-2023-001"
                  disabled
                />
              </Col>
              <Col md={6}>
                <TextField
                  name="instalasiUnit"
                  label="Instalasi Unit Farmasi: *"
                  value="Farmasi Rawat Jalan"
                  disabled
                />
              </Col>
              <Col md={12} className="mt-3">
                <TextArea
                  label="Resep Manual / Racikan Obat: *"
                  name="resepManual"
                  placeholder="Masukkan racikan resep..."
                  rows={5}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <SelectField
                  name="selectedMedicine"
                  label="Cari Obat: *"
                  options={medicines}
                  onChange={handleObatChange}
                />
              </Col>
              <Col md={6}>
                <SelectField 
                    name="selectedMedicineType"
                    label="Cari tipe Obat: *"
                    options={tipeObat}
                    onChange={(value) => setSelectedTipeObat(value)}
                />
              </Col>
              <Col md={4} className="mt-3">
                <SelectField
                  name="frequency"
                  label="Frekuensi: *"
                  options={[
                    { value: '1x1', label: '1x1' },
                    { value: '2x1', label: '2x1' },
                    { value: '3x1', label: '3x1' },
                  ]}
                />
              </Col>
              <Col md={4} className="mt-3">
                <Form.Group>
                  <Form.Label>Durasi (Hari): *</Form.Label>
                  <Form.Control
                    type="number"
                    {...methods.register('duration', { min: 1 })}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mt-5">
                <Button type="submit" variant="primary" >
                  <i className='ri-grid-fill'></i>
                  Tambah ke Tabel
                </Button>
              </Col>
            </Row>
            <Table bordered hover responsive className="mt-4">
              <thead>
                <tr>
                  <th>Nama Obat</th>
                  <th>Dosis</th>
                  <th>Frekuensi</th>
                  <th>Durasi</th>
                  <th>Tipe Obat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionItems.length > 0 ? (
                  prescriptionItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.medicineName}</td>
                      <td>{item.dosage}</td>
                      <td>{item.frequency}</td>
                      <td>{item.duration}</td>
                      <td>{item.tipeObat}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Belum ada obat yang ditambahkan
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" onClick={savePrescription}>
                <i className='ri-save-2-line'></i>
                Simpan Resep
              </Button>
            </div>
          </Card.Body>
        </Card> 
      </Form>
    </FormProvider>
  );
};

export default PrescriptionForm;
