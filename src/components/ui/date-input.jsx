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
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // Fungsi untuk memformat tanggal menjadi "YYYY-MM-DD"
    const formatDate = (date) => {
      if (!date) return "-";

      // Tanggal default yang harus diganti dengan "Belum diupdate"
      const defaultDate = "0001-01-01T00:00:00+00:00";

      if (date.toISOString() === defaultDate) {
        return "Belum diupdate";
      }

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    return (
      <Form.Group className={"mb-3" || className}>
        {label && <Form.Label className="">{label}</Form.Label>}
        <DatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => {
            const formattedDate = formatDate(date);
            field.onChange(formattedDate);
            if (onChange) onChange(formattedDate);
          }}
          dateFormat="yyyy-MM-dd"
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select" // Mode dropdown untuk memilih tahun
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
