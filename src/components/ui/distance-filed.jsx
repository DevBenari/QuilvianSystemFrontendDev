import React, { memo } from "react";
import { useController, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

const DistanceField = memo(
  ({ name, label, rules, className, placeholder, ...props }) => {
    const { control } = useForm();
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <div className="d-flex align-items-center">
          {/* Input Field */}
          <input
            {...field}
            {...props}
            type="number" // Tipe input untuk angka
            step="0" // Presisi jarak (contoh: 0.01 km)
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder={placeholder || "Masukkan jarak"}
          />
        </div>
        {/* Pesan Error */}
        {error && (
          <Form.Control.Feedback type="invalid">
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

DistanceField.displayName = "DistanceField";
export default DistanceField;
