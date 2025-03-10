import React from 'react';
import { Alert } from 'react-bootstrap';

const FormAlert = ({ showAlert, alertMessage, onClose, variant = 'danger' }) => {
  if (!showAlert) return null;

  return (
    <Alert 
      variant={variant} 
      dismissible 
      onClose={onClose}
      className="mb-3"
    >
      {alertMessage}
    </Alert>
  );
};

export default FormAlert;