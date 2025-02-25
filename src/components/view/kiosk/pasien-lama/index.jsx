"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';

const KioskPasienLamaPage = () => {
    const router = useRouter();

    const services = [
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
        <div className='d-flex justify-content-center'> 
        {/* Content */}
        <div fluid className=" kiosk-page position-relative pt-4">
          <Container>
            <div className="kiosk-logo">
              <Image src="/Images/logo_mmc.png" className="img-fluid" alt="logo" />
            </div>
            <h1 className="dashboard-title">Selamat Datang di Layanan Rumah Sakit</h1>
            
            <Row className="g-4 mt-4 border border-white p-2">
              {services.map((service) => (
                <Col key={service.id} xs={12} md={6} lg={4}>
                  <Card
                    className="service-card"
                    onClick={() => handleServiceClick(service.path)}
                  >
                    <Card.Body className="d-flex align-items-center rounded rounded-lg">
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
            <Button variant="primary" onClick={() => router.back("/kiosk")} className="btn-kembali px-5 py-2">
                Kembali
            </Button>
          </Container>
        </div>
      </div>
    )
}

export default KioskPasienLamaPage;