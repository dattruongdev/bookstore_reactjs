import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
};

type SliceState = {
  user: User | null;
  token: string | null;
};

const initialState: SliceState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    login(state, action: PayloadAction<string>) {
      const token = action.payload;
      if (token) {
        state.token = token;
      } else {
        return;
      }
      const data = token?.split(".")[1];
      if (!data) return;

      const decoded = atob(data || "");
      const { sub, ...user } = JSON.parse(decoded);

      state.user = user;
      console.log(user);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default userSlice.reducer;
