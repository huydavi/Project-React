import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username; // Cập nhật trạng thái người dùng đăng nhập
    },
    logout: (state) => {
      state.username = null; // Xóa trạng thái người dùng khi logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.username; // Selector để lấy thông tin user
export default userSlice.reducer;
