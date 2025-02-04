import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slice/LoginSlice";
import titleReducer from "@/lib/state/slice/TitleSlice";

const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
  },
});

export default store;
