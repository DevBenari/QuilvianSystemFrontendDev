// hooks/useProvinsiData.js
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinsi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import { fetchKabupatenKota } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import { fetchKecamatan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import { fetchKelurahan } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";

const useWilayahData = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(1);

  const {
    data: ProvinsiData,
    loading: loadingProvinsi,
    totalPages: totalPagesProvinsi,
    loadedPages: loadedPagesProvinsi,
  } = useSelector((state) => state.Provinsi);

  useEffect(() => {
    if (!loadedPagesProvinsi.includes(1)) {
      dispatch(fetchProvinsi({ page: 1, perPage: 10, isInfiniteScroll: true }));
    }
  }, [dispatch, loadedPagesProvinsi]);

  const handleLoadMoreProvinsi = () => {
    if (
      page < totalPagesProvinsi &&
      !loadingProvinsi &&
      !loadedPagesProvinsi.includes(page + 1)
    ) {
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

  const {
    data: KabupatenKotaData,
    loading: loadingKabupatenKota,
    totalPages: totalPagesKabupatenKota,
    loadedPages: loadedPagesKabupatenKota,
  } = useSelector((state) => state.KabupatenKota);

  useEffect(() => {
    // Initial load
    if (!loadedPagesKabupatenKota.includes(1)) {
      dispatch(
        fetchKabupatenKota({
          page: 1,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  }, [dispatch, loadedPagesKabupatenKota]);

  const handleLoadMoreKabupatenKota = () => {
    if (
      page < totalPagesKabupatenKota &&
      !loadingKabupatenKota &&
      !loadedPagesKabupatenKota.includes(page + 1)
    ) {
      const nextPage = page + 1;
      lastFetchedPage.current = nextPage;
      setPage(nextPage);

      dispatch(
        fetchKabupatenKota({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KabupatenKotaOptions = KabupatenKotaData.map((item) => ({
    label: item.namaKabupatenKota,
    value: item.kabupatenKotaId,
  }));

  const {
    data: KecamatanData,
    loading: loadingKecamatan,
    totalPages: totalPagesKecamatan,
    loadedPages: loadedPagesKecamatan,
  } = useSelector((state) => state.Kecamatan);

  useEffect(() => {
    // Initial load
    if (!loadedPagesKecamatan.includes(1)) {
      dispatch(
        fetchKecamatan({
          page: 1,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  }, [dispatch, loadedPagesKecamatan]);

  const handleLoadMoreKecamatan = () => {
    if (
      page < totalPagesKecamatan &&
      !loadingKecamatan &&
      !loadedPagesKecamatan.includes(page + 1)
    ) {
      const nextPage = page + 1;
      lastFetchedPage.current = nextPage;
      setPage(nextPage);

      dispatch(
        fetchKecamatan({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KecamatanOptions = KecamatanData.map((item) => ({
    label: item.namaKecamatan,
    value: item.kecamatanId,
  }));

  // Kelurahann

  const {
    data: KelurahanData,
    loading: loadingKelurahan,
    totalPages: totalPagesKelurahan,
    loadedPages: loadedPagesKelurahan,
  } = useSelector((state) => state.Kelurahan);

  useEffect(() => {
    // Initial load
    if (!loadedPagesKelurahan.includes(1)) {
      dispatch(
        fetchKelurahan({
          page: 1,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  }, [dispatch, loadedPagesKelurahan]);

  const handleLoadMoreKelurahan = () => {
    if (
      page < totalPagesKelurahan &&
      !loadingKelurahan &&
      !loadedPagesKelurahan.includes(page + 1)
    ) {
      const nextPage = page + 1;
      lastFetchedPage.current = nextPage;
      setPage(nextPage);

      dispatch(
        fetchKelurahan({
          page: nextPage,
          perPage: 10,
          isInfiniteScroll: true,
        })
      );
    }
  };

  // Transform data untuk select options
  const KelurahanOptions = KelurahanData.map((item) => ({
    label: item.namaKelurahan,
    value: item.kelurahanId,
  }));

  return {
    KabupatenKotaOptions,
    ProvinsiOptions,
    KecamatanOptions,
    KelurahanOptions,
    loadingProvinsi,
    loadingKabupatenKota,
    loadingKecamatan,
    loadingKelurahan,
    handleLoadMoreProvinsi,
    handleLoadMoreKabupatenKota,
    handleLoadMoreKecamatan,
    handleLoadMoreKelurahan,
  };
};

export default useWilayahData;
