import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SiDaf } from "react-icons/si";

export const trakerApi = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

export const setAuthHeader = (token) => {
  trakerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await trakerApi.post("/auth/regisster", user);
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
      setAuthHeader("");
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const { refreshToken, sid } = thunkAPI.getState().auth;
    if (!refreshToken) return thunkAPI.rejectWithValue("No token");

    setAuthHeader(refreshToken);

    try {
      const response = await trakerApi.post("/auth/refresh", { sid });
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userCurrent = createAsyncThunk(
  "user/current",
  async (_, thunkAPI) => {
    try {
      const response = await trakerApi.get("/users/current");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userInfoUpdate = createAsyncThunk(
  "user/updateInfo",
  async (newInfo, thunkAPI) => {
    try {
      const response = await trakerApi.patch("/users/info", newInfo);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userAvatarChange = createAsyncThunk(
  "user/avatarChange",
  async (newAvatar, thunkAPI) => {
    try {
      const response = await trakerApi.patch("/users/avatar", newAvatar);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userAvatarDelete = createAsyncThunk(
  "user/avatarDelete",
  async (_, thunkAPI) => {
    const currentAvatar = thunkAPI.getState().auth.user.avatarUrl;
    const currentAvatarId = currentAvatar.slice(
      currentAvatar.lastIndexOf("/") + 1,
      currentAvatar.length - 5
    );
    try {
      await trakerApi.delete("/users/avatar/" + currentAvatarId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
