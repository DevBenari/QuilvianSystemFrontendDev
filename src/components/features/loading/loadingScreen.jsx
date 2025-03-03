"use client";
import { Spinner } from "react-bootstrap";

const LoadingScreen = ({
  text = "Please wait, loading...",
  variant = "primary",
}) => {
  return (
    <div className="loading-container">
      <Spinner animation="border" role="status" variant={variant} />
      <p className="loading-text">{text}</p>
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
        }
        .loading-text {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: 500;
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
