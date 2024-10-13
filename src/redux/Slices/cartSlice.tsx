// src/redux/Slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      // Thêm hàm này
      state.items = [];
    },
  },
});

// Selector để lấy tổng số lượng sản phẩm trong giỏ hàng
export const selectTotalQuantity = (state: { cart: CartState }): number =>
  state.cart.items.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state: any) => state.cart.items;
export default cartSlice.reducer;
