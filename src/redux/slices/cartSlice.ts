import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
  status: "LOADING" | "LOADED" | "EMPTY";
  books: Book[];
  totalPrice: number;
};

const initialState: CartState = {
  status: localStorage.getItem("cart") ? "LOADED" : "EMPTY",
  books: JSON.parse(localStorage.getItem("cart") || "{}")?.books ?? [],
  totalPrice:
    JSON.parse(
      localStorage.getItem("cart") ??
        '{"status": "EMPTY", "books": [], "totalPrice": 0}'
    ).totalPrice || 0,
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
      state.totalPrice = action.payload.reduce(
        (acc, cur) => acc + cur?.bookPricing?.cost.amount,
        0
      );
    },
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
      state.status = "LOADED";
      state.totalPrice += action.payload?.bookPricing?.cost.amount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeBook(state, action: PayloadAction<Book>) {
      state.books = state.books.filter(
        (book) => book?.id !== action.payload?.id
      );
      if (state.books.length === 0) {
        state.status = "EMPTY";
      }

      state.totalPrice -=
        action.payload?.bookPricing?.cost.amount * action.payload?.quantity;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.books = [];
      state.status = "EMPTY";
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
    modifyQuantity(
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>
    ) {
      state.totalPrice = state.books.reduce((acc, cur) => {
        if (cur.id === action.payload.bookId) {
          cur.quantity = action.payload.quantity;
        }

        return acc + cur?.bookPricing?.cost.amount * cur.quantity;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { clearCart, addBook, removeBook, modifyQuantity, addBooks } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
