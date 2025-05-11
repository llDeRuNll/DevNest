import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userCurrent,
  userLogin,
  userLogout,
  userRefresh,
} from "../auth/operations";
import {
  categoryPost,
  categoryGetAll,
  categoryChangeInfo,
  categoryDelete,
} from "./operations";

const initialState = {
  incomes: [],
  expenses: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(userLogout.fulfilled, () => initialState)
      .addCase(userRefresh.rejected, () => initialState)

      .addCase(categoryPost.fulfilled, (state, action) => {
        const newCat = action.payload;
        if (newCat.type === "incomes") {
          state.incomes.push(newCat);
        } else if (newCat.type === "expenses") {
          state.expenses.push(newCat);
        }
      })

      .addCase(categoryGetAll.fulfilled, (state, action) => {
        const { incomes = [], expenses = [] } = action.payload;
        state.incomes = incomes.map((cat) => ({ ...cat, type: "incomes" }));
        state.expenses = expenses.map((cat) => ({ ...cat, type: "expenses" }));
      })

      .addCase(categoryChangeInfo.fulfilled, (state, action) => {
        const updated = action.payload;
        const list =
          updated.type === "incomes" ? state.incomes : state.expenses;
        const idx = list.findIndex((c) => c._id === updated._id);
        if (idx !== -1) list[idx] = updated;
      })

      .addCase(categoryDelete.fulfilled, (state, action) => {
        const payload = action.payload;
        let id;
        let type;
        if (typeof payload === "string") {
          id = payload;
        } else {
          id = payload.id;
          type = payload.type;
        }
        if (type === "incomes") {
          state.incomes = state.incomes.filter((c) => c._id !== id);
        } else if (type === "expenses") {
          state.expenses = state.expenses.filter((c) => c._id !== id);
        } else {
          state.incomes = state.incomes.filter((c) => c._id !== id);
          state.expenses = state.expenses.filter((c) => c._id !== id);
        }
      })

      .addMatcher(
        isAnyOf(userLogin.fulfilled, userCurrent.fulfilled),
        (state, action) => {
          const { categories } = action.payload;
          if (categories.incomes)
            state.incomes = categories.incomes.map((cat) => ({
              ...cat,
              type: "incomes",
            }));
          if (categories.expenses)
            state.expenses = categories.expenses.map((cat) => ({
              ...cat,
              type: "expenses",
            }));
        }
      );
  },
});

const categoryReduser = categorySlice.reducer;
export { categoryReduser };
export default categorySlice.reducer;
