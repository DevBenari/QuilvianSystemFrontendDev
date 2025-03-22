"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Table, Form, Row, Col } from "react-bootstrap";

const TableSelection = ({
  name,
  label,
  options = [],
  loading = false,
  handleLoadMore,
  selectPlaceholder = "Pilih item...",
  rules = {},
}) => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  // Generate a temporary select field name based on the original field name
  const tempSelectName = `temp${name}Select`;

  // State for selected items and current selection
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempSelected, setTempSelected] = useState("");

  // Watch for changes to the actual field value
  useEffect(() => {
    const subscription = watch((value) => {
      if (value[name]) {
        // Parse array if it's a string
        let newValue = value[name];
        if (typeof newValue === "string" && newValue.startsWith("[")) {
          try {
            newValue = JSON.parse(newValue);
          } catch (e) {
            console.error("Error parsing field value", e);
            newValue = [];
          }
        }

        // Ensure it's an array
        if (Array.isArray(newValue)) {
          setSelectedItems(newValue);
        }
      }
    });

    // Initialize from form values
    const currentValues = getValues(name);
    if (currentValues) {
      let parsedValues = currentValues;
      if (typeof currentValues === "string" && currentValues.startsWith("[")) {
        try {
          parsedValues = JSON.parse(currentValues);
        } catch (e) {
          console.error("Error parsing initial values", e);
          parsedValues = [];
        }
      }

      if (Array.isArray(parsedValues)) {
        setSelectedItems(parsedValues);
      }
    }

    return () => subscription.unsubscribe();
  }, [watch, getValues, name]);

  // Handle temporary select change
  const handleSelectChange = (e) => {
    setTempSelected(e.target.value);
  };

  // Add item to the table
  const handleAddItem = () => {
    if (!tempSelected) return;

    // Check if item already exists
    const itemExists = selectedItems.includes(tempSelected);

    if (!itemExists) {
      const newItems = [...selectedItems, tempSelected];

      // Update both local state and form value
      setSelectedItems(newItems);
      setValue(name, newItems, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      // Reset temporary selection
      setTempSelected("");
    }
  };

  // Remove item from the table
  const handleRemoveItem = (itemToRemove) => {
    const newItems = selectedItems.filter((item) => item !== itemToRemove);

    // Update both local state and form value
    setSelectedItems(newItems);
    setValue(name, newItems, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Get label for a value
  const getLabelFromValue = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // Check if we have an error for this field
  const hasError = errors && errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Row className="mb-3">
        <Col md={9}>
          <Form.Select
            value={tempSelected}
            onChange={handleSelectChange}
            disabled={loading}
            placeholder={selectPlaceholder}
          >
            <option value="">{selectPlaceholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            onClick={handleAddItem}
            disabled={!tempSelected}
            className="w-100"
          >
            Tambah
          </Button>
        </Col>
      </Row>

      {/* Hidden field for form validation */}
      <input
        type="hidden"
        {...register(name, rules)}
        value={JSON.stringify(selectedItems)}
      />

      {/* Display error message if any */}
      {hasError && (
        <Form.Text className="text-danger">{errors[name].message}</Form.Text>
      )}

      {/* Table display of selected items */}
      {selectedItems.length > 0 && (
        <div className="table-responsive">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "10%" }}>
                  No
                </th>
                <th>Nama</th>
                <th className="text-center" style={{ width: "15%" }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={item || index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{getLabelFromValue(item)}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item)}
                    >
                      ×
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Form.Group>
  );
};

export default TableSelection;
