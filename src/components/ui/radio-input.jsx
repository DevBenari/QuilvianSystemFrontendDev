import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

const RadioInput = ({ name, label, options, rules, className, ...props }) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ...restField },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Form.Group className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex flex-row gap-3">
        {options.map((option) => (
          <Form.Check
            key={option.value}
            type="radio"
            id={`${name}_${option.value}`}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)} // Pastikan perubahan nilai
            {...restField}
            isInvalid={!!error}
            {...props}
          />
        ))}
      </div>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default RadioInput;
