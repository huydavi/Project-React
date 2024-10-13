import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  id: string;
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalPrice: number;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateOrder(
      state,
      action: PayloadAction<{ id: string; updatedData: Order }>
    ) {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload.updatedData;
      }
    },
    deleteOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const { addOrder, updateOrder, deleteOrder } = orderSlice.actions;
export const selectOrders = (state: any) => state.order.orders;
export default orderSlice.reducer;
