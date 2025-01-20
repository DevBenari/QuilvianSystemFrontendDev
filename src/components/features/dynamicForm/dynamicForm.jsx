"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import SearchableSelectField from "@/components/ui/select-field-search";
import RadioInput from "@/components/ui/radio-input";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import ToggleCustom from "@/components/ui/ToggleCustom";
import SliderInput from "@/components/ui/slider-input";
import RichTextEditor from "@/components/ui/rich-text-editor";
import SignaturePad from "@/components/ui//signature-canvas-input";
import TimeField from "@/components/ui/time-input";

const DynamicForm = ({ title, formConfig, onSubmit }) => {
  const fieldComponents = {
    text: TextField,
    email: TextField,
    select: SelectField,
    select_search: SearchableSelectField,
    radio: RadioInput,
    date: DateInput,
    textarea: TextArea,
    file: UploadPhotoField,
    toggle: ToggleCustom,
    slider: SliderInput,
    richText: RichTextEditor,
    signature: SignaturePad,
    time: TimeField,
  };

  // TypeScript types for form configuration
  /**
   * @typedef {Object} FormField
   * @property {string} id - Unique identifier for the field.
   * @property {string} name - Name of the field (used in form state).
   * @property {string} [label] - Label for the field.
   * @property {"text" | "select" | "radio" | "date" | "textarea"} type - Type of the field.
   * @property {string} [placeholder] - Placeholder text for the field.
   * @property {any} [value] - Default value for the field.
   * @property {Object} [rules] - Validation rules for the field.
   * @property {Array<{label: string, value: any}>} [options] - Options for select or radio fields.
   * @property {number} [colSize] - Bootstrap column size.
   * @property {boolean} [readOnly] - Whether the field is read-only.
   * @property {boolean} [disabled] - Whether the field is disabled.
   * @property {(e: any) => void} [onChange] - Custom onChange handler.
   * @property {(e: any) => void} [onClick] - Custom onClick handler.
   * @property {(props: any) => React.ReactNode} [customRender] - Custom render function for the field.
   */
  /**
   * Function to render a single form field based on its configuration.
   */
  const renderField = (field, index, sectionFields) => {
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
      customRender,
      breakAfter = false, // Add this new property
      ...otherProps
    } = field;

    const commonProps = {
      id,
      name,
      label,
      placeholder,
      rules,
      className,
      readOnly,
      value,
      disabled,
      ...(onChange ? { onChange } : {}),
      ...(onClick ? { onClick } : {}),
    };

    if (type === "email") {
      return (
        <React.Fragment key={id}>
          <TextField
            {...commonProps}
            type="email" // Ensure the type is set to "email"
          />
        </React.Fragment>
      );
    }

    const sanitizedProps = { ...commonProps, ...otherProps };
    delete sanitizedProps.hide;

    if (customRender) {
      return (
        <React.Fragment key={id}>
          {customRender({ key: id, ...sanitizedProps })}
        </React.Fragment>
      );
    }

    const Component = fieldComponents[field.type];
    if (!Component) {
      console.warn(`Unsupported field type: ${field.type}`);
      return null;
    }

    return (
      <React.Fragment key={id}>
        <Component {...sanitizedProps} options={options} rows={rows} />
      </React.Fragment>
    );
  };

  /**
   * DynamicForm Component
   * @param {Object} props
   * @param {string} props.title - Title for the form.
   * @param {Array<{section: string, fields: FormField[], layout?: "inline" | "default"}>} props.formConfig - Configuration for the form.
   * @param {(data: any) => void} props.onSubmit - Callback for form submission.
   */

  const methods = useForm({
    defaultValues: formConfig.reduce((defaults, section) => {
      section.fields.forEach((field) => {
        defaults[field.name] = field.value || "";
      });
      return defaults;
    }, {}),
    mode: "onSubmit",
  });
  const { watch } = methods;
  const handleSubmit = (data) => {
    try {
      if (onSubmit) {
        onSubmit(data);
      } else {
        console.log("Form data:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(watch());
    }
    return field.hide;
  };
  return (
    <FormProvider {...methods}>
      <Col lg="12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className="card-title tracking-wide">{title}</h3>
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={methods.handleSubmit(handleSubmit)}>
              {formConfig.map((section, sectionIndex) => (
                <div
                  key={`section-${sectionIndex}`}
                  className="iq-card-header m-1"
                >
                  {section.section && (
                    <div className="iq-header-title">
                      <h4 className="mb-3">{section.section}</h4>
                    </div>
                  )}
                  <Row
                    className={
                      section.layout === "inline"
                        ? "d-flex align-items-center"
                        : ""
                    }
                  >
                    {section.fields
                      .filter((field) => !shouldHideField(field)) // Filter out hidden fields
                      .map((field, fieldIndex) => (
                        <React.Fragment key={field.id || fieldIndex}>
                          <Col lg={field.colSize || 6}>
                            {field.customRender
                              ? field.customRender({
                                  methods,
                                  watchValues: watch(),
                                })
                              : renderField(field)}
                          </Col>
                          {field.breakAfter && <Col lg={12}></Col>}{" "}
                        </React.Fragment>
                      ))}
                  </Row>
                </div>
              ))}
              <Button type="submit" className="btn btn-primary mx-3 my-3">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Col>
    </FormProvider>
  );
};

export default DynamicForm;
