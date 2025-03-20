import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

const NumberField = ({
  label,
  name,
  className,
  placeholder,
  rules,
  disabled = false,
  min,
  max,
  step,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3">
      {/* Label Input */}
      {label && <Form.Label>{label}</Form.Label>}

      {/* Input Field */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Form.Control
            {...field}
            type="number"
            className={className}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? "" : Number(value)); // Pastikan nilainya tetap angka
            }}
          />
        )}
      />

      {/* Pesan Error */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default NumberField;
