import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const StepsNavigation = ({ 
  steps,
  currentStep,
  completedSteps,
  onStepSelect
}) => {
  return (
    <Row className="justify-content-center ">
      {steps.map((step, idx) => (
        <Col key={`step-${idx}`} xs={12} md={2} className="mb-3">
          <Card 
            className={`nav-card ${currentStep === idx ? 'active border-primary' : ''} ${completedSteps.includes(idx) ? 'completed bg-light' : ''}`}
            onClick={() => onStepSelect(idx)}
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

export default StepsNavigation;