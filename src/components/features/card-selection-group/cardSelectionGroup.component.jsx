import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useWatch } from 'react-hook-form';

const CardSelectionGroup = ({
  cardGroup,
  methods,
  filteredItems,
  formType,
  onCardSelect,
  className
}) => {
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
    noOptionsMessage
  } = cardGroup;

  const { control, formState: { errors } } = methods;
   // Watch relevant filters
   const selectedPoli = useWatch({ control, name: "selectedPoli" });
   const labCategory = useWatch({ control, name: "labCategory" });
   const selectedValue = useWatch({ control, name: name });

  // If the card group has a custom render function, use it
  if (typeof customRender === "function") {
    return customRender({ field: cardGroup, methods, filteredItems });
  }

  // Determine which options to display based on filtering
  let cardOptions = options;
  
  // Use either the specified filterSource or look for a sensible default based on name
  if (filterSource && filteredItems[filterSource]) {
    // Map source items to the expected card options format
    cardOptions = filteredItems[filterSource].map(item => ({
      value: item.id,
      label: item.name,
      icon: item.icon || getDefaultIcon(filterSource),
      subtitle: item.subtitle || "",
      description: item.description || "",
      additionalData: item.additionalData || {}
    }));
  }
  // Special handling for common names when filterSource isn't specified
  else if (name === "selectedDoctor" && filteredItems.doctors) {
    cardOptions = filteredItems.doctors.map(doctor => ({
      value: doctor.id,
      label: doctor.name,
      icon: "👨‍⚕️",
      subtitle: "Jadwal Praktik:",
      description: doctor.schedule || "",
      additionalData: { acceptedInsurances: doctor.acceptedInsurances || [] }
    }));
  }
  else if (name === "selectedLabTest" && filteredItems.labTests) {
    cardOptions = filteredItems.labTests.map(test => ({
      value: test.id,
      label: test.name,
      icon: "🧪",
      subtitle: "Estimasi Waktu:",
      description: test.processingTime || "",
      additionalData: { price: test.price, requiresFasting: test.requiresFasting }
    }));
  }
  
  // Generate a no options message based on the context
  const generateNoOptionsMessage = () => {
    if (noOptionsMessage) return noOptionsMessage;
    
    switch(formType) {
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
    if (name === "selectedDoctor" && selectedPoli && filteredItems.doctors?.length === 0) {
      return true;
    }
    if (name === "selectedLabTest" && labCategory && filteredItems.labTests?.length === 0) {
      return true;
    }
    return false;
  };

  // Handle card selection
  const handleCardSelection = (cardValue, additionalData = {}) => {
    methods.setValue(name, cardValue);
    
    // Set additional data if provided
    if (Object.keys(additionalData).length > 0) {
      Object.entries(additionalData).forEach(([key, value]) => {
        methods.setValue(key, value);
      });
    }
    
    // Call external onCardSelect handler if provided
    if (onCardSelect) {
      onCardSelect({
        formType,
        cardGroupName: name,
        cardValue,
        additionalData,
        setValues: methods.setValue,
        getValues: methods.getValues,
        methods
      });
    }
    
    // Trigger validation for the field
    methods.trigger(name);
  };

  return (
    <>
      {title && <h5 className="mb-3">{title}</h5>}
      {description && <p className="mb-3">{description}</p>}
      
      {/* Show filter-dependent warning if necessary */}
      {shouldShowFilterWarning() && (
        <div className="alert alert-warning">{generateNoOptionsMessage()}</div>
      )}
      
      {/* Show "no options" warning if necessary */}
      {!shouldShowFilterWarning() && shouldShowNoOptionsWarning() && (
        <div className="alert alert-danger">{generateNoOptionsMessage()}</div>
      )}
      
      {/* If we have options to show, display the cards */}
      {!shouldShowFilterWarning() && !shouldShowNoOptionsWarning() && cardOptions && cardOptions.length > 0 && (
        <Row className='d-flex justify-content-center align-items-center'>
          {cardOptions.map((option) => (
            <Col 
              xs={12} 
              md={6} 
              lg={colSize} 
              key={`${name}-${option.value}`}
            >
              <Card 
                className={`selection-card mb-3 cursor-pointer border border-grey rounded-lg shadow-md  ${selectedValue === option.value ? 'selected shadow-lg border-primary' : ''}`}
                onClick={() => handleCardSelection(option.value, option.additionalData)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="text-center p-4">
                  {option.icon && <div className="card-icon mb-3">{option.icon}</div>}
                  <Card.Title>{option.label}</Card.Title>
                  {option.subtitle && <Card.Subtitle className="mb-2 text-muted">{option.subtitle}</Card.Subtitle>}
                  {option.description && <Card.Text>{option.description}</Card.Text>}
                  {option.content && option.content}
                  {option.badge && (
                    <div className={`mt-2 badge ${option.badge.className || 'bg-info text-white'}`}>
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

export default CardSelectionGroup;