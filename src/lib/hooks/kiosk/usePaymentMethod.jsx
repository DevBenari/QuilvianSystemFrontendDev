import { useState } from "react";

/**
 * Custom hook for managing payment method selection
 * 
 * @returns {Object} - Payment method state and methods
 */
export const usePaymentMethod = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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
        customRender: ({ methods }) => renderPaymentMethodSelection(methods)
      }
    ];
  };

  // Helper to render payment method selection UI
  const renderPaymentMethodSelection = (methods) => {
    // If payment method already selected and it's insurance, just show info
    if (selectedPaymentMethod === "asuransi") {
      return (
        <div className="mb-3">
          <h5>Metode Pembayaran: Asuransi</h5>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              setSelectedPaymentMethod(null);
              methods.setValue("pembayaran", "");
            }}
          >
            Ubah Metode Pembayaran
          </button>
        </div>
      );
    }

    // Render payment method cards
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
                  // If insurance is selected, set state
                  if (option.value === "asuransi") {
                    setSelectedPaymentMethod("asuransi");
                  } else {
                    setSelectedPaymentMethod("tunai");
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

  return {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    getPaymentMethodCards,
    renderPaymentMethodSelection
  };
};