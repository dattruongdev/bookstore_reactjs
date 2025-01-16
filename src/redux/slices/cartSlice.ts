import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type BookCartItem = {
  book: Book;
  costForMethod: number;
  method: "buy" | "borrow";
  days: number;
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
      state.items = action.payload.map((book) => ({
        book,
        method: "buy",
        costForMethod: book.bookPricing.cost.amount,
        days: 0,
      }));
      state.status = "LOADED";
      state.totalPrice = action.payload.reduce(
        (acc, cur) => acc + cur?.bookPricing?.cost.amount,
        0
      );
    },
    addBook(state, action: PayloadAction<Book>) {
      console.log("INSIDE addBook action", action.payload);
      state.items.push({
        book: { ...action.payload, quantity: 1 },
        method: "buy",
        costForMethod: action.payload.bookPricing.cost.amount,
        days: 0,
      });
      state.status = "LOADED";
      state.totalPrice += action.payload?.bookPricing?.cost.amount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeBook(state, action: PayloadAction<Book>) {
      state.items = state.items.filter(
        (item) => item?.book?._id !== action.payload?._id
      );
      if (state.items.length === 0) {
        state.status = "EMPTY";
      }

      state.totalPrice = state.items.reduce(
        (acc, cur) => acc + cur?.costForMethod * cur?.book?.quantity,
        0
      );

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
        if (item?.book?._id === action.payload.bookId) {
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
        if (cur?.book?._id === action.payload.bookId) {
          cur.book.quantity = action.payload.quantity;
        }

        return acc + cur?.costForMethod * cur?.book?.quantity;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateBookFromTable(
      state,
      action: PayloadAction<{ index: number; columnId: string; value: any }>
    ) {
      console.log(
        "HELLOOOOOOO",
        action.payload.index,
        action.payload.columnId,
        action.payload.value
      );
      state.items = state.items.map((item, index) => {
        if (index === action.payload.index) {
          if (action.payload.columnId === "method") {
            item.method = action.payload.value;

            item.costForMethod =
              action.payload.value == "buy"
                ? item.book.bookPricing.cost.amount
                : item.book.bookPricing.cost.amount / 2;
          } else if (action.payload.columnId === "days") {
            state.items[index].days = action.payload.value;
          } else {
            console.log(
              "CHOSEN FOR DAYS",
              action.payload.columnId,
              action.payload.value
            );
            item.book = {
              ...item.book,
              [action.payload.columnId]: action.payload.value,
            };
          }
          state.totalPrice = state.items.reduce(
            (acc, cur) =>
              acc +
              cur?.book?.bookPricing?.cost.amount *
                cur?.book?.quantity *
                (cur.method == "buy" ? 1 : 1 / 2),
            0
          );
        }

        return item;
      });

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
  updateBookFromTable,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
