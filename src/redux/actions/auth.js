/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async ({email, password}) => {
    try {
      const {data} = await http().post(
        'https://fw12-backend-red.vercel.app/auth/login',
        {email, password},
      );

      return data.results;
    } catch (error) {
      return error.response.data.message;
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAction',
  async ({firstName, lastName, phoneNumber, email, password, cb}) => {
    try {
      const {data} = await http().post(
        'https://fw12-backend-red.vercel.app/auth/register',
        {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        },
      );
      cb();
      return data.results;
    } catch (error) {
      return error.response.data.message;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({email, cb}) => {
    try {
      const {data} = await http().post(
        'https://fw12-backend-red.vercel.app/auth/forgotPassword',
        {
          email,
        },
      );
      cb();
      return data.results;
    } catch (error) {
      return error.response.data.message;
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({code, email, password, confirmPassword, cb}) => {
    try {
      const {data} = await http().post(
        'https://fw12-backend-red.vercel.app/auth/resetPassword',
        {
          code,
          email,
          password,
          confirmPassword,
        },
      );
      cb();
      return data.results;
    } catch (error) {
      return error.response.data.message;
    }
  },
);
