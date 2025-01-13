"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import DateInput from "@/components/ui/date-input";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";

const DataTableAdd = ({
  headers,
  formFields,
  title,
  data,
  mt,
  onAdd,
  onSearch,
  actions,
  customActions = [], // Array of custom actions
  id,
  rowsPerPage = 10, // Default rows per page
  onRowClick,
}) => {
  const [searchValue, setSearchValue] = useState(""); // State for search input value
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const methods = useForm();

  // Reset halaman ke 1 jika data berubah
  useEffect(() => {
    setCurrentPage(1); // Reset pagination saat data berubah
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  // Pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Data untuk halaman saat ini
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Pindah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <FormProvider {...methods}>
      <Container fluid className={mt}>
        {/* Search Fields */}
        <Row className="mt-4">
          {(Array.isArray(formFields) ? formFields : []).map((field, index) => {
            if (!field || !field.type || !field.name) {
              console.warn(`Invalid field at index ${index}:`, field);
              return null;
            }

            return (
              <Col xs="12" lg="3" className="mb-3" key={index}>
                {field.type === "date" ? (
                  <DateInput
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    rules={field.rules}
                  />
                ) : field.type === "select" ? (
                  <SelectField
                    name={field.name}
                    label={field.label}
                    options={field.options}
                    placeholder={field.placeholder}
                    rules={field.rules}
                    className="form-control mb-0"
                    onChange={field.onChange}
                  />
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="form-control mb-0"
                    rules={field.rules}
                    onChange={field.onChange}
                  />
                )}
              </Col>
            );
          })}
        </Row>
        {/* Editable Table */}
        <Row>
          <Col lg="12">
            <div className="iq-card">
              {title && (
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">{title}</h4>
                  </div>
                  <div className="add">
                    {onAdd && (
                      <Button
                        size="sm"
                        variant=""
                        className="btn btn-sm iq-bg-success my-2"
                        onClick={() => onAdd()}
                      >
                        <i className="ri-add-fill">
                          <span className="ps-1">Tambah</span>
                        </i>
                      </Button>
                    )}
                  </div>
                </div>
              )}{" "}
              <div className="iq-card-body">
                <div id="table">
                  <div className="table-responsive-md w-100">
                    <Table
                      className="text-center"
                      responsive
                      striped
                      bordered
                      hover
                    >
                      <thead>
                        <tr>
                          {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                          {(actions || customActions.length > 0) && (
                            <th>Actions</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} onClick={() => onRowClick(item)}>
                              {Object.entries(row)
                                .filter(([key]) => key !== id)
                                .map(([key, value], colIndex) => (
                                  <td key={colIndex}>{value || "-"}</td>
                                ))}
                              {(actions || customActions.length > 0) && (
                                <td>
                                  {actions?.edit && (
                                    <span className="table-remove me-2">
                                      <button
                                        type="button"
                                        className="btn iq-bg-success btn-rounded btn-sm my-0"
                                        onClick={() => actions.edit(row)}
                                      >
                                        Edit
                                      </button>
                                    </span>
                                  )}
                                  {actions?.delete && (
                                    <span className="table-remove me-2">
                                      <button
                                        type="button"
                                        className="btn iq-bg-danger btn-rounded btn-sm my-0"
                                        onClick={() => actions.delete(row)}
                                      >
                                        Remove
                                      </button>
                                    </span>
                                  )}
                                  {actions?.detail && (
                                    <span className="table-remove me-2">
                                      <button
                                        type="button"
                                        className="btn iq-bg-danger btn-rounded btn-sm my-0"
                                        onClick={() => actions.detail(row)}
                                      >
                                        Detail
                                      </button>
                                    </span>
                                  )}
                                  {/* Custom Actions */}
                                  {customActions.map(
                                    (customAction, actionIndex) => (
                                      <span
                                        key={actionIndex}
                                        className="table-remove me-2"
                                      >
                                        <button
                                          type="button"
                                          className={`btn btn-rounded btn-sm my-0 ${customAction.className}`}
                                          onClick={() =>
                                            customAction.onClick(row)
                                          }
                                        >
                                          {customAction.label}
                                        </button>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={
                                headers.length +
                                (actions || customActions.length > 0 ? 1 : 0)
                              }
                              className="text-center"
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="justify-content-center">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      />
                      {[...Array(totalPages)].map((_, i) => (
                        <Pagination.Item
                          key={i}
                          active={i + 1 === currentPage}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </FormProvider>
  );
};

export default DataTableAdd;
