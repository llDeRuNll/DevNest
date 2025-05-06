import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const trakerApi = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

export const setAuthHeader = (token) => {
  trackerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await trakerApi.post("/auth/register", user);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await trakerApi.post("/auth/login", credentials);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await trakerApi.get("/auth/logout");
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.refreshToken;
    const savedSid = thunkAPI.getState().auth.sid;
    if (!savedToken) return thunkAPI.rejectWithValue("No token");

    setAuthHeader(savedToken);

    try {
      const response = await trakerApi.post("/auth/refresh", savedSid);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
