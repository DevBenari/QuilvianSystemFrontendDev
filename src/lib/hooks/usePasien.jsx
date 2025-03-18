import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPasienSlice } from "../state/slice/Manajemen-kesehatan-slices/pasienSlice";

// Custom hook untuk fetching data
const useFetchPasien = (sliceName, fetchAction) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { data, loading, totalPages, loadedPages } = useSelector(
    (state) => state[sliceName]
  );

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
const usePasienData = () => {
  // Fetch Pasien
  const {
    data: PasienData,
    loading: loadingPasien,
    handleLoadMore: handleLoadMorePasien,
  } = useFetchPasien("pasien", fetchPasienSlice);

  //  ini daftar pasien
  const PasienOptions = PasienData.map((item) => ({
    label: item.namaLengkap,
    value: item.pendaftaranPasienBaruId,
  }));

  return {
    PasienOptions,
    loadingPasien,
    handleLoadMorePasien,
  };
};

export default usePasienData;
