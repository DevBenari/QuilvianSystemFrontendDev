"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import DateInput from "@/components/ui/date-input";
import TextField from "@/components/ui/text-field";

const DataTablePerjanjian = ({
  headers,
  formFields,
  data,
  title,
  onAdd,
  onSearch,
  actions,
  id,
}) => {
  const [searchValue, setSearchValue] = useState(""); // State for search input value
  const methods = useForm();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // Update the search input value
  };

  const handleSearch = (e) => {
    onSearch(e.target.value); // Pass the search value to the onSearch function
  };

  return (
    <FormProvider {...methods}>
      <Container fluid>
        {/* Search Fields */}
        <Row className="">
          {(Array.isArray(formFields) ? formFields : []).map((field, index) => {
            // Ensure the field is valid
            if (!field || !field.type || !field.name) {
              console.warn(`Invalid field at index ${index}:`, field);
              return null; // Skip invalid fields
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
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">{title}</h4>
                </div>
                <div id="table" className="table-editable">
                  {onAdd && (
                    <Button
                      size="sm"
                      variant=""
                      className="btn btn-sm iq-bg-success"
                      onClick={() => onAdd()}
                    >
                      <i className="ri-add-fill">
                        <span className="ps-1">Add New</span>
                      </i>
                    </Button>
                  )}
                </div>
              </div>

              <div className="iq-card-body">
                <div id="table" className="table-editable">
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
                          {actions &&
                            (actions.edit ||
                              actions.delete ||
                              actions.detail) && <th>Actions</th>}
                        </tr>
                      </thead>
                      {/* <tbody>
                        {data.length > 0 ? (
                          data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.entries(row)
                                .filter(([key]) => key !== id) // Exclude "promoId" or specified id
                                .map(([key, value], colIndex) => (
                                  <td key={colIndex}>{value || "-"}</td>
                                ))}
                              {actions &&
                                (actions.edit ||
                                  actions.delete ||
                                  actions.detail) && (
                                  <td>
                                    {actions.edit && (
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
                                    {actions.delete && (
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
                                    {actions.detail && (
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
                                  </td>
                                )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={
                                headers.length +
                                (actions &&
                                (actions.edit ||
                                  actions.delete ||
                                  actions.detail)
                                  ? 1
                                  : 0)
                              }
                              className="text-center"
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody> */}
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </FormProvider>
  );
};

export default DataTablePerjanjian;
