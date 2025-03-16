import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { fetchAsuransi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiSlice";
import { fetchAsuransiPasien } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";
import { fetchCoveranAsuransi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";

// Custom hook untuk fetching data
const useFetchAsuransi = (sliceName, fetchAction) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { data, loading, totalPages, loadedPages } = useSelector(
    (state) => state[sliceName]
  );

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(fetchAction({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);
      console.log(`🔄 Fetching page ${nextPage} for ${sliceName}...`);
      dispatch(
        fetchAction({ page: nextPage, perPage: 10, isInfiniteScroll: true })
      );
    }
  };

  return { data, loading, handleLoadMore };
};

// Hook utama untuk mengelola semua asuransi
const useAsuransiData = () => {
  // Fetch Asuransi
  const {
    data: AsuransiData,
    loading: loadingAsuransi,
    handleLoadMore: handleLoadMoreAsuransi,
  } = useFetchAsuransi("Asuransi", fetchAsuransi);

  // Fetch Asuransi Pasien
  const {
    data: AsuransiPasienData,
    loading: loadingAsuransiPasien,
    handleLoadMore: handleLoadMoreAsuransiPasien,
  } = useFetchAsuransi("AsuransiPasien", fetchAsuransiPasien);

  // Fetch Coveran Asuransi
  const {
    data: CoveranAsuransiData,
    loading: loadingCoveranAsuransi,
    handleLoadMore: handleLoadMoreCoveranAsuransi,
  } = useFetchAsuransi("CoveranAsuransi", fetchCoveranAsuransi);

  // Format data menjadi options
  const AsuransiOptions = AsuransiData.map((item) => ({
    label: item.namaAsuransi,
    value: item.asuransiId,
  }));

  const AsuransiPasienOptions = AsuransiPasienData.map((item) => ({
    label: item.namaAsuransiPasien,
    value: item.asuransiPasienId,
  }));

  const CoveranAsuransiOptions = CoveranAsuransiData.map((item) => ({
    label: item.namaCoveranAsuransi,
    value: item.asuransiPasienId,
  }));

  return {
    AsuransiOptions,
    loadingAsuransi,
    handleLoadMoreAsuransi,
    AsuransiPasienOptions,
    loadingAsuransiPasien,
    handleLoadMoreAsuransiPasien,
    CoveranAsuransiOptions,
    loadingCoveranAsuransi,
    handleLoadMoreCoveranAsuransi,
  };
};

export default useAsuransiData;
