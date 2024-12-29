import React, { memo } from 'react'
import Flatpickr from 'react-flatpickr';
import { useController, useForm} from 'react-hook-form';
import { Form } from 'react-bootstrap';

const TimeField = memo(({name, label, rules, className, placeholder, ...props}) => {
  const { control } = useForm();
      const { field, fieldState: { error } } = useController({ name, control, rules });
  
      return (
          <Form.Group className={className}>
              {label && <Form.Label>{label}</Form.Label>}
              <Flatpickr
                  {...field}
                  {...props}
                  options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i',
                      time_24hr: true
                  }}
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  onChange={([time]) => field.onChange(time)} 
                  placeholder={placeholder}
              />
              {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
          </Form.Group>
      );
})

TimeField.displayName = 'TimeField'
export default TimeField