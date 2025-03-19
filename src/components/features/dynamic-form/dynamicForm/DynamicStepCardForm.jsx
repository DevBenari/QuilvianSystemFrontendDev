"use client";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Card } from "react-bootstrap";
// Custom hooks
import useFormNavigation from "@/lib/hooks/form-field/useFormNavigation";
import useFilteredItems from "@/lib/hooks/form-field/useFilteredItems";
// Components
import StepsNavigation from "@/components/ui/stepNavigation";
import ButtonNav from "@/components/ui/button-navigation";

// Renderers
import FieldRenderer from "@/utils/renderers-field/fieldRenderers";
import StepRenderer from "@/utils/renderers-field/stepRenderer";
import ProgressIndicator from "@/components/ui/progressBar";
import FormAlert from "@/components/ui/formAlert";

const DynamicStepCardForm = ({
  title,
  formConfig,
  onSubmit,
  onFormSubmitted,
  backPath,
  isAddMode = false,
  sourceData = {},
  externalOptions = {},
  onFormMethodsReady,
  formType = "default",
  className,
  defaultValues = {},
  onCardSelect,
  customValidators = {},
  customFieldRenderers = {},
  useContainer = false, // New prop to control container rendering
}) => {
  const [isEditing, setIsEditing] = useState(isAddMode);
  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  useEffect(() => {
    if (onFormMethodsReady && typeof onFormMethodsReady === "function") {
      onFormMethodsReady(methods);
    }
  }, [methods, onFormMethodsReady]);

  const {
    getValues,
    watch,
    formState: { errors },
    handleSubmit: formSubmit,
    reset,
    control,
  } = methods;

  const watchedValues = methods.watch();

  // Custom hook for filtered items based on form type
  const { filteredItems } = useFilteredItems({
    formType,
    watchedValues,
    sourceData,
    control,
  });

  // Alert message handler
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Navigation hook
  const {
    currentStep,
    completedSteps,
    progress,
    handleNext,
    handlePrevious,
    navigateToStep,
    validateCurrentStep,
  } = useFormNavigation({
    steps: formConfig,
    methods,
    getValues,
    showAlertMessage,
    customValidators,
    formType,
  });

  // Form action handlers
  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    navigateToStep(0);
    reset();
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    if (onFormSubmitted) onFormSubmitted(data);
    onSubmit(data);
  };

  // Check if field should be hidden
  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(watchedValues);
    }
    return field.hide;
  };

  // Form content that will be rendered with or without container
  const formContent = (
    <Row className="justify-content-center mt-5">
      <Col xs={12}>
        <Card className={`main-card  ${className || ""}`}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">{title}</h4>
            <ButtonNav
              className="btn btn-secondary"
              label="Kembali"
              path={backPath}
              icon="ri-arrow-left-line"
            />
          </Card.Header>
          <Card.Body>
            <FormAlert
              showAlert={showAlert}
              alertMessage={alertMessage}
              onClose={() => setShowAlert(false)}
            />

            <ProgressIndicator progress={progress} />

            <StepsNavigation
              steps={formConfig}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepSelect={navigateToStep}
            />

            <Form onSubmit={formSubmit(handleFormSubmit)}>
              <div className="step-content">
                <h3 className="step-title mb-4">
                  Step {currentStep + 1}: {formConfig[currentStep].section}
                </h3>
                {/* Render the current step */}
                <StepRenderer
                  step={formConfig[currentStep]}
                  methods={methods}
                  filteredItems={filteredItems}
                  formType={formType}
                  currentStep={currentStep}
                  shouldHideField={shouldHideField}
                  customFieldRenderers={customFieldRenderers}
                  onCardSelect={onCardSelect}
                  isEditing={isEditing}
                  className={className}
                />

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <i className="ri-arrow-left-line me-1"></i> Previous
                  </button>

                  {currentStep === formConfig.length - 1 ? (
                    (isAddMode || isEditing) && (
                      <button type="submit" className="btn btn-success">
                        <i className="ri-check-line me-1"></i> Submit
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => handleNext(e)}
                    >
                      Next <i className="ri-arrow-right-line ms-1"></i>
                    </button>
                  )}
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <FormProvider {...methods}>
      {formContent}
    </FormProvider>
  );
};

export default DynamicStepCardForm;