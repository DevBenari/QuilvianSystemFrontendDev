import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardSelectionGroup from '@/components/features/card-selection-group/cardSelectionGroup.component';
import FieldRenderer from '@/utils/renderers-field/fieldRenderers';

const StepRenderer = ({
  step, 
  methods, 
  filteredItems, 
  formType, 
  currentStep, 
  shouldHideField, 
  customFieldRenderers,
  onCardSelect,
  isEditing,
  className
}) => {
  // Tambahkan penanganan khusus untuk customRender
  if (step.customRender) {
    // Jalankan custom render dengan menyediakan methods
    return step.customRender({ 
      methods, 
      filteredItems, 
      formType, 
      currentStep,
      isEditing 
    });
  }

  // Rendering untuk field dan card biasa
  return (
    <Row>
      {step.cards && step.cards.map((cardGroup, index) => (
        <div key={cardGroup.name || `card-group-${index}`} className='mb-4'>
          <CardSelectionGroup
            cardGroup={cardGroup}
            methods={methods}
            filteredItems={filteredItems}
            formType={formType}
            onCardSelect={onCardSelect}
            className={`${className} mb-4`}
          />
        </div>
      ))}
      {step.fields && (
        <Row>
          {step.fields
            .filter((field) => !shouldHideField(field))
            .map(({ colSize, ...field }, index) => (
              <Col key={field.id || field.name || `field-${index}`} lg={colSize || 6}>
                <FieldRenderer
                  field={field}
                  methods={methods}
                  formType={formType}
                  customFieldRenderers={customFieldRenderers}
                  isEditing={isEditing}
                  filteredItems={filteredItems}
                />
              </Col>
            ))}
        </Row>
      )}

      
    </Row>
  );
};

export default StepRenderer;