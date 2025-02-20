import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinsi } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice';
import { fetchKabupatenKota } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKota';
import { fetchNegara } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice';

const useSelectWilayah = () => {
  const dispatch = useDispatch();
  
  // State selections
  const [selectedNegara, setSelectedNegara] = useState(null);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);

  // Pagination states
  const [negaraPage, setNegaraPage] = useState(1);
  const [provinsiPage, setProvinsiPage] = useState(1);
  const [kabupatenPage, setKabupatenPage] = useState(1);

  // Refs for tracking last fetched pages
  const lastNegaraFetchedPage = useRef(1);
  const lastProvinsiFetchedPage = useRef(1);
  const lastKabupatenFetchedPage = useRef(1);

  // Redux selectors
  const {
    data: negaraData,
    loading: negaraLoading,
    totalPages: negaraTotalPages,
    loadedPages: negaraLoadedPages,
  } = useSelector(state => state.negara);

  const { 
    data: provinsiData, 
    loading: provinsiLoading, 
    totalPages: provinsiTotalPages, 
    loadedPages: provinsiLoadedPages 
  } = useSelector(state => state.Provinsi);
  
  const { 
    data: kabupatenData, 
    loading: kabupatenLoading, 
    totalPages: kabupatenTotalPages, 
    loadedPages: kabupatenLoadedPages 
  } = useSelector(state => state.KabupatenKota);

  // Initial data fetching
  useEffect(() => {
    if(!negaraLoadedPages.includes(1)) {
      dispatch(fetchNegara({page: 1, perPage: 10, isInfiniteScroll: true}));
    }
  }, [dispatch, negaraLoadedPages]);

  // Fetch provinsi when negara is selected
  useEffect(() => {
    if (selectedNegara) {
      setProvinsiPage(1);
      lastProvinsiFetchedPage.current = 1;
      dispatch(fetchProvinsi({ 
        negaraId: selectedNegara,
        page: 1, 
        perPage: 10, 
        isInfiniteScroll: true 
      }));
      // Reset dependent fields
      setSelectedProvinsi(null);
      setSelectedKabupaten(null);
    }
  }, [dispatch, selectedNegara]);

  // Fetch kabupaten when provinsi is selected
  useEffect(() => {
    if (selectedProvinsi) {
      setKabupatenPage(1);
      lastKabupatenFetchedPage.current = 1;
      dispatch(fetchKabupatenKota({ 
        provinsiId: selectedProvinsi, 
        page: 1, 
        perPage: 10, 
        isInfiniteScroll: true 
      }));
      // Reset dependent field
      setSelectedKabupaten(null);
    }
  }, [dispatch, selectedProvinsi]);

  // Handle infinite scroll for each select
  const handleLoadMoreNegara = () => {
    if(negaraPage < negaraTotalPages && !negaraLoading && !negaraLoadedPages.includes(negaraPage + 1)) {
      const nextPage = negaraPage + 1;
      lastNegaraFetchedPage.current = nextPage;
      setNegaraPage(nextPage);
      dispatch(fetchNegara({ page: nextPage, perPage: 10, isInfiniteScroll: true }));
    }
  };

  const handleLoadMoreProvinsi = () => {
    if (provinsiPage < provinsiTotalPages && !provinsiLoading && !provinsiLoadedPages.includes(provinsiPage + 1)) {
      const nextPage = provinsiPage + 1;
      lastProvinsiFetchedPage.current = nextPage;
      setProvinsiPage(nextPage);
      dispatch(fetchProvinsi({ 
        negaraId: selectedNegara,
        page: nextPage, 
        perPage: 10, 
        isInfiniteScroll: true 
      }));
    }
  };

  const handleLoadMoreKabupaten = () => {
    if (kabupatenPage < kabupatenTotalPages && !kabupatenLoading && !kabupatenLoadedPages.includes(kabupatenPage + 1)) {
      const nextPage = kabupatenPage + 1;
      lastKabupatenFetchedPage.current = nextPage;
      setKabupatenPage(nextPage);
      dispatch(fetchKabupatenKota({ 
        provinsiId: selectedProvinsi, 
        page: nextPage, 
        perPage: 10, 
        isInfiniteScroll: true 
      }));
    }
  };

  // Format options for select components
  const negaraOptions = negaraData.map(item => ({
    label: item.namaNegara,
    value: item.negaraId
  }));

  const provinsiOptions = provinsiData.map(item => ({
    label: item.namaProvinsi,
    value: item.provinsiId
  }));

  const kabupatenOptions = kabupatenData.map(item => ({
    label: item.namaKabupatenKota,
    value: item.kabupatenKotaId
  }));

  return {
    // Selected values
    selectedNegara,
    setSelectedNegara,
    selectedProvinsi,
    setSelectedProvinsi,
    selectedKabupaten,
    setSelectedKabupaten,

    // Options for selects
    negaraOptions,
    provinsiOptions,
    kabupatenOptions,

    // Loading states
    negaraLoading,
    provinsiLoading,
    kabupatenLoading,

    // Infinite scroll handlers
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupaten,
  };
};

export default useSelectWilayah;