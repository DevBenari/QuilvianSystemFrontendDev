"use client";
import React, { useState, useEffect, memo } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiUserLine,
  RiArrowRightSLine,
  RiArrowLeftLine,
  RiFolderLine,
  RiFolderOpenLine,
} from "react-icons/ri";
import { menuItems } from "@/utils/menuItems";

const SideBarItems = memo(() => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Load active menu states from localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    const savedSubMenu = localStorage.getItem("activeSubMenu");
    const savedNestedMenu = localStorage.getItem("activeNestedMenu");

    if (savedMenu) setActiveMenu(savedMenu);
    if (savedSubMenu) setActiveSubMenu(savedSubMenu);
    if (savedNestedMenu) setActiveNestedMenu(savedNestedMenu);
  }, []);

  // Auto-set active states based on current pathname
  useEffect(() => {
    if (!pathname) return;

    // Check for matching paths in menuItems
    menuItems.forEach((item) => {
      if (item.subMenu) {
        item.subMenu.forEach((subItem) => {
          if (subItem.pathname === pathname) {
            setActiveMenu(item.key);
            setActiveSubMenu(subItem.key);
          }

          // Check nested menus
          const nestedMenu = subItem.masterDataMenu || subItem.pendaftaranMenu;
          if (nestedMenu) {
            nestedMenu.forEach((category) => {
              category.subItems.forEach((nestedItem) => {
                if (nestedItem.href === pathname) {
                  setActiveMenu(item.key);
                  setActiveSubMenu(subItem.key);
                  setActiveNestedMenu(category.key);
                }
              });
            });
          }
        });
      } else if (item.pathname === pathname) {
        setActiveMenu(item.key);
      }
    });
  }, [pathname]);

  // Save menu states to localStorage and handle navigation
  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;
    setActiveMenu(newMenu);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);

    localStorage.setItem("activeMenu", newMenu || "");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
  };

  const toggleSubMenu = (key) => {
    const newSubMenu = activeSubMenu === key ? null : key;
    setActiveSubMenu(newSubMenu);
    setActiveNestedMenu(null);

    localStorage.setItem("activeSubMenu", newSubMenu || "");
    localStorage.removeItem("activeNestedMenu");
  };

  const toggleNestedMenu = (key) => {
    const newNestedMenu = activeNestedMenu === key ? null : key;
    setActiveNestedMenu(newNestedMenu);

    localStorage.setItem("activeNestedMenu", newNestedMenu || "");
  };

  // Get the active main menu item
  const activeMenuItem = menuItems.find((item) => item.key === activeMenu);

  // Get the active submenu item if main menu is active
  const activeSubMenuItem = activeMenuItem?.subMenu?.find(
    (item) => item.key === activeSubMenu
  );

  // Determine which nested menu to show (masterDataMenu or pendaftaranMenu)
  const getNestedMenu = () => {
    if (!activeSubMenuItem) return null;

    if (activeSubMenuItem.masterDataMenu) {
      return activeSubMenuItem.masterDataMenu;
    } else if (activeSubMenuItem.pendaftaranMenu) {
      return activeSubMenuItem.pendaftaranMenu;
    }

    return null;
  };

  const nestedMenu = getNestedMenu();

  // Check if a link is active
  const isLinkActive = (href) => {
    return href === pathname;
  };

  return (
    <>
      {/* Main Menu */}
      <div
        className={`w-100 h-100 transition-transform duration-300 ${
          activeMenu ? "translate-x-n100" : "translate-x-0"
        }`}
        style={{ position: "relative" }}
      >
        {menuItems.map((item) => (
          <Row
            key={item.key}
            onClick={item.subMenu ? () => toggleMenu(item.key) : undefined}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`align-items-center iq-menu-item cursor-pointer ${
              hoveredItem === item.key ? "hovered" : ""
            } ${item.pathname === pathname ? "active-menu-item" : ""} ${
              activeMenu === item.key ? "active-menu-item" : ""
            }`}
          >
            <Link
              href={item.pathname}
              className="d-flex align-items-center text-white text-decoration-none w-100"
              onClick={(e) => {
                if (item.subMenu) {
                  // Prevent navigation when clicking on items with submenus
                  e.preventDefault();
                }
              }}
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

      {/* First Level Submenu */}
      {activeMenu && (
        <>
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary transition-transform duration-300 sidebar-slide-enter-active">
            <div className="logo-menu">
              <Link href="/#">
                <Image
                  src="/Images/icon-dashboard.png"
                  className="img-fluid sidebar-logo"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="submenu-header bg-dark">
              <Row className="align-items-center p-3">
                <Col xs="auto">
                  <Button
                    variant="link"
                    onClick={() => {
                      setActiveMenu(null);
                      setActiveSubMenu(null);
                      setActiveNestedMenu(null);
                      localStorage.removeItem("activeMenu");
                      localStorage.removeItem("activeSubMenu");
                      localStorage.removeItem("activeNestedMenu");
                    }}
                    className="me-3 back-button"
                  >
                    <RiArrowLeftLine className="text-white fs-4" />
                  </Button>
                </Col>
                <Col>
                  <h2 className="h5 mb-0 text-white label-sidebar">
                    {activeMenuItem?.label}
                  </h2>
                </Col>
              </Row>
            </div>
            <div className="submenu-content">
              {activeMenuItem?.subMenu.map((subItem) => (
                <Row
                  key={subItem.key || `subitem-${subItem.label}`}
                  onClick={
                    subItem.masterDataMenu || subItem.pendaftaranMenu
                      ? () => toggleSubMenu(subItem.key)
                      : undefined
                  }
                  className={`align-items-center iq-submenu-item ${
                    subItem.pathname === pathname ? "active-submenu-item" : ""
                  } ${
                    activeSubMenu === subItem.key ? "active-submenu-item" : ""
                  }`}
                >
                  <Link
                    href={subItem.pathname}
                    className="d-flex align-items-center text-white text-decoration-none w-100"
                    onClick={(e) => {
                      if (subItem.masterDataMenu || subItem.pendaftaranMenu) {
                        // Prevent navigation when clicking on items with nested menus
                        e.preventDefault();
                      }
                    }}
                  >
                    <Col xs="auto" className="pe-2 icon-sidebar">
                      {subItem.icon}
                    </Col>
                    <Col className="ps-2 text-white label-sidebar">
                      {subItem.label}
                    </Col>
                    {(subItem.masterDataMenu || subItem.pendaftaranMenu) && (
                      <Col xs="auto" className="ms-auto">
                        <RiArrowRightSLine className="fs-4 arrow-icon" />
                      </Col>
                    )}
                  </Link>
                </Row>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Second Level Submenu (MasterData or Pendaftaran) */}
      {activeMenu && activeSubMenu && nestedMenu && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary transition-transform duration-300 sidebar-slide-enter-active">
          <div className="logo-menu">
            <Link href="/#">
              <Image
                src="/Images/icon-dashboard.png"
                className="img-fluid sidebar-logo"
                alt="logo"
              />
            </Link>
          </div>
          <div className="submenu-header bg-dark">
            <Row className="align-items-center p-3">
              <Col xs="auto">
                <Button
                  variant="link"
                  onClick={() => {
                    setActiveSubMenu(null);
                    setActiveNestedMenu(null);
                    localStorage.removeItem("activeSubMenu");
                    localStorage.removeItem("activeNestedMenu");
                  }}
                  className="me-3 back-button"
                >
                  <RiArrowLeftLine className="text-white fs-4" />
                </Button>
              </Col>
              <Col>
                <h2 className="h5 mb-0 text-white label-sidebar">
                  {activeSubMenuItem?.label}
                </h2>
              </Col>
            </Row>
          </div>
          <div className="nested-menu-container">
            {nestedMenu.map((category) => (
              <div
                key={category.key || `cat-${category.title}`}
                className="nested-category"
              >
                <Row
                  onClick={() => toggleNestedMenu(category.key)}
                  className={`align-items-center iq-nested-item ${
                    activeNestedMenu === category.key
                      ? "active-nested-item"
                      : ""
                  }`}
                >
                  <div className="d-flex align-items-center text-white w-100">
                    <Col xs="auto" className="pe-2 nested-icon">
                      {activeNestedMenu === category.key ? (
                        <RiFolderOpenLine className="fs-4" />
                      ) : (
                        category.icon || <RiFolderLine className="fs-4" />
                      )}
                    </Col>
                    <Col className="ps-2 text-white fw-bold">
                      {category.title}
                    </Col>
                    <Col xs="auto" className="ms-auto">
                      <RiArrowRightSLine
                        className={`fs-4 arrow-icon ${
                          activeNestedMenu === category.key ? "rotate-90" : ""
                        }`}
                        style={{
                          transform:
                            activeNestedMenu === category.key
                              ? "rotate(90deg)"
                              : "none",
                        }}
                      />
                    </Col>
                  </div>
                </Row>

                {/* Display subItems when this category is active */}
                <div
                  className={`nested-subitems-wrapper ${
                    activeNestedMenu === category.key ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight:
                      activeNestedMenu === category.key
                        ? `${category.subItems.length * 45}px`
                        : "0px",
                  }}
                >
                  <div className="nested-subitems">
                    {category.subItems.map((item, idx) => (
                      <Row
                        key={idx}
                        className={`nested-subitem ${
                          isLinkActive(item.href) ? "active-link" : ""
                        }`}
                      >
                        <Link
                          href={item.href}
                          className="text-white text-decoration-none d-block w-100"
                        >
                          <span className="ps-3">{item.title}</span>
                        </Link>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

SideBarItems.displayName = "SideBarItems";
export default SideBarItems;
