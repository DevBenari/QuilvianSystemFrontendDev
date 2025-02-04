import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slices/auth/LoginSlice";
import titleReducer from "@/lib/state/slices/MasterData/master-informasi/TitleSlice";
import agamaReducer from "@/lib/state/slices/MasterData/master-informasi/AgamaSlice"; // Import AgamaSlice reducer
const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
    agama: agamaReducer, // Tambahkan red
  },
});

export default store;
