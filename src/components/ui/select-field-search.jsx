import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Form } from "react-bootstrap";

const SearchableSelectField = forwardRef(({
  name,
  label,
  options,
  rules,
  placeholder,
  className,
  onChange: parentOnChange,
  ...props
}, ref) => {
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
      borderRadius: "0.25 m",
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
      ref={ref} // Forward the ref to the Select component
      options={options}
      placeholder={placeholder || "Select an option"}
      isInvalid={!!error}
      styles={customStyles}
      value={options.find((option) => option.value === field.value) || null}
      onChange={(selected) => {
        field.onChange(selected?.value || null);
        if (parentOnChange) {
          parentOnChange(selected);
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
});

SearchableSelectField.displayName = "SearchableSelectField";
export default SearchableSelectField;
