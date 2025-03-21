import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinsi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import { fetchKabupatenKota } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import { fetchKecamatan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import { fetchKelurahan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import { fetchNegara } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { fetchKodePos } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kodePosSlice";

const useFetchWilayah = (sliceName, fetchAction) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    data = [],
    loading = false,
    totalPages = 1,
    loadedPages = [],
  } = useSelector((state) => state[sliceName] || {});

  const fetchData = useCallback(
    (params) => {
      dispatch(fetchAction(params));
    },
    [dispatch, fetchAction]
  );

  useEffect(() => {
    if (Array.isArray(loadedPages) && !loadedPages.includes(1)) {
      fetchData({ page: 1, perPage: 10, isInfiniteScroll: true });
    }
  }, [fetchData, loadedPages]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !loading && !loadedPages.includes(page + 1)) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData({
        page: nextPage,
        perPage: 10,
        isInfiniteScroll: true,
      });
    }
  }, [fetchData, loading, loadedPages, page, totalPages]);

  return { data, loading, handleLoadMore };
};

// 🔧 Modular useWilayahData
const useWilayahData = (config = {}) => {
  const {
    data: NegaraData,
    loading: loadingNegara,
    handleLoadMore: handleLoadMoreNegara,
  } = useFetchWilayah("negara", fetchNegara);

  const {
    data: ProvinsiData,
    loading: loadingProvinsi,
    handleLoadMore: handleLoadMoreProvinsi,
  } = useFetchWilayah("Provinsi", fetchProvinsi);

  const {
    data: KabupatenKotaData,
    loading: loadingKabupatenKota,
    handleLoadMore: handleLoadMoreKabupatenKota,
  } = useFetchWilayah("KabupatenKota", fetchKabupatenKota);

  const {
    data: KecamatanData,
    loading: loadingKecamatan,
    handleLoadMore: handleLoadMoreKecamatan,
  } = useFetchWilayah("Kecamatan", fetchKecamatan);

  const {
    data: KelurahanData,
    loading: loadingKelurahan,
    handleLoadMore: handleLoadMoreKelurahan,
  } = useFetchWilayah("Kelurahan", fetchKelurahan);

  const {
    data: KodePosData,
    loading: loadingKodePos,
    handleLoadMore: handleLoadMoreKodePos,
  } = useFetchWilayah("KodePos", fetchKodePos);

  const result = {};

  if (config.negara) {
    result.NegaraOptions = NegaraData.map((item) => ({
      label: item.namaNegara,
      value: item.negaraId,
    }));
    result.loadingNegara = loadingNegara;
    result.handleLoadMoreNegara = handleLoadMoreNegara;
  }

  if (config.provinsi) {
    result.ProvinsiOptions = ProvinsiData.map((item) => ({
      label: item.namaProvinsi,
      value: item.provinsiId,
    }));
    result.loadingProvinsi = loadingProvinsi;
    result.handleLoadMoreProvinsi = handleLoadMoreProvinsi;
  }

  if (config.kabupatenKota) {
    result.KabupatenKotaOptions = KabupatenKotaData.map((item) => ({
      label: item.namaKabupatenKota,
      value: item.kabupatenKotaId,
    }));
    result.loadingKabupatenKota = loadingKabupatenKota;
    result.handleLoadMoreKabupatenKota = handleLoadMoreKabupatenKota;
  }

  if (config.kecamatan) {
    result.KecamatanOptions = KecamatanData.map((item) => ({
      label: item.namaKecamatan,
      value: item.kecamatanId,
    }));
    result.loadingKecamatan = loadingKecamatan;
    result.handleLoadMoreKecamatan = handleLoadMoreKecamatan;
  }

  if (config.kelurahan) {
    result.KelurahanOptions = KelurahanData.map((item) => ({
      label: item.namaKelurahan,
      value: item.kelurahanId,
    }));
    result.loadingKelurahan = loadingKelurahan;
    result.handleLoadMoreKelurahan = handleLoadMoreKelurahan;
  }

  if (config.kodePos) {
    result.KodePosOptions = KodePosData.map((item) => ({
      label: item.namaKelurahan,
      value: item.kodePosId,
    }));
    result.loadingKodePos = loadingKodePos;
    result.handleLoadMoreKodePos = handleLoadMoreKodePos;
  }

  return result;
};

export default useWilayahData;
