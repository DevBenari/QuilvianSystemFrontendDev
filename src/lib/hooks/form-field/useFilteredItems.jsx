import { useState, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

const useFilteredItems = ({
  formType,
  watchedValues,
  sourceData,
  control
}) => {
  const [filteredItems, setFilteredItems] = useState({});

  const selectedPoli = useWatch({ control, name: "selectedPoli" });
  const pembayaran = useWatch({ control, name: "pembayaran" });
  const asuransiPasien = useWatch({ control, name: "asuransiPasien" });
  const labCategory = useWatch({ control, name: "labCategory" });
  const isUrgent = useWatch({ control, name: "isUrgent" });
  const medicationType = useWatch({ control, name: "medicationType" });
  const prescriptionRequired = useWatch({ control, name: "prescriptionRequired" });

  const updateFilteredItems = useCallback(() => {
    let newFilteredItems = { ...filteredItems };

    switch (formType) {
      case "clinic":
        if (selectedPoli && sourceData[selectedPoli]) {
          let filteredDoctors = sourceData[selectedPoli];

          if (pembayaran === 'asuransi' && asuransiPasien) {
            filteredDoctors = filteredDoctors.filter(doctor =>
              doctor.acceptedInsurances?.includes(asuransiPasien)
            );
          }

          newFilteredItems = { ...newFilteredItems, doctors: filteredDoctors };
        }
        break;

      case "lab":
        if (labCategory && sourceData.labTests) {
          const filteredTests = sourceData.labTests.filter(
            test => test.category === labCategory
          );

          newFilteredItems = {
            ...newFilteredItems,
            labTests: isUrgent !== undefined
              ? filteredTests.filter(test => test.supportsUrgent === isUrgent)
              : filteredTests
          };
        }
        break;

      case "pharmacy":
        if (medicationType && sourceData.medications) {
          const filteredMeds = sourceData.medications.filter(
            med => med.type === medicationType
          );

          newFilteredItems = {
            ...newFilteredItems,
            medications: prescriptionRequired !== undefined
              ? filteredMeds.filter(med => med.requiresPrescription === prescriptionRequired)
              : filteredMeds
          };
        }
        break;

      default:
        if (sourceData) {
          newFilteredItems = sourceData;
        }
        break;
    }

    setFilteredItems(newFilteredItems);
  }, [
    selectedPoli,
    pembayaran,
    asuransiPasien,
    labCategory,
    isUrgent,
    medicationType,
    prescriptionRequired,
  ]);

  useEffect(() => {
    updateFilteredItems();
  }, [updateFilteredItems]);

  return { filteredItems };
};

export default useFilteredItems;
