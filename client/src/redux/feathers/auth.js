import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    role: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    loginUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.role = null;
      state.accessToken = null;
    }
  },
});

export const { changeRole, logout, setAccessToken, clearAccessToken, loginUser } = authSlice.actions;
export default authSlice.reducer;
