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
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
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
  }, [isMiniSidebar, cache]);

  // Effect 2: Set active states based on current URL path - runs ONCE on initial load
  useEffect(() => {
    if (!pathname) return;

    // Try to find the path match in the menu structure
    const findMenuMatch = () => {
      let foundMainMenu = null;
      let foundSubMenu = null;
      let foundNestedMenu = null;
      let foundNestedItem = null;

      // Search through all menu items
      for (const mainItem of menuItems) {
        // Check main menu direct match
        if (mainItem.pathname === pathname) {
          foundMainMenu = mainItem.key;
          break;
        }

        // Check submenu items if available
        if (mainItem.subMenu) {
          for (const subItem of mainItem.subMenu) {
            // Check for direct submenu match
            if (subItem.pathname === pathname) {
              foundMainMenu = mainItem.key;
              foundSubMenu = subItem.key;
              break;
            }

            // Check for nested menu match
            const nestedMenu = getNestedMenuFromSubItem(subItem);
            if (nestedMenu?.length) {
              const found = findPathInNestedMenu(nestedMenu, pathname);
              if (found) {
                foundMainMenu = mainItem.key;
                foundSubMenu = subItem.key;
                foundNestedMenu = found.key;
                foundNestedItem = found;
                break;
              }
            }
          }
          // If found in submenu, no need to check further
          if (foundSubMenu) break;
        }
      }

      return {
        mainMenu: foundMainMenu,
        subMenu: foundSubMenu,
        nestedMenu: foundNestedMenu,
        nestedItem: foundNestedItem,
      };
    };

    // First try to restore from localStorage
    const savedMenu = localStorage.getItem("activeMenu");
    const savedSubMenu = localStorage.getItem("activeSubMenu");
    const savedNestedMenu = localStorage.getItem("activeNestedMenu");
    const savedMenuView = localStorage.getItem("currentMenuView");
    const currentPath = localStorage.getItem("currentPath");

    // If the saved path matches the current path, restore the saved state
    if (currentPath === pathname && savedMenu) {
      setActiveMenu(savedMenu);
      if (savedSubMenu) setActiveSubMenu(savedSubMenu);
      if (savedNestedMenu) setActiveNestedMenu(savedNestedMenu);

      // Set the appropriate menu view from saved state
      if (savedMenuView) {
        setMenuView(savedMenuView);
      } else if (savedNestedMenu) {
        setMenuView("nested");
      } else if (savedSubMenu) {
        setMenuView("sub");
      } else {
        setMenuView("main");
      }
    } else {
      // If path doesn't match or there's no saved state, find the matching menu items
      const match = findMenuMatch();

      if (match.mainMenu) {
        localStorage.setItem("activeMenu", match.mainMenu);

        if (match.subMenu) {
          localStorage.setItem("activeSubMenu", match.subMenu);

          if (match.nestedMenu) {
            localStorage.setItem("activeNestedMenu", match.nestedMenu);
            localStorage.setItem("currentMenuView", "nested");
          } else {
            localStorage.setItem("currentMenuView", "sub");
          }
        } else {
          // Check if this main menu has a submenu
          const mainMenuItem = menuItems.find(
            (item) => item.key === match.mainMenu
          );
          if (mainMenuItem?.subMenu?.length) {
            localStorage.setItem("currentMenuView", "sub");
          } else {
            localStorage.setItem("currentMenuView", "main");
          }
        }

        // Update state after localStorage to prevent race conditions
        setActiveMenu(match.mainMenu);
        if (match.subMenu) {
          setActiveSubMenu(match.subMenu);
          if (match.nestedMenu) {
            setActiveNestedMenu(match.nestedMenu);
            setMenuView("nested");
          } else {
            setMenuView("sub");
          }
        } else {
          const mainMenuItem = menuItems.find(
            (item) => item.key === match.mainMenu
          );
          if (mainMenuItem?.subMenu?.length) {
            setMenuView("sub");
          } else {
            setMenuView("main");
          }
        }
      }

      // Save the current path
      localStorage.setItem("currentPath", pathname);
    }
  }, [pathname]);

  // Effect 3: Update currentItems based on active menu state
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

        // Get nested menu items with helper function
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
  }, [menuView, activeMenu, activeSubMenu, activeNestedMenu, cache]);

  // ---------- HANDLERS ----------

  // Toggle main menu
  const toggleMenu = (key) => {
    const newMenu = activeMenu === key ? null : key;

    // Update localStorage first
    if (newMenu) {
      localStorage.setItem("activeMenu", newMenu);
      const menuItem = menuItems.find((item) => item.key === key);
      if (menuItem?.subMenu?.length) {
        localStorage.setItem("currentMenuView", "sub");
      } else {
        localStorage.setItem("currentMenuView", "main");
      }
    } else {
      localStorage.setItem("activeMenu", "");
      localStorage.setItem("currentMenuView", "main");
    }
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
    localStorage.setItem("currentPath", pathname);

    // Then update state
    setActiveMenu(newMenu);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);

    // Update menu view based on selection
    if (newMenu) {
      const menuItem = menuItems.find((item) => item.key === key);
      if (menuItem?.subMenu?.length) {
        setMenuView("sub");
      } else {
        setMenuView("main");
      }
    } else {
      setMenuView("main");
    }
  };

  // Toggle submenu
  const toggleSubMenu = (key) => {
    const newSubMenu = activeSubMenu === key ? null : key;

    // Update localStorage first
    if (newSubMenu) {
      localStorage.setItem("activeSubMenu", newSubMenu);

      const menuItem = menuItems.find((item) => item.key === activeMenu);
      const subMenuItem = menuItem?.subMenu?.find((item) => item.key === key);

      if (hasNestedMenu(subMenuItem)) {
        localStorage.setItem("currentMenuView", "nested");
      } else {
        localStorage.setItem("currentMenuView", "sub");
      }
    } else {
      localStorage.setItem("activeSubMenu", "");
      localStorage.setItem("currentMenuView", "sub");
    }
    localStorage.removeItem("activeNestedMenu");
    localStorage.setItem("currentPath", pathname);

    // Then update state
    setActiveSubMenu(newSubMenu);
    setActiveNestedMenu(null);

    // Update menu view based on selection
    if (newSubMenu) {
      const menuItem = menuItems.find((item) => item.key === activeMenu);
      const subMenuItem = menuItem?.subMenu?.find((item) => item.key === key);

      if (hasNestedMenu(subMenuItem)) {
        setMenuView("nested");
      } else {
        setMenuView("sub");
      }
    } else {
      setMenuView("sub");
    }
  };

  // Toggle nested menu
  const toggleNestedMenu = (key) => {
    const newNestedMenu = activeNestedMenu === key ? null : key;

    // Update localStorage first
    localStorage.setItem("activeNestedMenu", newNestedMenu || "");
    localStorage.setItem("currentPath", pathname);

    // Then update state
    setActiveNestedMenu(newNestedMenu);
  };

  // Check if a link is active
  const isLinkActive = (href) => href === pathname;

  // Handle back navigation
  const handleBackToMain = () => {
    // Update state
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);
    setMenuView("main");

    // Update localStorage
    localStorage.removeItem("activeMenu");
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
    localStorage.setItem("currentMenuView", "main");
    localStorage.setItem("currentPath", pathname || "/");
  };

  const handleBackToSub = () => {
    // Update state
    setActiveSubMenu(null);
    setActiveNestedMenu(null);
    setMenuView("sub");

    // Update localStorage
    localStorage.removeItem("activeSubMenu");
    localStorage.removeItem("activeNestedMenu");
    localStorage.setItem("currentMenuView", "sub");
    localStorage.setItem("currentPath", pathname || "/");
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
    const itemPathname = item.pathname || "#"; // Add default to prevent undefined href

    return (
      <div ref={registerChild} style={style} onLoad={measure}>
        <Row
          key={item.key}
          onClick={item.subMenu ? () => toggleMenu(item.key) : undefined}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`align-items-center iq-menu-item cursor-pointer 
            ${hoveredItem === item.key ? "hovered" : ""} 
            ${itemPathname === pathname ? "active-menu-item" : ""} 
            ${activeMenu === item.key ? "active-menu-item" : ""} 
            ${isMiniSidebar ? "mini-sidebar-item" : ""}`}
        >
          <Link
            href={itemPathname}
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

  // Effect 4: Auto-expand nested categories that contain the active path
  useEffect(() => {
    if (!currentItems || menuView !== "nested") return;

    // Check each category to see if it contains the active path
    for (const category of currentItems) {
      if (!category || !category.subItems || !Array.isArray(category.subItems))
        continue;

      // Check if any subitems match the current path
      const hasActiveLink = category.subItems.some(
        (item) => item.href === pathname
      );

      // Auto-expand if needed and only on initial load (not during normal interaction)
      if (hasActiveLink && activeNestedMenu !== category.key) {
        // Use a timeout to avoid state conflicts
        setTimeout(() => {
          setActiveNestedMenu(category.key);
          localStorage.setItem("activeNestedMenu", category.key);
        }, 0);

        // Only expand one category to avoid conflicts
        break;
      }
    }
  }, [pathname, menuView]); // Reduced dependencies to prevent re-triggering

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

    // Find if any subitems in this category match the current path
    const hasActiveLink =
      category.subItems &&
      Array.isArray(category.subItems) &&
      category.subItems.some((item) => item.href === pathname);

    return (
      <div ref={registerChild} style={style} onLoad={measure}>
        <div className="nested-category">
          <Row
            onClick={() => category.key && toggleNestedMenu(category.key)}
            className={`align-items-center iq-nested-item 
              ${activeNestedMenu === category.key ? "active-nested-item" : ""} 
              ${hasActiveLink ? "active-nested-item" : ""}
              ${isMiniSidebar ? "mini-sidebar-item" : ""}`}
          >
            <div className="d-flex align-items-center text-white w-100">
              <Col xs="auto" className="pe-2 nested-icon">
                {isExpanded || hasActiveLink ? (
                  <FcOpenedFolder className="fs-4" />
                ) : (
                  <FcFolder className="fs-4" />
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
                      onClick={() => {
                        // Save the current state when clicking a link
                        localStorage.setItem(
                          "currentPath",
                          subItem.href || "/"
                        );
                      }}
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
