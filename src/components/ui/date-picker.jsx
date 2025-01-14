import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker"; // contoh library datepicker
import "react-datepicker/dist/react-datepicker.css";

const DateInputPicker = ({ name, label, placeholder, rules }) => {
  const { control } = useFormContext();

  return (
    <div className="form-group mb-3">
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            {...field}
            placeholderText={placeholder}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)}
            className="form-control"
          />
        )}
      />
    </div>
  );
};

export default DateInputPicker;
