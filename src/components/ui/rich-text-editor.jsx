"use client";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ label, name, rules, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3">
      {/* Label Input */}
      {label && <Form.Label>{label}</Form.Label>}

      {/* Rich Text Editor */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            onChange={(content) => field.onChange(content)}
            {...props}
          />
        )}
      />

      {/* Error Message */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default RichTextEditor;
