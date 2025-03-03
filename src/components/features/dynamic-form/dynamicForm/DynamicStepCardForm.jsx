"use client";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Card, ProgressBar, Container } from "react-bootstrap";
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
  doctorsData,
  externalOptions = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(isAddMode);
  const [submittedData, setSubmittedData] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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

  const methods = useForm({
    defaultValues: {
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
    },
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
    control
  } = methods;

  const watchedValues = watch();

  // External options handling
  const { titles = [] } = externalOptions;
  const currentJenisKelamin = useWatch({ control: methods.control, name: "jenisKelamin" });
  const titlesId = useWatch({ control: methods.control, name: "titlesId" });
  
  // Watch for poli changes to filter doctors
  const selectedPoli = useWatch({ control: methods.control, name: "selectedPoli" });

  // Update filtered doctors when poli changes
  useEffect(() => {
    if (selectedPoli && doctorsData && doctorsData[selectedPoli]) {
      setFilteredDoctors(doctorsData[selectedPoli]);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedPoli, doctorsData]);

  // Effect for title and gender
  useEffect(() => {
    const titleLabel = titles.find(option => option.value === titlesId)?.label;
    let newJenisKelamin = "";
    if (["Tn", "Mr"].includes(titleLabel)) {
      newJenisKelamin = "Laki-Laki";
    } else if (["Mrs", "Ny", "Nn"].includes(titleLabel)) {
      newJenisKelamin = "Perempuan";
    }
  
    if (newJenisKelamin !== currentJenisKelamin) {
      setValue("jenisKelamin", newJenisKelamin, { shouldValidate: true });
    }
  }, [titlesId, currentJenisKelamin, setValue, titles]);

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

    if (type === "custom" && typeof customRender === "function") {
      return (
        <Col md={colSize || 12} key={id || name} className={className}>
          {customRender({ field, commonProps, methods })}
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
      fieldNames = [...fieldNames, ...currentStepData.fields
        .filter(field => !shouldHideField(field))
        .map(field => field.name)];
    }

    // Add card field names if any
    if (currentStepData.cards) {
      // Validate that a card has been selected if it's required
      const cardGroup = currentStepData.cards[0];
      if (cardGroup && cardGroup.required && !getValues(cardGroup.name)) {
        showAlertMessage(`Please select ${cardGroup.title || cardGroup.name} first.`);
        return false;
      }
      
      fieldNames = [...fieldNames, ...currentStepData.cards.map(card => card.name)];
    }

    const isValid = await trigger(fieldNames);
    return isValid;
  };

  const handleNext = async (e) => {
    // Tambahkan ini untuk memastikan form tidak di-submit
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
    onFormSubmitted?.(data);
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
      customRender
    } = cardGroup;

    // If the card group has a custom render function, use it
    if (typeof customRender === "function") {
      return customRender({ field: cardGroup, methods });
    }

    // For doctor selection, populate options with filtered doctors
    let cardOptions = options;
    if (name === "selectedDoctor" && filteredDoctors.length > 0) {
      cardOptions = filteredDoctors.map(doctor => ({
        value: doctor.id,
        label: doctor.name,
        icon: "👨‍⚕️",
        subtitle: "Jadwal Praktik:",
        description: doctor.schedule
      }));
    }

    const selectedValue = watch(name);

    return (
      <>
        {title && <h5 className="mb-3">{title}</h5>}
        {description && <p className="mb-3">{description}</p>}
        
        {/* Special case for doctor selection */}
        {name === "selectedDoctor" && !selectedPoli && (
          <div className="alert alert-warning">Silakan pilih poli terlebih dahulu.</div>
        )}
        
        {name === "selectedDoctor" && selectedPoli && filteredDoctors.length === 0 && (
          <div className="alert alert-danger">Tidak ada dokter yang tersedia untuk poli ini.</div>
        )}
        
        {/* If it's not doctor selection or if doctors are available, show cards */}
        {(name !== "selectedDoctor" || (selectedPoli && filteredDoctors.length > 0)) && (
          <Row>
            {cardOptions.map((option) => (
              <Col 
                xs={12} 
                md={6} 
                lg={colSize} 
                key={`${name}-${option.value}`}
              >
                <Card 
                  className={`selection-card mb-3 cursor-pointer ${selectedValue === option.value ? 'selected shadow-lg border-primary' : ''}`}
                  onClick={() => handleCardSelect(name, option.value, option.additionalData)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="text-center p-4">
                    {option.icon && <div className="card-icon mb-3">{option.icon}</div>}
                    <Card.Title>{option.label}</Card.Title>
                    {option.subtitle && <Card.Subtitle className="mb-2 text-muted">{option.subtitle}</Card.Subtitle>}
                    {option.description && <Card.Text>{option.description}</Card.Text>}
                    {option.content && option.content}
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

  // Render steps navigation component
  const renderStepsNavigation = () => {
    return (
      <Row className="justify-content-center mb-4">
        {steps.map((step, idx) => (
          <Col key={`step-${idx}`} xs={12} md={2} className="mb-3">
            <Card 
              className={`nav-card ${currentStep === idx ? 'active border-primary' : ''} ${completedSteps.includes(idx) ? 'completed bg-light' : ''}`}
              onClick={() => navigateToStep(idx)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <div className="nav-card-icon mb-2">{step.icon || `${idx + 1}`}</div>
                <div className="nav-card-title fw-bold">{step.section}</div>
                <div className="nav-card-subtitle small text-muted">{step.description}</div>
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
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                  </div>
                )}

                <ProgressBar now={progress} className="mb-4" variant="success" />
                
                {renderStepsNavigation()}

                <Form onSubmit={formSubmit(handleFormSubmit)}>
                  <div className="step-content mt-4">
                    <h3 className="step-title mb-4">Step {currentStep + 1}: {steps[currentStep].section}</h3>
                    
                    {/* Render card selection if available */}
                    {steps[currentStep].cards && steps[currentStep].cards.map((cardGroup, idx) => (
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