"use client";

import React, { useEffect, useState } from "react";
import { Table, Col, Form, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";

const TableEditSave = ({
  id,
  title,
  columns = [],
  defaultData = [],
  onChange,
  itemsPerPage = 10,
  actionButtons = [],
}) => {
  const methods = useForm({
    defaultValues: {
      data: defaultData,
    },
  });

  const { setValue, watch } = methods;
  const data = watch("data");

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    setValue("data", defaultData);
  }, [defaultData, setValue]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (rowId, field, value) => {
    const updatedData = data.map((row) => {
      if (row.id === rowId) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.total = calculateTotal(updatedRow); // Hitung ulang total
        return updatedRow;
      }
      return row;
    });
    setValue("data", updatedData);

    if (onChange) {
      onChange(id, updatedData);
    }
  };

  const calculateTotal = (row) =>
    "Rp. " +
    columns
      .filter((col) => col.isEditable && col.field !== "total")
      .reduce((sum, col) => sum + (parseFloat(row[col.field]) || 0), 0)
      .toLocaleString("id-ID"); // Format Indonesia

  const handleEdit = () => {
    setIsEditMode(true);
    setOriginalData(data);
  };

  const handleCancel = () => {
    setValue("data", originalData);
    setIsEditMode(false);
  };

  const handleSave = () => {
    console.log("Data Disimpan:", data);
    setIsEditMode(false);
  };

  const renderComponent = (Component, props, colSize) => {
    const className =
      Component === SelectField
        ? "select-field-container"
        : "text-field-container";

    // Gunakan ukuran kolom yang diterapkan melalui colSize
    return (
      <Col xl={colSize || 12}>
        <Component {...props} className={className} />
      </Col>
    );
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12">
        <div className="iq-card">
          {title && (
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">{title}</h4>
              </div>
            </div>
          )}
          <div className="iq-card-body">
            <Form>
              <Table
                className="text-center"
                responsive="md"
                striped
                bordered
                hover
                style={{ tableLayout: "fixed" }}
              >
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} colSpan={col.colSpan || 1}>
                        {col.headerName}
                      </th>
                    ))}
                    {actionButtons.length > 0 && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, rowIndex) => (
                    <tr key={row.id}>
                      {columns.map((col, colIndex) => {
                        const Component = col.component || TextField; // Default ke TextField
                        return (
                          <td key={colIndex}>
                            {col.isEditable && isEditMode
                              ? renderComponent(
                                  Component,
                                  {
                                    name: `data[${rowIndex}].${col.field}`,
                                    value: row[col.field],
                                    onChange: (e) =>
                                      handleInputChange(
                                        row.id,
                                        col.field,
                                        e.target?.value || e
                                      ),
                                    options: col.options || [], // Options untuk SelectField
                                    placeholder: col.placeholder || "",
                                    className: "form-control",
                                  },
                                  col.colSize // Ambil colSize dari kolom
                                )
                              : row[col.field]}
                          </td>
                        );
                      })}
                      {actionButtons.length > 0 && (
                        <td>
                          {actionButtons.map((button, idx) => (
                            <Button
                              key={idx}
                              variant={button.variant || "primary"}
                              size="sm"
                              className="me-2 my-1"
                              onClick={() => button.onClick(row)}
                            >
                              {button.label}
                            </Button>
                          ))}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form>
            <div className="d-flex justify-content-end mt-3">
              {!isEditMode ? (
                <Button className="btn btn-primary mx-2" onClick={handleEdit}>
                  Edit
                </Button>
              ) : (
                <>
                  <Button className="btn btn-success mx-2" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    className="btn btn-danger mx-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="dark"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
            </span>
            <Button
              variant="dark"
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </Col>
    </FormProvider>
  );
};

export default TableEditSave;
