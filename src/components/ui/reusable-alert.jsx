import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

const ReusableAlert = ({
  message,
  variant = "info",
  dismissible = true,
  onClose,
  autoClose = 5000,
}) => {
  useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, onClose]);

  if (!message) return null;

  return (
    <Alert variant={variant} dismissible={dismissible} onClose={onClose}>
      {message}
    </Alert>
  );
};

export default ReusableAlert;
