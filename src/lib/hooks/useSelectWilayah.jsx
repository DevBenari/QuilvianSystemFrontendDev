import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinsi } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice';
import { fetchKabupatenKota } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKota';
import { fetchNegara } from '../state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice';

const useSelectWilayah = () => {
  const dispatch = useDispatch();
  
  // State untuk Negara
  const [negaraPage, setNegaraPage] = useState(1);
  const lastNegaraFetchedPage = useRef(1);
  const {
    data: negaraData,
    Loading: isLoadingNegara,
    error: errorNegara,
    loadedPages: negaraLoadedPages,
  } = useSelector(state => state.negara);

  // State untuk Provinsi
  const [provinsiPage, setProvinsiPage] = useState(1);
  const lastProvinsiFetchedPage = useRef(1);
  const { 
    data: provinsiData, 
    loading: provinsiLoading, 
    totalPages: provinsiTotalPages, 
    loadedPages: provinsiLoadedPages 
  } = useSelector(state => state.Provinsi);
  
  // State untuk Kabupaten/Kota
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [kabupatenPage, setKabupatenPage] = useState(1);
  const lastKabupatenFetchedPage = useRef(1);
  const { 
    data: kabupatenData, 
    loading: kabupatenLoading, 
    totalPages: kabupatenTotalPages, 
    loadedPages: kabupatenLoadedPages 
  } = useSelector(state => state.KabupatenKota);

  useEffect(() => {
    if(!negaraLoadedPages.includes(1)) {
      dispatch(fetchNegara({page: 1, perPage: 10, isInfiniteScroll: true}));
    }
  }, [dispatch, negaraData]);

  // Fetch provinsi hanya jika negara Indonesia dipilih
  useEffect(() => {
    if (negaraData === "Indonesia" && !provinsiLoadedPages.includes(1)) {
      dispatch(fetchProvinsi({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, negaraData, provinsiLoadedPages]);

  // Fetch kabupaten/kota saat provinsi dipilih
  useEffect(() => {
    if (selectedProvinsi) {
      setKabupatenPage(1); // Reset pagination saat Provinsi berubah
      dispatch(fetchKabupatenKota({ provinsiId: selectedProvinsi, page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, selectedProvinsi]);

  const handleLoadMoreNegara = () => {
    if(negaraPage < negaraTotalPages && !isLoadingNegara && !negaraLoadedPages.includes(negaraPage + 1)) {
      const nextPage = negaraPage + 1;
      lastNegaraFetchedPage.current = nextPage;
      setNegaraPage(nextPage);
      dispatch(fetchNegara({ page: nextPage, perPage: 10, isInfiniteScroll: true }));
    }
  }

  // Handle Load More Provinsi
  const handleLoadMoreProvinsi = () => {
    if (provinsiPage < provinsiTotalPages && !provinsiLoading && !provinsiLoadedPages.includes(provinsiPage + 1)) {
      const nextPage = provinsiPage + 1;
      lastProvinsiFetchedPage.current = nextPage;
      setProvinsiPage(nextPage);
      dispatch(fetchProvinsi({ page: nextPage, perPage: 10, isInfiniteScroll: true }));
    }
  };

  // Handle Load More Kabupaten/Kota
  const handleLoadMoreKabupaten = () => {
    if (kabupatenPage < kabupatenTotalPages && !kabupatenLoading && !kabupatenLoadedPages.includes(kabupatenPage + 1)) {
      const nextPage = kabupatenPage + 1;
      lastKabupatenFetchedPage.current = nextPage;
      setKabupatenPage(nextPage);
      dispatch(fetchKabupatenKota({ provinsiId: selectedProvinsi, page: nextPage, perPage: 10, isInfiniteScroll: true }));
    }
  };

  const negaraOptions = negaraData.map(items => ({
    label: items.namaNegara,
    value: items.negaraId
  }))

  return {
    negaraPage,
    setNegaraPage,
    negaraOptions,
    provinsi: provinsiData,
    kabupaten: kabupatenData,
    handleChangeProvinsi: setSelectedProvinsi,
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupaten,
    provinsiLoading,
    kabupatenLoading
  };
};

export default useSelectWilayah;
