"use client";
import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/slug";

const CustomTablePagedApi = ({
  data,
  columns,
  fetchData, // Fungsi untuk fetch data dengan pagination & filter
  currentPage,
  totalPages,
  totalRows,
  perPage,
  onPageChange, // Fungsi untuk update halaman
  slugConfig = { textField: "name", idField: "id" },
  basePath = "/",
  showActions = false,
  actions = [],
  loading,
}) => {
  const router = useRouter();

  // Handle double click untuk navigasi ke halaman edit berdasarkan slug
  const handleDoubleClick = (item) => {
    const textField = item[slugConfig.textField];
    const idField = item[slugConfig.idField];

    if (!textField || !idField) {
      console.error("Missing required fields for slug generation:", {
        textField,
        idField,
      });
      return;
    }

    const slug = generateSlug(textField, idField);
    router.push(`${basePath}/${slug}`);
  };

  return (
    <div>
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowX: "auto" }}
      >
        <Table bordered striped hover responsive="md" className="text-center">
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f8f9fa",
              zIndex: 1,
            }}
          >
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="text-center"
                >
                  <Spinner animation="border" role="status" />
                  <p>Memuat data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="text-center"
                >
                  Tidak ada data yang tersedia
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item[slugConfig.idField]}
                  onDoubleClick={() => handleDoubleClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {columns.map((col, i) => (
                    <td key={i}>
                      {col.key === "no"
                        ? (currentPage - 1) * perPage + index + 1
                        : col.key === "tanggalLahir" ||
                          col.key === "createDateTime" ||
                          col.key === "tanggalDaftar" ||
                          col.key === "tglSip" ||
                          col.key === "tglStr"
                        ? formatDate(item[col.key])
                        : item[col.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td>
                      {actions.map((action) => (
                        <Button
                          key={action.type}
                          variant={action.variant}
                          size="sm"
                          onClick={() => action.onClick(item)}
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
        <Button
          variant="dark"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Halaman {currentPage} dari {totalPages} (Total Data: {totalRows})
        </span>
        <Button
          variant="dark"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

CustomTablePagedApi.displayName = "CustomTablePagedApi";
export default CustomTablePagedApi;
