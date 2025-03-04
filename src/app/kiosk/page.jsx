'use client'
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import DashboardKiosk from '@/components/view/kiosk/dashboard';

const ServiceDashboard = () => {
  const router = useRouter();

  const services = [
    {
      id: 'pasien-baru',
      title: 'Pendaftaran Pasien Baru',
      description: 'Daftar sebagai pasien baru di rumah sakit kami',
      icon: '👤',
      path: '/kiosk/kiosk-pendaftaran-pasien',
      variant: 'primary'
    },
    {
      id: 'pasien-lama',
      title: 'Pendaftaran Pasien Lama',
      description: 'pilih layanan sebagai pasien rumah sakit kami',
      icon: '🏥',
      path: '/kiosk/regist-pasien-lama',
      variant: 'success'
    },
   
  ];

  const handleServiceClick = (path) => {
    const fullPath = `${path}`;
    router.push(fullPath);
  };

  return (
    // <div>
    //   {/* Content */}
    //   <Container fluid className=" kiosk-page position-relative">
    //     <Container>
    //       <div className="kiosk-logo">
    //         <Image src="/Images/logo_mmc.png" className="img-fluid" alt="logo" />
    //       </div>
    //       <h1 className="dashboard-title">Selamat Datang di Layanan Rumah Sakit</h1>
          
    //       <Row className="g-4 d-flex justify-content-center align-items-center mt-5">
    //         {services.map((service) => (
    //           <Col key={service.id} xs={12} md={6} lg={4}>
    //             <Card
    //               className="service-card"
    //               onClick={() => handleServiceClick(service.path)}
    //             >
    //               <Card.Body className="d-flex align-items-center">
    //                 <div
    //                   className={`service-icon bg-${service.variant}`}
    //                 >
    //                   {service.icon}
    //                 </div>
    //                 <div>
    //                   <Card.Title>{service.title}</Card.Title>
    //                   <Card.Text>
    //                     {service.description}
    //                   </Card.Text>
    //                 </div>
    //               </Card.Body>
    //               <div className={`card-footer bg-${service.variant} bg-opacity-10`} >
    //                 <small>Klik untuk melanjutkan</small>
    //               </div>
    //             </Card>
    //           </Col>
    //         ))}
    //       </Row>
    //     </Container>
    //   </Container>
    // </div>
      <div>
        <DashboardKiosk />
      </div>
  );
};

export default ServiceDashboard;