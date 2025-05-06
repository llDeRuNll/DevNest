import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  userRefresh,
  userRegister,
} from "../auth/operations";

const initialState = {
  items: [],
  transactionsTotal: {
    incomes: null,
    expences: null,
  },
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: "transactionsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.incomes = action.payload.user.categories.incomes;
        state.expenses = action.payload.user.categories.expenses;
      })
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(userLogin.pending, userLogout.pending, userRegister.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          userLogin.rejected,
          userLogout.rejected,
          userRegister.rejected,
          userRefresh.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const transactionsReduser = slice.reducer;
