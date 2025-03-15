// pasien baru 
"use client";
<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
=======
import React, { useEffect, useState, memo } from "react";
>>>>>>> origin/MHamzah
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, ProgressBar } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import RadioInput from "@/components/ui/radio-input";
import DateInput from "@/components/ui/date-input";
import TextArea from "@/components/ui/textArea-field";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import ToggleCustom from "@/components/ui/ToggleCustom";
import SliderInput from "@/components/ui/slider-input";
import RichTextEditor from "@/components/ui/rich-text-editor";
import SignaturePad from "@/components/ui/signature-canvas-input";
import TimeField from "@/components/ui/time-input";
import SearchableSelectField from "@/components/ui/select-field-search";
import ButtonNav from "@/components/ui/button-navigation";
import NumberField from "@/components/ui/distance-filed";

<<<<<<< HEAD
const DynamicStepForm = ({ 
  title, 
  formConfig, 
  onSubmit,
  onFormSubmited, 
  backPath, 
  onStepChange,
  onNextStep,
  onPreviousStep,
  currentStep: externalStep,
  isAddMode = false, 
  externalOptions = {},
  onNegaraChange,
  navigationConfig = {} 
}) => {
  const [isEditing, setIsEditing] = useState(isAddMode);
  const [submittedData, setSubmittedData] = useState(null);
  const [internalStep, setInternalStep] = useState(0);
  const [formData, setFormData] = useState({});
  
  // Gunakan external step jika disediakan
  const currentStep = externalStep !== undefined ? externalStep : internalStep;

  const steps = [
    ...formConfig,
  ];
=======
const DynamicStepForm = memo(
  ({
    title,
    userData,
    formConfig,
    onSubmit,
    onFormSubmited,
    backPath,
    isAddMode = false,
    handleDelete,
    externalOptions = {},
  }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isEditing, setIsEditing] = useState(isAddMode);
    const [submittedData, setSubmittedData] = useState(null);

    const steps = [...formConfig];
>>>>>>> origin/MHamzah

    const fieldComponents = {
      text: TextField,
      email: TextField,
      select: SelectField,
      radio: RadioInput,
      date: DateInput,
      textarea: TextArea,
      file: UploadPhotoField,
      toggle: ToggleCustom,
      slider: SliderInput,
      richText: RichTextEditor,
      signature: SignaturePad,
      time: TimeField,
      number: NumberField,
      searchSelect: SearchableSelectField,
    };

    // Initialize form with userData or default values
    const methods = useForm({
      defaultValues: formConfig.reduce((defaults, section) => {
        section.fields.forEach((field) => {
          // Try direct property access first
          if (userData && userData[field.name] !== undefined) {
            defaults[field.name] = userData[field.name];
          }
          // If not found directly, try case-insensitive matching
          else if (userData) {
            const userDataKeys = Object.keys(userData);
            const matchingKey = userDataKeys.find(
              (key) => key.toLowerCase() === field.name.toLowerCase()
            );

            if (matchingKey) {
              defaults[field.name] = userData[matchingKey];
            } else {
              // Ensure the value is never undefined
              defaults[field.name] =
                field.value !== undefined ? field.value : "";
            }
          } else {
            // Ensure the value is never undefined
            defaults[field.name] = field.value !== undefined ? field.value : "";
          }
        });
        return defaults;
      }, {}),
      mode: "onChange",
    });

<<<<<<< HEAD
  const {
    setValue,
    watch,
    formState: { errors },
    handleSubmit: formSubmit,
    trigger,
    getValues,
  } = methods;

  // PERBAIKAN: Gunakan useCallback untuk menyimpan data form dan hindari penggunaan watch() secara langsung
  const updateFormData = useCallback(() => {
    const currentValues = getValues();
    setFormData(prev => ({...prev, ...currentValues}));
  }, [getValues]);
  
  const {titles = [], identity = [], country = []} = externalOptions;
   // Gunakan useWatch agar tidak memicu re-render berulang (hanya watch field spesifik)
  const identityPasien = useWatch({ control: methods.control, name: "IdentitasId" });
  const currentJenisKelamin = useWatch({ control: methods.control, name: "JenisKelamin" });
  const titlesId = useWatch({ control: methods.control, name: "TitlesId" });
  const statusKewarganegaraan = useWatch({ control: methods.control, name: "StatusKewarganegaraan" });
  const negaraId = useWatch({ control: methods.control, name: "NegaraId" });

  // PERBAIKAN: Gunakan useEffect dengan dependency spesifik untuk perubahan step
  useEffect(() => {
    // Update form data saat step berubah
    updateFormData();
  }, [currentStep, updateFormData]);

  useEffect(() => {
    // Periksa jika titlesId valid dan ditemukan di options
    if (!titlesId || !titles || titles.length === 0) return;
    
    const titleLabel = titles.find(option => option.value === titlesId)?.label;
    if (!titleLabel) return;
  
    if (titleLabel === "Bayi") {
      return; 
    }

    let newJenisKelamin = "";
    if (["Tn", "Mr"].includes(titleLabel)) {
      newJenisKelamin = "Laki-Laki";
    } else if (["Mrs", "Ny", "Nn"].includes(titleLabel)) {
      newJenisKelamin = "Perempuan";
    }
  
    if (newJenisKelamin !== "" && newJenisKelamin !== currentJenisKelamin) {
      setValue("JenisKelamin", newJenisKelamin, { shouldValidate: true });
    }
  }, [titlesId, currentJenisKelamin, setValue, titles]);
  
  useEffect(() => {
    // Validasi untuk mencegah loop jika tidak ada perubahan penting
    if (!identityPasien || !identity || identity.length === 0) return;
    
    // Dapatkan detail identitas berdasarkan ID yang dipilih
    const selectedIdentity = identity.find(item => item.value === identityPasien)?.label;
    if (!selectedIdentity) return;
    
    let newStatusKewarganegaraan = "";
    if(["KTP", "SIM"].includes(selectedIdentity)) {
      newStatusKewarganegaraan = "WNI";
    } else if(["PASPOR", "VISA"].includes(selectedIdentity)) {
      newStatusKewarganegaraan = "WNA";
    }

    // Hanya update jika benar-benar berubah
    if (newStatusKewarganegaraan !== "" && newStatusKewarganegaraan !== statusKewarganegaraan) {
      setValue("StatusKewarganegaraan", newStatusKewarganegaraan, { shouldValidate: true });
    }
  }, [identity, setValue, identityPasien, statusKewarganegaraan]);

  useEffect(() => {
    // Validasi untuk mencegah loop jika tidak ada perubahan penting
    if (statusKewarganegaraan === "WNA") {
      return;
    }
    
    // Jika WNI, cari opsi Indonesia
    if(statusKewarganegaraan === "WNI") {
      const indonesiaOption = country.find(
        option => option.label === "Indonesia"
      );
      if (indonesiaOption && negaraId !== indonesiaOption.value) {
        // Set nilai NegaraId ke Indonesia
        setValue("NegaraId", indonesiaOption.value);
        
        // Panggil onNegaraChange untuk memberi tahu komponen parent
        if (typeof onNegaraChange === 'function') {
          onNegaraChange(indonesiaOption);
        }
      }
    }
    
    // Hanya update jika Indonesia ditemukan dan nilai belum tepat
   
  }, [statusKewarganegaraan, country, negaraId, setValue, onNegaraChange]);
  
  // Fungsi untuk mengambil nilai saat ini untuk validasi
  const getCurrentValues = useCallback(() => {
    return watch();
  }, [watch]);

  const renderField = (field) => {
=======
>>>>>>> origin/MHamzah
    const {
      setValue,
      watch,
      reset,
      formState: { errors },
      handleSubmit: formSubmit,
      trigger,
      control,
    } = methods;

<<<<<<< HEAD
    const commonProps = {
      id,
      name,
      label,
      placeholder,
      rules,
      className,
      readOnly,
      value,
      disabled: typeof disabled === 'function' ? disabled(getCurrentValues()) : (!isEditing || disabled),
      ...(onChange ? { onChange } : {}),
      ...(onClick ? { onClick } : {}),
=======
    // Update form when userData changes (imported from DynamicForm)
    useEffect(() => {
      if (userData) {
        console.log("Setting form with userData:", userData);
        const values = {};

        // Handle different property casing in API response
        formConfig.forEach((section) => {
          section.fields.forEach((field) => {
            // Check for direct match first
            if (userData[field.name] !== undefined) {
              values[field.name] = userData[field.name];
            }
            // Check for case-insensitive match (API returns camelCase, form expects PascalCase)
            else {
              // Try to find a matching property in userData regardless of case
              const userDataKeys = Object.keys(userData);
              const matchingKey = userDataKeys.find(
                (key) => key.toLowerCase() === field.name.toLowerCase()
              );

              if (matchingKey) {
                values[field.name] = userData[matchingKey];
              } else {
                // Ensure the value is never undefined
                values[field.name] =
                  field.value !== undefined ? field.value : "";
              }
            }
          });
        });

        console.log("Form values after mapping:", values);
        reset(values);
      }
    }, [userData, formConfig, reset]);

    // External options logic
    const { titles = [] } = externalOptions;
    const currentJenisKelamin = useWatch({ control, name: "jenisKelamin" });
    const titlesId = useWatch({ control, name: "titlesId" });
    const statusKewarganegaraan = watch("statusKewarganegaraan");
    const kewarganegaraan = watch("kewarganegaraan");

    useEffect(() => {
      const titleLabel = titles.find(
        (option) => option.value === titlesId
      )?.label;
      let newJenisKelamin = "";
      if (["Tn", "Mr"].includes(titleLabel)) {
        newJenisKelamin = "Laki-Laki";
      } else if (["Mrs", "Ny", "Nn"].includes(titleLabel)) {
        newJenisKelamin = "Perempuan";
      }

      if (newJenisKelamin !== currentJenisKelamin && newJenisKelamin) {
        setValue("jenisKelamin", newJenisKelamin, { shouldValidate: true });
      }
    }, [titlesId, currentJenisKelamin, setValue, titles]);

    useEffect(() => {
      if (statusKewarganegaraan === "WNI") {
        setValue("kewarganegaraan", "Indonesia");
      } else if (
        statusKewarganegaraan === "WNA" &&
        kewarganegaraan !== "Indonesia"
      ) {
        setValue("kewarganegaraan", kewarganegaraan);
      }
    }, [statusKewarganegaraan, kewarganegaraan, setValue]);

    const renderField = (field) => {
      const {
        id,
        name,
        label,
        placeholder,
        type,
        rules,
        className = "mb-3",
        readOnly = false,
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

      // For debugging
      // if (userData && userData[name]) {
      //   console.log(`Field ${name} has value in userData:`, userData[name]);
      // } else if (userData) {
      //   // Check if there's a case-insensitive match
      //   const userDataKeys = Object.keys(userData);
      //   const matchingKey = userDataKeys.find(
      //     (key) => key.toLowerCase() === name.toLowerCase()
      //   );
      //   if (matchingKey) {
      //     console.log(
      //       `Field ${name} matched with ${matchingKey}:`,
      //       userData[matchingKey]
      //     );
      //   }
      // }

      // Remove value and defaultValue from otherProps to prevent conflicts
      const { value, defaultValue, ...restProps } = otherProps;

      const commonProps = {
        id,
        name,
        label,
        placeholder,
        rules,
        className,
        readOnly: !isEditing || readOnly,
        disabled: !isEditing || disabled,
        control,
        // Ensure value is never undefined
        defaultValue: "",
        ...(onChange ? { onChange } : {}),
        ...(onClick ? { onClick } : {}),
      };

      if (type === "email") {
        return <TextField key={id} {...commonProps} type="email" />;
      }

      // For custom fields, ensure we have a non-undefined value
      if (type === "custom" && typeof customRender === "function") {
        // Special handling for custom components
        const fieldValue = watch(name);
        console.log(`Custom field ${name} current value:`, fieldValue);

        return customRender({
          key: id,
          field: {
            ...field,
            value: fieldValue !== undefined ? fieldValue : "",
          },
          commonProps: {
            ...commonProps,
            value: fieldValue !== undefined ? fieldValue : "",
          },
          methods,
        });
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
          {...restProps}
          options={options}
          rows={rows}
          // Ensure we never pass undefined as value
          value={watch(name) !== undefined ? watch(name) : ""}
        />
      );
>>>>>>> origin/MHamzah
    };

    const handleNext = async () => {
      const currentFields = steps[currentStep].fields
        .filter((field) => !shouldHideField(field))
        .map((field) => field.name);

      const isValid = await trigger(currentFields);

      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    };

    const handlePrevious = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setCurrentStep(0);
    };

    const handleFormSubmit = (data) => {
      setSubmittedData(data);
      if (onFormSubmited) onFormSubmited(data);
      onSubmit(data);
    };

    const shouldHideField = (field) => {
      if (typeof field.hide === "function") {
        return field.hide(watch());
      }
      return field.hide;
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
<<<<<<< HEAD
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

  // Fungsi untuk validasi fields pada step saat ini
  const validateCurrentStep = async () => {
    const fieldNames = steps[currentStep].fields
      .filter(field => !shouldHideField(field))
      .map(field => field.name);
    
    console.log("Validating fields:", fieldNames);
    const result = await trigger(fieldNames);
    return result;
  };

  // Fungsi untuk menangani tombol Next
  const handleNextButtonClick = async (e) => {
    e.preventDefault(); // Mencegah submit form
    console.log("Next button clicked, validating step:", currentStep);
    
    // Validasi field pada step saat ini
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      // Update form data sebelum pindah step
      updateFormData();
      
      // Jika valid, ambil data form saat ini
      const currentData = getValues();
      console.log("Step data valid, moving to next step with data:", currentData);
      
      // Panggil callback external jika ada
      if (onNextStep) {
        onNextStep(currentData);
      } else {
        // Jika tidak ada external control, gunakan internal
        setInternalStep(prev => prev + 1);
      }
      
      // Notify step change
      if (onStepChange) {
        onStepChange(currentStep + 1);
      }
    } else {
      console.log("Step validation failed, staying on current step");
    }
  };

  // Fungsi untuk menangani tombol Previous
  const handlePreviousButtonClick = (e) => {
    e.preventDefault(); // Mencegah submit form
    console.log("Previous button clicked, moving to previous step");
    
    // Update form data sebelum pindah step
    updateFormData();
    
    if (onPreviousStep) {
      onPreviousStep();
    } else {
      setInternalStep(prev => Math.max(0, prev - 1));
    }
    
    if (onStepChange) {
      onStepChange(currentStep - 1);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setInternalStep(0);
  };

  // Fungsi yang dipanggil saat tombol Submit final ditekan
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    console.log("Manual submit button clicked");
    
    // Validasi step terakhir
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      // Update form data final
      updateFormData();
      
      // Gabungkan data dari semua step
      const finalData = {...formData, ...getValues()};
      console.log("Final form data ready to submit:", finalData);
      
      // Panggil callback onSubmit dengan data form lengkap
      if (onSubmit) {
        onSubmit(finalData);
      }
    } else {
      console.log("Final step validation failed, not submitting");
    }
  };

  const shouldHideField = (field) => {
    if (typeof field.hide === "function") {
      return field.hide(getCurrentValues());
    }
    return field.hide;
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Cek apakah sedang di step terakhir
  const isLastStep = currentStep === steps.length - 1;
  // Text untuk tombol next/submit sesuai config atau default
  const nextButtonText = navigationConfig.nextButtonText || "Next";
  const prevButtonText = navigationConfig.prevButtonText || "Previous";
  const submitButtonText = navigationConfig.submitButtonText || "Submit";

  return (
    <FormProvider {...methods}>
      <Row className="iq-card p-2 mx-3 rounded">
        <div className="iq-card p-2 mt-5">
          <div className="iq-card-header gap-1 d-flex justify-content-between">
            <div className="iq-header-title">
              <h3 className="">{title}</h3>
            </div>
            <div className="d-flex gap-2">
              <ButtonNav
                className="btn btn-secondary"
                label="Kembali"
                path={backPath}
                icon="ri-arrow-left-line"
              />
              {!isAddMode && !isEditing && (
                <Button className="btn btn-primary" onClick={handleEdit}>
                  <i className="ri-edit-2-line"></i>
                  Edit
                </Button>
              )}
              {!isAddMode && isEditing && (
                <Button className="btn btn-danger" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="card-body p-3">
            <ProgressBar now={progress} className="mb-4" />
            <h4 className="mb-4">Step {currentStep + 1}: {steps[currentStep].section}</h4>

            {/* Form yang tidak melakukan auto-submit */}
            <Form noValidate id="dynamic-step-form">
              <Row>
                {steps[currentStep].fields
                  .filter((field) => !shouldHideField(field))
                  .map(({ colSize, ...field }, index) => (
                    <Col key={field.id || index} lg={colSize || 6}>
                      {renderField(field)}
                    </Col>
                  ))}
              </Row>

              <div className="d-flex justify-content-between mt-4">
                {/* Tombol Previous */}
                <Button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handlePreviousButtonClick} 
                  disabled={currentStep === 0}
                >
                  <i className="ri-arrow-left-line me-2"></i> {prevButtonText}
                </Button>

                {/* Tombol Next atau Submit */}
                {isLastStep ? (
                  // Tombol Submit di step terakhir
                  (isAddMode || isEditing) && (
                    <Button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleManualSubmit}
                    >
                      <i className="ri-save-line me-2"></i> {submitButtonText}
                    </Button>
                  )
                ) : (
                  // Tombol Next di step lainnya
                  <Button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleNextButtonClick}
                  >
                    {nextButtonText} <i className="ri-arrow-right-line ms-2"></i>
=======
      <FormProvider {...methods}>
        <Row className="iq-card p-2 mx-3 my-5 rounded">
          <div className="iq-card p-2 mt-5">
            <div className="iq-card-header gap-1 d-flex justify-content-between">
              <div className="iq-header-title">
                <h3 className="card-title tracking-wide">{title}</h3>
              </div>
              <div className="d-flex gap-2">
                <ButtonNav
                  className="btn btn-secondary"
                  label="Kembali"
                  path={backPath}
                  icon="ri-arrow-left-line"
                />
                {!isAddMode && !isEditing && (
                  <Button className="btn btn-primary" onClick={handleEdit}>
                    <i className="ri-edit-2-line"></i>
                    Edit
                  </Button>
                )}
                {!isAddMode && isEditing && (
                  <Button className="btn btn-warning" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
                {!isAddMode && handleDelete && (
                  <Button className="btn btn-danger" onClick={handleDelete}>
                    Delete
>>>>>>> origin/MHamzah
                  </Button>
                )}
              </div>
            </div>

            <div className="card-body p-3">
              <ProgressBar now={progress} className="mb-4" />
              <h4 className="mb-4">
                Step {currentStep + 1}: {steps[currentStep].section}
              </h4>

              <Form onSubmit={formSubmit(handleFormSubmit)}>
                <Row>
                  {steps[currentStep].fields
                    .filter((field) => !shouldHideField(field))
                    .map(({ colSize, ...field }, index) => (
                      <Col key={field.id || index} lg={colSize || 6}>
                        {renderField(field)}
                      </Col>
                    ))}
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <i className="ri-arrow-left-line me-2"></i> Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    (isAddMode || isEditing) && (
                      <Button type="submit" className="btn btn-primary">
                        <i className="ri-save-line me-2"></i> Simpan
                      </Button>
                    )
                  ) : (
                    <Button className="btn btn-primary" onClick={handleNext}>
                      Next <i className="ri-arrow-right-line ms-2"></i>
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
<<<<<<< HEAD
        </div>
      </Row>
    </FormProvider>
  );
};

export default DynamicStepForm;
=======
        </Row>
      </FormProvider>
    );
  }
);

DynamicStepForm.displayName = "DynamicStepForm";
export default DynamicStepForm;
>>>>>>> origin/MHamzah
