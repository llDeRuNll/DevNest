import { createAsyncThunk } from "@reduxjs/toolkit";
import { trackerApi } from "../auth/operations";

export const categoryPost = createAsyncThunk(
  "category/post",
  async (category, thunkAPI) => {
    try {
      const response = await trackerApi.post("/categories", category);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const categoryGetAll = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await trackerApi.get("/categories");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const categoryChangeInfo = createAsyncThunk(
  "category/changeInfo",
  async (category, thunkAPI) => {
    try {
      const response = await trackerApi.patch("/categories/" + category._id, {
        categoryName: category.name,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "category/delete",
  async (categoryId, thunkAPI) => {
    try {
      await trackerApi.delete("/categories/" + categoryId);
      return categoryId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
