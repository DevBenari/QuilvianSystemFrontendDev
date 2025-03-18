import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

const Checkbox = ({
  label,
  name,
  className,
  rules,
  disabled = false,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Form.Check
            {...field}
            type="checkbox"
            className={className}
            isInvalid={!!errors[name]}
            disabled={disabled}
            label={label}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            id={`checkbox-${name}`}
            {...props}
          />
        )}
      />

      {/* Pesan Error */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message || "Field ini wajib diisi"}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Checkbox;
