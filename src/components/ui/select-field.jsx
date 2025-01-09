import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, FormSelect } from 'react-bootstrap';

const SelectField = ({ name, label, options, rules, placeholder, className, onChangeCallback, ...props }) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const handleChange = (event) => {
    const value = event.target.value;
    field.onChange(value); // RHF handles the state update
    if (onChangeCallback) {
      onChangeCallback(value); // Custom callback for additional logic
    }
  };

  return (
    <Form.Group className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      <FormSelect
        {...field}
        {...props}
        value={field.value || ''}
        onChange={handleChange} // Use the custom handleChange
        isInvalid={!!error}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default SelectField;