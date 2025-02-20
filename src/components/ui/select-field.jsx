import React, { forwardRef, useState, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from "react-select";
import debounce from "lodash/debounce";

const SelectField = forwardRef(
  (
    {
      name,
      label,
      options,
      rules,
      placeholder,
      className,
      readOnly = false,
      onChangeCallback,
      onSearch,
      onLoadMore, // Tambahan untuk memuat halaman berikutnya
      isSearchable = true,
      menuPlacement = "auto",
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    
    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    const customStyles = {
      control: (provided) => ({
        ...provided,
        border: "1px solid #ced4da",
        borderRadius: "0.25rem",
        boxShadow: "none",
        minHeight: "calc(1.5em + 0.75rem + 2px)",
      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "#6c757d",
      }),
    };

    // Debounced search function
    const debouncedSearch = debounce((inputValue) => {
      setSearchQuery(inputValue);
      
      if (typeof onSearch === "function") {
        // Jika ada fungsi pencarian dari parent, gunakan
        onSearch(inputValue);
      } else {
        // Jika tidak, lakukan filtering di frontend
        const filtered = options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
    }, 300);

    useEffect(() => {
      setFilteredOptions(options);
    }, [options]);

    const handleChange = (selected) => {
      field.onChange(selected ? selected.value : null);
      if (onChangeCallback) {
        onChangeCallback(selected ? selected.value : null);
      }
    };

    const handleInputChange = (inputValue, { action }) => {
      if (action === "input-change") {
        debouncedSearch(inputValue);
      }
    };

    const handleMenuScrollToBottom = () => {
      if (typeof onLoadMore === "function") {
        onLoadMore(); // Panggil fungsi load halaman berikutnya
      }
    };

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          options={filteredOptions}
          placeholder={placeholder || "Search and select an option"}
          styles={customStyles}
          value={filteredOptions.find((option) => option.value === field.value) || null}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onMenuScrollToBottom={handleMenuScrollToBottom} // Tambahkan event saat scroll ke bawah
          isSearchable={isSearchable}
          isClearable
          isDisabled={readOnly}
          menuIsOpen={readOnly ? false : undefined}
          menuPlacement={menuPlacement}
          filterOption={null} // Disable default filtering
        />
        {error && (
          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
