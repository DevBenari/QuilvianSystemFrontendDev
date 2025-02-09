import React, { memo } from "react";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

const TimeField = memo(
  ({ name, label, rules, className, placeholder, ...props }) => {
    const { control } = useFormContext();
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // ✅ Fungsi untuk memformat waktu menjadi HH:mm
    const formatTime = (time) => {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Flatpickr
          {...field}
          {...props}
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
          }}
          className={`form-control ${error ? "is-invalid" : ""}`}
          onChange={([time]) => {
            // ✅ Format waktu sebelum mengupdate form state
            const formattedTime = formatTime(time);
            field.onChange(formattedTime);
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

TimeField.displayName = "TimeField";
export default TimeField;
