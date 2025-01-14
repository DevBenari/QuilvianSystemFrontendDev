import React, { memo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

const NumberField = memo(
  ({ name, label, rules, className, placeholder, ...props }) => {
    // Mengambil control dari FormProvider
    const { control } = useFormContext();
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
            type="tel" // Gunakan type "tel" untuk menerima angka tanpa panah spinner
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder={placeholder || "Masukkan nomor"}
            onInput={(e) => {
              // Pastikan hanya angka yang bisa dimasukkan
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              field.onChange(e);
            }}
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

NumberField.displayName = "NumberField";
export default NumberField;
