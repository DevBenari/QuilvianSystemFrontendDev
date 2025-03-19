import React, { memo, useState } from "react";
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
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    const [errorMessage, setErrorMessage] = useState("");

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

      if (
        typeof field.value === "string" &&
        field.value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        return new Date(field.value);
      }

      try {
        return new Date(field.value);
      } catch (error) {
        return null;
      }
    };

    // Handle date change (dari DatePicker)
    const handleDateChange = (date) => {
      if (!date) {
        field.onChange(null);
        setErrorMessage("");
        if (onChange) onChange(null);
        return;
      }

      const localDate = new Date(date);
      localDate.setHours(0, 0, 0, 0);
      const formattedDate = formatDate(localDate);

      field.onChange(formattedDate);
      setErrorMessage(""); // Hapus pesan error jika format benar

      if (onChange) onChange(formattedDate);
    };

    // Handle manual input (dari keyboard)
    const handleInputChange = (e) => {
      const value = e.target.value;

      // Validasi format input
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setErrorMessage("Format salah! Gunakan format YYYY-MM-DD.");
      } else {
        setErrorMessage("");
      }

      // Update nilai input ke form
      field.onChange(value);
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
          placeholderText={placeholder}
          customInput={
            <Form.Control
              type="text"
              placeholder={placeholder}
              className={error || errorMessage ? "is-invalid" : ""}
              disabled={disabled}
              value={field.value || ""}
              onChange={handleInputChange} // Validasi input manual
            />
          }
          {...props}
        />
        {/* Tampilkan pesan error jika format salah */}
        {(errorMessage || error) && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errorMessage || error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
