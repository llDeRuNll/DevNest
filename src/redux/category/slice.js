import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout } from "../auth/operations";

const initialState = {
  incomes: [],
  expenses: [],
};

const slice = createSlice({
  name: "categorySlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.incomes = action.payload.user.categories.incomes;
        state.expenses = action.payload.user.categories.expenses;
      })
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      });
  },
});

export const categoryReduser = slice.reducer;
