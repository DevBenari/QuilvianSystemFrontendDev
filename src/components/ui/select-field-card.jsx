import React, { useState, forwardRef, useRef, useMemo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Form, Image } from "react-bootstrap";
import Select from "react-select";
const DoctorCardSelector = forwardRef(
  (
    {
      name,
      label,
      options,
      rules,
      placeholder,
      className,
      onChange: externalOnChange,
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();

    const {
      field,
      fieldState: { error },
    } = useController({ name, control, rules });

    const [isOpen, setIsOpen] = useState(false);
    
    // Mengembalikan objek dokter lengkap berdasarkan value
    const findDoctorById = useCallback(
      (id) => {
        if (!Array.isArray(options)) return null;
        return options.find(doctor => doctor.id === id) || null;
      },
      [options]
    );
    
    // Selected doctor dari value field
    const selectedDoctor = useMemo(
      () => findDoctorById(field.value),
      [findDoctorById, field.value]
    );
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
    const selectDoctor = (doctor) => {
      field.onChange(doctor.id); // Simpan ID dokter ke form
      
      if (externalOnChange) {
        externalOnChange(doctor);
      }
      
      setIsOpen(false);
    };
    
    return (
      <div className={`w-full ${className || ''}`}>
        {label && <div className="mb-2 font-medium">{label}</div>}
        
        {/* Select field button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center"
          ref={ref}
        >
          {selectedDoctor ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image src={"/Images/Jamal.jpg"} alt={"dokter"} className="w-full h-full object-cover" />
              </div>
              <span>{selectedDoctor.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">{placeholder || "Pilih dokter"}</span>
          )}
          <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
        </button>
        
        {/* Dropdown with doctor cards */}
        {isOpen && (
          <div className="relative mt-1 w-full">
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
              {Array.isArray(options) && options.map((doctor) => (
                <div 
                  key={doctor.id}
                  onClick={() => selectDoctor(doctor)}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-600">{doctor.specialty}</div>
                      <div className="text-sm text-gray-500">{doctor.hospital}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

DoctorCardSelector.displayName = "DoctorCardSelector";

export default DoctorCardSelector;

