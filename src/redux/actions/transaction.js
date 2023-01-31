/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const trxAction = createAsyncThunk(
  'transaction/doTransaction',
  async ({token, ...payload}) => {
    const {data} = await http(token).post('/transactions', {...payload});
    return data.results;
  },
);
