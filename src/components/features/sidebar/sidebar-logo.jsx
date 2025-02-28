import React, { useState, useEffect, memo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { FaStethoscope, FaFirstAid } from "react-icons/fa";
import { MdScanner } from "react-icons/md";
import {
  RiTestTubeLine,
  RiSurgicalMaskLine,
  RiMedicineBottleLine,
} from "react-icons/ri";
import { PiWheelchairFill } from "react-icons/pi";
import { GiMicroscope } from "react-icons/gi";

const SideBarLogo = memo(() => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuLogo = [
    {
      key: "ManajemenKesehatan",
      label: "Pelayanan Kesehatan",
      pathname: "/pendaftaran",
      subMenu: [
        {
          pathname: "/MasterData",
          icon: <i className="ri-database-2-line fs-4"></i>,
        },
        {
          pathname: "/pendaftaran",
          icon: <i className="ri-clipboard-line fs-4"></i>,
        },
        {
          pathname: "/dokter",
          icon: <FaStethoscope className="fs-4" />,
        },
        { pathname: "/IGD", icon: <i className="ri-hospital-line fs-4"></i> },
        {
          pathname: "/UGD",
          icon: <FaFirstAid className="fs-4" />,
        },
        {
          pathname: "/radiologi",
          icon: <MdScanner className="fs-4" />,
        },
        {
          pathname: "/laboratorium",
          icon: <RiTestTubeLine className="fs-4" />,
        },
        {
          pathname: "/rehabilitasi",
          icon: <PiWheelchairFill className="fs-4" />,
        },
        {
          pathname: "/medical-check-up",
          icon: <i className="ri-health-book-line fs-4"></i>,
        },
        {
          pathname: "/pelayanan-gizi",
          icon: <i className="ri-restaurant-line fs-4"></i>,
        },
        {
          pathname: "/instalasi-rawat-jalan",
          icon: <i className="ri-walk-line fs-4"></i>,
        },
        {
          pathname: "/instalasi-rawat-inap",
          icon: <i className="ri-hotel-line fs-4"></i>,
        },
        {
          pathname: "/instalasi-bedah",
          icon: <RiSurgicalMaskLine className="fs-4" />,
        },
        {
          pathname: "/instalasi-Operasi",
          icon: <GiMicroscope className="fs-4" />,
        },
        {
          pathname: "/farmasi",
          icon: <RiMedicineBottleLine className="fs-4" />,
        },
      ],
    },
    {
      key: "pelayananMedis",
      label: "Pelayanan Medis",
      pathname: "/pelayanan-medik",
      subMenu: [
        {
          pathname: "/pelayanan-medik/instalasi-medik",
          icon: <i className="ri-hospital-fill fs-4"></i>,
        },
        {
          pathname: "/app/List Pasien",
          icon: <i className="ri-user-line fs-4"></i>,
        },
      ],
    },
    {
      key: "kioskPendaftaran",
      label: "Kiosk",
      pathname: "/kiosk",
      icon: <i className="ri-computer-line fs-4"></i>,
    },
  ];

  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const toggleMenu = (key, hasSubMenu, pathname) => {
    if (hasSubMenu) {
      setActiveMenu(key);
      localStorage.setItem("activeMenu", key);
    } else {
      window.location.href = pathname;
    }
  };

  return (
    <>
      {!activeMenu ? (
        <div className="sidebar-menu">
          {menuLogo.map((item) => (
            <Row
              key={item.key}
              onClick={() =>
                toggleMenu(item.key, !!item.subMenu, item.pathname)
              }
              className="align-items-center p-3 iq-menu-item cursor-pointer mt-3 iq-side text-center"
            >
              <Link
                href={item.subMenu ? "#" : item.pathname}
                className="d-flex justify-content-center text-white text-decoration-none"
              >
                <Col>{item.label}</Col>
              </Link>
            </Row>
          ))}
        </div>
      ) : (
        <div className="sidebar-submenu bg-primary">
          <div className="p-3 mt-4 bg-dark text-center">
            <Button
              variant="link"
              onClick={() => {
                setActiveMenu(null);
                localStorage.removeItem("activeMenu");
              }}
              className="text-white"
            >
              <i className="ri-arrow-left-line fs-4"></i>
            </Button>
          </div>
          <div className="p-3">
            {menuLogo
              .find((item) => item.key === activeMenu)
              ?.subMenu?.map((subItem, index) => (
                <Row
                  key={index}
                  className="align-items-center p-3 iq-submenu-item text-center"
                >
                  <Link
                    href={subItem.pathname}
                    className="d-flex justify-content-center text-white text-decoration-none"
                  >
                    <Col xs="auto">{subItem.icon}</Col>
                  </Link>
                </Row>
              )) || (
              <div className="text-center text-white">Tidak ada submenu</div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

SideBarLogo.displayName = "SideBarLogo";
export default SideBarLogo;
