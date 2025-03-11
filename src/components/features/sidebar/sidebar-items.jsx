"use client";
import React, { useState, useEffect, memo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { FaStethoscope, FaFirstAid } from "react-icons/fa";
import { MdScanner } from "react-icons/md";
import {
  RiTestTubeLine,
  RiSurgicalMaskLine,
  RiMedicineBottleLine,
  RiDatabase2Line,
  RiClipboardLine,
  RiHospitalLine,
  RiHealthBookLine,
  RiRestaurantLine,
  RiWalkLine,
  RiHotelLine,
  RiUserLine,
  RiArrowRightSLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { PiWheelchairFill } from "react-icons/pi";
import { GiMicroscope } from "react-icons/gi";

const SideBarItems = memo(() => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Menu items configuration (same as before)
  const menuItems = [
    {
      label: "Pelayanan Kesehatan",
      key: "ManajemenKesehatan",
      pathname: "/pendaftaran",
      subMenu: [
        {
          pathname: "/MasterData",
          label: "Master Data",
          icon: <RiDatabase2Line className="fs-4" />,
        },
        {
          pathname: "/pendaftaran",
          label: "Admisi",
          icon: <RiClipboardLine className="fs-4" />,
        },
        {
          pathname: "/dokter",
          label: "Dokter",
          icon: <FaStethoscope className="fs-4" />,
        },
        {
          pathname: "/IGD",
          label: "IGD",
          icon: <RiHospitalLine className="fs-4" />,
        },
        {
          pathname: "/radiologi",
          label: "Radiologi",
          icon: <MdScanner className="fs-4" />,
        },
        {
          pathname: "/laboratorium",
          label: "Laboratorium",
          icon: <RiTestTubeLine className="fs-4" />,
        },
        {
          pathname: "/rehabilitasi",
          label: "Rehabilitasi",
          icon: <PiWheelchairFill className="fs-4" />,
        },
        {
          pathname: "/medical-check-up",
          label: "Medical Check-Up",
          icon: <RiHealthBookLine className="fs-4" />,
        },
        {
          pathname: "/pelayanan-gizi",
          label: "Pelayanan Gizi",
          icon: <RiRestaurantLine className="fs-4" />,
        },
        {
          pathname: "/instalasi-rawat-jalan",
          label: "Rawat Jalan",
          icon: <RiWalkLine className="fs-4" />,
        },
        {
          pathname: "/instalasi-rawat-inap",
          label: "Rawat Inap",
          icon: <RiHotelLine className="fs-4" />,
        },
        {
          pathname: "/instalasi-bedah",
          label: "Instalasi Bedah",
          icon: <RiSurgicalMaskLine className="fs-4" />,
        },
        {
          pathname: "/instalasi-Operasi",
          label: "Instalasi Operasi",
          icon: <GiMicroscope className="fs-4" />,
        },
        {
          pathname: "/farmasi",
          label: "Farmasi",
          icon: <RiMedicineBottleLine className="fs-4" />,
        },
      ],
    },
    {
      label: "Pelayanan Medis",
      key: "pelayananMedis",
      pathname: "/pendaftaran",
      icon: <RiHospitalLine className="fs-4" />,
      subMenu: [
        {
          pathname: "/pelayanan-medik/instalasi-medik",
          label: "Instalasi Medik",
          icon: <RiHospitalLine className="fs-4" />,
        },
        {
          pathname: "/app/List Pasien",
          label: "List Pasien",
          icon: <RiUserLine className="fs-4" />,
        },
      ],
    },
    {
      label: "Kiosk",
      key: "kioskPendaftaran",
      pathname: "/kiosk",
      icon: <RiUserLine className="fs-4" />,
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
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`align-items-center p-2 iq-menu-item cursor-pointer mt-3 iq-side ${
              hoveredItem === item.key ? "hovered" : ""
            }`}
          >
            <Link
              href={item.pathname}
              className="d-flex align-items-center text-white text-decoration-none w-100"
            >
              <Col xs="auto" className="pe-2 icon-sidebar">
                {item.icon || <RiUserLine className="fs-4" />}
              </Col>
              <Col className="ps-2 text-white label-sidebar">{item.label}</Col>
              {item.subMenu && (
                <Col xs="auto" className="ms-auto">
                  <RiArrowRightSLine className="fs-4" />
                </Col>
              )}
            </Link>
          </Row>
        ))}
      </div>

      {/* Sliding Submenu */}
      {activeMenu && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary transition-transform duration-300">
          <div className="mt-4 bg-dark">
            <Row className="align-items-center p-3">
              <Col xs="auto">
                <Button
                  variant="link"
                  onClick={() => {
                    setActiveMenu(null);
                    localStorage.removeItem("activeMenu");
                  }}
                  className="me-3"
                >
                  <RiArrowLeftLine className="text-white fs-4" />
                </Button>
              </Col>
              <Col xs="auto" className="pe-2 icon-sidebar">
                {menuItems.icon}
              </Col>
              <Col>
                <h2 className="h5 mb-0 text-white label-sidebar">
                  {menuItems.find((item) => item.key === activeMenu)?.label}
                </h2>
              </Col>
            </Row>
          </div>
          <div>
            {menuItems
              .find((item) => item.key === activeMenu)
              ?.subMenu.map((subItem, index) => (
                <Row
                  key={index}
                  className="align-items-center  iq-submenu-item"
                >
                  <Link
                    href={subItem.pathname}
                    className="d-flex align-items-center text-white text-decoration-none w-100"
                  >
                    <Col xs="auto" className="pe-2 icon-sidebar">
                      {subItem.icon}
                    </Col>
                    <Col className="ps-2 text-white label-sidebar">
                      {subItem.label}
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

SideBarItems.displayName = "SideBarItems";
export default SideBarItems;
