/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const trxAction = createAsyncThunk(
  'transaction/doTransaction',
  async ({payload}) => {
    const {data} = await axios.post('/transactions', {...payload});
    return data.results;
  },
);
