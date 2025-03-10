import React, { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from "react-hook-form";
import { Form } from "react-bootstrap";

const DateInput = memo(
  ({
    name,
    label,
    rules,
    control,
    className,
    placeholder,
    options = {},
    onChange,
    defaultValue,
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // ✅ Fungsi untuk menangani timestamp ISO 8601 dan mengonversinya ke objek Date
    const parseTimestamp = (timestamp) => {
      if (!timestamp) return null;
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? null : date; // Pastikan tanggal valid
    };

    // ✅ Ambil defaultValue jika ada, lalu parsing jika dalam format timestamp ISO 8601
    const initialValue = defaultValue ? parseTimestamp(defaultValue) : null;

    return (
      <Form.Group className={`mb-3 ${className}`}>
        {label && <Form.Label>{label}</Form.Label>}
        <DatePicker
          selected={
            initialValue || (field.value ? new Date(field.value) : null)
          }
          onChange={(date) => {
            if (!date) return; // Jika tanggal kosong, tidak lakukan apa-apa
            const timestamp = date.toISOString(); // Simpan dalam format timestamp ISO 8601
            field.onChange(timestamp);
            if (onChange) onChange(timestamp);
          }}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select" // Dropdown untuk memilih tahun
          {...props}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
