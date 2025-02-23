// hooks/useKabupatenKotaData.js
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKabupatenKota } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";

const useKabupatenKotaData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);

  const {
    data: KabupatenKotaData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.KabupatenKota);

  useEffect(() => {
    // Initial load
    if (!loadedPages.includes(1)) {
      dispatch(
        fetchKabupatenKota({
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
        fetchKabupatenKota({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KabupatenKotaOptions = KabupatenKotaData.map((item) => ({
    label: item.namaKabupatenKota,
    value: item.kabupatenKotaId,
  }));

  return {
    KabupatenKotaOptions,
    loading,
    handleLoadMore,
  };
};

export default useKabupatenKotaData;
