import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userCurrent,
  userLogin,
  userLogout,
  userRefresh,
} from "../auth/operations";
import {
  // categoryPost,
  categoryGetAll,
  // categoryChangeInfo,
  // categoryDelete,
} from "./operations";

const initialState = {
  incomes: [],
  expenses: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(userLogout.fulfilled, () => initialState)
      .addCase(userRefresh.rejected, () => initialState)

      // .addCase(categoryPost.fulfilled, (state, { payload }) => {
      //   if (payload.type === "incomes") {
      //     state.incomes.push({...payload, type: "incomes"});
      //   } else {
      //     state.expenses.push({...payload, type: "expenses"});
      //   }
      // })

      .addCase(categoryGetAll.fulfilled, (state, { payload }) => {
        state.incomes = payload.incomes;
        state.expenses = payload.expenses;
      })

      // .addCase(categoryChangeInfo.fulfilled, (state, { payload }) => {
      //   try {
      //     const changed = payload;
      //     if (payload.incomes) {
      //       const incIdx = state.incomes.findIndex(
      //         (c) => c._id === changed._id
      //       );
      //       if (incIdx !== -1) {
      //         state.incomes[incIdx] = changed;
      //       }
      //     } else {
      //       const expIdx = state.expenses.findIndex(
      //         (c) => c._id === changed._id
      //       );
      //       if (expIdx !== -1) {
      //         state.expenses[expIdx] = changed;
      //       }
      //     }
      //   } catch (e) {
      //     console.log(e);
      //   }
      // })

      // .addCase(categoryDelete.fulfilled, (state, { payload }) => {
      //   if (payload.incomes)
      //     state.incomes = state.incomes.filter((c) => c._id !== payload);
      //   if (payload.expenses)
      //     state.expenses = state.expenses.filter((c) => c._id !== payload);
      // })

      .addMatcher(
        isAnyOf(userLogin.fulfilled, userCurrent.fulfilled),
        (state, action) => {
          const { incomes, expenses } = action.payload.user.categories;
          state.incomes = incomes;
          state.expenses = expenses;
        }
      );
  },
});

export const categoryReduser = categorySlice.reducer;
