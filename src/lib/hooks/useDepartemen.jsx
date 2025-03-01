import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartement } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-departemen/DepartemenSlice";

const useDepartementData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    data: DepartementData,
    loading,
    totalPages,
    loadedPages,
  } = useSelector((state) => state.Departement);

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(
        fetchDepartement({ page: 1, perPage: 10, isInfiniteScroll: true })
      );
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);

      console.log(`🔄 Fetching page ${nextPage}...`);
      dispatch(
        fetchDepartement({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  const DepartementOptions = DepartementData.map((item) => ({
    label: item.namaDepartement,
    value: item.departementId,
  }));

  return {
    DepartementOptions,
    loading,
    handleLoadMore,
  };
};

export default useDepartementData;
