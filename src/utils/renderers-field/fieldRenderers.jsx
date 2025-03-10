import React from 'react';
import { Col } from 'react-bootstrap';
import { getFieldComponents } from '@/utils/renderers-field/iconMappping';

const FieldRenderer = ({
  field,
  methods,
  formType,
  customFieldRenderers = {},
  isEditing = true,
  filteredItems = {}
}) => {
  const {
    id,
    name,
    label,
    placeholder,
    type,
    rules,
    className = "mb-3",
    readOnly = false,
    value,
    disabled = false,
    onChange,
    onClick,
    options,
    rows,
    customRender,
    colSize,
    hide,
    ...otherProps
  } = field;

  const fieldComponents = getFieldComponents();

  const commonProps = {
    id,
    name,
    label,
    placeholder,
    rules,
    className,
    readOnly,
    value,
    disabled,
    ...(onChange ? { onChange } : {}),
    ...(onClick ? { onClick } : {}),
  };

  // Check if there's a custom renderer for this field based on formType
  if (customFieldRenderers[formType]?.[name]) {
    return (
      <Col md={colSize || 12} key={id || name} className={className}>
        {customFieldRenderers[formType][name]({ field, commonProps, methods, filteredItems })}
      </Col>
    );
  }

  // Use the field's custom render if provided
  if (type === "custom" && typeof customRender === "function") {
    return (
      <Col md={colSize || 12} key={id || name} className={className}>
        {customRender({ field, commonProps, methods, filteredItems })}
      </Col>
    );
  }

  const Component = fieldComponents[field.type];
  if (!Component) {
    console.warn(`Unsupported field type: ${field.type}`);
    return null;
  }

  return (
    <Component
      key={id}
      {...commonProps}
      options={options}
      rows={rows}
      control={methods.control}
      value={value}
      disabled={!isEditing || disabled}
      {...otherProps}
    />
  );
};

export default FieldRenderer;