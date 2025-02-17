import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from "react-select";

const SelectField = forwardRef(
  ({ name, label, options, rules, placeholder, onSearchChange, onLoadMore, ...props }, ref) => {
    const { control } = useFormContext();
    const { field, fieldState: { error } } = useController({ name, control, rules });

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

    const handleChange = (selected) => {
      field.onChange(selected ? selected.value : null);
    };

    return (
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          options={options}
          placeholder={placeholder || "Pilih Agama"}
          styles={customStyles}
          value={options.find((option) => option.value === field.value) || null}
          onChange={handleChange}
          onInputChange={onSearchChange} // Trigger pencarian dari parent
          onMenuScrollToBottom={onLoadMore} // Load halaman berikutnya saat scroll
          isClearable
        />
        {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
      </Form.Group>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
