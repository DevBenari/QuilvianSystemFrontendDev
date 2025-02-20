// hooks/useProvinsiData.js
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinsi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const useProvinsiData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    data: ProvinsiData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Provinsi);

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(fetchProvinsi({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);

      console.log(`🔄 Fetching page ${nextPage}...`);
      dispatch(
        fetchProvinsi({ page: nextPage, perPage: 10, isInfiniteScroll: true })
      );
    }
  };

  const ProvinsiOptions = ProvinsiData.map((item) => ({
    label: item.namaProvinsi,
    value: item.provinsiId,
  }));

  return {
    ProvinsiOptions,
    loading,
    handleLoadMore,
  };
};

export default useProvinsiData;
