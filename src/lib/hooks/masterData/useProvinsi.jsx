// hooks/useAgamaData.js
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinsi } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice';

const UseProvinsiData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);
  
  const { 
    data: provinsiData, 
    loading,
    totalPages,
    loadedPages 
  } = useSelector((state) => state.Provinsi);

  useEffect(() => {
    // Initial load
    if (!loadedPages.includes(1)) {
      dispatch(fetchProvinsi({ 
        page: 1,
        perPage: 10,
        isInfiniteScroll: true 
      }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      lastFetchedPage.current = nextPage;
      setPage(nextPage);
      
      dispatch(fetchProvinsi({ 
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true 
      }));
    }
  };

  // Transform data untuk select options
  const provinsiOptions = provinsiData.map(item => ({
    label: item.namaProvinsi,
    value: item.provinsiId
  }));

  return {
    provinsiOptions,
    loading,
    handleLoadMore
  };
};

export default UseProvinsiData;