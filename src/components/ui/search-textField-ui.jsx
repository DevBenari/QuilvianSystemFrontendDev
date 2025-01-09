import React, { useState, memo } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

const AutocompleteTextField = memo(({ name, label, rules, data, className, placeholder, onChange, ...props }) => {
    const { control, formState: { errors } } = useFormContext();
    const [filteredData, setFilteredData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
    // Handle input change untuk filter data
    const handleInputChange = (value) => {
      if (value) {
        const filtered = data.filter((item) =>
          item.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredData(filtered);
        setShowDropdown(filtered.length > 0);
      } else {
        setShowDropdown(false);
      }
    };
    
    return (
        <Form.Group className={className}>
            {label && <Form.Label>{label}</Form.Label>}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange: controllerOnChange, value } }) => (
                    <>
                        <Form.Control
                            {...props}
                            value={value || ""}
                            onChange={(e) => {
                                controllerOnChange(e.target.value);
                                handleInputChange(e.target.value);
                                onChange && onChange(e.target.value); // Pass value to parent component
                            }}
                            placeholder={placeholder}
                            isInvalid={!!errors[name]}
                            onFocus={() => handleInputChange(value || "")}
                        />
                        <Dropdown
                            show={showDropdown}
                            onToggle={(isOpen) => setShowDropdown(isOpen)}
                        >
                            <Dropdown.Menu style={{ width: "100%" }}>
                                {filteredData.map((item, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                            controllerOnChange(item); // Update value in form
                                            setShowDropdown(false);
                                            onChange && onChange(item); // Pass selected item to parent
                                        }}
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )}
            />
            {errors[name] && (
                <Form.Control.Feedback type="invalid">
                    {errors[name]?.message}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
});

AutocompleteTextField.displayName = "AutocompleteTextField";
export default AutocompleteTextField;
