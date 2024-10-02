// userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null, // Trạng thái ban đầu là không có người dùng đăng nhập
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.username = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
