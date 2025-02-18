"use client";
import React, { memo } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/slug";

import { parseISO, format } from "date-fns";
const CustomTableComponent = memo(
  ({
    data = [],
    columns = [],
    paginationProps = {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      onPageChange: () => {},
    },
    slugConfig = { textField: "name", idField: "id" },
    basePath = "/",
    actions = [],
    showActions = false,
    loading,
  }) => {
    const router = useRouter();

    const formatDate = (date) => {
      if (!date) return "-"; // Jika tanggal null/undefined, tampilkan "-"
      return format(parseISO(date), "dd/MM/yyyy");
    };

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
        <div className="table-responsive">
          <Table bordered striped hover>
            <thead>
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
                          ? (paginationProps.currentPage - 1) *
                              paginationProps.itemsPerPage +
                            index +
                            1
                          : col.key === "createdDate"
                          ? // col.key === "createDateTime" ||
                            // col.key === "tanggalDaftar" ||
                            // col.key === "tglSip" ||
                            // col.key === "tglStr"
                            formatDate(item[col.key])
                          : item
                          ? item[col.key] ?? "-"
                          : "-"}
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

        {/* 🔹 Pagination Controls */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            className="btn btn-secondary"
            onClick={() =>
              paginationProps.onPageChange(paginationProps.currentPage - 1)
            }
            disabled={paginationProps.currentPage === 1}
          >
            Previous
          </Button>

          <span>
            Page {paginationProps.currentPage} of {paginationProps.totalPages}
          </span>

          <Button
            className="btn btn-primary"
            onClick={() =>
              paginationProps.onPageChange(paginationProps.currentPage + 1)
            }
            disabled={paginationProps.currentPage >= paginationProps.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
);

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
