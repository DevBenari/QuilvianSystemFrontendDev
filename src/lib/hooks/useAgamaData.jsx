// hooks/useAgamaData.js
import { useCallback, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgama } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice';

const useAgamaData = () => {
  const dispatch = useDispatch();
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  
  const { 
    data: agamaData, 
    loading, 
    totalPages,
    error 
  } = useSelector((state) => state.agama);

  // Load initial data
  useEffect(() => {
    if (agamaData.length === 0) {
      dispatch(fetchAgama({ page: 1, perPage: 10 }));
    }
  }, [dispatch, agamaData.length]);

  const handleLoadMore = useCallback(() => {
    if (loadingRef.current || pageRef.current >= totalPages) {
      console.log('Skip loading:', { 
        isLoading: loadingRef.current, 
        currentPage: pageRef.current, 
        totalPages 
      });
      return;
    }

    loadingRef.current = true;
    const nextPage = pageRef.current + 1;
    console.log('Loading more data, page:', nextPage);

    dispatch(fetchAgama({ page: nextPage, perPage: 10 }))
      .then(() => {
        pageRef.current = nextPage;
        loadingRef.current = false;
      })
      .catch(() => {
        loadingRef.current = false;
      });
  }, [dispatch, totalPages]);

  // Memoize options untuk mencegah re-render
  const agamaOptions = useMemo(() => 
    agamaData?.map(item => ({
      label: item.namaAgama,
      value: item.agamaId
    })) || [],
    [agamaData]
  );

  return {
    agamaOptions,
    loading,
    error,
    handleLoadMore,
    hasMore: pageRef.current < totalPages
  };
};

export default useAgamaData;