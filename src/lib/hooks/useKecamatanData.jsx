// hooks/useKecamatanData.js
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKecamatan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/Kecamatan";

const useKecamatanData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);

  const {
    data: KecamatanData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Kecamatan);

  useEffect(() => {
    // Initial load
    if (!loadedPages.includes(1)) {
      dispatch(
        fetchKecamatan({
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
        fetchKecamatan({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KecamatanOptions = KecamatanData.map((item) => ({
    label: item.namaKecamatan,
    value: item.kecamatanId,
  }));

  return {
    KecamatanOptions,
    loading,
    handleLoadMore,
  };
};

export default useKecamatanData;
