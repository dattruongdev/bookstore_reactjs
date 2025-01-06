import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type BookCartItem = {
  book: Book;
  method: "buy" | "borrow";
};

type CartState = {
  status: "LOADING" | "LOADED" | "EMPTY";
  items: BookCartItem[];
  totalPrice: number;
};

const initialState: CartState = {
  status: localStorage.getItem("cart") ? "LOADED" : "EMPTY",
  items: JSON.parse(localStorage.getItem("cart") || "{}")?.items ?? [],
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
      state.items = action.payload.map((book) => ({ book, method: "buy" }));
      state.status = "LOADED";
      state.totalPrice = action.payload.reduce(
        (acc, cur) => acc + cur?.bookPricing?.cost.amount,
        0
      );
    },
    addBook(state, action: PayloadAction<Book>) {
      state.items.push({ book: action.payload, method: "buy" });
      state.status = "LOADED";
      state.totalPrice += action.payload?.bookPricing?.cost.amount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeBook(state, action: PayloadAction<Book>) {
      state.items = state.items.filter(
        (item) => item?.book?.id !== action.payload?.id
      );
      if (state.items.length === 0) {
        state.status = "EMPTY";
      }

      state.totalPrice -=
        action.payload?.bookPricing?.cost.amount * action.payload?.quantity;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.status = "EMPTY";
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
    changeMethod(
      state,
      action: PayloadAction<{ bookId: string; method: "buy" | "borrow" }>
    ) {
      state.items = state.items.map((item) => {
        if (item?.book?.id === action.payload.bookId) {
          item.method = action.payload.method;
          item.book.bookPricing.cost.amount =
            action.payload.method === "buy"
              ? item.book.bookPricing.cost.amount
              : item.book.bookPricing.cost.amount / 2;
        }

        return item;
      });

      localStorage.setItem("cart", JSON.stringify(state));
    },
    modifyQuantity(
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>
    ) {
      state.totalPrice = state.items.reduce((acc, cur) => {
        if (cur?.book?.id === action.payload.bookId) {
          cur.book.quantity = action.payload.quantity;
        }

        return acc + cur?.book?.bookPricing?.cost.amount * cur?.book?.quantity;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  clearCart,
  addBook,
  removeBook,
  modifyQuantity,
  addBooks,
  changeMethod,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
