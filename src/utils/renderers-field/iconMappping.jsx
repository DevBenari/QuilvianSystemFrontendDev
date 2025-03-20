"use client";
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
import NumberField from "@/components/ui/number-field";
import SearchableSelectField from "@/components/ui/select-field-search";

// Fungsi untuk mendapatkan pemetaan komponen field
export const getFieldComponents = () => ({
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
});

// Fungsi utilitas tambahan untuk mendapatkan komponen berdasarkan tipe
export const getFieldComponentByType = (type) => {
  const components = getFieldComponents();
  return components[type] || null;
};

// Fungsi untuk menambahkan atau mengganti komponen kustom
export const registerCustomFieldComponent = (type, component) => {
  const components = getFieldComponents();
  components[type] = component;
};

// Contoh validator sederhana untuk berbagai jenis input
export const createFieldValidator = (type) => {
  const validators = {
    text: (value) => value && value.trim().length > 0,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    number: (value) => !isNaN(parseFloat(value)) && isFinite(value),
    date: (value) => {
      const date = new Date(value);
      return date instanceof Date && !isNaN(date);
    },
    // Tambahkan validator lain sesuai kebutuhan
  };

  return validators[type] || (() => true);
};

// Fungsi untuk mendapatkan pesan error default
export const getDefaultErrorMessage = (type) => {
  const errorMessages = {
    text: "Harap isi field ini",
    email: "Format email tidak valid",
    number: "Harap masukkan angka yang valid",
    date: "Tanggal tidak valid",
    select: "Harap pilih salah satu opsi",
    required: "Field ini wajib diisi",
  };

  return errorMessages[type] || "Terjadi kesalahan";
};

// export default {
//   getFieldComponents,
//   getFieldComponentByType,
//   registerCustomFieldComponent,
//   createFieldValidator,
//   getDefaultErrorMessage
// };
