// hooks/useAgamaData.js
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgamaPaged } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice';

const useAgamaData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);
  
  const { 
    data: agamaData, 
    loading,
    totalPages,
    loadedPages 
  } = useSelector((state) => state.agama);

  useEffect(() => {
    // Initial load
    if (!loadedPages.includes(1)) {
      dispatch(fetchAgamaPaged({ 
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
      
      dispatch(fetchAgamaPaged({ 
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true 
      }));
    }
  };

  // Transform data untuk select options
  const agamaOptions = agamaData.map(item => ({
    label: item.namaAgama,
    value: item.agamaId
  }));

  return {
    agamaOptions,
    loading,
    handleLoadMore
  };
};

export default useAgamaData;