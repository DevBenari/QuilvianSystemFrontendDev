import React, { memo } from 'react';
import Flatpickr from 'react-flatpickr';
import { useController, useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const DateInput = memo(({ 
    name, 
    label, 
    rules, 
    className, 
    placeholder,    
    options = {}, 
    onChange,
    ...props 
}) => {
    const { control } = useForm();
    const { field, fieldState: { error } } = useController({ name, control, rules });

    return (
        <Form.Group className={className}>
            {label && <Form.Label>{label}</Form.Label>}
            <Flatpickr
                {...field}
                {...props}
                options={{
                    dateFormat: 'Y-m-d',
                    allowInput: false,
                    ...options
                }}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                onChange={([date]) => {
                    field.onChange(date); // Pastikan hook form tetap bekerja
                    if (onChange) onChange([date]); // Panggil onChange dari props jika ada
                }}
                placeholder={placeholder}
            />
            {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
        </Form.Group>
    );
});

DateInput.displayName = 'DateInput';
export default DateInput;
