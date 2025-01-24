"use client";

import React, { useEffect } from "react";
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
import SignaturePad from "@/components/ui/signature-canvas-input";
import TimeField from "@/components/ui/time-input";
import SearchableSelectField from "@/components/ui/select-field-search";
import NumberField from "@/components/ui/distance-filed";

const DynamicFormEditAdd = ({ title, formConfig, onSubmit, backPath }) => {
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

  const methods = useForm({
    defaultValues: formConfig.reduce((defaults, section) => {
      section.fields.forEach((field) => {
        defaults[field.name] = field.value || "";
      });
      return defaults;
    }, {}),
    mode: "onChange", // Validasi dilakukan secara dinamis
  });

  const {
    setValue,
    watch,
    formState: { errors },
  } = methods;

  /**
   * Fungsi untuk merender setiap field berdasarkan konfigurasi
   */
  const renderField = (field) => {
    const {
      id,
      name,
      type,
      label,
      placeholder,
      rules,
      className = "mb-3",
      value,
      onChange,
      options,
      rows,
      readOnly = false,
      disabled = false,
      customRender,
      ...otherProps
    } = field;

    const commonProps = {
      id,
      name,
      label,
      placeholder,
      className,
      value: watch(name) || "", // Sinkronisasi nilai dengan react-hook-form
      readOnly,
      disabled,
      onChange: (e) => {
        setValue(name, e.target.value); // Perbarui nilai di react-hook-form
        onChange?.(e); // Panggil handler custom jika ada
      },
      ...otherProps,
    };

    if (customRender) {
      return customRender({ key: id, ...commonProps });
    }

    const Component = fieldComponents[type];
    if (!Component) {
      console.warn(`Unsupported field type: ${type}`);
      return null;
    }

    return (
      <Component
        key={id}
        {...commonProps}
        options={options} // Untuk select, radio, dll.
        rows={rows} // Untuk textarea
      />
    );
  };

  /**
   * Logika untuk menyembunyikan field secara dinamis
   */
  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(watch());
    }
    return field.hide;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Form data submitted:", data);
    }
  };

  return (
    <FormProvider {...methods}>
      <Row>
        <div className="iq-card pt-2">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className="card-title tracking-wide">{title}</h3>
            </div>
            {backPath && (
              <Button
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                Kembali
              </Button>
            )}
          </div>
          <div className="card-body">
            <Form onSubmit={methods.handleSubmit(handleSubmit)}>
              {formConfig.map((section, sectionIndex) => (
                <div key={`section-${sectionIndex}`} className="mb-4">
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
                        <Col
                          key={field.id || fieldIndex}
                          lg={field.colSize || 6}
                        >
                          {field.customRender
                            ? field.customRender({
                                methods,
                                watchValues: watch(),
                              })
                            : renderField(field)}
                        </Col>
                      ))}
                  </Row>
                </div>
              ))}
              <Button type="submit" className="btn btn-primary my-3 mx-3">
                Simpan Data
              </Button>
            </Form>
          </div>
        </div>
      </Row>
    </FormProvider>
  );
};

export default DynamicFormEditAdd;
