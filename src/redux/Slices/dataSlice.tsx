// src/features/dataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface DataState {
  items: Product[];
  allItems: Product[];
}

const initialState: DataState = {
  items: [],
  allItems: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.allItems = action.payload;
    },
  },
});

export const { setItems } = dataSlice.actions;

export const selectData = (state: { data: DataState }) => state.data.items;

export const selectAllData = (state: any) => state.data.allItems;

export default dataSlice.reducer;
