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
      onInputChange,
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

    // Memoize the handleChange callback
    const handleChange = useCallback(
      (selected) => {
        field.onChange(selected ? selected.value : null);
      },
      [field]
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
      }, 300); // Reduced debounce time
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
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Select
          {...field}
          {...props}
          options={memoizedOptions}
          placeholder={placeholder || "Pilih opsi"}
          value={selectedValue}
          onChange={handleChange}
          onInputChange={onInputChange}
          onMenuScrollToBottom={handleScrollToBottom}
          isClearable
          isLoading={props.isLoading}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

SelectField.displayName = "SelectField";

export default React.memo(SelectField, (prevProps, nextProps) => {
  // Custom comparison for React.memo
  return (
    prevProps.options === nextProps.options &&
    prevProps.value === nextProps.value &&
    prevProps.isLoading === nextProps.isLoading
  );
});
