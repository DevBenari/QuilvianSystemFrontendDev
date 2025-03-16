import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';

/**
 * Kartu untuk menampilkan informasi pasien setelah screening berhasil
 * 
 * @param {Object} props
 * @param {Object} props.patientData - Data pasien dari hasil screening
 * @param {Function} props.onContinue - Handler untuk lanjut ke pendaftaran
 * @param {Function} props.onBack - Handler untuk kembali ke screening
 */
const PatientInfoCard = ({ patientData, onContinue, onBack }) => {
  if (!patientData) return null;

  // Format tanggal lahir
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Hitung umur pasien
  const calculateAge = (birthDate) => {
    if (!birthDate) return '-';
    
    try {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return `${age} tahun`;
    } catch (error) {
      return '-';
    }
  };

  return (
    <Card className="shadow-lg border-0 mb-4 overflow-hidden">
      <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
        <h4 className="mb-0">Data Pasien Ditemukan</h4>
        <Badge bg="light" text="dark" pill>
          {patientData.statusPasien || "Pasien Terdaftar"}
        </Badge>
      </Card.Header>
      
      <Card.Body className="p-4">
        <Row>
          <Col md={3} className="text-center mb-4 mb-md-0">
            <div className="avatar-circle bg-light d-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '120px', height: '120px', borderRadius: '50%' }}>
              <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
            </div>
            <h5>{patientData.namaLengkap}</h5>
            <p className="text-muted mb-0">No. RM: {patientData.noRekamMedis || '-'}</p>
          </Col>
          
          <Col md={9}>
            <Row className="mb-3">
              <Col md={6}>
                <dl className="row mb-0">
                  <dt className="col-sm-4">NIK</dt>
                  <dd className="col-sm-8">{patientData.noIdentitas || '-'}</dd>
                  
                  <dt className="col-sm-4">Tgl. Lahir</dt>
                  <dd className="col-sm-8">
                    {formatDate(patientData.tanggalLahir)}
                    <small className="text-muted ms-2">({calculateAge(patientData.tanggalLahir)})</small>
                  </dd>
                  
                  <dt className="col-sm-4">Gender</dt>
                  <dd className="col-sm-8">{patientData.jenisKelamin || '-'}</dd>
                </dl>
              </Col>
              
              <Col md={6}>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Telepon</dt>
                  <dd className="col-sm-8">{patientData.noTelepon1 || '-'}</dd>
                  
                  <dt className="col-sm-4">Email</dt>
                  <dd className="col-sm-8">{patientData.email || '-'}</dd>
                  
                  <dt className="col-sm-4">Gol. Darah</dt>
                  <dd className="col-sm-8">{patientData.golonganDarah || '-'}</dd>
                </dl>
              </Col>
            </Row>
            
            <div className="border-top pt-3">
              <h6>Alamat</h6>
              <p className="mb-3">{patientData.alamatIdentitas || '-'}</p>
              
              {patientData.kunjunganTerakhir && (
                <div className="mb-3">
                  <h6>Kunjungan Terakhir</h6>
                  <p className="mb-0">{formatDate(patientData.kunjunganTerakhir)}</p>
                </div>
              )}
              
              <Row className="mt-4">
                <Col>
                  <div className="d-flex gap-2 justify-content-end">
                    {onBack && (
                      <Button variant="outline-secondary" onClick={onBack}>
                        Kembali ke Screening
                      </Button>
                    )}
                    
                    {onContinue && (
                      <Button variant="primary" onClick={onContinue}>
                        Lanjutkan Pendaftaran
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PatientInfoCard;