export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn || false;
export const selectIsRefreshing = (state) => state.auth.isRefreshing || false;
export const selectAvatarUrl = (state) => state.auth.user?.avatarUrl;
