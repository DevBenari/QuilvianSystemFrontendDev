import React, { useState, useContext, memo, Fragment } from "react";
import {
    Container,
    Row,
    Col,
    Button
  } from "react-bootstrap"; 
  import Link from "next/link";


  const SideBarItems = memo(() => {
    const [activeMenu, setActiveMenu] = useState(null);
    
    const menuItems = [
      {
        
        label: 'Pelayanan Kesehatan',
        key: 'ManajemenKesehatan',
        pathname: '/',
        subMenu: [
          { pathname: '/MasterData', label: 'Master Data', },
          { pathname: '/pendaftaran', label: 'Admisi', },
          { pathname: '/dokter', label: 'Pelayanan Dokter', },
          { pathname: '/IGD', label: 'IGD', },
          { pathname: '/UGD', label: 'UGD', },
          { pathname: '/radiologi', label: 'Radiologi', },
          { pathname: '/laboratorium', label: 'Laboratorium', },
          { pathname: '/rehabilitasi', label: 'Rehabilitasi', },
          { pathname: '/medical-check-up', label: 'Medical Check Up', },
          { pathname: '/pelayanan-gizi', label: 'Pelayanan Gizi', },
          { pathname: '/instalasi-rawat-jalan', label: 'Instalasi Rawat Jalan', },
          { pathname: '/instalasi-rawat-inap', label: 'Instalasi Rawat Inap', },
          { pathname: '/instalasi-bedah', label: 'Instalasi Bedah', },
          { pathname: '/instalasi-Operasi', label: 'Instalasi Operasi', },
          { pathname: '/farmasi', label: 'Farmasi', },
        ]
      },
      {
        
        label: 'Pelayanan Medis',
        key: 'pelayananMedis',
        pathname: '/pelayanan-medik',
        subMenu: [
          { pathname: '/pelayanan-medik/instalasi-medik', label: 'Instalasi Rawat Intensif', },
          { pathname: '/app/List Pasien', label: 'List Pasien', }
        ]
      }
    ];
  
    const toggleMenu = (key) => {
      setActiveMenu(activeMenu === key ? null : key);
    };
  
    return (
      <>
        {/* Main Menu */}
        <div 
          className={`position-absolute top-0 start-0 w-100 h-100 transition-transform duration-300 ${activeMenu ? 'translate-x-n100' : 'translate-x-0'}`}
        >
          {menuItems.map((item) => (
            <Row 
              key={item.key} 
              onClick={item.subMenu ? () => toggleMenu(item.key) : () => {}}
              className="align-items-center p-3 iq-menu-item cursor-pointer mt-3 iq-side"
              role={item.subMenu ? "button" : undefined}
            >
              <Link href={item.pathname} className="d-flex align-items-center text-white text-decoration-none">
                <Col xs="auto" className="pe-0">{item.icon}</Col>
                <Col className="ps-2">{item.label}</Col>
                {item.subMenu && (
                  <Col xs="auto" className="ms-auto">
                    <i className="ri-arrow-right-s-line"></i>
                  </Col>
                )}
              </Link>
            </Row>
          ))}
        </div>
  
        {/* Sliding Submenu */}
        {activeMenu && (
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-primary transition-transform duration-300"
            style={{ 
              transform: activeMenu ? 'translateX(0)' : 'translateX(100%)'
            }}
          >
            <Container fluid className=" bg-dark p-3 mt-4">
              <Row className="align-items-center">
                <Col xs="auto">
                  <Button 
                    variant="link" 
                    onClick={() => setActiveMenu(null)} 
                    className="me-3"
                  >
                    <i className="ri-arrow-left-line text-white"></i>
                  </Button>
                </Col>
                <Col>
                  <h2 className="h5 mb-0 text-white">
                    {menuItems.find(item => item.key === activeMenu)?.label}
                  </h2>
                </Col>
              </Row>
            </Container>
            <Container fluid className="p-3">
              {menuItems
                .find(item => item.key === activeMenu)
                ?.subMenu.map((subItem, index) => (
                  <Row 
                    key={index} 
                    className="align-items-center p-3 iq-submenu-item"
                    role="button"
                  >
                    <Link 
                      href={subItem.pathname} 
                      className="d-flex align-items-center text-white text-decoration-none"
                    >
                      <Col xs="auto" className="pe-0">{subItem.icon}</Col>
                      <Col className="ps-2">{subItem.label}</Col>
                    </Link>
                  </Row>
              ))}
            </Container>
          </div>
        )}
      </>
    );
  });
  
  SideBarItems.displayName = "SideBarItems";
  export default SideBarItems

  {/* <Accordion.Item
                        as="li"
                        eventKey="email-menu"
                        bsPrefix={`${active === "email" ? "active menu-open" : ""} `}
                        onClick={() => toggleActive("email")}
                    >
                        <ToggleCustom
                        eventKey="email-menu"
                        onClick={(activeKey) => setActiveMenu(activeKey)}
                        >
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Admisi</Tooltip>}
                        >
                            <i className="ri-mail-open-fill"></i>
                        </OverlayTrigger>
                        <span className="item-name">Admisi</span>
                        <i className="ri-arrow-right-s-line iq-arrow-right"></i>
                        </ToggleCustom>
                        <Accordion.Collapse eventKey="email-menu">
                        <ul className="iq-submenu collapse menu-open">
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-inbox-fill"
                                pathname="/app/pendaftaran-pasien"
                                title="Pendaftaran Pasien"
                            ></SidebarMenu>
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-edit-2-fill"
                                pathname="/app/List Pasien"
                                title="List Pasien"
                            ></SidebarMenu>
                        </ul>
                        </Accordion.Collapse>
                    </Accordion.Item>
                    <SidebarMenu
                        isTag="true"
                        pathname="/asuransi"
                        title="Asuransi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
k                     pathname="/kasir"
                        title="Kasir"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rawat-jalan"
                        title="Rawat Jalan"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rawat-inap"
                        title="Rawat Inap"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/farmasi"
                        title="Farmasi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/igd"
                        title="IGD"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/icu"
                        title="ICU"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/crm"
                        title="CRM"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <li className="iq-menu-title">
                        <i className="ri-subtract-line"></i>
                        <span>Departements</span>
                    </li>

                    <Accordion.Item
                        as="li"
                        eventKey="pelayanan-medik-menu"
                        bsPrefix={`${active === "pelayanan-medik" ? "active menu-open" : ""} `}
                        onClick={() => toggleActive("pelayanan-medik")}
                    >
                        <ToggleCustom
                        eventKey="pelayanan-medik-menu"
                        onClick={(activeKey) => setActiveMenu(activeKey)}
                        >
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Pelayanan Medic</Tooltip>}
                        >
                            <i className="ri-mail-open-fill"></i>
                        </OverlayTrigger>
                        <span className="item-name">Pelayanan Medic</span>
                        <i className="ri-arrow-right-s-line iq-arrow-right"></i>
                        </ToggleCustom>
                        <Accordion.Collapse eventKey="pelayanan-medik-menu">
                        <ul className="iq-submenu collapse menu-open">
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-inbox-fill"
                                pathname="/pelayanan-medik/instalasi-medik"
                                title="Instansi Rawat Intensif"
                            ></SidebarMenu>
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-edit-2-fill"
                                pathname="/app/List Pasien"
                                title="List Pasien"
                            ></SidebarMenu>
                        </ul>
                        </Accordion.Collapse>
                    </Accordion.Item> */}