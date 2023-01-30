/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {trxAction} from '../actions/transaction';

const initialState = {
  movieId: '',
  cinemaId: '',
  bookingDate: '',
  seatNum: [],
  fullName: '',
  email: '',
  userId: '',
  phoneNumber: '',
  paymentMethodId: '',
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    chooseMovie: (state, {payload}) => {
      console.log(payload);
      state.movieId = payload.movieId;
      state.cinemaId = payload.cinemaId;
      state.bookingDate = payload.bookingDate;
    },
    chooseSeat: (state, {payload}) => {
      state.seatNum = payload.seatNum;
    },
    // choosePayment: (state, action) => {
    //   const { paymentMethodId, fullName, email, phoneNumber, cb } = action.payload;
    //   cb();
    //   return (state = {
    //     ...state,
    //     ...{ paymentMethodId, fullName, email, phoneNumber },
    //   });
    // },
  },
});

export const {
  chooseMovie,
  chooseSeat,
  // choosePayment
} = transactionReducer.actions;

export default transactionReducer.reducer;
