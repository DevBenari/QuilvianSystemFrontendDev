import React, { Fragment, useState } from "react"
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import CarouselImage from "./carousel-image";
import KioskPasienLamaPage from "../pasien-lama";


const DashboardKiosk = () => {
    const router = useRouter();
    const [activeContent, setActiveContent] = useState('carousel');
    const [activeCard, setActiveCard] = useState(null); // Add state to track which card is active

    const services = [
        {
            id: 'pasien-baru',
            title: 'Pendaftaran Pasien Baru',
            description: 'Daftar sebagai pasien baru di rumah sakit kami',
            icon: '👤',
            action: () => router.push('/kiosk/kiosk-pendaftaran-pasien'),
            variant: 'primary'
        },
        {
            id: 'pasien-lama',
            title: 'Pendaftaran Pasien Lama',
            description: 'pilih layanan sebagai pasien rumah sakit kami',
            icon: '🏥',
            action: () => setActiveContent('pasien-lama'),
            variant: 'success'
        },
    
    ];

    const handleServiceClick = (service) => {
        setActiveCard(service.id); // Set the active card when clicked
        if (service.action) {
            service.action();
        }
    };

    // Function to go back to the carousel view
    const handleBackToMainContent = () => {
        setActiveContent('carousel');
        setActiveCard(null); // Reset active card when returning to main content
    };

    return (
        <div className="mx-2">
            <div className="iq-card container-kiosk">
                <div className=" top-kiosk mx-2" >
                    <div className="m-2">
                        <div className="kiosk-logo">
                            <Image src="/Images/logo_mmc.png" className="img-fluid " alt="logo" />
                        </div>
                        <h1 className="dashboard-title mt-2">SELAMAT DATANG DI LAYANAN KIOSK RUMAH SAKIT</h1>
                    </div>
                </div>
                <div className=" kiosk-middle px-2 mx-4 pb-5">
                    <div className="d-flex justify-content-between p-3 ml-4" >
                        <div className="mt-5 ">
                        {services.map((service) => (
                            <Col key={service.id} xs={12} md={6} lg={12} className="mb-5 mx-4">
                                <Card
                                    className="service-card bg-white"
                                    onClick={() => handleServiceClick(service)}
                                    style={{ 
                                        backgroundColor: activeCard === service.id ? '#e9e9e9' : 'rgba(255, 255, 255, 0.1)' 
                                    }}
                                >
                                <Card.Body className="d-flex align-items-center ">
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
                                <div className={`card-footer bg-${service.variant} bg-opacity-10`} >
                                    <small>Klik untuk melanjutkan</small>
                                </div>
                                </Card>
                            </Col>
                        ))}
                        </div>
                        <div id="kiosk-content" className="kiosk-content">
                            {activeContent === 'carousel' ? (
                                <div className="kiosk-carousel">
                                    <CarouselImage />
                                </div>
                            ) : activeContent === 'pasien-lama' ? (
                                <div className="pendaftaran-container ">
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleBackToMainContent}
                                        className="mr-3  "
                                    >
                                        ← Kembali ke Halaman Utama
                                    </Button>
                                    <KioskPasienLamaPage/>
                                </div>
                            ) : null}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardKiosk