import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinsi } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice';
import { fetchKabupatenKota } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKota';
import { fetchNegara } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice';
import { fetchKecamatan } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/Kecamatan';
import { fetchKelurahan } from '../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahan';

const useSelectWilayah = () => {
  const dispatch = useDispatch();
  
  // State selections
  const [selectedNegara, setSelectedNegara] = useState(null);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedKelurahan, setSelectedKelurahan] = useState(null);

  // Pagination states
  const [negaraPage, setNegaraPage] = useState(1);
  const [provinsiPage, setProvinsiPage] = useState(1);
  const [kabupatenPage, setKabupatenPage] = useState(1);
  const [kecamatanPage, setKecamatanPage] = useState(1);
  const [kelurahanPage, setKelurahanPage] = useState(1);

  // Refs for tracking last fetched pages
  const lastNegaraFetchedPage = useRef(1);
  const lastProvinsiFetchedPage = useRef(1);
  const lastKabupatenFetchedPage = useRef(1);
  const lastKecamatanFetchedPage = useRef(1);
  const lastKelurahanFetchedPage = useRef(1);

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

  const {
    data: kecamatanData,
    loading: kecamatanLoading,
    totalPages: kecamatanTotalPages,
    loadedPages: kecamatanLoadedPages
  } = useSelector(state => state.Kecamatan);

  const {
    data: kelurahanData,
    loading: kelurahanLoading,
    totalPage: kelurahanTotalPages,
    loadedPages: kelurahanLoadedPages
  } = useSelector(state => state.Kelurahan)

  // Initial data fetching
  useEffect(() => {
    if(!negaraLoadedPages.includes(1)) {
      dispatch(fetchNegara({page: 1, perPage: 10, isInfiniteScroll: true}));
    }
  }, [dispatch, negaraLoadedPages]);

  // Effect untuk fetch provinsi ketika negara Indonesia dipilih
  useEffect(() => {
    if (selectedNegara) {
      const selectedCountry = negaraData.find(negara => negara.negaraId === selectedNegara);
      if (selectedCountry?.namaNegara === 'Indonesia' || selectedCountry?.kodeNegara === 'ID') {
        setProvinsiPage(1);
        lastProvinsiFetchedPage.current = 1;
        dispatch(fetchProvinsi({ 
          page: 1, 
          perPage: 100,
          isInfiniteScroll: true,
          filter: {
            negaraId: selectedNegara
          }
        }));
      } else {
        // Reset provinsi dan kabupaten jika bukan Indonesia
        setSelectedProvinsi(null);
        setSelectedKabupaten(null);
        setSelectedKecamatan(null);
        setProvinsiPage(1);
        setKabupatenPage(1);
        setKecamatanPage(1);
      }
    }
  }, [dispatch, selectedNegara, negaraData]);

  // Effect untuk fetch kabupaten ketika provinsi dipilih
  useEffect(() => {
    if (selectedProvinsi) {
      setKabupatenPage(1);
      lastKabupatenFetchedPage.current = 1;
      dispatch(fetchKabupatenKota({ 
        provinsiId: selectedProvinsi,
        page: 1, 
        perPage: 100,
        isInfiniteScroll: true,
        filter: {
          provinsiId: selectedProvinsi
        }
      }));
      // Reset kabupaten ketika provinsi berubah
      setSelectedKabupaten(null);
      setSelectedKecamatan(null);
      setKecamatanPage(1);
    }
  }, [dispatch, selectedProvinsi]);

  useEffect(() => {
    if(selectedKabupaten){
      setKecamatanPage(1); 
      lastKecamatanFetchedPage.current = 1;
      dispatch(fetchKecamatan({
        kabupatenKotaId: selectedKabupaten,
        page: 1,
        perPage: 100,
        isInfiniteScroll: true,
        filter: {
          kabupatenKotaId: selectedKabupaten
        }
      }))

      setSelectedKecamatan(null);
      setSelectedKelurahan(null);
      setKelurahanPage(1);
      
    }
  }, [dispatch, selectedKabupaten])

  useEffect(() => {
    if(selectedKecamatan){
      setKelurahanPage(1);
      lastKelurahanFetchedPage.current = 1;
      dispatch(fetchKelurahan({
        kecamatanId: selectedKecamatan,
        page: 1,
        perPage: 100,
        isInfiniteScroll: true,
        filter:{
          kecamatanId: selectedKecamatan
        }
      }))
      setSelectedKelurahan(null)
    }
  },[dispatch, selectedKecamatan])

  // Memoized options
  const negaraOptions = useMemo(() => 
    negaraData.map(item => ({
      label: item.namaNegara,
      value: item.negaraId
    })), [negaraData]
  );

  const provinsiOptions = useMemo(() => {
    const selectedCountry = negaraData.find(negara => negara.negaraId === selectedNegara);
    if (selectedCountry?.namaNegara === 'Indonesia' || selectedCountry?.kodeNegara === 'ID') {
      return provinsiData.map(item => ({
        label: item.namaProvinsi,
        value: item.provinsiId
      }));
    }
    return [];
  }, [provinsiData, selectedNegara, negaraData]);

  const kabupatenOptions = useMemo(() => 
    selectedProvinsi ? kabupatenData
      .filter(kab => kab.provinsiId === selectedProvinsi)
      .map(item => ({
        label: item.namaKabupatenKota,
        value: item.kabupatenKotaId
      })) : [], 
    [kabupatenData, selectedProvinsi]
  );

  const kecamatanOptions = useMemo(() => 
    selectedKabupaten ? kecamatanData
    .filter(kec => kec.kabupatenKotaId === selectedKabupaten)
    .map(item => ({
      label: item.namaKecamatan,
      value: item.kecamatanId
    })) : [],
   [kecamatanData, selectedKabupaten]);

   const kelurahanOptions = useMemo(() => 
    selectedKecamatan ? kelurahanData
    .filter(kel => kel.kecamatanId === selectedKecamatan)
    .map(item => ({
      label: item.namaKelurahan,
      value: item.kelurahanId
    })) : [],
   [kelurahanData, selectedKecamatan]);

  // Handler untuk infinite scroll
  const handleLoadMoreNegara = () => {
    if (negaraPage < negaraTotalPages && !negaraLoading && !negaraLoadedPages.includes(negaraPage + 1)) {
      const nextPage = negaraPage + 1;
      setNegaraPage(nextPage);
      dispatch(fetchNegara({ page: nextPage, perPage: 10, isInfiniteScroll: true }));
    }
  };

  const handleLoadMoreProvinsi = () => {
    if (selectedNegara && provinsiPage < provinsiTotalPages && !provinsiLoading && !provinsiLoadedPages.includes(provinsiPage + 1)) {
      const nextPage = provinsiPage + 1;
      setProvinsiPage(nextPage);
      dispatch(fetchProvinsi({ 
        negaraId: selectedNegara,
        page: nextPage, 
        perPage: 100,
        isInfiniteScroll: true 
      }));
    }
  };

  const handleLoadMoreKabupaten = () => {
    if (selectedProvinsi && kabupatenPage < kabupatenTotalPages && !kabupatenLoading && !kabupatenLoadedPages.includes(kabupatenPage + 1)) {
      const nextPage = kabupatenPage + 1;
      setKabupatenPage(nextPage);
      dispatch(fetchKabupatenKota({ 
        provinsiId: selectedProvinsi,
        page: nextPage, 
        perPage: 100,
        isInfiniteScroll: true 
      }));
    }
  };

  const handleLoadMoreKecamatan = () => {
    if(selectedKabupaten && kecamatanPage < kecamatanTotalPages && !kecamatanLoading && !kecamatanLoadedPages.includes(kecamatanPage + 1)){
      const nextPage = kecamatanPage + 1; 
      setKecamatanPage(nextPage);
      setKecamatanPage(nextPage);
      dispatch(fetchKecamatan({
        kabupatenKotaId: selectedKabupaten,
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true
      }))
    }
  }

  const handleLoadMoreKelurahan = () => {
    if(selectedKecamatan && kelurahanPage < kelurahanTotalPages && !kelurahanLoading && !kelurahanLoadedPages.includes(kelurahanPage + 1)){
      const nextPage = kelurahanPage + 1; 
      setKelurahanPage(nextPage);
      dispatch(fetchKelurahan({
        kecamatanId: selectedKecamatan,
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true
      }))
    }
  }
  return {
    selectedNegara,
    setSelectedNegara,
    selectedProvinsi,
    setSelectedProvinsi,
    selectedKabupaten,
    setSelectedKabupaten,
    selectedKecamatan,
    setSelectedKecamatan,
    selectedKelurahan,
    setSelectedKelurahan,
    negaraOptions,
    provinsiOptions,
    kabupatenOptions,
    kecamatanOptions,
    kelurahanOptions,
    negaraLoading,
    provinsiLoading,
    kabupatenLoading,
    kecamatanLoading,
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupaten,
    handleLoadMoreKecamatan,
    handleLoadMoreKelurahan
  };
};

export default useSelectWilayah;