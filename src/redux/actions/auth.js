/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async ({email, password}) => {
    try {
      const {data} = await http().post('auth/login', {email, password});

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
      const {data} = await http().post('auth/register', {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      cb();
      return data.results;
    } catch (error) {
      return error.response.data.message;
    }
  },
);
