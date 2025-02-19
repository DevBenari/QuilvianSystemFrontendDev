import React, { memo } from "react";
import Flatpickr from "react-flatpickr";
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
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // Fungsi untuk memformat tanggal menjadi "YYYY-MM-DD"
    const formatDate = (dateString) => {
      if (!dateString) return "-";

      // Tanggal default yang harus diganti dengan "Belum diupdate"
      const defaultDate = "0001-01-01T00:00:00+00:00";

      if (dateString === defaultDate) {
        return "Belum diupdate";
      }

      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Flatpickr
          {...field}
          {...props}
          options={{
            dateFormat: "Y-m-d",
            allowInput: false,
            ...options,
          }}
          className={`form-control ${error ? "is-invalid" : ""}`}
          onChange={([date]) => {
            // Format tanggal sebelum dikirim ke form state
            const formattedDate = formatDate(date);

            // Update nilai di hook form dengan format yang benar
            field.onChange(formattedDate);

            // Panggil onChange dari props jika ada
            if (onChange) onChange(formattedDate);
          }}
          placeholder={placeholder}
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
