import React from "react";
import { useController, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Form } from "react-bootstrap";

const SearchableSelectField = ({
  name,
  label,
  options,
  rules,
  placeholder,
  className,
  onChange: parentOnChange,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  // Custom styles to match the original design
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
      zIndex: 9999, // Ensure it overlays correctly
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6c757d",
    }),
  };

  return (
    <Form.Group className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        {...field}
        {...props}
        options={options}
        placeholder={placeholder || "Select an option"}
        isInvalid={!!error}
        styles={customStyles}
        value={options.find((option) => option.value === field.value) || null}
        onChange={(selected) => {
          field.onChange(selected?.value || null); // This updates react-hook-form's internal state
          if (parentOnChange) {
            parentOnChange(selected); // Call the parent's onChange if provided
          }
        }}
        isClearable
      />
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SearchableSelectField;
