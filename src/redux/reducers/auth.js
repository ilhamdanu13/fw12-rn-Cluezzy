/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../actions/auth';

const initialState = {
  token: null,
};
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(loginAction.fulfilled, (state, {payload}) => {
      state.token = payload.token;
    });

    build.addCase(registerAction.fulfilled, (state, {payload}) => {
      state.token = payload.token;
    });
  },
});

export const {logout: logoutAction} = auth.actions;

export default auth.reducer;
