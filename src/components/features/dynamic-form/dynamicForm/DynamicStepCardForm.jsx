// DynamicStepCardForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  ProgressBar,
  Container,
} from "react-bootstrap";
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

const DynamicStepCardForm = ({
  title,
  formConfig,
  onSubmit,
  onFormSubmitted,
  backPath,
  isAddMode = false,
  sourceData = {}, // Renamed from doctorsData to be more generic
  externalOptions = {},
  formType = "default", // New prop to identify the form type (e.g., "clinic", "lab", "pharmacy")
  defaultValues = {}, // Add defaultValues prop for form initialization
  onCardSelect, // Optional callback when a card is selected
  customValidators = {}, // Custom validation functions for different form types
  customFieldRenderers = {}, // Custom renderers for specific fields based on form type
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(isAddMode);
  const [submittedData, setSubmittedData] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [filteredItems, setFilteredItems] = useState({}); // Generic state for filtered items

  const steps = [...formConfig];

  // Standard field components mapping
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

  // Initialize form with default values
  const initialValues = {
    ...formConfig.reduce((defaults, section) => {
      // Handle fields in each section
      if (section.fields) {
        section.fields.forEach((field) => {
          defaults[field.name] = field.value || "";
        });
      }
      // Handle card options in each section
      if (section.cards) {
        section.cards.forEach((cardGroup) => {
          defaults[cardGroup.name] = cardGroup.value || "";
        });
      }
      return defaults;
    }, {}),
    ...defaultValues, // Override with provided default values
  };

  const methods = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
    handleSubmit: formSubmit,
    trigger,
    reset,
    control,
  } = methods;

  const watchedValues = watch();

  // FIX: Watch necessary fields directly in the component instead of using a helper function
  // Using the hook properly - call it at the component level
  const selectedPoli = useWatch({ control, name: "selectedPoli" });
  const pembayaran = useWatch({ control, name: "pembayaran" });
  const asuransiPasien = useWatch({ control, name: "asuransiPasien" });
  const labCategory = useWatch({ control, name: "labCategory" });
  const isUrgent = useWatch({ control, name: "isUrgent" });
  const medicationType = useWatch({ control, name: "medicationType" });
  const prescriptionRequired = useWatch({
    control,
    name: "prescriptionRequired",
  });

  // FIX: Group watched values by form type for cleaner code
  const watchedFilterValues = {
    clinic: { selectedPoli, pembayaran, asuransiPasien },
    lab: { labCategory, isUrgent },
    pharmacy: { medicationType, prescriptionRequired },
  };

  // Generic filter function that can be used for various use cases
  useEffect(() => {
    // Apply filters based on form type
    switch (formType) {
      case "clinic":
        if (selectedPoli && sourceData[selectedPoli]) {
          // Filter doctors based on poli and potentially insurance
          let filteredDoctors = sourceData[selectedPoli];

          // If insurance filtering is needed
          if (pembayaran === "asuransi" && asuransiPasien) {
            filteredDoctors = filteredDoctors.filter(
              (doctor) =>
                doctor.acceptedInsurances &&
                doctor.acceptedInsurances.includes(asuransiPasien)
            );
          }

          setFilteredItems((prevItems) => ({
            ...prevItems,
            doctors: filteredDoctors,
          }));
        }
        break;

      case "lab":
        if (labCategory && sourceData.labTests) {
          // Filter lab tests based on category
          const filteredTests = sourceData.labTests.filter(
            (test) => test.category === labCategory
          );

          // Additional filter for urgency if needed
          if (isUrgent !== undefined) {
            const urgentTests = filteredTests.filter(
              (test) => test.supportsUrgent === isUrgent
            );
            setFilteredItems((prevItems) => ({
              ...prevItems,
              labTests: urgentTests,
            }));
          } else {
            setFilteredItems((prevItems) => ({
              ...prevItems,
              labTests: filteredTests,
            }));
          }
        }
        break;

      case "pharmacy":
        if (medicationType && sourceData.medications) {
          // Filter medications by type
          const filteredMeds = sourceData.medications.filter(
            (med) => med.type === medicationType
          );

          // Filter by prescription requirement if needed
          if (prescriptionRequired !== undefined) {
            const prescriptionFiltered = filteredMeds.filter(
              (med) => med.requiresPrescription === prescriptionRequired
            );
            setFilteredItems((prevItems) => ({
              ...prevItems,
              medications: prescriptionFiltered,
            }));
          } else {
            setFilteredItems((prevItems) => ({
              ...prevItems,
              medications: filteredMeds,
            }));
          }
        }
        break;

      default:
        // For custom form types, use the source data as is or apply custom filters
        if (sourceData) {
          setFilteredItems(sourceData);
        }
        break;
    }
  }, [selectedPoli]); // FIX: Properly list all dependencies explicitly

  // Show alert message
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
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
      customRender,
      colSize,
      hide,
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

    // Check if there's a custom renderer for this field based on formType
    if (customFieldRenderers[formType]?.[name]) {
      return (
        <Col md={colSize || 12} key={id || name} className={className}>
          {customFieldRenderers[formType][name]({
            field,
            commonProps,
            methods,
            filteredItems,
          })}
        </Col>
      );
    }

    // Use the field's custom render if provided
    if (type === "custom" && typeof customRender === "function") {
      return (
        <Col md={colSize || 12} key={id || name} className={className}>
          {customRender({ field, commonProps, methods, filteredItems })}
        </Col>
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
        {...otherProps}
      />
    );
  };

  // Handle validation for the current step
  const validateCurrentStep = async () => {
    const currentStepData = steps[currentStep];
    let fieldNames = [];

    // Collect field names to validate
    if (currentStepData.fields) {
      fieldNames = [
        ...fieldNames,
        ...currentStepData.fields
          .filter((field) => !shouldHideField(field))
          .map((field) => field.name),
      ];
    }

    // Add card field names if any
    if (currentStepData.cards) {
      // Validate that a card has been selected if it's required
      const cardGroup = currentStepData.cards[0];
      if (cardGroup && cardGroup.required && !getValues(cardGroup.name)) {
        showAlertMessage(
          `Please select ${cardGroup.title || cardGroup.name} first.`
        );
        return false;
      }

      fieldNames = [
        ...fieldNames,
        ...currentStepData.cards.map((card) => card.name),
      ];
    }

    // Use custom validator for this form type and step if available
    if (customValidators[formType]?.[currentStep]) {
      const customValidation = await customValidators[formType][currentStep]({
        values: getValues(),
        fieldNames,
        showAlertMessage,
      });

      if (customValidation === false) {
        return false;
      }
    }

    const isValid = await trigger(fieldNames);
    return isValid;
  };

  const handleNext = async (e) => {
    // Prevent form submission
    if (e) e.preventDefault();

    const isValid = await validateCurrentStep();

    if (isValid) {
      // Mark the current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
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
    reset();
  };

  // Handle direct navigation to a step
  const navigateToStep = async (stepIndex) => {
    // Only validate if going forward
    if (stepIndex > currentStep) {
      const isCurrentStepValid = await validateCurrentStep();
      if (!isCurrentStepValid) {
        return false;
      }
    }

    setCurrentStep(stepIndex);
    return true;
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    if (onFormSubmitted) onFormSubmitted(data);
    onSubmit(data);
  };

  // Handle card selection
  const handleCardSelect = (cardGroupName, cardValue, additionalData = {}) => {
    setValue(cardGroupName, cardValue);

    // Set additional data if provided
    if (Object.keys(additionalData).length > 0) {
      Object.entries(additionalData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }

    // Call external onCardSelect handler if provided
    if (onCardSelect) {
      onCardSelect({
        formType,
        cardGroupName,
        cardValue,
        additionalData,
        setValues: setValue,
        getValues,
        methods,
      });
    }

    // Trigger validation for the field
    trigger(cardGroupName);
  };

  // Check if field should be hidden
  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(watchedValues);
    }
    return field.hide;
  };

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Render card selection component
  const renderCardSelection = (cardGroup) => {
    const {
      name,
      title,
      description,
      options,
      colSize = 4,
      required = false,
      customRender,
      filterSource,
      filterField,
      noOptionsMessage,
    } = cardGroup;

    // If the card group has a custom render function, use it
    if (typeof customRender === "function") {
      return customRender({ field: cardGroup, methods, filteredItems });
    }

    // Determine which options to display based on filtering
    let cardOptions = options;

    // Use either the specified filterSource or look for a sensible default based on name
    if (filterSource && filteredItems[filterSource]) {
      // Map source items to the expected card options format
      cardOptions = filteredItems[filterSource].map((item) => ({
        value: item.id,
        label: item.name,
        icon: item.icon || getDefaultIcon(filterSource),
        subtitle: item.subtitle || "",
        description: item.description || "",
        additionalData: item.additionalData || {},
      }));
    }
    // Special handling for common names when filterSource isn't specified
    else if (name === "selectedDoctor" && filteredItems.doctors) {
      cardOptions = filteredItems.doctors.map((doctor) => ({
        value: doctor.id,
        label: doctor.name,
        icon: "👨‍⚕️",
        subtitle: "Jadwal Praktik:",
        description: doctor.schedule || "",
        additionalData: { acceptedInsurances: doctor.acceptedInsurances || [] },
      }));
    } else if (name === "selectedLabTest" && filteredItems.labTests) {
      cardOptions = filteredItems.labTests.map((test) => ({
        value: test.id,
        label: test.name,
        icon: "🧪",
        subtitle: "Estimasi Waktu:",
        description: test.processingTime || "",
        additionalData: {
          price: test.price,
          requiresFasting: test.requiresFasting,
        },
      }));
    }

    // Generate a no options message based on the context
    const generateNoOptionsMessage = () => {
      if (noOptionsMessage) return noOptionsMessage;

      switch (formType) {
        case "clinic":
          if (name === "selectedDoctor" && !selectedPoli) {
            return "Silakan pilih poli terlebih dahulu.";
          } else if (name === "selectedDoctor" && selectedPoli) {
            return "Tidak ada dokter yang tersedia untuk poli ini.";
          }
          break;
        case "lab":
          if (name === "selectedLabTest" && !labCategory) {
            return "Silakan pilih kategori pemeriksaan terlebih dahulu.";
          } else {
            return "Tidak ada tes lab yang tersedia untuk kategori ini.";
          }
          break;
        default:
          return "Tidak ada pilihan yang tersedia.";
      }
    };

    const selectedValue = watch(name);

    // Determine if we need to show a filter-dependent warning
    const shouldShowFilterWarning = () => {
      if (name === "selectedDoctor" && !selectedPoli) {
        return true;
      }
      if (name === "selectedLabTest" && !labCategory) {
        return true;
      }
      return false;
    };

    // Determine if we need to show a "no options" warning
    const shouldShowNoOptionsWarning = () => {
      if (filterSource && filteredItems[filterSource]?.length === 0) {
        return true;
      }
      if (
        name === "selectedDoctor" &&
        selectedPoli &&
        filteredItems.doctors?.length === 0
      ) {
        return true;
      }
      if (
        name === "selectedLabTest" &&
        labCategory &&
        filteredItems.labTests?.length === 0
      ) {
        return true;
      }
      return false;
    };

    return (
      <>
        {title && <h5 className="mb-3">{title}</h5>}
        {description && <p className="mb-3">{description}</p>}

        {/* Show filter-dependent warning if necessary */}
        {shouldShowFilterWarning() && (
          <div className="alert alert-warning">
            {generateNoOptionsMessage()}
          </div>
        )}

        {/* Show "no options" warning if necessary */}
        {!shouldShowFilterWarning() && shouldShowNoOptionsWarning() && (
          <div className="alert alert-danger">{generateNoOptionsMessage()}</div>
        )}

        {/* If we have options to show, display the cards */}
        {!shouldShowFilterWarning() &&
          !shouldShowNoOptionsWarning() &&
          cardOptions &&
          cardOptions.length > 0 && (
            <Row>
              {cardOptions.map((option) => (
                <Col
                  xs={12}
                  md={6}
                  lg={colSize}
                  key={`${name}-${option.value}`}
                >
                  <Card
                    className={`selection-card mb-3 cursor-pointer ${
                      selectedValue === option.value
                        ? "selected shadow-lg border-primary"
                        : ""
                    }`}
                    onClick={() =>
                      handleCardSelect(
                        name,
                        option.value,
                        option.additionalData
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Body className="text-center p-4">
                      {option.icon && (
                        <div className="card-icon mb-3">{option.icon}</div>
                      )}
                      <Card.Title>{option.label}</Card.Title>
                      {option.subtitle && (
                        <Card.Subtitle className="mb-2 text-muted">
                          {option.subtitle}
                        </Card.Subtitle>
                      )}
                      {option.description && (
                        <Card.Text>{option.description}</Card.Text>
                      )}
                      {option.content && option.content}
                      {option.badge && (
                        <div
                          className={`mt-2 badge ${
                            option.badge.className || "bg-info text-white"
                          }`}
                        >
                          {option.badge.text}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

        {required && !selectedValue && errors[name] && (
          <div className="text-danger mb-3">Please select {title || name}</div>
        )}
      </>
    );
  };

  // Helper function to get default icon based on entity type
  const getDefaultIcon = (entityType) => {
    const icons = {
      doctors: "👨‍⚕️",
      labTests: "🧪",
      medications: "💊",
      services: "🏥",
      products: "📦",
    };
    return icons[entityType] || "📋";
  };

  // Render steps navigation component
  const renderStepsNavigation = () => {
    return (
      <Row className="justify-content-center mb-4">
        {steps.map((step, idx) => (
          <Col key={`step-${idx}`} xs={12} md={2} className="mb-3">
            <Card
              className={`nav-card ${
                currentStep === idx ? "active border-primary" : ""
              } ${completedSteps.includes(idx) ? "completed bg-light" : ""}`}
              onClick={() => navigateToStep(idx)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body className="text-center">
                <div className="nav-card-icon mb-2">
                  {step.icon || `${idx + 1}`}
                </div>
                <div className="nav-card-title fw-bold">{step.section}</div>
                <div className="nav-card-subtitle small text-muted">
                  {step.description}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <FormProvider {...methods}>
      <Container fluid>
        <Row className="justify-content-center py-4">
          <Col xs={12}>
            <Card className="main-card mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="m-0">{title}</h4>
                <div className="d-flex gap-2">
                  {backPath && (
                    <ButtonNav
                      className="btn btn-secondary"
                      label="Back"
                      path={backPath}
                      icon="ri-arrow-left-line"
                    />
                  )}
                  {!isAddMode && !isEditing && (
                    <Button variant="primary" onClick={handleEdit}>
                      <i className="ri-edit-2-line me-1"></i> Edit
                    </Button>
                  )}
                  {!isAddMode && isEditing && (
                    <Button variant="danger" onClick={handleCancel}>
                      <i className="ri-close-line me-1"></i> Cancel
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {showAlert && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {alertMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowAlert(false)}
                    ></button>
                  </div>
                )}

                <ProgressBar
                  now={progress}
                  className="mb-4"
                  variant="success"
                />

                {renderStepsNavigation()}

                <Form onSubmit={formSubmit(handleFormSubmit)}>
                  <div className="step-content mt-4">
                    <h3 className="step-title mb-4">
                      Step {currentStep + 1}: {steps[currentStep].section}
                    </h3>

                    {/* If the step has a custom render function, use it */}
                    {steps[currentStep].customStepRender ? (
                      steps[currentStep].customStepRender({
                        methods,
                        filteredItems,
                        formType,
                        step: steps[currentStep],
                        currentStep,
                        renderCardSelection,
                        renderField,
                      })
                    ) : (
                      <>
                        {/* Render card selection if available */}
                        {steps[currentStep].cards &&
                          steps[currentStep].cards.map((cardGroup, idx) => (
                            <div key={`card-group-${idx}`} className="mb-4">
                              {renderCardSelection(cardGroup)}
                            </div>
                          ))}

                        {/* Render regular fields */}
                        {steps[currentStep].fields && (
                          <Row>
                            {steps[currentStep].fields
                              .filter((field) => !shouldHideField(field))
                              .map(({ colSize, ...field }, index) => (
                                <Col key={field.id || index} lg={colSize || 6}>
                                  {renderField(field)}
                                </Col>
                              ))}
                          </Row>
                        )}
                      </>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                      >
                        <i className="ri-arrow-left-line me-1"></i> Previous
                      </Button>

                      {currentStep === steps.length - 1 ? (
                        (isAddMode || isEditing) && (
                          <Button type="submit" variant="success">
                            <i className="ri-check-line me-1"></i> Submit
                          </Button>
                        )
                      ) : (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={(e) => handleNext(e)}
                        >
                          Next <i className="ri-arrow-right-line ms-1"></i>
                        </Button>
                      )}
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </FormProvider>
  );
};

export default DynamicStepCardForm;
