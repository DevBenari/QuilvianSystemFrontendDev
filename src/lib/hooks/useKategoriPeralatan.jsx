import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKategoriPeralatan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";

const useKategoriPeralatanData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    data: KategoriPeralatanData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.KategoriPeralatan);

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(
        fetchKategoriPeralatan({ page: 1, perPage: 10, isInfiniteScroll: true })
      );
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);

      console.log(`🔄 Fetching page ${nextPage}...`);
      dispatch(
        fetchKategoriPeralatan({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  const KategoriPeralatanOptions = KategoriPeralatanData.map((item) => ({
    label: item.namaKategoriPeralatan,
    value: item.kategoriPeralatanId,
  }));

  return {
    KategoriPeralatanOptions,
    loading,
    handleLoadMore,
  };
};

export default useKategoriPeralatanData;
