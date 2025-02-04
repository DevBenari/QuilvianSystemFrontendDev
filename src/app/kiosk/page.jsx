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
      path: '/kiosk/kiosk-pendaftaran-pasien',
      variant: 'primary'
    },
    {
      id: 'poli',
      title: 'Layanan Poli',
      description: 'Pendaftaran layanan poli spesialis',
      icon: '🏥',
      path: '/kiosk/guest-layanan-poli',
      variant: 'success'
    },
    {
      id: 'lab',
      title: 'Laboratorium',
      description: 'Pemeriksaan laboratorium dan cek darah',
      icon: '🧪',
      path: '/kiosk/kiosk-laboratorium',
      variant: 'info'
    },
    {
      id: 'radiology',
      title: 'Radiologi',
      description: 'Layanan X-ray, CT Scan, MRI, dan USG',
      icon: '📡',
      path: '/kiosk/kiosk-radiologi',
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
    const fullPath = `${path}`;
    router.push(fullPath);
  };

  return (
    <div>
      {/* Content */}
      <Container fluid className=" kiosk-page position-relative">
        <Container>
          <div className="kiosk-logo">
            <Image src="/Images/logo_mmc.png" className="img-fluid" alt="logo" />
          </div>
          <h1 className="dashboard-title">Selamat Datang di Layanan Rumah Sakit</h1>
          
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.id} xs={12} md={6} lg={4}>
                <Card
                  className="service-card"
                  onClick={() => handleServiceClick(service.path)}
                >
                  <Card.Body className="d-flex align-items-center">
                    <div
                      className={`service-icon bg-${service.variant}`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <Card.Title>{service.title}</Card.Title>
                      <Card.Text>
                        {service.description}
                      </Card.Text>
                    </div>
                  </Card.Body>
                  <div className={`card-footer bg-${service.variant} bg-opacity-10`}>
                    <small>Klik untuk melanjutkan</small>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </div>
      
  );
};

export default ServiceDashboard;