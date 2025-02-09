"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Form, Button, ProgressBar} from "react-bootstrap";
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
import ButtonNav from "@/components/ui/button-navigation";
import NumberField from "@/components/ui/distance-filed";

const DynamicStepForm = ({ title, formConfig, onSubmit,onFormSubmited, backPath, isAddMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(isAddMode);
  const [submittedData, setSubmittedData] = useState(null);

  const steps = [
    // { section: "Main Information", fields: mainFields },
    ...formConfig,
  ];

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
    defaultValues: {
      ...formConfig.reduce((defaults, section) => {
        section.fields.forEach((field) => {
          defaults[field.name] = field.value || "";
        });
        return defaults;
      }, {}),
    },
    mode: "onChange",
  });

  const {
    setValue,
    watch,
    formState: { errors },
    handleSubmit: formSubmit,
    trigger,
  } = methods;

  const titles = watch("titleId");
  const statusKewarganegaraan = watch("statusKewarganegaraan");
  const kewarganegaraan = watch("kewarganegaraan");

  useEffect(() => {
    if (["Tn", "Mr", "Mrs"].includes(titles)) {
      setValue("jenisKelamin", "Laki-Laki");
    } else if (["Mrs", "Miss", "Ny", "Nn"].includes(titles)) {
      setValue("jenisKelamin", "Perempuan");
    } else {
      setValue("jenisKelamin", "");
    }
  }, [titles, setValue]);

  useEffect(() => {
    if (statusKewarganegaraan === "WNI") {
      setValue("kewarganegaraan", "Indonesia");
    } else if (statusKewarganegaraan === "WNA" && kewarganegaraan !== kewarganegaraan) {
      setValue("kewarganegaraan", kewarganegaraan);
    }
  }, [statusKewarganegaraan, kewarganegaraan, setValue]);

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
      customRender,
      colSize,
      hide,  // Exclude `hide` from being passed to the component
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
  
    if (type === "custom" && typeof customRender === "function") {
      return (
        <div key={id} className={className}>
          {customRender({ field, commonProps, methods })}
        </div>
      );
    }
  
    const Component = fieldComponents[field.type];
    if (!Component) {
      console.warn(`Unsupported field type: ${field.type}`);
      return null;
    }
  
    return (
      <Component
        key={id}
        {...commonProps}
        options={options}
        rows={rows}
        control={methods.control}
        value={value}
        disabled={!isEditing || disabled}
        {...otherProps}  // Pass other props except `hide`
      />
    );
  };
  

  const handleNext = async () => {
    const currentFields = steps[currentStep].fields.map(field => field.name);
    const isValid = await trigger(currentFields);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentStep(0);
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    onFormSubmited?.(data)
    onSubmit(data);
  };

  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(watch());
    }
    return field.hide;
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  

  return (
    <FormProvider {...methods}>
      <Row className=" iq-card p-2 mx-3 my-3 rounded" style={{boxShadow: "0px 0px 30px rgba(154, 247, 203, 0.93)"}}>
        <div className="iq-card p-2 mt-5">
        <div className="iq-card-header gap-1 d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className=" ">{title}</h3>
            </div>
            <div className="d-flex gap-2">
              <ButtonNav
                className="btn btn-secondary"
                label="Kembali"
                path={backPath}
                icon="ri-arrow-left-line"
              />
              {!isAddMode && !isEditing && ( // Hanya tampil jika bukan add mode dan belum edit
                <Button className="btn btn-primary" onClick={handleEdit}>
                  <i className="ri-edit-2-line"></i>
                  Edit
                </Button>
              )}
              {!isAddMode && isEditing && ( // Tombol cancel hanya tampil di mode edit
                <Button className="btn btn-danger" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="card-body p-3">
            <ProgressBar now={progress} className="mb-4" />
            <h4 className="mb-4">Step {currentStep + 1}: {steps[currentStep].section}</h4>

            <Form onSubmit={formSubmit(handleFormSubmit)}>
              <Row>
                {steps[currentStep].fields
                  .filter((field) => !shouldHideField(field))
                  .map(({ colSize, ...field }, index) => (
                    <Col key={field.id || index} lg={colSize || 6}>
                      {renderField(field)}
                    </Col>
                  ))}
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button type="button" className="btn btn-secondary" onClick={handlePrevious} disabled={currentStep === 0}>
                  <i className="ri-arrow-left-line me-2"></i> Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  (isAddMode || isEditing) && (
                    <Button type="submit" className="btn btn-primary">
                      <i className="ri-save-line me-2"></i> Submit
                    </Button>
                  )
                ) : (
                  <Button className="btn btn-primary" onClick={handleNext}>
                    Next <i className="ri-arrow-right-line ms-2"></i>
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </FormProvider>
  );
};

export default DynamicStepForm;
