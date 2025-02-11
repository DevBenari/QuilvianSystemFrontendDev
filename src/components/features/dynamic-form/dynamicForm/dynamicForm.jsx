"use client";
import React, { useEffect, useState, memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import RadioInput from "@/components/ui/radio-input";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import ToggleCustom from "@/components/ui/ToggleCustom";
import SliderInput from "@/components/ui/slider-input";
import RichTextEditor from "@/components/ui/rich-text-editor";
import SignaturePad from "@/components/ui//signature-canvas-input";
import TimeField from "@/components/ui/time-input";
import SearchableSelectField from "@/components/ui/select-field-search";
import ButtonNav from "@/components/ui/button-navigation";
import NumberField from "@/components/ui/distance-filed";

const DynamicForm = memo(
  ({ title, formConfig, onSubmit, backPath, isAddMode = false }) => {
    const fieldComponents = {
      text: TextField,
      email: TextField,
      select: SelectField,
      radio: RadioInput,
      date: DateInput,
      textarea: TextArea,
      file: UploadPhotoField,
      toggle: ToggleCustom,
      slider: SliderInput,
      richText: RichTextEditor,
      signature: SignaturePad,
      time: TimeField,
      number: NumberField,
      searchSelect: SearchableSelectField,
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
        colSize,
        ...otherProps // Capture all other props
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
          <TextField
            key={id}
            {...commonProps}
            type="email" // Ensure the type is set to "email"
          />
        );
      }

      // Remove any props that are not necessary for the DOM, like `hide`
      const sanitizedProps = { ...commonProps, ...otherProps };
      delete sanitizedProps.hide;

      if (customRender) {
        return customRender({ key: id, ...sanitizedProps });
      }

      const Component = fieldComponents[field.type];
      if (!Component) {
        console.warn(`Unsupported field type: ${field.type}`);
        return null;
      }

      return (
        <Component
          key={id}
          {...sanitizedProps}
          options={options}
          rows={rows}
          control={methods.control}
          value={value}
          id={id}
          name={name}
          label={label}
          placeholder={placeholder}
          rules={rules}
          disabled={!isEditing || disabled} // Disabled jika bukan mode edit
          {...otherProps}
        />
      );
    };

    /**
     * DynamicForm Component
     * @param {Object} props
     * @param {string} props.title - Title for the form.
     * @param {Array<{section: string, fields: FormField[], layout?: "inline" | "default"}>} props.formConfig - Configuration for the form.
     * @param {(data: any) => void} props.onSubmit - Callback for form submission.
     */

    const [isEditing, setIsEditing] = useState(isAddMode); // Mulai editable jika add mode

    const methods = useForm({
      defaultValues: formConfig.reduce((defaults, section) => {
        section.fields.forEach((field) => {
          defaults[field.name] = field.value || "";
        });
        return defaults;
      }, {}),
      mode: "onSubmit", // Menangani validasi secara dinamis
    });

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    const {
      setValue,
      watch,
      formState: { errors },
      handleSubmit: formSubmit,
    } = methods;

    const kewarganegaraan = watch("kewarganegaraan");
    const negara = watch("negara");

    useEffect(() => {
      if (kewarganegaraan === "WNI") {
        setValue("negara", "Indonesia");
      } else if (kewarganegaraan === "WNA" && negara !== negara) {
        setValue("negara", negara);
      }
    }, [kewarganegaraan, negara, setValue]);

    const shouldHideField = (field) => {
      if (typeof field.hide === "function") {
        return field.hide(watch());
      }
      return field.hide;
    };

    return (
      <FormProvider {...methods}>
        <Row>
          <div className="iq-card pt-2">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h3 className="card-title tracking-wide">{title}</h3>
              </div>
              <div className="d-flex gap-2">
                <ButtonNav
                  className="btn btn-secondary"
                  label="Kembali"
                  path={backPath}
                  icon="ri-arrow-left-line"
                />
                {!isAddMode &&
                  !isEditing && ( // Hanya tampil jika bukan add mode dan belum edit
                    <Button className="btn btn-primary" onClick={handleEdit}>
                      <i className="ri-edit-2-line"></i>
                      Edit
                    </Button>
                  )}
                {!isAddMode &&
                  isEditing && ( // Tombol cancel hanya tampil di mode edit
                    <Button className="btn btn-danger" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
              </div>
            </div>
            <div className="card-body py-3">
              <Form onSubmit={formSubmit(onSubmit)}>
                {formConfig.map((section, index) => (
                  <div key={`section-${index}`} className="iq-card-header mt-3">
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
                        .filter((field) => !shouldHideField(field))
                        .map(({ colSize, ...field }, fieldIndex) => (
                          <Col key={field.id || fieldIndex} lg={colSize || 6}>
                            {renderField(field)}
                          </Col>
                        ))}
                    </Row>
                  </div>
                ))}
                {(isAddMode || isEditing) && ( // Tombol simpan hanya tampil di add mode atau mode edit
                  <Button type="submit" className="btn btn-primary m-3">
                    <i className="ri-save-line"></i>
                    Simpan
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </Row>
      </FormProvider>
    );
  }
);

DynamicForm.displayName = "DynamicForm";
export default DynamicForm;
