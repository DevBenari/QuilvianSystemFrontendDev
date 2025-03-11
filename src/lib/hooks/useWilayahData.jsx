import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinsi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import { fetchKabupatenKota } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import { fetchKecamatan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import { fetchKelurahan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import { fetchNegara } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";

// Custom hook untuk fetching data wilayah
const useFetchWilayah = (sliceName, fetchAction) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { data, loading, totalPages, loadedPages } = useSelector(
    (state) => state[sliceName]
  );

  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(fetchAction({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPages]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);
      console.log(`🔄 Fetching page ${nextPage} for ${sliceName}...`);
      dispatch(
        fetchAction({ page: nextPage, perPage: 10, isInfiniteScroll: true })
      );
    }
  };

  return { data, loading, handleLoadMore };
};

// Hook utama untuk mengelola data wilayah
const useWilayahData = () => {
  // Fetch Negara
  const {
    data: NegaraData,
    loading: loadingNegara,
    handleLoadMore: handleLoadMoreNegara,
  } = useFetchWilayah("negara", fetchNegara);

  // Fetch Provinsi
  const {
    data: ProvinsiData,
    loading: loadingProvinsi,
    handleLoadMore: handleLoadMoreProvinsi,
  } = useFetchWilayah("Provinsi", fetchProvinsi);

  // Fetch Kabupaten/Kota
  const {
    data: KabupatenKotaData,
    loading: loadingKabupatenKota,
    handleLoadMore: handleLoadMoreKabupatenKota,
  } = useFetchWilayah("KabupatenKota", fetchKabupatenKota);

  // Fetch Kecamatan
  const {
    data: KecamatanData,
    loading: loadingKecamatan,
    handleLoadMore: handleLoadMoreKecamatan,
  } = useFetchWilayah("Kecamatan", fetchKecamatan);

  // Fetch Kelurahan
  const {
    data: KelurahanData,
    loading: loadingKelurahan,
    handleLoadMore: handleLoadMoreKelurahan,
  } = useFetchWilayah("Kelurahan", fetchKelurahan);

  // Format data menjadi options
  const ProvinsiOptions = ProvinsiData.map((item) => ({
    label: item.namaProvinsi,
    value: item.provinsiId,
  }));

  const KabupatenKotaOptions = KabupatenKotaData.map((item) => ({
    label: item.namaKabupatenKota,
    value: item.kabupatenKotaId,
  }));

  const KecamatanOptions = KecamatanData.map((item) => ({
    label: item.namaKecamatan,
    value: item.kecamatanId,
  }));

  const KelurahanOptions = KelurahanData.map((item) => ({
    label: item.namaKelurahan,
    value: item.kelurahanId,
  }));

  const NegaraOptions = NegaraData.map((item) => ({
    label: item.namaNegara,
    value: item.negaraId,
  }));

  return {
    ProvinsiOptions,
    KabupatenKotaOptions,
    KecamatanOptions,
    KelurahanOptions,
    NegaraOptions,
    loadingNegara,
    loadingProvinsi,
    loadingKabupatenKota,
    loadingKecamatan,
    loadingKelurahan,
    handleLoadMoreNegara,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupatenKota,
    handleLoadMoreKecamatan,
    handleLoadMoreKelurahan,
  };
};

export default useWilayahData;
