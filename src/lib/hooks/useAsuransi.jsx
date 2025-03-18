import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransiPasien } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";
import { fetchAsuransi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { fetchPasienSlice } from "../state/slice/Manajemen-kesehatan-slices/pasienSlice";
import { fetchCoveranAsuransi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";

// Custom hook untuk fetching data

const useFetchAsuransi = (sliceName, fetchAction) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { data, loading, totalPages, loadedPages } = useSelector(
    (state) => state[sliceName]
  );

  // Gunakan useCallback untuk fetchData agar bisa ditambahkan ke dependency array
  const fetchData = useCallback(
    (params) => {
      dispatch(fetchAction(params));
    },
    [dispatch, fetchAction]
  );

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      fetchData({ page: 1, perPage: 10, isInfiniteScroll: true });
    }
  }, [fetchData, loadedPages]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);
      console.log(`🔄 Fetching page ${nextPage} for ${sliceName}...`);
      fetchData({
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true,
      });
    }
  }, [fetchData, loading, loadedPages, page, sliceName, totalPages]);

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

  //  ini daftar asuransi
  const AsuransiOptions = AsuransiData.map((item) => ({
    label: item.namaAsuransi,
    value: item.asuransiId,
  }));

  return {
    AsuransiOptions,
    loadingAsuransi,
    handleLoadMoreAsuransi,
  };
};

export default useAsuransiData;
