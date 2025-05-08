import { createSlice } from "@reduxjs/toolkit";
import {
  userAvatarChange,
  userCurrent,
  userInfoUpdate,
  userLogin,
  userLogout,
  userRefresh,
  userRegister,
} from "./operations";

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpSgcdJWUorUVcigMJp8d_7mbqdCDLde5Nw&s",
    currency: "uah",
  },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const userLocalDataUpdate = (state, { name, email, avatarUrl, currency }) => {
  state.user.name = name;
  state.user.email = email;
  state.user.avatarUrl = avatarUrl;
  state.user.currency = currency;
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
        console.log(action.payload);
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action.payload);
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
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        userLocalDataUpdate(state, action.payload);
      })
      .addCase(userInfoUpdate.fulfilled, (state, action) => {
        for (const key in action.payload) {
          if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
            const value = action.payload[key];
            state.user[key] = value;
          }
        }
      })
      .addCase(userAvatarChange.fulfilled, (state, action) => {
        state.user.avatarUrl = action.payload.avatarUrl;
      });
  },
});

export const authReduser = slice.reducer;
export const { testAction } = slice.actions;
