import { useState } from "react";

/**
 * Custom hook for managing registration steps
 * 
 * @param {Object} config - Configuration options
 * @returns {Object} - Step state and methods
 */
export const useRegistrationSteps = ({
  initialStep = 0
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return {
    currentStep,
    setCurrentStep
  };
};