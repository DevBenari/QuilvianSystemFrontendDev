'use client';
import React, { forwardRef, memo } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

const TextArea = forwardRef(({ label, name, placeholder, rows = 3, rules, ...props }, ref) => {
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
                        value={field.value ?? ''} // ✅ Pastikan tidak undefined
                        onChange={(e) => field.onChange(e.target.value)}
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
});

TextArea.displayName = "TextAreaField";
export default memo(TextArea);
