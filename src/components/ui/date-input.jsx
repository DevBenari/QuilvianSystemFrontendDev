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
    disabled,
    readOnly,
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // Fungsi untuk memformat tanggal menjadi "YYYY-MM-DD"
    const formatDate = (date) => {
      if (!date) return "";

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Fungsi untuk mendapatkan objek Date dari nilai field
    const getSelectedDate = () => {
      if (!field.value) return null;

      // Jika field.value adalah string dalam format YYYY-MM-DD
      if (
        typeof field.value === "string" &&
        field.value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        return new Date(field.value);
      }

      // Jika field.value adalah string ISO atau Date object
      try {
        return new Date(field.value);
      } catch (error) {
        return null;
      }
    };

    // Handle date change
    const handleDateChange = (date) => {
      if (!date) {
        field.onChange(null);
        if (onChange) onChange(null);
        return;
      }

      // Set time to midnight
      const localDate = new Date(date);
      localDate.setHours(0, 0, 0, 0);

      // Format date as YYYY-MM-DD
      const formattedDate = formatDate(localDate);

      // Update form value with YYYY-MM-DD string format
      field.onChange(formattedDate);

      // Trigger external onChange
      if (onChange) onChange(formattedDate);
    };

    return (
      <Form.Group className={className || "mb-3"}>
        {label && <Form.Label>{label}</Form.Label>}
        <DatePicker
          selected={getSelectedDate()}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          disabled={disabled}
          readOnly={readOnly}
          placeholderText={placeholder}
          customInput={
            <Form.Control
              type="text"
              placeholder={placeholder}
              className={error ? "is-invalid" : ""}
              disabled={disabled}
              readOnly={true}
            />
          }
          {...props}
        />
        {error && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
