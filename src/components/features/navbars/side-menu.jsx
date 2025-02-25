"use client";

import React, { useEffect, useRef, useState } from "react";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { menus } from "@/utils/config";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import "react-virtualized/styles.css";

const Sidemenu = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listWidth, setListWidth] = useState(300); // Default width
  const [listHeight, setListHeight] = useState(300); // Default height
  const menu = menus[module] || [];
  const listRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setListWidth(window.innerWidth - 40); // Untuk layar kecil, buat lebih fleksibel
      } else if (window.innerWidth <= 1280) {
        setListWidth(160);
      } else if (window.innerWidth <= 1440) {
        setListWidth(175);
      } else if (window.innerWidth <= 1700) {
        setListWidth(190);
      } else {
        setListWidth(240);
      }
    };

    handleResize(); // Panggil saat komponen pertama kali dimount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fungsi untuk toggle menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Tutup menu jika user klik di luar List
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        listRef.current &&
        !listRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-menu")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Cache untuk mengatur ketinggian otomatis
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 20,
  });

  // Fungsi untuk merender setiap kategori menu dengan sub-items
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
              padding: "8px",
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
    <div className="sidemenu-container relative">
      {/* Navbar */}
      <div className="bg-white shadow-sm p-2 flex items-center">
        <button
          className="border-0 hamburger-menu text-center"
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Loading State (Hindari Early Return) */}
      {!listWidth || !listHeight ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <Transition
          show={isOpen}
          // enter="transition-opacity duration-300"
          // enterFrom="opacity-0"
          // enterTo="opacity-100"
          // leave="transition-opacity duration-200"
          // leaveFrom="opacity-100"
          // leaveTo="opacity-0"
        >
          <div
            ref={listRef}
            // className="absolute bg-white rounded-lg shadow-lg p-3 border border-gray-300"
          >
            <List
              width={listWidth}
              height={listHeight}
              rowCount={menu.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={rowRenderer}
              style={{
                position: "absolute",
                backgroundColor: "white", // Warna background
                borderRadius: "8px", // Membuat sudut membulat
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Efek bayangan
                padding: "10px", // Padding dalam List
                border: "1px solid #e0e0e0", // Border tipis
              }}
            />
          </div>
        </Transition>
      )}
    </div>
  );
};

export default Sidemenu;
