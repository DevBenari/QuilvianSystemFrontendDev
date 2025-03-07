"use client";

import React, { useEffect, useRef, useState } from "react";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { menus } from "@/utils/config";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import "react-virtualized/styles.css";
import UseIsMobile from "@/lib/hooks/useIsMobile";
// Import icons from react-icons
import { FiChevronRight } from "react-icons/fi";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

const HamburgerMenu = ({ module, iconJudul: IconJudul }) => {
  const isMobile = UseIsMobile(1000);
  const [isOpen, setIsOpen] = useState(false);

  const menu = menus[module] || [];
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        listRef.current &&
        !listRef.current.contains(event.target) &&
        !event.target.closest(".iq-menu-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Add overflow hidden to body when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 40,
  });

  const rowRenderer = ({ index, key, parent, style }) => {
    const item = menu[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div
            style={{
              ...style,
              padding: "10px 5px",
              borderBottom: "1px solid #e8e8e8",
              backgroundColor: "#ffffff",
              wordWrap: "break-word",
            }}
            onLoad={measure}
            className="menu-container"
          >
            <div className="judul">
              <h5 className="menu-title flex items-center gap-2">
                {IconJudul && <IconJudul className="menu-icon" />}
                {item.title}
              </h5>
            </div>
            <ul className="submenu">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="submenu-item">
                  <Link href={subItem.href} className="submenu-link">
                    <FiChevronRight className="submenu-icon" />
                    <span>{subItem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    isMobile && (
      <div className="side-menu">
        {/* Hamburger Menu Button */}
        <button
          className={`iq-menu-btn ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <RiCloseLine className="icon" />
          ) : (
            <RiMenuLine className="icon" />
          )}
        </button>

        {/* Overlay when menu is open */}
        {isOpen && <div onClick={() => setIsOpen(false)} />}

        {/* SideMenu with Animation */}
        <Transition
          show={isOpen}
          enter="transition-transform duration-300 ease-out"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300 ease-in"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div ref={listRef} className="menu-container">
            <List
              width={Math.min(window.innerWidth * 0.9, 400)}
              height={Math.max(window.innerHeight * 0.7, 300)}
              rowCount={menu.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={rowRenderer}
              className="hamburger-menu-list"
              style={{
                position: "fixed",
                zIndex: 10001,
                top: "70px", // Adjust based on your header height
                right: "10px",
              }}
            />
          </div>
        </Transition>
      </div>
    )
  );
};

export default HamburgerMenu;
