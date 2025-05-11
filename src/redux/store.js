import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { authReduser } from "./auth/slice";
import { categoryReduser } from "./category/slice";
import { transactionsReduser } from "./transactions/slice";
import { configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root-auth",
  storage,
  version: 1,
  whitelist: ["refreshToken", "sid", "transactions", "category"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReduser),
    category: categoryReduser,
    transactions: transactionsReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
