import { useState } from 'react';

/**
 * Hook to manage form navigation, step validation, and progress
 */
const useFormNavigation = ({
  steps,
  methods,
  getValues,
  showAlertMessage,
  customValidators,
  formType
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const { trigger } = methods;

  // Handle validation for the current step
  const validateCurrentStep = async () => {
    const currentStepData = steps[currentStep];
    let fieldNames = [];

    // Collect field names to validate
    if (currentStepData.fields) {
      fieldNames = [...fieldNames, ...currentStepData.fields
        .filter(field => {
          // Skip hidden fields in validation
          if (typeof field.hide === 'function') {
            return !field.hide(getValues());
          }
          return !field.hide;
        })
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

    // Use custom validator for this form type and step if available
    if (customValidators[formType]?.[currentStep]) {
      const customValidation = await customValidators[formType][currentStep]({
        values: getValues(),
        fieldNames,
        showAlertMessage
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

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    currentStep,
    completedSteps,
    progress,
    handleNext,
    handlePrevious,
    navigateToStep,
    validateCurrentStep
  };
};

export default useFormNavigation;