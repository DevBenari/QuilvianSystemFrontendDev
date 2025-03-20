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
import Checkbox from "@/components/ui/check-box";
import NumberField from "@/components/ui/number-field";

const DynamicForm = memo(
  ({
    title,
    userData,
    formConfig,
    onSubmit,
    backPath,
    isAddMode = false,
    handleDelete,
  }) => {
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
      cekbox: Checkbox,
    };

    const [isEditing, setIsEditing] = useState(isAddMode);

    // Initialize form with initial values
    const methods = useForm({
      defaultValues: formConfig.reduce((defaults, section) => {
        section.fields.forEach((field) => {
          defaults[field.name] = userData?.[field.name] || "";
        });
        return defaults;
      }, {}),
    });

    // Update form when userData changes
    useEffect(() => {
      if (userData) {
        const values = {};
        formConfig.forEach((section) => {
          section.fields.forEach((field) => {
            values[field.name] = userData[field.name] || "";
          });
        });
        methods.reset(values);
      }
    }, [userData, formConfig, methods.reset]);

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
        disabled = false,
        onChange,
        onClick,
        options,
        rows,
        customRender,
        colSize,
        hide,

        ...otherProps
      } = field;

      // Remove value and defaultValue from otherProps to prevent conflicts
      const { value, defaultValue, ...restProps } = otherProps;

      const commonProps = {
        id,
        name,
        label,
        placeholder,
        rules,
        className,
        readOnly: !isEditing || false,
        disabled: !isEditing || disabled,
        control: methods.control,
        ...(onChange ? { onChange } : {}),
        ...(onClick ? { onClick } : {}),
      };

      if (type === "email") {
        return <TextField key={id} {...commonProps} type="email" />;
      }

      if (customRender) {
        return customRender({ key: id, ...commonProps });
      }

      const Component = fieldComponents[field.type];
      if (!Component) {
        console.warn(`Unsupported field type: ${field.type}`);
        return null;
      }

      const sanitizedProps = { ...commonProps, ...otherProps };
      delete sanitizedProps.hide;

      if (customRender) {
        return customRender({ key: id, ...sanitizedProps });
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
          methods={methods} // Pastikan methods dikirimkan
          {...otherProps}
        />
      );
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      if (userData) {
        const values = {};
        formConfig.forEach((section) => {
          section.fields.forEach((field) => {
            values[field.name] = userData[field.name] || "";
          });
        });
        methods.reset(values);
      }
    };

    const {
      setValue,
      watch,
      formState: { errors },
      handleSubmit: formSubmit,
    } = methods;

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
                {!isAddMode && !isEditing && (
                  <Button className="btn btn-primary" onClick={handleEdit}>
                    <i className="ri-edit-2-line"></i>
                    Edit
                  </Button>
                )}
                {!isAddMode && isEditing && (
                  <Button className="btn btn-warning" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
                {!isAddMode && (
                  <Button className="btn btn-danger" onClick={handleDelete}>
                    Delete
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
                {(isAddMode || isEditing) && (
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
