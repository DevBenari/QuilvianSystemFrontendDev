"use client";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

const SliderInput = ({
  label,
  name,
  min = 0,
  max = 100,
  step = 1,
  rules,
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

      {/* Slider Field */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Form.Range {...field} min={min} max={max} step={step} {...props} />
            <div className="d-flex justify-content-between">
              <span>{min}</span>
              <span>{field.value}</span>
              <span>{max}</span>
            </div>
          </>
        )}
      />

      {/* Error Message */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SliderInput;
