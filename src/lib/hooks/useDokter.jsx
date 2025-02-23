import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDokter } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";

const useDokterData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    data: DokterData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Dokter);

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(fetchDokter({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);

      console.log(`🔄 Fetching page ${nextPage}...`);
      dispatch(
        fetchDokter({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  const DokterOptions = DokterData.map((item) => ({
    label: item.nmDokter,
    value: item.dokterId,
  }));

  return {
    DokterOptions,
    loading,
    handleLoadMore,
  };
};

export default useDokterData;
