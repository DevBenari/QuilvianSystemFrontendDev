import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDokter } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import { fetchDokterPoli } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import { fetchPoliKlinik } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";

// Custom hook untuk fetching data
const useFetchMedical = (sliceName, fetchAction) => {
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

// Hook utama untuk mengelola semua data medis
const useMedicalData = () => {
  // Fetch Dokter
  const {
    data: DokterData,
    loading: loadingDokter,
    handleLoadMore: handleLoadMoreDokter,
  } = useFetchMedical("Dokter", fetchDokter);

  // Fetch DokterPoli
  const {
    data: DokterPoliData,
    loading: loadingDokterPoli,
    handleLoadMore: handleLoadMoreDokterPoli,
  } = useFetchMedical("DokterPoli", fetchDokterPoli);

  // Fetch PoliKlinik
  const {
    data: PoliKlinikData,
    loading: loadingPoliKlinik,
    handleLoadMore: handleLoadMorePoliKlinik,
  } = useFetchMedical("PoliKlinik", fetchPoliKlinik);

  // Format data menjadi options
  const DokterOptions = DokterData.map((item) => ({
    label: item.nmDokter,
    value: item.dokterId,
  }));

  const DokterPoliOptions = DokterPoliData.map((item) => ({
    label: item.nmDokterPoli,
    value: item.dokterPoliId,
  }));

  const PoliKlinikOptions = PoliKlinikData.map((item) => ({
    label: item.namaPoliklinik,
    value: item.poliklinikId,
  }));

  return {
    DokterOptions,
    loadingDokter,
    handleLoadMoreDokter,
    DokterPoliOptions,
    loadingDokterPoli,
    handleLoadMoreDokterPoli,
    PoliKlinikOptions,
    loadingPoliKlinik,
    handleLoadMorePoliKlinik,
  };
};

export default useMedicalData;
