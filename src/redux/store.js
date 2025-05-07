import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { authReduser } from "./auth/slice";
import { categoryReduser } from "./category/slice";
import { transactionsReduser } from "./transactions/slice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root-auth",
  storage,
  version: 1,
  whitelist: "refreshToken",
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReduser),
    category: categoryReduser,
    transactions: transactionsReduser,
  },
});

export const persistor = persistStore(store);
