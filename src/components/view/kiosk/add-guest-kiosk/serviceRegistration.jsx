"use client";
import React, { useState } from 'react';
import { Modal, Button, Tab, Nav, Row, Col, Card, Image } from 'react-bootstrap';
import DynamicStepForm from '@/components/features/dynamic-form/dynamicForm/dynamicFormSteps';
import { showAlert } from '@/components/features/alert/custom-alert';
import ButtonNav from '@/components/ui/button-navigation';
import PrintableQueueNumber from './patientAntrian';

const ServiceRegistration = ({ 
  showModal, 
  onClose, 
  patientData,
  onServiceRegistered 
}) => {
  const [activeService, setActiveService] = useState('poli');
  const [selectedService, setSelectedService] = useState(null);
  const [serviceSubmitted, setServiceSubmitted] = useState(false);
  const [selectedPrintType, setSelectedPrintType] = useState(null);

  // Form pendaftaran layanan poli
  const poliFormFields = [
    {
      section: "Pilih Poliklinik",
      fields: [
        {
          type: "select",
          id: "poliId",
          label: "Poliklinik",
          name: "PoliId",
          placeholder: "Pilih Poliklinik",
          options: [
            {label: "Poli Umum", value: "POLIUMUMID001"},
            {label: "Poli Gigi", value: "POLIGIGI001"},
            {label: "Poli Anak", value: "POLIANAK001"},
            {label: "Poli Jantung", value: "POLIJANTUNG001"},
          ],
          colSize: 12,
        }
      ]
    },
    {
      section: "Pilih Dokter",
      fields: [
        {
          type: "select",
          id: "dokterId",
          label: "Dokter",
          name: "DokterId",
          placeholder: "Pilih Dokter",
          options: [
            {label: "dr. Ahmad Syafii", value: "DOK001"},
            {label: "dr. Budi Santoso, Sp.A", value: "DOK002"},
            {label: "drg. Citra Dewi", value: "DOK003"},
            {label: "dr. Dina Putri, Sp.JP", value: "DOK004"},
          ],
          colSize: 12,
        }
      ]
    },
    {
      section: "Jadwal Kunjungan",
      fields: [
        {
          type: "date",
          id: "tanggalKunjungan",
          label: "Tanggal Kunjungan",
          name: "TanggalKunjungan",
          colSize: 6
        },
        {
          type: "select",
          id: "sessionId",
          label: "Sesi",
          name: "SessionId",
          placeholder: "Pilih Sesi",
          options: [
            {label: "Pagi (08:00 - 12:00)", value: "PAGI001"},
            {label: "Siang (13:00 - 16:00)", value: "SIANG001"},
          ],
          colSize: 6,
        }
      ]
    }
  ];

  // Form pendaftaran lab
  const labFormFields = [
    {
      section: "Pilih Jenis Pemeriksaan",
      fields: [
        {
          type: "select",
          id: "jenisPemeriksaanId",
          label: "Jenis Pemeriksaan",
          name: "JenisPemeriksaanId",
          placeholder: "Pilih Jenis Pemeriksaan",
          options: [
            {label: "Hematologi Lengkap", value: "LAB001"},
            {label: "Fungsi Ginjal", value: "LAB002"},
            {label: "Fungsi Hati", value: "LAB003"},
            {label: "Gula Darah", value: "LAB004"},
          ],
          colSize: 12,
        }
      ]
    },
    {
      section: "Jadwal Pengambilan Sampel",
      fields: [
        {
          type: "date",
          id: "tanggalPengambilan",
          label: "Tanggal Pengambilan",
          name: "TanggalPengambilan",
          colSize: 6
        },
        {
          type: "select",
          id: "waktuPengambilan",
          label: "Waktu Pengambilan",
          name: "WaktuPengambilan",
          placeholder: "Pilih Waktu",
          options: [
            {label: "08:00 - 10:00", value: "SLOT1"},
            {label: "10:00 - 12:00", value: "SLOT2"},
            {label: "13:00 - 15:00", value: "SLOT3"},
          ],
          colSize: 6,
        }
      ]
    }
  ];

  // Form pendaftaran radiologi
  const radiologiFormFields = [
    {
      section: "Pilih Jenis Pemeriksaan Radiologi",
      fields: [
        {
          type: "select",
          id: "jenisRadiologiId",
          label: "Jenis Pemeriksaan",
          name: "JenisRadiologiId",
          placeholder: "Pilih Jenis Pemeriksaan",
          options: [
            {label: "Rontgen Thorax", value: "RAD001"},
            {label: "USG Abdomen", value: "RAD002"},
            {label: "CT Scan Kepala", value: "RAD003"},
            {label: "MRI Lutut", value: "RAD004"},
          ],
          colSize: 12,
        }
      ]
    },
    {
      section: "Jadwal Pemeriksaan",
      fields: [
        {
          type: "date",
          id: "tanggalPemeriksaan",
          label: "Tanggal Pemeriksaan",
          name: "TanggalPemeriksaan",
          colSize: 6
        },
        {
          type: "select",
          id: "waktuPemeriksaan",
          label: "Waktu Pemeriksaan",
          name: "WaktuPemeriksaan",
          placeholder: "Pilih Waktu",
          options: [
            {label: "08:00 - 10:00", value: "SLOT1"},
            {label: "10:00 - 12:00", value: "SLOT2"},
            {label: "13:00 - 15:00", value: "SLOT3"},
          ],
          colSize: 6,
        }
      ]
    }
  ];

  const handleServiceSubmit = (serviceData) => {
    // Gabungkan data pasien dengan data layanan
    const combinedData = {
      patientId: patientData.patientId || patientData.noRekamMedis,
      patientName: patientData.NamaLengkap,
      noRekamMedis: patientData.noRekamMedis,
      ...serviceData
    };
    
    console.log("Data pendaftaran layanan:", combinedData);
    
    // Di sini Anda dapat menambahkan logika untuk mengirim data layanan ke backend
    // Misalnya dengan dispatch action redux untuk pendaftaran layanan
    
    // Untuk simulasi berhasil:
    showAlert.success(`Pendaftaran layanan ${activeService.toUpperCase()} berhasil!`);
    
    // Generate queue number
    const serviceCode = {
      'poli': 'P',
      'lab': 'L',
      'radiologi': 'R'
    };
    
    const selectedServiceData = {
      type: activeService,
      data: serviceData,
      queueNumber: `${serviceCode[activeService]}${Math.floor(Math.random() * 100)}`
    };
    
    setSelectedService(selectedServiceData);
    setServiceSubmitted(true);
    
    // Panggil callback onServiceRegistered jika ada
    if (typeof onServiceRegistered === 'function') {
      onServiceRegistered(selectedServiceData);
    }
  };

  const handlePrint = (type) => {
    setSelectedPrintType(type);
    setTimeout(() => {
      window.print();
      setSelectedPrintType(null);
    }, 500);
  };

  const resetForm = () => {
    setServiceSubmitted(false);
    setSelectedService(null);
    setActiveService('poli');
  };

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  if (serviceSubmitted && selectedService) {
    // Tampilkan hasil pendaftaran layanan
    return (
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pendaftaran Layanan Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <h4 className="text-success">Pendaftaran Layanan {activeService.toUpperCase()} Berhasil</h4>
          </div>
          
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <h5>Data Pasien</h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>Nama:</strong> {patientData.NamaLengkap}</p>
                  <p><strong>No. Rekam Medis:</strong> {patientData.noRekamMedis}</p>
                  <p><strong>No. Identitas:</strong> {patientData.NoIdentitas}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <h5>Detail Layanan {selectedService.type.toUpperCase()}</h5>
                </Card.Header>
                <Card.Body>
                  {selectedService.type === 'poli' && (
                    <>
                      <p><strong>Poliklinik:</strong> {selectedService.data.PoliId}</p>
                      <p><strong>Dokter:</strong> {selectedService.data.DokterId}</p>
                      <p><strong>Tanggal:</strong> {selectedService.data.TanggalKunjungan}</p>
                      <p><strong>Sesi:</strong> {selectedService.data.SessionId}</p>
                    </>
                  )}
                  {selectedService.type === 'lab' && (
                    <>
                      <p><strong>Jenis Pemeriksaan:</strong> {selectedService.data.JenisPemeriksaanId}</p>
                      <p><strong>Tanggal:</strong> {selectedService.data.TanggalPengambilan}</p>
                      <p><strong>Waktu:</strong> {selectedService.data.WaktuPengambilan}</p>
                    </>
                  )}    
                  {selectedService.type === 'radiologi' && (
                    <>
                      <p><strong>Jenis Pemeriksaan:</strong> {selectedService.data.JenisRadiologiId}</p>
                      <p><strong>Tanggal:</strong> {selectedService.data.TanggalPemeriksaan}</p>
                      <p><strong>Waktu:</strong> {selectedService.data.WaktuPemeriksaan}</p>
                    </>
                  )}
                  <p><strong>No. Antrian:</strong> {selectedService.queueNumber}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {selectedPrintType === 'queue' && (
            <div className="print-only">
              <PrintableQueueNumber 
                queueData={{
                  queueNumber: selectedService.queueNumber,
                  service: selectedService.type.toUpperCase(),
                  date: new Date().toLocaleDateString('id-ID'),
                  patientName: patientData.NamaLengkap
                }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handlePrint('queue')} className="me-2">
            Cetak Nomor Antrian
          </Button>
          <Button variant="primary" onClick={() => resetForm()}>
            Daftar Layanan Lain
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Selesai
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Pilih Layanan untuk Pasien {patientData?.NamaLengkap}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeService} onSelect={setActiveService}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="poli">Poliklinik</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="lab">Laboratorium</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="radiologi">Radiologi</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="poli">
                  <DynamicStepForm
                    title="Pendaftaran Poliklinik"
                    formConfig={poliFormFields}
                    onSubmit={handleServiceSubmit}
                    isAddMode={true}
                    navigationConfig={{
                      submitButtonText: "Daftar Poliklinik"
                    }}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="lab">
                  <DynamicStepForm
                    title="Pendaftaran Laboratorium"
                    formConfig={labFormFields}
                    onSubmit={handleServiceSubmit}
                    isAddMode={true}
                    navigationConfig={{
                      submitButtonText: "Daftar Laboratorium"
                    }}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="radiologi">
                  <DynamicStepForm
                    title="Pendaftaran Radiologi"
                    formConfig={radiologiFormFields}
                    onSubmit={handleServiceSubmit}
                    isAddMode={true}
                    navigationConfig={{
                      submitButtonText: "Daftar Radiologi"
                    }}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceRegistration;