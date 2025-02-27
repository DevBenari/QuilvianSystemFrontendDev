import React, { useState, useEffect, memo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const SideBarLogo = memo(() => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuLogo = [
    {
      key: "ManajemenKesehatan",
      pathname: "/pendaftaran",
      subMenu: [
        {
          pathname: "/MasterData",
          icon: <i className="ri-database-2-line"></i>,
        },
        {
          pathname: "/pendaftaran",
          icon: <i className="ri-clipboard-line"></i>,
        },
        { pathname: "/dokter", icon: <i className="ri-stethoscope-line"></i> },
        { pathname: "/IGD", icon: <i className="ri-hospital-line"></i> },
        { pathname: "/UGD", icon: <i className="ri-first-aid-kit-line"></i> },
        { pathname: "/radiologi", icon: <i className="ri-scanner-line"></i> },
        {
          pathname: "/laboratorium",
          icon: <i className="ri-test-tube-line"></i>,
        },
        {
          pathname: "/rehabilitasi",
          icon: <i className="ri-wheelchair-line"></i>,
        },
        {
          pathname: "/medical-check-up",
          icon: <i className="ri-health-book-line"></i>,
        },
        {
          pathname: "/pelayanan-gizi",
          icon: <i className="ri-restaurant-line"></i>,
        },
        {
          pathname: "/instalasi-rawat-jalan",
          icon: <i className="ri-walk-line"></i>,
        },
        {
          pathname: "/instalasi-rawat-inap",
          icon: <i className="ri-hotel-line"></i>,
        },
        {
          pathname: "/instalasi-bedah",
          icon: <i className="ri-surgical-mask-line"></i>,
        },
        {
          pathname: "/instalasi-Operasi",
          icon: <i className="ri-microscope-line"></i>,
        },
        {
          pathname: "/farmasi",
          icon: <i className="ri-medicine-bottle-line"></i>,
        },
      ],
    },
    {
      key: "pelayananMedis",
      pathname: "/pelayanan-medik",
      subMenu: [
        {
          pathname: "/pelayanan-medik/instalasi-medik",
          icon: <i className="ri-hospital-fill"></i>,
        },
        {
          pathname: "/app/List Pasien",
          icon: <i className="ri-user-line"></i>,
        },
      ],
    },
    {
      key: "kioskPendaftaran",
      pathname: "/kiosk",
      icon: <i className="ri-computer-line"></i>,
    },
  ];

  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;
    setActiveMenu(newMenu);
    localStorage.setItem("activeMenu", newMenu);
  };

  return (
    <>
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 transition-transform duration-300 ${
          activeMenu ? "translate-x-n100" : "translate-x-0"
        }`}
      >
        {menuLogo.map((item) => (
          <Row
            key={item.key}
            onClick={item.subMenu ? () => toggleMenu(item.key) : undefined}
            className="align-Logo-center p-3 iq-menu-item cursor-pointer mt-3 iq-side"
          >
            <Link
              href={item.pathname}
              className="d-flex align-Logo-center text-white text-decoration-none"
            >
              <Col xs="auto" className="pe-0">
                {item.icon}
              </Col>
            </Link>
          </Row>
        ))}
      </div>
      {activeMenu && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-primary transition-transform duration-300"
          style={{
            transform: activeMenu ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="p-3 mt-4 bg-dark">
            <Row className="align-Logo-center">
              <Col xs="auto">
                <Button
                  variant="link"
                  onClick={() => {
                    setActiveMenu(null);
                    localStorage.removeItem("activeMenu");
                  }}
                  className="me-3"
                >
                  <i className="ri-arrow-left-line text-white"></i>
                </Button>
              </Col>
            </Row>
          </div>
          <div className="p-3">
            {menuLogo
              .find((item) => item.key === activeMenu)
              ?.subMenu.map((subItem, index) => (
                <Row
                  key={index}
                  className="align-Logo-center p-3 iq-submenu-item"
                >
                  <Link
                    href={subItem.pathname}
                    className="d-flex align-Logo-center text-white text-decoration-none"
                  >
                    <Col xs="auto" className="pe-0">
                      {subItem.icon}
                    </Col>
                  </Link>
                </Row>
              ))}
          </div>
        </div>
      )}
    </>
  );
});

SideBarLogo.displayName = "SideBarLogo";
export default SideBarLogo;
