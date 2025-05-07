import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userAvatarChange,
  userAvatarDelete,
  userCurrent,
  userInfoUpdate,
  userLogin,
  userLogout,
  userRefresh,
  userRegister,
} from "../auth/operations";
import {
  categoryChangeInfo,
  categoryDelete,
  categoryGetAll,
  categoryPost,
} from "../category/operations";
import {
  transactionsGetByType,
  transactionPost,
  transactionDelete,
  transactionChangeInfo,
} from "./operations";

const initialState = {
  items: [],
  transactionsTotal: {
    incomes: null,
    expences: null,
  },
  error: null,
  isLoading: false,
};

const allOperations = [
  userLogin,
  userLogout,
  userRegister,
  userRefresh,
  userCurrent,
  userInfoUpdate,
  userAvatarChange,
  userAvatarDelete,
  categoryPost,
  categoryGetAll,
  categoryChangeInfo,
  categoryDelete,
  transactionPost,
  transactionsGetByType,
  transactionDelete,
  transactionChangeInfo,
];

const allOperationsCertainResalt = (resalt) => {
  switch (resalt) {
    case "pending":
      return allOperations.map((el) => el.pending);
    case "rejected":
      return allOperations.map((el) => el.rejected);
    case "fulfilled":
      return allOperations.map((el) => el.fulfilled);
    default:
      console.log("only pending, rejected or fulfilled");
  }
};

const slice = createSlice({
  name: "transactionsSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      })
      .addCase(transactionPost.fulfilled, (state, action) => {
        state.transactionsTotal[action.payload.type] += action.payload.sum;
      })
      .addCase(transactionsGetByType.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(transactionDelete.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id == action.payload._id
        );
        state.transactionsTotal[action.payload.type] -= action.payload.sum;
      })
      .addCase(transactionChangeInfo.fulfilled, (state, action) => {
        const changedTransaction = action.payload;
        let indexOfChangedTransaction = state.expenses.findIndex(
          (item) => item._id == changedTransaction._id
        );
        state.transactionsTotal[changedTransaction.type] -=
          state.items[indexOfChangedTransaction];
        state.items[indexOfChangedTransaction] = changedTransaction;
        state.transactionsTotal[changedTransaction.type] +=
          changedTransaction.sum;
      })
      .addMatcher(
        isAnyOf(userLogin.fulfilled, userCurrent.fulfilled),
        (state, action) => {
          if (action.payload.transactionsTotal) {
            state.transactionsTotal.incomes =
              action.payload.transactionsTotal.incomes;
            state.transactionsTotal.expences =
              action.payload.transactionsTotal.expences;
          }
        }
      )
      .addMatcher(
        isAnyOf(...allOperationsCertainResalt("pending")),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...allOperationsCertainResalt("rejected")),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(...allOperationsCertainResalt("fulfilled")),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const transactionsReduser = slice.reducer;
