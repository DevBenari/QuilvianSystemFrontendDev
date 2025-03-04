"use client";

import React, { useEffect, useState } from "react";
import { Table, Col, Form, Button, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";

const TableEditSave = ({
  id,
  title,
  columns = [],
  defaultData = [],
  onChange,
  itemsPerPage = 10,
  actionButtons = [],
  formFields,
  labelText,
  placeholderText,
  datafilter,
  setFilteredPatients,
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

  const calculateTotal = (row) => {
    const total = columns
      .filter((col) => col.isEditable && col.field !== "total")
      .reduce((sum, col) => {
        const value = row[col.field];
        return sum + (value === "" ? 0 : parseFloat(value) || 0);
      }, 0);

    return "Rp. " + total.toLocaleString("id-ID"); // Format Indonesia
  };

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

  const [filters, setFilters] = useState({
    searchQuery: "",
  });

  const handleFilterChange = (value) => {
    const newFilters = { ...filters, searchQuery: value };
    setFilters(newFilters); // Perbarui state filters
    applyFilters(newFilters); // Terapkan filter ke data
  };

  const applyFilters = (filters) => {
    const query = filters.searchQuery.toLowerCase();
    const filtered = datafilter.filter(
      (patient) =>
        patient.nomorRekamMedis?.toLowerCase().includes(query) ||
        "" ||
        patient.nama?.toLowerCase().includes(query) ||
        "" ||
        patient.penjamin?.toLowerCase().includes(query) ||
        "" ||
        (typeof patient.dokter === "string" &&
          patient.dokter.toLowerCase().includes(query)) ||
        patient.departemen?.toLowerCase().includes(query) ||
        "" ||
        patient.tipe_perjanjian?.toLowerCase().includes(query) ||
        "" ||
        patient.user?.toLowerCase().includes(query) ||
        "" ||
        patient.tipeOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaTindakan?.toLowerCase().includes(query) ||
        "" ||
        patient.jenisOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaTindakanOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.kategoriOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaKelas?.toLowerCase().includes(query) ||
        ""
    );
    setFilteredPatients(filtered);
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12">
        <div className="iq-card p-3">
          <div className="iq-card header p-2">
            {title && (
              <div className="iq-card-header d-flex justify-content-between border-bottom ">
                <div className="iq-header-title ">
                  <h4 className="card-title">{title}</h4>
                </div>
              </div>
            )}
            {formFields && (
              <Row className="p-4">
                {(Array.isArray(formFields) ? formFields : []).map(
                  (field, index) => {
                    if (!field || !field.type || !field.name) {
                      console.warn(`Invalid field at index ${index}:`, field);
                      return null;
                    }

                    return (
                      <Col key={index}>
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
                  }
                )}
              </Row>
            )}
            {datafilter && (
              <Row className="mt-2 mx-2">
                <Col lg="4">
                  <TextField
                    label={labelText || "Cari"}
                    name="registrasiPasien"
                    type="text"
                    placeholder={placeholderText || "Cari..."}
                    className="form-control"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  />
                </Col>
              </Row>
            )}
          </div>

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
                        const Component = col.component || TextField;
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
                                        e.target?.value || ""
                                      ),
                                    options: col.options || [],
                                    placeholder: col.placeholder || "",
                                    className: "form-control",
                                  },
                                  col.colSize
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
