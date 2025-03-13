"use client";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import React, { Fragment, memo, useEffect, useState } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { menuItems } from "@/utils/menuItems";
import {
  RiUserLine,
  RiArrowRightSLine,
  RiArrowLeftLine,
  RiFolderLine,
  RiFolderOpenLine,
} from "react-icons/ri";
import { Row, Col, Button } from "react-bootstrap";

// Main Sidebar Component

// Virtualized SideBarItems Component
const VirtualizedSideBarItems = memo(() => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuView, setMenuView] = useState("main"); // 'main', 'sub', 'nested'
  const [currentItems, setCurrentItems] = useState([]);

  // For measuring dynamic content heights
  const cache = new CellMeasurerCache({
    defaultHeight: 60,
    fixedWidth: true,
  });

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

  // Update currentItems based on active menu state
  useEffect(() => {
    try {
      if (menuView === "main") {
        setCurrentItems(menuItems || []);
      } else if (menuView === "sub" && activeMenu) {
        const activeMenuItem = menuItems.find(
          (item) => item.key === activeMenu
        );
        if (activeMenuItem?.subMenu) {
          setCurrentItems(activeMenuItem.subMenu);
        } else {
          // Fallback to empty array if no submenu found
          setCurrentItems([]);
        }
      } else if (menuView === "nested" && activeMenu && activeSubMenu) {
        const activeMenuItem = menuItems.find(
          (item) => item.key === activeMenu
        );
        const activeSubMenuItem = activeMenuItem?.subMenu?.find(
          (item) => item.key === activeSubMenu
        );

        if (activeSubMenuItem?.masterDataMenu) {
          setCurrentItems(activeSubMenuItem.masterDataMenu);
        } else if (activeSubMenuItem?.pendaftaranMenu) {
          setCurrentItems(activeSubMenuItem.pendaftaranMenu);
        } else {
          // Fallback to empty array if no nested menu found
          setCurrentItems([]);
        }
      } else {
        // Fallback for any other state
        setCurrentItems([]);
      }
    } catch (error) {
      console.error("Error updating current items:", error);
      setCurrentItems([]);
    }

    // Reset the cache when items change
    cache.clearAll();
  }, [menuView, activeMenu, activeSubMenu, activeNestedMenu]);

  // Toggle functions
  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;
    setActiveMenu(newMenu);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);

    if (newMenu) {
      // Find the menu item and check if it has submenu
      const menuItem = menuItems.find((item) => item.key === key);
      if (menuItem?.subMenu?.length) {
        setMenuView("sub");
      }
    } else {
      setMenuView("main");
    }

    localStorage.setItem("activeMenu", newMenu || "");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
  };

  const toggleSubMenu = (key) => {
    const newSubMenu = activeSubMenu === key ? null : key;
    setActiveSubMenu(newSubMenu);
    setActiveNestedMenu(null);

    if (newSubMenu) {
      // Find the submenu item and check if it has nested menu
      const menuItem = menuItems.find((item) => item.key === activeMenu);
      const subMenuItem = menuItem?.subMenu?.find((item) => item.key === key);

      if (
        subMenuItem?.masterDataMenu?.length ||
        subMenuItem?.pendaftaranMenu?.length
      ) {
        setMenuView("nested");
      }
    } else {
      setMenuView("sub");
    }

    localStorage.setItem("activeSubMenu", newSubMenu || "");
    localStorage.removeItem("activeNestedMenu");
  };

  const toggleNestedMenu = (key) => {
    const newNestedMenu = activeNestedMenu === key ? null : key;
    setActiveNestedMenu(newNestedMenu);
    localStorage.setItem("activeNestedMenu", newNestedMenu || "");
  };

  // Check if a link is active
  const isLinkActive = (href) => {
    return href === pathname;
  };

  // Handle back button clicks
  const handleBackToMain = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);
    setMenuView("main");
    localStorage.removeItem("activeMenu");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
  };

  const handleBackToSub = () => {
    setActiveSubMenu(null);
    setActiveNestedMenu(null);
    setMenuView("sub");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
  };

  // Row renderer for the List component
  const rowRenderer = ({ index, key, parent, style }) => {
    const item = currentItems[index];

    // Main menu items
    if (menuView === "main") {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <div ref={registerChild} style={style} onLoad={measure}>
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
                      e.preventDefault();
                    }
                  }}
                >
                  <Col xs="auto" className="pe-2 icon-sidebar">
                    {item.icon || <RiUserLine className="fs-4" />}
                  </Col>
                  <Col className="ps-2 text-white label-sidebar">
                    {item.label}
                  </Col>
                  {item.subMenu && (
                    <Col xs="auto" className="ms-auto">
                      <RiArrowRightSLine className="fs-4" />
                    </Col>
                  )}
                </Link>
              </Row>
            </div>
          )}
        </CellMeasurer>
      );
    }

    // Sub menu items
    else if (menuView === "sub") {
      // First row is the header
      if (index === 0) {
        return (
          <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            {({ measure, registerChild }) => (
              <div ref={registerChild} style={style} onLoad={measure}>
                <div className="submenu-header bg-dark">
                  <Row className="align-items-center p-3">
                    <Col xs="auto">
                      <Button
                        variant="link"
                        onClick={handleBackToMain}
                        className="me-3 back-button"
                      >
                        <RiArrowLeftLine className="text-white fs-4" />
                      </Button>
                    </Col>
                    <Col>
                      <h2 className="h5 mb-0 text-white label-sidebar">
                        {menuItems.find((i) => i.key === activeMenu)?.label ||
                          "Menu"}
                      </h2>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </CellMeasurer>
        );
      }

      // Actual submenu items
      const subItem = currentItems[index - 1]; // Adjust for header

      // Make sure subItem exists and has all required properties
      if (!subItem) return null;

      // Ensure pathname is a string or use a fallback
      const itemPathname = subItem.pathname || "#";

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <div ref={registerChild} style={style} onLoad={measure}>
              <Row
                key={subItem.key || `subitem-${subItem.label || index}`}
                onClick={
                  (subItem.masterDataMenu || subItem.pendaftaranMenu) &&
                  subItem.key
                    ? () => toggleSubMenu(subItem.key)
                    : undefined
                }
                className={`align-items-center iq-submenu-item ${
                  itemPathname === pathname ? "active-submenu-item" : ""
                } ${
                  activeSubMenu === subItem.key ? "active-submenu-item" : ""
                }`}
              >
                <Link
                  href={itemPathname}
                  className="d-flex align-items-center text-white text-decoration-none w-100"
                  onClick={(e) => {
                    if (subItem.masterDataMenu || subItem.pendaftaranMenu) {
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
            </div>
          )}
        </CellMeasurer>
      );
    }

    // Nested menu items
    else if (menuView === "nested") {
      // First row is the header
      if (index === 0) {
        return (
          <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            {({ measure, registerChild }) => (
              <div ref={registerChild} style={style} onLoad={measure}>
                <div className="submenu-header bg-dark">
                  <Row className="align-items-center p-3">
                    <Col xs="auto">
                      <Button
                        variant="link"
                        onClick={handleBackToSub}
                        className="me-3 back-button"
                      >
                        <RiArrowLeftLine className="text-white fs-4" />
                      </Button>
                    </Col>
                    <Col>
                      <h2 className="h5 mb-0 text-white label-sidebar">
                        {menuItems
                          .find((i) => i.key === activeMenu)
                          ?.subMenu?.find((s) => s.key === activeSubMenu)
                          ?.label || "Submenu"}
                      </h2>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </CellMeasurer>
        );
      }

      // Actual nested category items
      const category = currentItems[index - 1]; // Adjust for header

      // Make sure category exists
      if (!category) return null;

      const isExpanded = activeNestedMenu === category.key;

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <div ref={registerChild} style={style} onLoad={measure}>
              <div className="nested-category">
                <Row
                  onClick={() => category.key && toggleNestedMenu(category.key)}
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
                      {category.title || "Category"}
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

                {isExpanded &&
                  category.subItems &&
                  Array.isArray(category.subItems) && (
                    <div className="nested-subitems">
                      {category.subItems.map((subItem, idx) => (
                        <Row
                          key={idx}
                          className={`nested-subitem ${
                            isLinkActive(subItem.href) ? "active-link" : ""
                          }`}
                        >
                          <Link
                            href={subItem.href || "#"}
                            className="text-white text-decoration-none d-block w-100"
                          >
                            <span className="ps-3">
                              {subItem.title || `Item ${idx + 1}`}
                            </span>
                          </Link>
                        </Row>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
        </CellMeasurer>
      );
    }

    return null;
  };

  // Render the appropriate content based on the current view
  const getItemCount = () => {
    if (menuView === "main") {
      return currentItems.length;
    } else if (menuView === "sub" || menuView === "nested") {
      // Add 1 for the header
      return currentItems.length + 1;
    }
    return 0;
  };

  return (
    <div
      className="sidebar-virtualized-container"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            rowCount={getItemCount()}
            overscanRowCount={5}
            className="sidebar-virtualized-list"
          />
        )}
      </AutoSizer>
    </div>
  );
});

VirtualizedSideBarItems.displayName = "VirtualizedSideBarItems";
export default VirtualizedSideBarItems;
