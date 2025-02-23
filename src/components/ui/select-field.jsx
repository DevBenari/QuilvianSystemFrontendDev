import React, { forwardRef, useRef, useMemo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from "react-select";

const SelectField = forwardRef(
  (
    {
      name,
      label,
      options,
      rules,
      placeholder,
      className,
      onChange: externalOnChange,
      onMenuScrollToBottom,
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();

    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    const scrollTimeout = useRef(null);
    const isFetching = useRef(false);

    // Handle both internal form control and external onChange
    const handleChange = useCallback(
      (selected) => {
        const value = selected ? selected.value : null;
        field.onChange(value);
        if (externalOnChange) {
          externalOnChange(selected);
        }
      },
      [field, externalOnChange]
    );

    // Memoize the scroll handler
    const handleScrollToBottom = useCallback(() => {
      if (scrollTimeout.current || isFetching.current) return;

      isFetching.current = true;
      scrollTimeout.current = setTimeout(() => {
        if (onMenuScrollToBottom) {
          onMenuScrollToBottom();
        }
        isFetching.current = false;
        scrollTimeout.current = null;
      }, 300);
    }, [onMenuScrollToBottom]);

    // Memoize options with deep comparison
    const memoizedOptions = useMemo(
      () =>
        Array.isArray(options)
          ? options.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))
          : [],
      [options]
    );

    // Memoize the selected value
    const selectedValue = useMemo(
      () =>
        memoizedOptions.find((option) => option.value === field.value) || null,
      [memoizedOptions, field.value]
    );

    return (
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          options={memoizedOptions}
          placeholder={placeholder || "Pilih opsi"}
          value={selectedValue}
          onChange={handleChange}
          onMenuScrollToBottom={handleScrollToBottom}
          isClearable
          isLoading={props.isLoading}
        />
        {error && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

SelectField.displayName = "SelectField";

export default React.memo(SelectField);
