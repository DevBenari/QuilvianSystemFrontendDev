import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Form } from "react-bootstrap";

const SearchableSelectField = forwardRef(
  (
    {
      name,
      label,
      options,
      rules,
      placeholder,
      className,
      onChange: parentOnChange,
      ...props
    },
    ref
  ) => {
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
        zIndex: 9999,
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
          {...props}
          ref={ref}
          options={options}
          placeholder={placeholder || "Select an option"}
          isInvalid={!!error}
          styles={customStyles}
          value={field.value || null}
          onChange={(selected) => {
            field.onChange(selected || null);
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
  }
);

SearchableSelectField.displayName = "SearchableSelectField";
export default SearchableSelectField;
