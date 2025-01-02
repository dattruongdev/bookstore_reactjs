import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
  status: "LOADING" | "LOADED" | "EMPTY";
  books: Book[];
};

const initialState: CartState = {
  status: "EMPTY",
  books: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loading(state) {
      state.status = "LOADING";
    },
    addBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
      state.status = "LOADED";
    },
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
      state.status = "LOADED";
    },
    removeBook(state, action: PayloadAction<Book>) {
      state.books = state.books.filter((book) => book.id !== action.payload.id);
      if (state.books.length === 0) {
        state.status = "EMPTY";
      }
    },
    clearCart(state) {
      state.books = [];
      state.status = "EMPTY";
    },
  },
});

export const { clearCart, addBook, removeBook } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
