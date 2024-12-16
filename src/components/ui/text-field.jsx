'use client'
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";


const TextField = ({label, name, type, placeholder, rules, ...props }) => {
    const {control, formState: {errors}} = useFormContext();
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
              type={type}
              placeholder={placeholder}
              isInvalid={!!errors[name]}
              {...props}
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
    )
}

export default TextField