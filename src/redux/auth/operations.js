import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SiDaf } from "react-icons/si";

export const trackerApi = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

export const setAuthHeader = (token) => {
  trackerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await trackerApi.post("/auth/register", user);
      thunkAPI.dispatch(
        userLogin({ email: user.email, password: user.password })
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await trackerApi.post("/auth/login", credentials);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await trackerApi.get("/auth/logout");
      setAuthHeader("");
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
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
      const response = await trackerApi.post("/auth/refresh", { sid });
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const userCurrent = createAsyncThunk(
  "user/current",
  async (_, thunkAPI) => {
    try {
      const response = await trackerApi.get("/users/current");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const userInfoUpdate = createAsyncThunk(
  "user/updateInfo",
  async (newInfo, thunkAPI) => {
    try {
      const response = await trackerApi.patch("/users/info", newInfo);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const userAvatarChange = createAsyncThunk(
  "user/avatarChange",
  async (newAvatar, thunkAPI) => {
    try {
      const response = await trackerApi.patch("/users/avatar", newAvatar);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
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
    console.log(currentAvatar);

    console.log(currentAvatarId);

    try {
      await trackerApi.delete("/users/avatar/" + currentAvatarId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
