import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressIndicator = ({ progress, variant = 'success' }) => {
  return (
    <ProgressBar 
      now={progress} 
      variant={variant} 
      className="mb-4"
      label={`${Math.round(progress)}%`}
    />
  );
};

export default ProgressIndicator;