import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: null,
  isLoading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const GET_AUTH = 'auth/getAuth';
export const LOGIN_AUTH = 'auth/loginAuth';
export const LOGOUT_AUTH = 'auth/logoutAuth';
export const REGISTR_AUTH = 'auth/registrAuth';

export const getAuth = createAction(GET_AUTH);
export const loginAuth = createAction(LOGIN_AUTH);
export const logoutAuth = createAction(LOGOUT_AUTH);
export const registrAuth = createAction(REGISTR_AUTH);

export const {
  setAuth,
  setError,
  setIsLoading,
} = authSlice.actions;
export default authSlice.reducer;