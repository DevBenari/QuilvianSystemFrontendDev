"use client";
import React, { useEffect, useState } from "react";
import { menus } from "@/utils/config";
import Link from "next/link";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import "react-virtualized/styles.css";
// React Icons imports
import { FiChevronRight } from "react-icons/fi"; // Feather Icons
import { BsFolderFill } from "react-icons/bs"; // Bootstrap Icons

const Sidemenu = ({ module }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [listWidth, setListWidth] = useState(240); // Default width
  const [listHeight, setListHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight - 220 : 600
  ); // Default height with SSR check

  const menu = menus[module] || [];

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight - 220);

      if (window.innerWidth <= 1000) {
        setListWidth(90);
      } else if (window.innerWidth <= 1100) {
        setListWidth(160);
      } else if (window.innerWidth <= 1299) {
        setListWidth(170);
      } else if (window.innerWidth <= 1360) {
        setListWidth(140);
      } else if (window.innerWidth <= 1440) {
        setListWidth(160);
      } else if (window.innerWidth <= 1700) {
        setListWidth(190);
      } else {
        setListWidth(240);
      }
    };

    handleResize(); // Call when component first mounts
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

  // Cache for automatic height adjustment
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80, // Default height per category
  });

  // Function to render each menu category with sub-items
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
              padding: "12px",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              wordWrap: "break-word",
              transition: "all 0.2s ease",
            }}
            onLoad={measure}
          >
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#333",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BsFolderFill
                style={{
                  marginRight: "8px",
                  color: "#4a6da7",
                }}
                size={16}
              />
              {item.title}
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {item.subItems.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="menu-item-sidemenu"
                  style={{
                    marginLeft: "6px",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                    padding: "6px 8px",
                  }}
                >
                  <Link
                    href={subItem.href}
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      color: "#0066cc",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <FiChevronRight
                      style={{
                        marginRight: "8px",
                        color: "#666",
                      }}
                      size={14}
                    />
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
    <>
      <div>
        <List
          width={listWidth} // Using dynamic state
          height={listHeight} // Reduced to keep footer visible
          rowCount={menu.length}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={rowRenderer}
          style={{
            position: "fixed",
            backgroundColor: "white",
            borderRadius: "8px", // Slightly more rounded corners
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)", // Enhanced shadow
            padding: "10px",
            border: "1px solid #e0e0e0",
            overflowX: "hidden", // Prevent horizontal scrolling
          }}
        />
      </div>
    </>
  );
};

export default Sidemenu;
