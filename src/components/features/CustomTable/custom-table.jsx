"use client";
import React, { memo } from "react";
import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/slug";

const CustomTableComponent = memo(
  ({
    data,
    columns,
    slugConfig = { textField: "name", idField: "id" }, // Konfigurasi slug
    basePath = "/",
    currentPage = 1, // Halaman saat ini (dari parent)
    totalPages = 10,  // Total halaman (dari API)
    onPageChange, // Fungsi untuk mengganti halaman
    showActions = false,
    actions = [],
    onCustomAction,
  }) => {
    const router = useRouter();

    // Fungsi untuk navigasi ke halaman detail
    const handleDoubleClick = (item) => {
      const textField = item[slugConfig.textField];
      const idField = item[slugConfig.idField];

      if (!textField || !idField) return;

      const slug = generateSlug(textField, idField);
      router.push(`${basePath}/${slug}`);
    };
    

    return (
      <div>
        <div className="table-responsive" style={{ maxHeight: "400px", overflowX: "auto" }}>
          <Table bordered striped hover responsive="md" className="text-center">
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 1 }}>
              <tr>
                {columns.map((col, index) => <th key={index}>{col.label}</th>)}
                {showActions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (showActions ? 1 : 0)}>No data available</td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item[slugConfig.idField]} onDoubleClick={() => handleDoubleClick(item)} style={{ cursor: "pointer" }}>
                    {columns.map((col, i) => (
                      <td key={i}>
                        {col.key === "no" ? (currentPage - 1) * 10 + index + 1 : item[col.key]}
                      </td>
                    ))}
                    {showActions && (
                      <td>
                        {actions.map((action) => (
                          <Button
                            key={action.type}
                            variant={action.variant}
                            size="sm"
                            onClick={() => onCustomAction(item.id, action.type)}
                            className="mx-1"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="dark" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button variant="dark" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  }
);

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
