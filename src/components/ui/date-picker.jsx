import React from "react";
import Flatpickr from "react-flatpickr";
import { useController } from "react-hook-form";
import { Form } from "react-bootstrap";
import "flatpickr/dist/themes/material_blue.css"; // Pilih tema sesuai kebutuhan

const DateInputPicker = ({
  name,
  label,
  placeholder,
  rules,
  control,
  onDateChange,
  options = {}, // Tambahkan opsi default
  minDate,
  maxDate,
  disable,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  // Fungsi untuk memformat tanggal menjadi "YYYY-MM-DD"
  const formatDate = (date) => {
    if (!(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="form-group mb-3">
      {label && <label className="mb-2">{label}</label>}
      <Flatpickr
        {...field}
        value={field.value || null} // Pastikan nilai valid
        options={{
          dateFormat: "Y-m-d", // Format tanggal untuk tampilan
          allowInput: true, // Izinkan input manual
          minDate: minDate || undefined,
          maxDate: maxDate || undefined,
          disable: disable || [],
          ...options, // Tambahkan opsi tambahan
        }}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={([date]) => {
          const validDate = date instanceof Date ? date : new Date(date); // Pastikan date adalah objek Date
          const formattedDate = formatDate(validDate); // Format menjadi YYYY-MM-DD
          field.onChange(formattedDate); // Update form state
          if (onDateChange) onDateChange(validDate); // Callback ke komponen induk
        }}
        placeholder={placeholder || "Pilih tanggal"}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default DateInputPicker;
