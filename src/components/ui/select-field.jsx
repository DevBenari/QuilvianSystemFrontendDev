import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from "react-select";

const SelectField = forwardRef(
  (
    {
      name,
      label,
      options,
      rules,
      placeholder,
      className,
      onChangeCallback,
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // Custom styles for react-select
    const customStyles = {
      control: (provided) => ({
        ...provided,
        border: "1px solid #ced4da",
        borderRadius: "0.25rem",
        boxShadow: "none",
        height: "calc(1.5em + 0.75rem + 2px)",
      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "#6c757d",
      }),
    };

    // Handle change
    const handleChange = (selected) => {
      const value = selected ? selected.value : null;
      field.onChange(value);
    
      // Panggil callback dengan value saja (bukan dengan objek selected)
      if (onChangeCallback) {
        onChangeCallback(value);
      }
    };
    

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          ref={ref}
          options={options}
          placeholder={placeholder || "Select an option"}
          styles={customStyles}
          value={options.find((option) => option.value === field.value) || null}
          onChange={handleChange}
          isClearable
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

SelectField.displayName = "SelectField";

export default SelectField;
