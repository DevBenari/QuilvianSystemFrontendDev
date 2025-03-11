"use client";
import React, { useEffect, useState, memo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, ProgressBar } from "react-bootstrap";
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

const DynamicStepForm = memo(
  ({
    title,
    userData,
    formConfig,
    onSubmit,
    onFormSubmited,
    backPath,
    isAddMode = false,
    handleDelete,
    externalOptions = {},
  }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isEditing, setIsEditing] = useState(isAddMode);
    const [submittedData, setSubmittedData] = useState(null);

    const steps = [...formConfig];

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

    // Initialize form with userData or default values
    const methods = useForm({
      defaultValues: formConfig.reduce((defaults, section) => {
        section.fields.forEach((field) => {
          // Try direct property access first
          if (userData && userData[field.name] !== undefined) {
            defaults[field.name] = userData[field.name];
          }
          // If not found directly, try case-insensitive matching
          else if (userData) {
            const userDataKeys = Object.keys(userData);
            const matchingKey = userDataKeys.find(
              (key) => key.toLowerCase() === field.name.toLowerCase()
            );

            if (matchingKey) {
              defaults[field.name] = userData[matchingKey];
            } else {
              // Ensure the value is never undefined
              defaults[field.name] =
                field.value !== undefined ? field.value : "";
            }
          } else {
            // Ensure the value is never undefined
            defaults[field.name] = field.value !== undefined ? field.value : "";
          }
        });
        return defaults;
      }, {}),
      mode: "onChange",
    });

    const {
      setValue,
      watch,
      reset,
      formState: { errors },
      handleSubmit: formSubmit,
      trigger,
      control,
    } = methods;

    // Update form when userData changes (imported from DynamicForm)
    useEffect(() => {
      if (userData) {
        console.log("Setting form with userData:", userData);
        const values = {};

        // Handle different property casing in API response
        formConfig.forEach((section) => {
          section.fields.forEach((field) => {
            // Check for direct match first
            if (userData[field.name] !== undefined) {
              values[field.name] = userData[field.name];
            }
            // Check for case-insensitive match (API returns camelCase, form expects PascalCase)
            else {
              // Try to find a matching property in userData regardless of case
              const userDataKeys = Object.keys(userData);
              const matchingKey = userDataKeys.find(
                (key) => key.toLowerCase() === field.name.toLowerCase()
              );

              if (matchingKey) {
                values[field.name] = userData[matchingKey];
              } else {
                // Ensure the value is never undefined
                values[field.name] =
                  field.value !== undefined ? field.value : "";
              }
            }
          });
        });

        console.log("Form values after mapping:", values);
        reset(values);
      }
    }, [userData, formConfig, reset]);

    // External options logic
    const { titles = [] } = externalOptions;
    const currentJenisKelamin = useWatch({ control, name: "jenisKelamin" });
    const titlesId = useWatch({ control, name: "titlesId" });
    const statusKewarganegaraan = watch("statusKewarganegaraan");
    const kewarganegaraan = watch("kewarganegaraan");

    useEffect(() => {
      const titleLabel = titles.find(
        (option) => option.value === titlesId
      )?.label;
      let newJenisKelamin = "";
      if (["Tn", "Mr"].includes(titleLabel)) {
        newJenisKelamin = "Laki-Laki";
      } else if (["Mrs", "Ny", "Nn"].includes(titleLabel)) {
        newJenisKelamin = "Perempuan";
      }

      if (newJenisKelamin !== currentJenisKelamin && newJenisKelamin) {
        setValue("jenisKelamin", newJenisKelamin, { shouldValidate: true });
      }
    }, [titlesId, currentJenisKelamin, setValue, titles]);

    useEffect(() => {
      if (statusKewarganegaraan === "WNI") {
        setValue("kewarganegaraan", "Indonesia");
      } else if (
        statusKewarganegaraan === "WNA" &&
        kewarganegaraan !== "Indonesia"
      ) {
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

      // For debugging
      // if (userData && userData[name]) {
      //   console.log(`Field ${name} has value in userData:`, userData[name]);
      // } else if (userData) {
      //   // Check if there's a case-insensitive match
      //   const userDataKeys = Object.keys(userData);
      //   const matchingKey = userDataKeys.find(
      //     (key) => key.toLowerCase() === name.toLowerCase()
      //   );
      //   if (matchingKey) {
      //     console.log(
      //       `Field ${name} matched with ${matchingKey}:`,
      //       userData[matchingKey]
      //     );
      //   }
      // }

      // Remove value and defaultValue from otherProps to prevent conflicts
      const { value, defaultValue, ...restProps } = otherProps;

      const commonProps = {
        id,
        name,
        label,
        placeholder,
        rules,
        className,
        readOnly: !isEditing || readOnly,
        disabled: !isEditing || disabled,
        control,
        // Ensure value is never undefined
        defaultValue: "",
        ...(onChange ? { onChange } : {}),
        ...(onClick ? { onClick } : {}),
      };

      if (type === "email") {
        return <TextField key={id} {...commonProps} type="email" />;
      }

      // For custom fields, ensure we have a non-undefined value
      if (type === "custom" && typeof customRender === "function") {
        // Special handling for custom components
        const fieldValue = watch(name);
        console.log(`Custom field ${name} current value:`, fieldValue);

        return customRender({
          key: id,
          field: {
            ...field,
            value: fieldValue !== undefined ? fieldValue : "",
          },
          commonProps: {
            ...commonProps,
            value: fieldValue !== undefined ? fieldValue : "",
          },
          methods,
        });
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
          {...restProps}
          options={options}
          rows={rows}
          // Ensure we never pass undefined as value
          value={watch(name) !== undefined ? watch(name) : ""}
        />
      );
    };

    const handleNext = async () => {
      const currentFields = steps[currentStep].fields
        .filter((field) => !shouldHideField(field))
        .map((field) => field.name);

      const isValid = await trigger(currentFields);

      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    };

    const handlePrevious = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setCurrentStep(0);
    };

    const handleFormSubmit = (data) => {
      setSubmittedData(data);
      if (onFormSubmited) onFormSubmited(data);
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
        <Row className="iq-card p-2 mx-3 my-5 rounded">
          <div className="iq-card p-2 mt-5">
            <div className="iq-card-header gap-1 d-flex justify-content-between">
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
                {!isAddMode && handleDelete && (
                  <Button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>
            </div>

            <div className="card-body p-3">
              <ProgressBar now={progress} className="mb-4" />
              <h4 className="mb-4">
                Step {currentStep + 1}: {steps[currentStep].section}
              </h4>

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
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <i className="ri-arrow-left-line me-2"></i> Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    (isAddMode || isEditing) && (
                      <Button type="submit" className="btn btn-primary">
                        <i className="ri-save-line me-2"></i> Simpan
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
  }
);

DynamicStepForm.displayName = "DynamicStepForm";
export default DynamicStepForm;
