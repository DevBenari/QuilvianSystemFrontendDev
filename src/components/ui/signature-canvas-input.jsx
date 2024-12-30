"use client";
import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ label, name, rules, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  return (
    <Form.Group className="mb-3">
      {/* Label Input */}
      {label && <Form.Label>{label}</Form.Label>}

      {/* Signature Pad */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 500,
                height: 200,
                className: "signature-canvas border",
              }}
              onEnd={() => field.onChange(sigCanvas.current.toDataURL())}
              {...props}
            />
            <Button
              variant="secondary"
              onClick={clearSignature}
              className="mt-2"
            >
              Clear
            </Button>
          </>
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

export default SignaturePad;
