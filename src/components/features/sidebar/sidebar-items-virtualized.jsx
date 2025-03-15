"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
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
import {
  getNestedMenuFromSubItem,
  hasNestedMenu,
  findPathInNestedMenu,
} from "./menuHandle";

const VirtualizedSideBarItems = memo(() => {
  // State management
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuView, setMenuView] = useState("main"); // 'main', 'sub', 'nested'
  const [currentItems, setCurrentItems] = useState([]);
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  // Setup for measuring dynamic content heights
  const cache = new CellMeasurerCache({
    defaultHeight: 60,
    fixedWidth: true,
  });

  // ---------- EFFECTS ----------

  // Effect 1: Detect sidebar-main mode changes
  useEffect(() => {
    const checkSidebarMode = () => {
      const isMini = document.body.classList.contains("sidebar-main");
      if (isMiniSidebar !== isMini) {
        setIsMiniSidebar(isMini);
        cache.clearAll();

        // Force rerender of the virtualized list
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 50);
      }
    };

    // Initial check
    checkSidebarMode();

    // Setup observers
    const observer = new MutationObserver(checkSidebarMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", checkSidebarMode);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkSidebarMode);
    };
  }, [isMiniSidebar]);

  // Effect 2: Load active menu states from localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    const savedSubMenu = localStorage.getItem("activeSubMenu");
    const savedNestedMenu = localStorage.getItem("activeNestedMenu");

    if (savedMenu) setActiveMenu(savedMenu);
    if (savedSubMenu) setActiveSubMenu(savedSubMenu);
    if (savedNestedMenu) setActiveNestedMenu(savedNestedMenu);
  }, []);

  // Effect 3: Set active states based on current URL path
  useEffect(() => {
    if (!pathname) return;

    menuItems.forEach((item) => {
      // Check for main menu match
      if (item.pathname === pathname) {
        setActiveMenu(item.key);
        return;
      }

      // Check submenu paths
      if (item.subMenu) {
        item.subMenu.forEach((subItem) => {
          if (subItem.pathname === pathname) {
            setActiveMenu(item.key);
            setActiveSubMenu(subItem.key);
            return;
          }

          // Check nested menu paths
          const nestedMenu = getNestedMenuFromSubItem(subItem);
          if (nestedMenu?.length) {
            const found = findPathInNestedMenu(nestedMenu, pathname);
            if (found) {
              setActiveMenu(item.key);
              setActiveSubMenu(subItem.key);
              setActiveNestedMenu(found.key);
              return;
            }
          }
        });
      }
    });
  }, [pathname]);

  // Effect 4: Update currentItems based on active menu state
  useEffect(() => {
    try {
      if (menuView === "main") {
        // Show main menu items
        setCurrentItems(menuItems || []);
      } else if (menuView === "sub" && activeMenu) {
        // Show submenu items for active menu
        const activeMenuItem = menuItems.find(
          (item) => item.key === activeMenu
        );
        setCurrentItems(activeMenuItem?.subMenu || []);
      } else if (menuView === "nested" && activeMenu && activeSubMenu) {
        // Show nested menu items for active submenu
        const activeMenuItem = menuItems.find(
          (item) => item.key === activeMenu
        );
        const activeSubMenuItem = activeMenuItem?.subMenu?.find(
          (item) => item.key === activeSubMenu
        );

        // Dapatkan nested menu items dengan helper function
        const nestedItems = getNestedMenuFromSubItem(activeSubMenuItem);
        setCurrentItems(nestedItems || []);
      } else {
        // Fallback for any other state
        setCurrentItems([]);
      }
    } catch (error) {
      console.error("Error updating current items:", error);
      setCurrentItems([]);
    }

    // Reset cache when items change
    cache.clearAll();
  }, [menuView, activeMenu, activeSubMenu, activeNestedMenu]);

  // ---------- HANDLERS ----------

  // Toggle main menu
  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;
    setActiveMenu(newMenu);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);

    // Update menu view based on selection
    if (newMenu) {
      const menuItem = menuItems.find((item) => item.key === key);
      if (menuItem?.subMenu?.length) {
        setMenuView("sub");
      }
    } else {
      setMenuView("main");
    }

    // Update localStorage
    localStorage.setItem("activeMenu", newMenu || "");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
  };

  // Toggle submenu
  const toggleSubMenu = (key) => {
    const newSubMenu = activeSubMenu === key ? null : key;
    setActiveSubMenu(newSubMenu);
    setActiveNestedMenu(null);

    // Update menu view based on selection
    if (newSubMenu) {
      const menuItem = menuItems.find((item) => item.key === activeMenu);
      const subMenuItem = menuItem?.subMenu?.find((item) => item.key === key);

      if (hasNestedMenu(subMenuItem)) {
        setMenuView("nested");
      }
    } else {
      setMenuView("sub");
    }

    // Update localStorage
    localStorage.setItem("activeSubMenu", newSubMenu || "");
    localStorage.removeItem("activeNestedMenu");
  };

  // Toggle nested menu
  const toggleNestedMenu = (key) => {
    const newNestedMenu = activeNestedMenu === key ? null : key;
    setActiveNestedMenu(newNestedMenu);
    localStorage.setItem("activeNestedMenu", newNestedMenu || "");
  };

  // Check if a link is active
  const isLinkActive = (href) => href === pathname;

  // Handle back navigation
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

  // ---------- RENDERERS ----------

  // Render main menu item
  const renderMainMenuItem = (
    item,
    key,
    parent,
    style,
    measure,
    registerChild
  ) => {
    return (
      <div ref={registerChild} style={style} onLoad={measure}>
        <Row
          key={item.key}
          onClick={item.subMenu ? () => toggleMenu(item.key) : undefined}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`align-items-center iq-menu-item cursor-pointer 
            ${hoveredItem === item.key ? "hovered" : ""} 
            ${item.pathname === pathname ? "active-menu-item" : ""} 
            ${activeMenu === item.key ? "active-menu-item" : ""} 
            ${isMiniSidebar ? "mini-sidebar-item" : ""}`}
        >
          <Link
            href={item.pathname}
            className="d-flex align-items-center text-white text-decoration-none w-100"
            onClick={(e) => {
              if (item.subMenu) e.preventDefault();
            }}
          >
            <Col xs="auto" className="pe-2 icon-sidebar">
              {item.icon || <RiUserLine className="fs-4" />}
            </Col>
            <Col className="ps-2 text-white label-sidebar">{item.label}</Col>
            {item.subMenu && (
              <Col xs="auto" className="ms-auto arrow-container">
                <RiArrowRightSLine className="fs-4" />
              </Col>
            )}
          </Link>
        </Row>
      </div>
    );
  };

  // Render sub menu header
  const renderSubMenuHeader = (key, parent, style, measure, registerChild) => {
    return (
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
                {menuItems.find((i) => i.key === activeMenu)?.label || "Menu"}
              </h2>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  // Render sub menu item
  const renderSubMenuItem = (
    subItem,
    index,
    key,
    parent,
    style,
    measure,
    registerChild
  ) => {
    if (!subItem) return null;

    const itemPathname = subItem.pathname || "#";
    const hasNested = hasNestedMenu(subItem);

    return (
      <div ref={registerChild} style={style} onLoad={measure}>
        <Row
          key={subItem.key || `subitem-${subItem.label || index}`}
          onClick={
            hasNested && subItem.key
              ? () => toggleSubMenu(subItem.key)
              : undefined
          }
          className={`align-items-center iq-submenu-item 
            ${itemPathname === pathname ? "active-submenu-item" : ""} 
            ${activeSubMenu === subItem.key ? "active-submenu-item" : ""} 
            ${isMiniSidebar ? "mini-sidebar-item" : ""}`}
        >
          <Link
            href={itemPathname}
            className="d-flex align-items-center text-white text-decoration-none w-100"
            onClick={(e) => {
              if (hasNested) e.preventDefault();
            }}
          >
            <Col xs="auto" className="pe-2 icon-sidebar">
              {subItem.icon}
            </Col>
            <Col className="ps-2 text-white label-sidebar">{subItem.label}</Col>
            {hasNested && (
              <Col xs="auto" className="ms-auto arrow-container">
                <RiArrowRightSLine className="fs-4 arrow-icon" />
              </Col>
            )}
          </Link>
        </Row>
      </div>
    );
  };

  // Render nested menu header
  const renderNestedMenuHeader = (
    key,
    parent,
    style,
    measure,
    registerChild
  ) => {
    return (
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
                  ?.subMenu?.find((s) => s.key === activeSubMenu)?.label ||
                  "Submenu"}
              </h2>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  // Render nested menu category
  const renderNestedMenuCategory = (
    category,
    key,
    parent,
    style,
    measure,
    registerChild
  ) => {
    if (!category) return null;

    const isExpanded = activeNestedMenu === category.key;

    return (
      <div ref={registerChild} style={style} onLoad={measure}>
        <div className="nested-category">
          <Row
            onClick={() => category.key && toggleNestedMenu(category.key)}
            className={`align-items-center iq-nested-item 
              ${activeNestedMenu === category.key ? "active-nested-item" : ""} 
              ${isMiniSidebar ? "mini-sidebar-item" : ""}`}
          >
            <div className="d-flex align-items-center text-white w-100">
              <Col xs="auto" className="pe-2 nested-icon">
                {activeNestedMenu === category.key ? (
                  <RiFolderOpenLine className="fs-4" />
                ) : (
                  category.icon || <RiFolderLine className="fs-4" />
                )}
              </Col>
              <Col className="ps-2 text-white fw-bold title-nested-menu">
                {category.title || "Category"}
              </Col>
              <Col xs="auto" className="ms-auto arrow-container">
                <RiArrowRightSLine
                  className={`fs-4 arrow-icon ${isExpanded ? "rotate-90" : ""}`}
                  style={{
                    transform: isExpanded ? "rotate(90deg)" : "none",
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
    );
  };

  // Main row renderer for the List component
  const rowRenderer = ({ index, key, parent, style }) => {
    const item = currentItems[index];

    // Decide which view to render based on menuView
    if (menuView === "main") {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) =>
            renderMainMenuItem(item, key, parent, style, measure, registerChild)
          }
        </CellMeasurer>
      );
    } else if (menuView === "sub") {
      // First row is the header in sub view
      if (index === 0) {
        return (
          <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            {({ measure, registerChild }) =>
              renderSubMenuHeader(key, parent, style, measure, registerChild)
            }
          </CellMeasurer>
        );
      }

      // Actual submenu items (index - 1 to account for header)
      const subItem = currentItems[index - 1];
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) =>
            renderSubMenuItem(
              subItem,
              index,
              key,
              parent,
              style,
              measure,
              registerChild
            )
          }
        </CellMeasurer>
      );
    } else if (menuView === "nested") {
      // First row is the header in nested view
      if (index === 0) {
        return (
          <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            {({ measure, registerChild }) =>
              renderNestedMenuHeader(key, parent, style, measure, registerChild)
            }
          </CellMeasurer>
        );
      }

      // Actual nested category items (index - 1 to account for header)
      const category = currentItems[index - 1];
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) =>
            renderNestedMenuCategory(
              category,
              key,
              parent,
              style,
              measure,
              registerChild
            )
          }
        </CellMeasurer>
      );
    }

    return null;
  };

  // Calculate row count based on current view
  const getItemCount = () => {
    if (menuView === "main") {
      return currentItems.length;
    } else if (menuView === "sub" || menuView === "nested") {
      // Add 1 for the header
      return currentItems.length + 1;
    }
    return 0;
  };

  // ---------- RENDER COMPONENT ----------
  return (
    <div
      className={`sidebar-virtualized-container ${
        isMiniSidebar ? "mini-sidebar" : ""
      }`}
      style={{ height: "calc(100vh - 60px)" }}
    >
      <AutoSizer>
        {({ height }) => {
          // Force width based on sidebar mode
          const listWidth = isMiniSidebar ? 100 : 260;

          return (
            <List
              width={listWidth}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              rowCount={getItemCount()}
              overscanRowCount={5}
              className="sidebar-virtualized-list"
              style={{
                overflowX: "hidden",
                width: listWidth + "px",
                maxWidth: listWidth + "px",
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
});

VirtualizedSideBarItems.displayName = "VirtualizedSideBarItems";
export default VirtualizedSideBarItems;
