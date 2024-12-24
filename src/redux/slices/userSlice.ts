import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  first_name: string;
  last_name: string;
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
    },
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default userSlice.reducer;
