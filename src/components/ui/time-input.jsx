import React, { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

const TimeField = memo(
  ({ name, label, rules, className, placeholder, defaultValue, ...props }) => {
    const { control } = useFormContext();
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // ✅ Fungsi untuk menangani input timestamp ISO 8601
    const parseTimestamp = (timestamp) => {
      if (!timestamp) return null;
      const date = new Date(timestamp); // Konversi ke objek Date
      return isNaN(date.getTime()) ? null : date; // Pastikan tanggal valid
    };

    // ✅ Ambil defaultValue jika ada, lalu parsing jika dalam format timestamp ISO 8601
    const initialValue = defaultValue ? parseTimestamp(defaultValue) : null;

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <DatePicker
          {...field}
          {...props}
          selected={initialValue || field.value} // Gunakan default atau nilai dari state
          onChange={(time) => field.onChange(time)} // Simpan objek Date langsung
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15} // Setiap 15 menit
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholderText={placeholder}
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

TimeField.displayName = "TimeField";
export default TimeField;
