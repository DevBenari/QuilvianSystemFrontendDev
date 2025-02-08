import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const SideBarItems = memo(() => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Menu items configuration
  const menuItems = [
    {
      label: "Pelayanan Kesehatan",
      key: "ManajemenKesehatan",
      pathname: "/pendaftaran",
      subMenu: [
        { pathname: "/MasterData", label: "Master Data" },
        { pathname: "/pendaftaran", label: "Admisi" },
        { pathname: "/dokter", label: "Pelayanan Dokter" },
        { pathname: "/IGD", label: "IGD" },
        { pathname: "/UGD", label: "UGD" },
        { pathname: "/radiologi", label: "Radiologi" },
        { pathname: "/laboratorium", label: "Laboratorium" },
        { pathname: "/rehabilitasi", label: "Rehabilitasi" },
        { pathname: "/medical-check-up", label: "Medical Check Up" },
        { pathname: "/pelayanan-gizi", label: "Pelayanan Gizi" },
        { pathname: "/instalasi-rawat-jalan", label: "Instalasi Rawat Jalan" },
        { pathname: "/instalasi-rawat-inap", label: "Instalasi Rawat Inap" },
        { pathname: "/instalasi-bedah", label: "Instalasi Bedah" },
        { pathname: "/instalasi-Operasi", label: "Instalasi Operasi" },
        { pathname: "/farmasi", label: "Farmasi" },
      ],
    },
    {
      label: "Pelayanan Medis",
      key: "pelayananMedis",
      pathname: "/pelayanan-medik",
      subMenu: [
        {
          pathname: "/pelayanan-medik/instalasi-medik",
          label: "Instalasi Rawat Intensif",
        },
        { pathname: "/app/List Pasien", label: "List Pasien" },
      ],
    },
  ];

  // Load active menu from localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  // Save active menu to localStorage
  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;
    setActiveMenu(newMenu);
    localStorage.setItem("activeMenu", newMenu);
  };

  return (
    <>
      {/* Main Menu */}
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 transition-transform duration-300 ${
          activeMenu ? "translate-x-n100" : "translate-x-0"
        }`}
      >
        {menuItems.map((item) => (
          <Row
            key={item.key}
            onClick={item.subMenu ? () => toggleMenu(item.key) : undefined}
            className="align-items-center p-3 iq-menu-item cursor-pointer mt-3 iq-side"
          >
            <Link
              href={item.pathname}
              className="d-flex align-items-center text-white text-decoration-none"
            >
              <Col xs="auto" className="pe-0">
                {item.icon}
              </Col>
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
            transform: activeMenu ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="p-3 mt-4 bg-dark">
            <Row className="align-items-center">
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
              <Col>
                <h2 className="h5 mb-0 text-white">
                  {menuItems.find((item) => item.key === activeMenu)?.label}
                </h2>
              </Col>
            </Row>
          </div>
          <div className="p-3">
            {menuItems
              .find((item) => item.key === activeMenu)
              ?.subMenu.map((subItem, index) => (
                <Row
                  key={index}
                  className="align-items-center p-3 iq-submenu-item"
                >
                  <Link
                    href={subItem.pathname}
                    className="d-flex align-items-center text-white text-decoration-none"
                  >
                    <Col xs="auto" className="pe-0">
                      {subItem.icon}
                    </Col>
                    <Col className="ps-2">{subItem.label}</Col>
                  </Link>
                </Row>
              ))}
          </div>
        </div>
      )}
    </>
  );
});

SideBarItems.displayName = "SideBarItems";
export default SideBarItems;
