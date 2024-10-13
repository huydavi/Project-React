import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import dataSlice from "./Slices/dataSlice";
import searchSlice from "./Slices/searchSlice";
import userSlice from "./Slices/userSlice";
import orderSlice from "./Slices/orderSlice";
import { addOrder, selectOrders } from "./Slices/orderSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    data: dataSlice,
    search: searchSlice,
    user: userSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
