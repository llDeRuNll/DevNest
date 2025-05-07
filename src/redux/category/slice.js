import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { userCurrent, userLogin, userLogout } from "../auth/operations";
import {
  categoryChangeInfo,
  categoryDelete,
  categoryGetAll,
  categoryPost,
} from "./operations";

const initialState = {
  incomes: [],
  expenses: [],
};

const slice = createSlice({
  name: "categorySlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(userLogin.fulfilled, userCurrent.fulfilled),
        (state, action) => {
          state.incomes = action.payload.user.categories.incomes;
          state.expenses = action.payload.user.categories.expenses;
        }
      )
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      })
      .addCase(categoryPost.fulfilled, (state, action) => {
        const newPost = action.payload;
        if (newPost.type == "incomes") state.incomes.push(newPost);
        else state.expenses.push(newPost);
      })
      .addCase(categoryGetAll.fulfilled, (state, action) => {
        state.incomes = action.payload.incomes;
        state.expenses = action.payload.expenses;
      })
      .addCase(categoryChangeInfo.fulfilled, (state, action) => {
        const changedCategory = action.payload;
        let indexOfChangedCategory = state.expenses.findIndex(
          (item) => item._id == changedCategory._id
        );
        if (indexOfChangedCategory === undefined) {
          indexOfChangedCategory = state.incomes.findIndex(
            (item) => item._id == changedCategory._id
          );
          state.incomes[indexOfChangedCategory] = changedCategory;
        } else state.expenses[indexOfChangedCategory] = changedCategory;
      })
      .addCase(categoryDelete.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(
          (item) => item._id == action.payload
        );
        state.expenses = state.expenses.filter(
          (item) => item._id == action.payload
        );
      });
  },
});

export const categoryReduser = slice.reducer;
