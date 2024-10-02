import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import dataSlice from "./Slices/dataSlice";
import searchSlice from "./Slices/searchSlice";
import userSlice from "./Slices/userSlice";
const store = configureStore({
  reducer: {
    /** Đây là nơi import các slices */
    cart: cartSlice,
    data: dataSlice,
    search: searchSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
