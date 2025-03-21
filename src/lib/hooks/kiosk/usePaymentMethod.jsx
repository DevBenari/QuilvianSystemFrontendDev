import { useState, useEffect } from "react";

/**
 * Custom hook for managing payment method selection
 * 
 * @param {Object} config - Konfigurasi tambahan
 * @returns {Object} - Payment method state and methods
 */
export const usePaymentMethod = ({ 
  initialPaymentMethod = null,
  onPaymentMethodChange = null,
  insuranceFieldsGetter = null 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(initialPaymentMethod);
  const [showPaymentCards, setShowPaymentCards] = useState(true);

  // Effect untuk menjalankan callback saat payment method berubah
  useEffect(() => {
    if (typeof onPaymentMethodChange === 'function' && selectedPaymentMethod) {
      onPaymentMethodChange(selectedPaymentMethod);
    }
    
    // Sembunyikan payment cards jika asuransi dipilih
    if (selectedPaymentMethod === "asuransi") {
      setShowPaymentCards(false);
    }
  }, [selectedPaymentMethod, onPaymentMethodChange]);

  // Generate payment method cards
  const getPaymentMethodCards = () => {
    return [
      {
        name: "pembayaran",
        title: "Metode Pembayaran",
        description: "Silakan pilih metode pembayaran yang akan Anda gunakan:",
        colSize: 4,
        className: "d-flex align-items-center justify-content-center",
        required: true,
        rules: { required: "Silakan pilih metode pembayaran" },
        options: [
          {
            value: "tunai",
            label: "Tunai",
            icon: "💵",
            subtitle: "Bayar langsung",
            description: "Pembayaran dilakukan langsung di kasir rumah sakit setelah selesai pelayanan."
          },
          {
            value: "asuransi",
            label: "Asuransi",
            icon: "🔒",
            subtitle: "Klaim asuransi",
            description: "Gunakan asuransi kesehatan Anda untuk pembayaran layanan."
          }
        ],
        hide: () => !showPaymentCards,
        customRender: ({ methods }) => renderPaymentMethodSelection(methods)
      }
    ];
  };

  const renderPaymentMethodSelection = (methods) => {
    if (selectedPaymentMethod === "asuransi" && !showPaymentCards) {
      return (
        <div className="mb-3">
          <h5>Metode Pembayaran: Asuransi</h5>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              setShowPaymentCards(true);
            }}
          >
            Ubah Metode Pembayaran
          </button>
          
          {/* Render insurance fields jika tersedia */}
          {insuranceFieldsGetter && renderInsuranceFields(methods)}
        </div>
      );
    }

    if (selectedPaymentMethod === "tunai" && !showPaymentCards) {
      return (
        <div className="mb-3">
          <h5>Metode Pembayaran: Tunai</h5>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              setShowPaymentCards(true);
            }}
          >
            Ubah Metode Pembayaran
          </button>
        </div>
      );
    }

    return (
      <div className="row">
        {[
          {
            value: "tunai",
            label: "Tunai",
            icon: "💵",
            subtitle: "Bayar langsung",
            description: "Pembayaran dilakukan langsung di kasir rumah sakit setelah selesai pelayanan."
          },
          {
            value: "asuransi",
            label: "Asuransi",
            icon: "🔒",
            subtitle: "Klaim asuransi",
            description: "Gunakan asuransi kesehatan Anda untuk pembayaran layanan."
          }
        ].map((option) => {
          const isSelected = methods.watch("pembayaran") === option.value;

          return (
            <div className="col-md-6" key={option.value}>
              <div
                className={`card selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                onClick={() => {
                  methods.setValue("pembayaran", option.value);
                  // Set selected payment method
                  setSelectedPaymentMethod(option.value);
                  
                  // Jika asuransi dipilih, sembunyikan kartu setelah dipilih
                  if (option.value === "asuransi") {
                    setShowPaymentCards(false);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-4">
                  <div className="card-icon mb-3">{option.icon}</div>
                  <h5 className="card-title">{option.label}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{option.subtitle}</h6>
                  <p className="card-text">{option.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render insurance fields
  const renderInsuranceFields = (methods) => {
    if (!insuranceFieldsGetter) return null;
    const insuranceFields = insuranceFieldsGetter(selectedPaymentMethod);

    if (!insuranceFields || insuranceFields.length === 0) return null;
    
    return (
      <div className="mt-4">
        <div className="row">
          {insuranceFields.map((field) => {
            if (field.hide && field.hide()) return null;
            const colSize = field.colSize || 12;
            
            return (
              <div className={`col-md-${colSize} ${field.className || ''}`} key={field.id || field.name}>
                {field.label && <label htmlFor={field.id || field.name} className="form-label">{field.label}</label>}
                
                {field.type === 'custom' && field.customRender ? (
                  field.customRender({ methods })
                ) : field.type === 'select' ? (
                  <select 
                    id={field.id}
                    name={field.name}
                    className="form-select"
                    onChange={(e) => methods.setValue(field.name, e.target.value, { shouldValidate: true })}
                    value={methods.watch(field.name) || ''}
                  >
                    <option value="">Pilih {field.label}</option>
                    {field.options && field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    id={field.id}
                    name={field.name}
                    className="form-control"
                    placeholder={field.placeholder}
                    onChange={(e) => methods.setValue(field.name, e.target.value, { shouldValidate: true })}
                    value={methods.watch(field.name) || ''}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Method untuk reset payment method
  const resetPaymentMethod = () => {
    setSelectedPaymentMethod(null);
    setShowPaymentCards(true);
  };

  // Method untuk mengubah payment method secara programatis
  const changePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentCards(method !== "asuransi");
  };

  return {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    getPaymentMethodCards,
    renderPaymentMethodSelection,
    resetPaymentMethod,
    changePaymentMethod,
    showPaymentCards,
    setShowPaymentCards
  };
};