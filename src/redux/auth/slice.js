import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRefresh, userRegister } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpSgcdJWUorUVcigMJp8d_7mbqdCDLde5Nw&s",
    currency: "usd",
  },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "authReduser",
  initialState,

  reducers: {
    testAction: () => {
      console.log("test");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.avatarUrl = action.payload.user.avatarUrl;
        state.user.currency = action.payload.user.currency;
      })
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      })
      .addCase(userRefresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
      });
  },
});

export const authReduser = slice.reducer;
export const { testAction } = slice.actions;
