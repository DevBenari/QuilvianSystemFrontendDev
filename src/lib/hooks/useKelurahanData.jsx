// hooks/useKelurahanData.js
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKelurahan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";

const useKelurahanData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);

  const {
    data: KelurahanData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Kelurahan);

  useEffect(() => {
    // Initial load
    if (!loadedPages.includes(1)) {
      dispatch(
        fetchKelurahan({
          page: 1,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      lastFetchedPage.current = nextPage;
      setPage(nextPage);

      dispatch(
        fetchKelurahan({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KelurahanOptions = KelurahanData.map((item) => ({
    label: item.namaKelurahan,
    value: item.kelurahanId,
  }));

  return {
    KelurahanOptions,
    loading,
    handleLoadMore,
  };
};

export default useKelurahanData;
