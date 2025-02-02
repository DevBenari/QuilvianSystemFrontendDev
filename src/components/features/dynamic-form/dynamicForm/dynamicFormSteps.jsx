import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const DynamicStepForm = ({ formConfig, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const totalSteps = formConfig.length;

  const handleInputChange = (sectionIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field.name]: value
    }));
  };

  const validateStep = (stepIndex) => {
    const currentSection = formConfig[stepIndex - 1];
    const requiredFields = currentSection.fields.filter(field => field.rules?.required);
    
    for (const field of requiredFields) {
      if (!formData[field.name]) {
        setError(`${field.label || field.name} is required`);
        return false;
      }
    }
    
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderField = (field, sectionIndex) => {
    const { type, name, label, placeholder, options, rules } = field;

    switch (type) {
      case 'select':
        return (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
              name={name}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(sectionIndex, field, e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{placeholder}</option>
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'textarea':
        return (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <textarea
              name={name}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(sectionIndex, field, e.target.value)}
              placeholder={placeholder}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        );

      default:
        return (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(sectionIndex, field, e.target.value)}
              placeholder={placeholder}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {formConfig[currentStep - 1].section}
          </CardTitle>
          <div className="text-center text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {formConfig[currentStep - 1].fields.map((field, index) =>
                renderField(field, currentStep - 1)
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="text-lg h-12 px-8"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            className="text-lg h-12 px-8 ml-auto"
          >
            {currentStep === totalSteps ? 'Submit' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DynamicStepForm; 