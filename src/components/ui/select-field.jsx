import React, { forwardRef } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";
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
      readOnly = false,
      onChangeCallback,
      dynamicOptions = null,  // Tambahkan dynamicOptions untuk opsi dinamis
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();
    const watchValues = useWatch({ control });
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    // Tentukan opsi, apakah dari fungsi (dinamis) atau array statis
    const resolvedOptions = typeof options === "function" ? options(watchValues) : options;

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
      if (onChangeCallback) {
        onChangeCallback(selected ? selected.value : null);
      }
    };

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          
          options={resolvedOptions}
          placeholder={placeholder || "Select an option"}
          styles={customStyles}
          value={resolvedOptions.find((option) => option.value === field.value) || null}
          onChange={handleChange}
          isClearable
          isDisabled={readOnly}
          menuIsOpen={readOnly ? false : undefined}
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
