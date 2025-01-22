"use client";

import React, { useEffect, useState } from "react";
import { Table, Col, Form, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import NumberField from "@/components/ui/distance-filed";

const EditableTable = ({
  id, // ID unik untuk tabel
  title,
  columns = [],
  defaultData = [],
  onChange, // Callback untuk melaporkan perubahan data
  itemsPerPage = 10,
}) => {
  const methods = useForm({
    defaultValues: {
      data: defaultData,
    },
  });

  const { setValue, watch } = methods;
  const data = watch("data");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setValue("data", defaultData); // Perbarui data
  }, [defaultData, setValue]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
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
        const updatedRow = { ...row, [field]: parseFloat(value) || 0 };
        updatedRow.total = calculateTotal(updatedRow);
        return updatedRow;
      }
      return row;
    });
    setValue("data", updatedData);

    // Laporkan perubahan ke halaman utama
    if (onChange) {
      onChange(id, updatedData);
    }
  };

  const calculateTotal = (row) =>
    columns
      .filter((col) => col.isEditable && col.field !== "total")
      .reduce((sum, col) => sum + (row[col.field] || 0), 0);

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
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, rowIndex) => (
                    <tr key={row.id}>
                      {columns.map((col, colIndex) => (
                        <td key={colIndex}>
                          {col.isEditable ? (
                            <NumberField
                              name={`data[${rowIndex}].${col.field}`}
                              value={row[col.field]}
                              onChange={(e) =>
                                handleInputChange(
                                  row.id,
                                  col.field,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            row[col.field]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form>
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

export default EditableTable;
