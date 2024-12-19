'use client';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

const TextArea = ({ label, name, placeholder, rows = 3, rules, ...props }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Form.Group className="mb-3">
            {/* Label TextArea */}
            {label && <Form.Label>{label}</Form.Label>}

            {/* TextArea Field */}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Form.Control
                        {...field}
                        as="textarea" // Menggunakan textarea
                        placeholder={placeholder}
                        rows={rows} // Jumlah baris untuk TextArea
                        isInvalid={!!errors[name]} // Validasi error
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
    );
};

export default TextArea;
