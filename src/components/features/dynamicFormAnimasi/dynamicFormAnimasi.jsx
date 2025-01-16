"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Form, Button, Offcanvas } from "react-bootstrap";
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
import { motion } from "framer-motion";
import SearchableSelectField from "@/components/ui/select-field-search";
import ButtonNav from "@/components/ui/button-navigation";
import { DevTools } from "@hookform/devtools";
import NumberField from "@/components/ui/distance-filed";

const DynamicFormAnimasi = ({ title, formConfig, onSubmit }) => {
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

  const [showPanel, setShowPanel] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleShowPanel = (sectionIndex) => {
    setActiveSection(sectionIndex);
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setActiveSection(null);
  };

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
      motion: motionProps,
      customRender,
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

    const sanitizedProps = { ...commonProps, ...otherProps }; // Mendefinisikan sanitizedProps
    delete sanitizedProps.hide;

    if (customRender) {
      return customRender({ key: id, handleShowPanel, ...sanitizedProps });
    }

    const Component = fieldComponents[type];
    if (!Component) {
      console.warn(`Unsupported field type: ${type}`);
      return null;
    }

    const FieldWrapper = motionProps ? motion.div : "div";

    return (
      <FieldWrapper key={id} {...motionProps} className={className}>
        <Component
          {...sanitizedProps}
          options={options}
          rows={rows}
          control={methods.control}
        />
      </FieldWrapper>
    );
  };

  const methods = useForm({
    defaultValues: formConfig.reduce((defaults, section) => {
      section.fields.forEach((field) => {
        defaults[field.name] = field.value || "";
      });
      return defaults;
    }, {}),
    mode: "onSubmit",
  });

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
      return field.hide(methods.watch());
    }
    return field.hide;
  };

  return (
    <FormProvider {...methods}>
      <Row>
        <div className="iq-card" style={{ marginTop: "50px" }}>
          <div className="iq-card-header d-flex justify-content-between ">
            <div className="iq-header-title ">
              <h3 className="card-title tracking-wide">{title}</h3>
            </div>
            <div>
              <ButtonNav
                className="btn btn-primary mx-3 my-3"
                label="Kembali"
                path="/pendaftaran"
                icon="ri-arrow-left-line"
              />
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={methods.handleSubmit(handleSubmit)}>
              {formConfig.map((section, sectionIndex) => {
                const SectionWrapper = section.motion ? motion.div : "div";

                return (
                  <SectionWrapper
                    key={`section-${sectionIndex}`}
                    {...section.motion}
                    className="iq-card-header mt-3"
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
                        .filter((field) => !shouldHideField(field))
                        .map((field, fieldIndex) => (
                          <Col
                            key={field.id || fieldIndex}
                            lg={field.colSize || 6}
                          >
                            {renderField(field)}
                          </Col>
                        ))}
                    </Row>
                  </SectionWrapper>
                );
              })}
              <Button type="submit" className="btn btn-primary mx-3 my-3">
                Kirim
              </Button>
            </Form>
          </div>
        </div>
      </Row>

      <Offcanvas show={showPanel} onHide={handleClosePanel} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Detail {formConfig[activeSection]?.section}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {activeSection !== null &&
            formConfig[activeSection]?.fields.map((field, fieldIndex) => (
              <div key={`offcanvas-field-${fieldIndex}`}>
                {renderField(field)}
              </div>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </FormProvider>
  );
};

export default DynamicFormAnimasi;
