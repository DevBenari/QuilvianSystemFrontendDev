"use client";

import React, { useEffect, useRef, useState } from "react";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { menus } from "@/utils/config";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import "react-virtualized/styles.css";
import UseIsMobile from "@/lib/hooks/useIsMobile";

const Sidemenu = ({ module }) => {
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
              padding: "5px",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              wordWrap: "break-word",
            }}
            onLoad={measure}
          >
            <h5 className="menu-title">{item.title}</h5>
            <ul className="submenu">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link href={subItem.href}>{subItem.title}</Link>
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
        {/* Tombol Hamburger Menu */}
        <button className="iq-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>

        {/* SideMenu Muncul dengan Animasi */}
        <Transition
          show={isOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div ref={listRef}>
            <List
              width={Math.min(window.innerWidth * 0.9, 400)}
              height={Math.max(window.innerHeight * 0.6, 200)}
              rowCount={menu.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={rowRenderer}
              className="side-menu-list"
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                position: "fixed", // Diperbaiki dengan tanda kutip
                zIndex: 10000, // JSX menggunakan camelCase, jadi `z-index` menjadi `zIndex`
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
        </Transition>
      </div>
    )
  );
};

export default Sidemenu;
