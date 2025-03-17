"use client";
import React, { memo, useState } from "react";
import { Table, Button, Spinner, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { parseISO, format } from "date-fns";
import CustomSearchFilter from "../custom-search/CustomSearchComponen/custom-search-filter";
import { generateSlug, generateSlugDummy } from "@/utils/slug";
import { FaUsers } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import TextField from "@/components/ui/text-field";
import { showAlert } from "../alert/custom-alert";
import { useDispatch } from "react-redux";

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

    searchName = false,
    buttonRefresh,
    showHeader = true, // Menggunakan nama yang lebih intuitif
    TableIcon,
  }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSearch = () => {
      const { search } = filtersByName;

      if (!search) {
        showAlert.warning("Harap isi Nama sebelum melakukan pencarian.");

        return;
      }

      dispatch(fetchFunction(filtersByName)).then((result) => {
        if (fetchFunction.fulfilled.match(result)) {
          setFilteredData(result.payload?.data?.rows || []);
        }
      });
    };

    const [filtersByName, setFiltersByName] = useState({
      search: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFiltersByName((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };

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
        {showHeader && (
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
                {buttonRefresh && (
                  <button
                    className="btn btn-dark d-flex align-items-center"
                    onClick={() => window.location.reload()}
                  >
                    <i className="ri-refresh-line me-1"></i>
                    <span>Refresh</span>
                  </button>
                )}
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
        )}

        <div className="mt-3">
          <div className="iq-card p-3">
            <div className="iq-card-header d-flex justify-content-between align-items-center w-100">
              <div className="d-flex align-items-center">
                {/* 🔹 Menampilkan Ikon Jika Ada */}
                {TableIcon && (
                  <div className="me-2">
                    <TableIcon size={24} className="text-primary" />
                  </div>
                )}

                {tableTitle && (
                  <h4 className="card-title font-widest mb-0">{tableTitle}</h4>
                )}
              </div>

              <div className="d-flex align-items-center">
                {searchName && (
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <TextField
                      label="Cari Data:"
                      name="search"
                      type="text"
                      placeholder="Masukkan kata kunci..."
                      className="form-control"
                      value={filtersByName.search}
                      onChange={handleInputChange}
                    />
                    <Button
                      variant="primary"
                      onClick={handleSearch}
                      className="d-flex align-items-center"
                      style={{
                        background: "linear-gradient(135deg, #007bff, #0056b3)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "5px 10px",
                        fontSize: "16px",
                        transition: "0.3s ease",
                        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
                        marginTop: "10px",
                      }}
                      onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                      onMouseOut={(e) => (e.target.style.opacity = "1")}
                    >
                      <FaSearch className="me-1" /> Cari
                    </Button>
                  </div>
                )}

                {addButton && <div className="ms-auto">{addButton}</div>}
              </div>
            </div>
            <div className="table-responsive">
              <Table bordered striped hover>
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={`header-${index}`}>{col.label}</th>
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
                        key={item[slugConfig.idField] || `row-${index}`}
                        onDoubleClick={() => handleDoubleClick(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {columns.map((col, i) => (
                          <td key={`cell-${index}-${i}`}>
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
                            {actions.map((action, i) => (
                              <Button
                                key={`action-${
                                  item[slugConfig.idField] || index
                                }-${i}`}
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
      </div>
    );
  }
);

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
