'use client'
import React, {Fragment, memo, useEffect, useState} from "react";
import CustomToggle from "@/components/ui/dropdown";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const TopNav = () => {
    const [isFixed, setIsFixed] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
              if (window.scrollY >= 75) {
                setIsFixed(true);
              } else {
                setIsFixed(false);
              }
            };
        
            window.addEventListener("scroll", handleScroll);
        
            return () => {
              window.removeEventListener("scroll", handleScroll);
            };
          }, []);
    return (
        <div className={`iq-topNav fixed-header`}>
            <div className="iq-navbar-custom ">
                <Navbar expand="lg" className="d-flex align-items-center border-1 border-color">

                        <Navbar.Toggle aria-controls="topnav-navbar" />
                        <Navbar.Collapse id="topnav-navbar">
                            <Nav className="me-auto">
                            {/* Pendaftaran */}
                            <NavDropdown title="Pendaftaran" id="pendaftaran-dropdown" renderMenuOnMount>
                                {[
                                    "Pasien Baru",
                                    "Pasien Bayi",
                                    "Pasien Luar Laboratorium",
                                    "Pasien Luar Radiologi",
                                    "Pasien Luar Rehabilitas",
                                    "Pasien Luar Medical Check up",
                                    "Pasien Luar Fasilitas",
                                    "Pasien Luar Optik",
                                    "Pasien Luar Ambulan",
                                    "Keanggotaan",
                                ].map((item, index) => (
                                <NavDropdown.Item as="div" key={index}>
                                    <CustomToggle>{item}</CustomToggle>
                                </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            {/* Perjanjian */}
                            <NavDropdown title="Perjanjian" id="perjanjian-dropdown" renderMenuOnMount>
                                {[
                                "Data Pasien Perjanjian",
                                "Pasien Perjanjian ODC",
                                "Pasien Perjanjian Rawat Inap",
                                "Pasien Perjanjian Rawat Jalan",
                                "Pasien Perjanjian Radiologi",
                                "Pasien Perjanjian MCU",
                                "Pasien Perjanjian Operasi",
                                ].map((item, index) => (
                                <NavDropdown.Item as="div" key={index}>
                                    <CustomToggle>{item}</CustomToggle>
                                </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            {/* Antrian */}
                            <NavDropdown title="Antrian" id="antrian-dropdown" renderMenuOnMount>
                                {["Pengaturan Antrian", "Display Antrian"].map((item, index) => (
                                <NavDropdown.Item as="div" key={index}>
                                    <CustomToggle>{item}</CustomToggle>
                                </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            {/* Pemesanan Bed */}
                            <Nav.Link href="/pemesanan-bed">Pemesanan Bed</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
         </div>
    )
}

export default TopNav