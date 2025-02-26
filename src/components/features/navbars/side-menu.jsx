"use client";

import React, { useEffect, useRef, useState } from "react";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { menus } from "@/utils/config";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import "react-virtualized/styles.css";
import UseIsMobile from "@/lib/hooks/useIsMobile";

const Sidemenu = ({ module }) => {
  const isMobile = UseIsMobile(1000); // Hanya aktif di layar kecil
  const [isOpen, setIsOpen] = useState(false);

  const menu = menus[module] || [];
  const listRef = useRef(null);
  console.log("Module yang dikirim:", module);
  console.log("Data menu yang diterima:", menu);

  const [listHeight, setListHeight] = useState(
    Math.max(window.innerHeight * 0.6, 300) // Gunakan 60% tinggi layar, minimal 300px
  );

  useEffect(() => {
    const handleResize = () => {
      setListHeight(Math.max(window.innerHeight * 0.6, 200));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    defaultHeight: 40,
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
              padding: "10px",
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
        <>
          {/* Tombol Hamburger (Pusat di Navbar) */}
          <button className="hamburger-menu" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* SideMenu dari Atas ke Bawah */}
          <div>
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
                  width={Math.min(window.innerWidth * 0.9, 400)} // Fleksibel, maksimal 400px
                  height={listHeight} // Sesuai tinggi layar yang tersedia
                  rowCount={menu.length}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  rowRenderer={rowRenderer}
                  className="side-menu-list"
                  style={{
                    position: "fixed",

                    left: "50%", // Tetap di tengah
                    transform: "translateX(-50%)", // Agar posisi tetap tengah
                    width: "90vw", // Fleksibel untuk layar kecil
                    maxWidth: "400px", // Maksimal 400px agar tidak terlalu lebar
                    height: "calc(100vh - 400px)", // Agar tetap dalam batas layar
                    backgroundColor: "white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Tambahkan bayangan
                    borderRadius: "8px", // Buat sudut membulat agar lebih bagus
                    border: "1px solid #e0e0e0", // Tambahkan border halus
                    padding: "10px",
                    overflowY: "auto", // Agar bisa scroll jika banyak menu
                    transition: "transform 0.3s ease-in-out", // Animasi turun dari atas
                    transform: isOpen
                      ? "translateX(-50%) translateY(0)"
                      : "translateX(-50%) translateY(-150%)", // Efek muncul dari atas
                    opacity: isOpen ? 1 : 0, // Hilangkan jika tertutup
                    zIndex: 9999,
                  }}
                />
              </div>
            </Transition>
          </div>
        </>
      </div>
    )
  );
};

export default Sidemenu;
