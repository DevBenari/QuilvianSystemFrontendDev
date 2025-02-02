'use client'
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';


const ServiceDashboard = () => {

  const router = useRouter();
  const services = [
    {
      id: 'new-patient',
      title: 'Pendaftaran Pasien Baru',
      description: 'Daftar sebagai pasien baru di rumah sakit kami',
      icon: '👤',
      path: '/kiosk/pendaftaran-pasien-baru',
      variant: 'primary'
    },
    {
      id: 'poli',
      title: 'Layanan Poli',
      description: 'Pendaftaran layanan poli spesialis',
      icon: '🏥',
      path: '/layanan-poli',
      variant: 'success'
    },
    {
      id: 'lab',
      title: 'Laboratorium',
      description: 'Pemeriksaan laboratorium dan cek darah',
      icon: '🧪',
      path: '/laboratorium',
      variant: 'info'
    },
    {
      id: 'radiology',
      title: 'Radiologi',
      description: 'Layanan X-ray, CT Scan, MRI, dan USG',
      icon: '📡',
      path: '/radiologi',
      variant: 'warning'
    },
    {
      id: 'surgery',
      title: 'Operasi',
      description: 'Jadwal dan informasi layanan operasi',
      icon: '⚕️',
      path: '/operasi',
      variant: 'danger'
    }
  ];

  const handleServiceClick = (path) => {
    // Handle navigation here
    const fullPath = `${path}`
    router.push(fullPath)
  };

  return (
    <Container fluid className="pb-5 kiosk-page bg-info ">
      <Container>
        <div className='kiosk-logo'>
          <Image src='/Images/logo_mmc.png' className='img-fluid' alt='logo'></Image>
        </div>
        <h1 className="text-center mb-3">Selamat Datang di Layanan Rumah Sakit </h1>
        
        <Row className="g-4">
          {services.map((service) => (
            <Col key={service.id} xs={12} md={6} lg={4}>
              <Card 
                className="h-100 shadow-md" 
                onClick={() => handleServiceClick(service.path)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex align-items-center">
                  <div 
                    className={`me-3 p-3 rounded-circle bg-${service.variant} text-white d-flex align-items-center justify-content-center`}
                    style={{ width: '60px', height: '60px', fontSize: '24px' }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <Card.Title className="mb-2">{service.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {service.description}
                    </Card.Text>
                  </div>
                </Card.Body>
                <div className={`card-footer bg-${service.variant} bg-opacity-10 text-end`}>
                  <small className={`text-white`}>Klik untuk melanjutkan</small>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default ServiceDashboard;