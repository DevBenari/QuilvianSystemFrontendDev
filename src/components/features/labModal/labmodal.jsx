"use client";
import React, { useState, useEffect } from "react";

const LabModal = () => {
  const [options, setOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]); // Example options
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // Parse selectedOptions from the URL
    const params = new URLSearchParams(window.location.search);
    const selectedOptionsString = params.get("selectedOptions");
    if (selectedOptionsString) {
      try {
        const parsedOptions = JSON.parse(
          decodeURIComponent(selectedOptionsString)
        );
        setSelectedOptions(parsedOptions);
      } catch (error) {
        console.error("Failed to parse selectedOptions:", error);
      }
    }
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleSave = () => {
    if (window.opener && typeof window.opener.onPopupSave === "function") {
      window.opener.onPopupSave(selectedOptions);
      window.close();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Select Options</h3>
      <div>
        {options.map((option, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox-${index}`}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <label className="form-check-label" htmlFor={`checkbox-${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => window.close()}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default LabModal;
