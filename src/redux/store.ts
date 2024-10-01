import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import dataSlice from "./Slices/dataSlice";
import searchSlice from "./Slices/searchSlice";
const store = configureStore({
  reducer: {
    /** Đây là nơi import các slices */
    cart: cartSlice,
    data: dataSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
