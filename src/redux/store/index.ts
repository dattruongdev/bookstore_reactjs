import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import cartReducer, { modifyQuantity } from "../slices/cartSlice";
import { get } from "http";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: modifyQuantity,
  effect: async (action, listenerApi) => {
    console.log(action, listenerApi.getState());
  },
});

const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
