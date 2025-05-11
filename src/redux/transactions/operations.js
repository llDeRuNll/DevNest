import { createAsyncThunk } from "@reduxjs/toolkit";
import { trackerApi } from "../auth/operations";

export const transactionPost = createAsyncThunk(
  "transactions/post",
  async (transaction, thunkAPI) => {
    try {
      const response = await trackerApi.post("/transactions", transaction);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const transactionsGetByType = createAsyncThunk(
  "transactions/getTransactions",
  async (params, thunkAPI) => {
    try {
      const response = await trackerApi.get(
        "/transactions/" + params.type,
        "",
        {
          params: {
            date: params.date,
          },
        }
      );
      return { items: response.data, type: params.type };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// приймає цілий об'єкт транзакції, а не тільки id
export const transactionDelete = createAsyncThunk(
  "transactions/delete",
  async ({ _id, type, sum }, thunkAPI) => {
    try {
      await trackerApi.delete("/transactions/" + _id);
      return { _id, type, sum };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const transactionChangeInfo = createAsyncThunk(
  "transactions/change",
  async ({ _id, type, ...newInfo }, thunkAPI) => {
    try {
      const response = await trackerApi.patch(
        `/transactions/${type}/${_id}`,
        newInfo
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
