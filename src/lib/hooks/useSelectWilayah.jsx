import { useDispatch, useSelector } from "react-redux";
import { fetchKabupatenByProvinsi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kabupatenSlice";
import { fetchKecamatanByKabupaten } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kecamatanSlice";
import { fetchKelurahanByKecamatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kelurahanSlice";
import { fetchProvinsi } from "../state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const UseSelectWilayah = () => {
  const dispatch = useDispatch();

  const { data: provinsi } = useSelector((state) => state.provinsi);
  const { data: kabupaten } = useSelector((state) => state.kabupaten);
  const { data: kecamatan } = useSelector((state) => state.kecamatan);
  const { data: kelurahan } = useSelector((state) => state.kelurahan);

  console.log(provinsi);

  const handleChange = (level, id) => {
    if (level === "negara") dispatch(fetchProvinsi(id));
    if (level === "provinsi") dispatch(fetchKabupatenByProvinsi(id));
    if (level === "kabupaten") dispatch(fetchKecamatanByKabupaten(id));
    if (level === "kecamatan") dispatch(fetchKelurahanByKecamatan(id));
  };

  return { provinsi, kabupaten, kecamatan, kelurahan, handleChange };
};

export default UseSelectWilayah;
