import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const useAsuransiData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // Hanya Asuransi

  const {
    data: AsuransiData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Asuransi);

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(fetchAsuransi({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);

      console.log(`🔄 Fetching page ${nextPage}...`);
      dispatch(
        fetchAsuransi({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  const AsuransiOptions = AsuransiData.map((item) => ({
    label: item.namaAsuransi,
    value: item.asuransiId,
  }));

  return {
    AsuransiOptions,
    loading,
    handleLoadMore,
  };
};

export default useAsuransiData;
