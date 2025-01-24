import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FormProvider, useForm, Controller } from "react-hook-form";
import TextField from "@/components/ui/text-field";
import NumberField from "@/components/ui/distance-filed";

const DynamicFormModal = ({
  show,
  onHide,
  title,
  formConfig,
  onSubmit,
  defaultValues = {},
  isEditMode,
}) => {
  const fieldComponents = {
    text: TextField,
    number: NumberField,
  };

  const methods = useForm({ defaultValues });

  const renderField = (field) => {
    const {
      id,
      name,
      label,
      placeholder,
      type,
      rules,
      className = "mb-3",
      readOnly = false,
      value,
      disabled = false,
      onChange,
      onClick,
      options,
      rows,
      date,
      customRender,
      ...otherProps // Capture all other props
    } = field;

    // Common properties shared across all field components
    const commonProps = {
      id,
      name,
      label,
      placeholder,
      className,
      readOnly,
      value,
      disabled,
      ...(onChange ? { onChange } : {}),
      ...(onClick ? { onClick } : {}),
    };

    // Sanitize props to avoid passing invalid attributes to DOM elements
    const sanitizedProps = { ...commonProps, ...otherProps };
    delete sanitizedProps.hide; // Remove unnecessary attributes
    delete sanitizedProps.errorMessage; // Ensure it doesn't go to DOM
    delete sanitizedProps.isInvalid; // Same for isInvalid

    // If a custom renderer is provided, use it
    if (customRender) {
      return customRender({ key: id, ...sanitizedProps });
    }

    // Determine the correct component based on field type
    const Component = fieldComponents[field.type];
    if (!Component) {
      console.warn(`Unsupported field type: ${field.type}`);
      return null;
    }

    // Render the component with Controller for react-hook-form integration
    return (
      <Controller
        key={name}
        name={name}
        control={methods.control}
        rules={rules}
        render={({ field: controllerField, fieldState: { error } }) => (
          <Component
            {...controllerField}
            {...sanitizedProps}
            options={options}
            rows={rows}
          />
        )}
      />
    );
  };

  return (
    <FormProvider {...methods}>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {formConfig.map((section, index) => (
              <div key={index} className="mb-4">
                {section.title && <h5>{section.title}</h5>}
                {section.fields.map((field) => renderField(field))}
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={onHide}>
                Batal
              </Button>
              <Button type="submit" variant="primary" className="ms-2">
                {isEditMode ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </FormProvider>
  );
};

export default DynamicFormModal;
