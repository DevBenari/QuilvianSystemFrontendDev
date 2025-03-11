import React, { memo, useEffect, useState } from "react";
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
    disabled,
    readOnly,
    ...props
  }) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    const [displayFormat, setDisplayFormat] = useState("");

    // Parse timestamp or date string to Date object
    const parseDate = (value) => {
      if (!value) return null;
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    };

    // Format date as YYYY-MM-DD for display
    const formatDateForDisplay = (date) => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Initialize with field value or default value
    const selectedDate = parseDate(field.value) || parseDate(defaultValue);

    // Update the display format when the date changes
    useEffect(() => {
      if (selectedDate) {
        setDisplayFormat(formatDateForDisplay(selectedDate));
      } else {
        setDisplayFormat("");
      }
    }, [selectedDate]);

    return (
      <Form.Group className={`mb-3 ${className || ""}`}>
        {label && <Form.Label>{label}</Form.Label>}
        <div className="position-relative">
          {/* Hidden input to display the formatted date */}
          <Form.Control
            type="text"
            value={displayFormat}
            readOnly
            placeholder={placeholder}
            className={error ? "is-invalid" : ""}
            disabled={disabled}
          />

          {/* Overlay DatePicker that controls the actual date selection */}
          <div className="position-absolute top-0 start-0 end-0 bottom-0">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                if (!date) return;

                // Convert to midnight UTC to ensure consistency
                const localDate = new Date(date);
                localDate.setHours(0, 0, 0, 0);

                // Create ISO timestamp for backend
                const timestamp = localDate.toISOString();

                // Update form value with timestamp
                field.onChange(timestamp);

                // Trigger external onChange if provided
                if (onChange) onChange(timestamp);

                // Update display format
                setDisplayFormat(formatDateForDisplay(localDate));
              }}
              dateFormat="yyyy-MM-dd"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabled={disabled || readOnly}
              customInput={
                <div className="w-100 h-100 opacity-0 cursor-pointer" />
              }
              {...props}
            />
          </div>
        </div>
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
