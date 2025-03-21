"use client";
import React, { memo } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { parseISO, format } from "date-fns";
import CustomSearchFilter from "../custom-search/CustomSearchComponen/custom-search-filter";
import { generateSlug, generateSlugDummy } from "@/utils/slug";

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
    tableTitle,
    fetchFunction,
    setFilteredData,
    headerTitle,
    headerSubtitle,
    historyPath,
    addButton,
    icon: IconComponent,
    showSearch = true,
    iconBgColor = "bg-primary-subtle", // Warna background ikon
    iconColor = "text-primary", // Warna ikon
  }) => {
    const router = useRouter();

    const dateKeys = [
      "createdDate",
      "createDateTime",
      "tanggalDaftar",
      "tglSip",
      "tglStr",
      "tanggalMulaiKerjasama",
      "tanggalAkhirKerjasama",
      "tanggalPersalinan",
      "tanggalLahir",
      "ttlBayi",
      "jamBuka",
      "jamTutup",
      "tglBerlaku",
      "tglBerakhir",
      "purchase_date",
    ];

    const isDateKey = (key) => dateKeys.includes(key);

    const formatDate = (date) => {
      if (!date) return "-";
      try {
        return format(parseISO(date), "dd/MM/yyyy");
      } catch {
        return date;
      }
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

      const slug =
        generateSlug(textField, idField) ||
        generateSlugDummy(textField, idField);
      router.push(`${basePath}/${slug}`);
    };

    return (
      <div>
        <div className="iq-card p-4">
          <div className="iq-card-header d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              {IconComponent && (
                <div className="header-icon-wrapper me-3">
                  <div
                    className={`header-icon ${iconBgColor} ${iconColor} rounded-circle p-3 d-flex align-items-center justify-content-center`}
                  >
                    <IconComponent size={28} />
                  </div>
                </div>
              )}
              <div className="header-title">
                {headerTitle && (
                  <h2 className="mb-1 fw-bold text-primary">{headerTitle}</h2>
                )}
                {headerSubtitle && (
                  <p className="text-muted mb-0">{headerSubtitle}</p>
                )}
              </div>
            </div>
            <div className="d-flex">
              {historyPath && (
                <button
                  className="btn btn-outline-primary me-2 d-flex align-items-center"
                  onClick={() => (window.location.href = historyPath)}
                >
                  <span>Riwayat Kunjungan</span>
                </button>
              )}
              <button
                className="btn btn-dark d-flex align-items-center"
                onClick={() => window.location.reload()}
              >
                <i className="ri-refresh-line me-1"></i>
                <span>Refresh</span>
              </button>
            </div>
          </div>
          {showSearch && fetchFunction && setFilteredData && (
            <div className="mt-2">
              <CustomSearchFilter
                fetchFunction={fetchFunction}
                setFilteredData={setFilteredData}
              />
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="iq-card p-3">
            <div className="iq-card-header d-flex justify-content-between">
              {tableTitle && (
                <h4 className="card-title font-widest">{tableTitle}</h4>
              )}
              {addButton}
            </div>
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
                              : isDateKey(col.key)
                              ? formatDate(item[col.key])
                              : item[col.key] ?? "-"}
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

              {/* 🔹 Pagination Controls */}
            </div>
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
                Page {paginationProps.currentPage} of{" "}
                {paginationProps.totalPages}
              </span>

              <Button
                className="btn btn-primary"
                onClick={() =>
                  paginationProps.onPageChange(paginationProps.currentPage + 1)
                }
                disabled={
                  paginationProps.currentPage >= paginationProps.totalPages
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* 🔹 Pagination Controls */}
      </div>
    );
  }
);

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
