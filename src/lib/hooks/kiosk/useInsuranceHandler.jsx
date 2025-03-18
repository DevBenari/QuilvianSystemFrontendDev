import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsuransiPasien,
  createAsuransiPasien,
  deleteAsuransiPasien,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";

/**
 * Custom hook for managing insurance-related functionality
 *
 * @param {Object} config - Configuration options
 * @returns {Object} - Insurance state and methods
 */
export const useInsuranceManagement = ({
  initialInsuranceList = [],
  formMethodsRef = null,
  pasienId = null,
}) => {
  const dispatch = useDispatch();
  const { data: asuransiPasienList, loading } = useSelector(
    (state) => state.AsuransiPasien
  );

  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState(initialInsuranceList);
  const [nonPKSInsuranceSelected, setNonPKSInsuranceSelected] = useState(false);

  // Fetch asuransi pasien data when pasienId is available
  useEffect(() => {
    if (pasienId) {
      dispatch(fetchAsuransiPasien(pasienId));
    }
  }, [dispatch, pasienId]);

  // Update insuranceList when asuransiPasienList changes
  useEffect(() => {
    if (asuransiPasienList && asuransiPasienList.length > 0) {
      const formattedList = asuransiPasienList.map((item) => ({
        namaAsuransi: item.namaAsuransi,
        nomorPolis: item.noPolis,
        isPKS: true, // Assume all fetched insurances are PKS by default
        asuransiId: item.asuransiId,
        asuransiPasienId: item.asuransiPasienId, // Save the asuransiPasienId for deletion
      }));

      setInsuranceList(formattedList);
    }
  }, [asuransiPasienList]);

  // Modal handlers
  const handleOpenModal = (e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowInsuranceModal(true);
  };

  const handleCloseModal = () => setShowInsuranceModal(false);

  // Handle insurance submission from modal
  const handleInsuranceSubmit = (insuranceData) => {
    // Map API response format to component format
    const formattedInsurance = {
      namaAsuransi: insuranceData.NamaAsuransi || insuranceData.namaAsuransi,
      nomorPolis: insuranceData.NomorPolis || insuranceData.nomorPolis,
      isPKS: insuranceData.IsPKS || insuranceData.isPKS,
      asuransiId: insuranceData.asuransiId,
    };

    // Tambahkan ke state lokal jika di modal tidak menyimpan ke API
    if (!pasienId) {
      setInsuranceList((prevList) => [...prevList, formattedInsurance]);
    }

    // Periksa apakah asuransi non-PKS
    if (!formattedInsurance.isPKS) {
      setNonPKSInsuranceSelected(true);
    }

    // Update form values jika form reference tersedia
    if (formMethodsRef && formMethodsRef.current) {
      formMethodsRef.current.setValue(
        "nomorAsuransi",
        formattedInsurance.nomorPolis
      );
      formMethodsRef.current.setValue(
        "asuransiPasien",
        formattedInsurance.namaAsuransi
      );
      formMethodsRef.current.trigger(["nomorAsuransi", "asuransiPasien"]);
    }

    handleCloseModal();
    return formattedInsurance;
  };

  // Handle insurance removal
  const handleRemoveInsurance = async (index, insuranceItem) => {
    // Jika pasienId dan asuransiPasienId tersedia, hapus dari API
    if (pasienId && insuranceItem.asuransiPasienId) {
      try {
        await dispatch(deleteAsuransiPasien(insuranceItem.asuransiPasienId));
      } catch (error) {
        console.error("Failed to delete insurance:", error);
        // Bisa tambahkan notifikasi error
      }
    } else {
      // Jika tidak, hanya hapus dari state lokal
      setInsuranceList((prevList) => prevList.filter((_, i) => i !== index));
    }

    // Cek apakah masih ada asuransi non-PKS setelah penghapusan
    const stillHasNonPKS = insuranceList
      .filter((_, i) => i !== index)
      .some((insurance) => !insurance.isPKS);

    setNonPKSInsuranceSelected(stillHasNonPKS);
  };

  // Create new insurance pasien
  const createNewAsuransiPasien = async (data) => {
    if (!pasienId) return null;

    try {
      const formattedData = {
        pasienId,
        noPolis: data.nomorPolis,
        asuransiId: data.asuransiId || "00000000-0000-0000-0000-000000000000",
        userId: "system", // Bisa diganti dengan user ID aktif
      };

      const result = await dispatch(createAsuransiPasien(formattedData));
      return result.payload;
    } catch (error) {
      console.error("Failed to create new insurance:", error);
      return null;
    }
  };

  // Generate insurance form fields based on payment method
  const getInsuranceFields = (selectedPaymentMethod) => {
    return [
      {
        id: "asuransiPasien",
        name: "asuransiPasien",
        label: "Asuransi yang digunakan pasien",
        type: "select",
        options: insuranceList.map((item) => ({
          label: `${item.namaAsuransi} - ${item.nomorPolis}`,
          value: item.namaAsuransi,
          isPKS: item.isPKS,
          asuransiId: item.asuransiId,
        })),
        colSize: 6,
        hide: (watchValues) => selectedPaymentMethod !== "asuransi",
      },
      {
        id: "nomorAsuransi",
        name: "nomorAsuransi",
        label: "Nomor Kartu Asuransi",
        type: "text",
        colSize: 6,
        placeholder: "masukkan nomor asuransi",
        hide: (watchValues) => selectedPaymentMethod !== "asuransi",
      },
      {
        id: "tambahAsuransi",
        name: "tambahAsuransi",
        label: "",
        type: "custom",
        customRender: ({ methods }) => (
          <button
            type="button"
            className="btn btn-info"
            onClick={handleOpenModal}
            style={{ marginTop: "30px" }}
          >
            Tambah Asuransi
          </button>
        ),
        colSize: 6,
        className: "mt-2",
        hide: (watchValues) => selectedPaymentMethod !== "asuransi",
      },
      {
        id: "daftarAsuransi",
        name: "daftarAsuransi",
        label: "Daftar Asuransi Pasien",
        type: "custom",
        customRender: ({ methods }) => {
          if (insuranceList.length === 0) {
            return (
              <div className="alert alert-info mt-3">
                <p className="mb-0">
                  Pasien belum memiliki asuransi. Silakan tambahkan asuransi.
                </p>
              </div>
            );
          }

          return (
            <div className="mt-3">
              <h6 className="mb-3">Daftar Asuransi Pasien:</h6>
              <ul className="list-group">
                {insuranceList.map((insurance, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{insurance.namaAsuransi}</strong>
                      <br />
                      <small>Nomor Polis: {insurance.nomorPolis}</small>
                      {!insurance.isPKS && (
                        <span className="badge bg-warning ms-2">Non-PKS</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveInsurance(index, insurance)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        },
        colSize: 12,
        hide: (watchValues) =>
          selectedPaymentMethod !== "asuransi" || insuranceList.length === 0,
      },
      {
        id: "nonPKSNotification",
        name: "nonPKSNotification",
        label: "",
        type: "custom",
        customRender: ({ methods }) => {
          const asuransiPasien = methods.watch("asuransiPasien");
          const selectedInsurance = insuranceList.find(
            (ins) => ins.namaAsuransi === asuransiPasien
          );

          if (selectedInsurance && !selectedInsurance.isPKS) {
            return (
              <div className="alert alert-warning mt-3">
                <h4 className="alert-heading">Asuransi Non-PKS</h4>
                <p>
                  Asuransi <strong>{selectedInsurance.namaAsuransi}</strong>{" "}
                  tidak bekerja sama dengan rumah sakit (Non-PKS). Pembayaran
                  akan diatur sebagai Tunai, tetapi Anda tetap bisa mengajukan
                  reimbursement ke pihak asuransi setelah layanan selesai.
                </p>
              </div>
            );
          }
          return null;
        },
        colSize: 12,
        hide: (watchValues) => selectedPaymentMethod !== "asuransi",
      },
    ];
  };

  return {
    showInsuranceModal,
    insuranceList,
    nonPKSInsuranceSelected,
    handleOpenModal,
    handleCloseModal,
    handleInsuranceSubmit,
    handleRemoveInsurance,
    getInsuranceFields,
    setInsuranceList,
    createNewAsuransiPasien,
    loading,
  };
};
