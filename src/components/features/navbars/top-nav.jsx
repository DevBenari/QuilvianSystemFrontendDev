"use client";
import React, { useEffect, useState } from "react";
import { menus } from "@/utils/config";
import Link from "next/link";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import "react-virtualized/styles.css";

const TopNav = ({ module }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [listWidth, setListWidth] = useState(230); // Default width

  const menu = menus[module] || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setListWidth(window.innerWidth - 40); // Untuk layar kecil, buat lebih fleksibel
      } else if (window.innerWidth <= 1024) {
        setListWidth(180);
      } else if (window.innerWidth <= 1500) {
        setListWidth(175);
      } else if (window.innerWidth <= 1700) {
        setListWidth(190);
      } else {
        setListWidth(230);
      }
    };

    handleResize(); // Panggil saat komponen pertama kali dimount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= 75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cache untuk mengatur ketinggian otomatis
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80, // Tinggi default per kategori
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
            <h5
              style={{
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} style={{ padding: "3px 0" }}>
                  <Link
                    href={subItem.href}
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      color: "#007bff",
                    }}
                  >
                    {subItem.title}
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
    <div className={`topnav-container ${isFixed ? "fixed-topnav" : ""}`}>
      <h4 className="topnav-title">Top Menu</h4>
      <div className="topnav-scroll">
        <List
          width={listWidth} // Menggunakan state dinamis
          height={window.innerHeight - 180} // Dikurangi agar footer tetap terlihat
          rowCount={menu.length}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={rowRenderer}
        />
      </div>
    </div>
  );
};

export default TopNav;
