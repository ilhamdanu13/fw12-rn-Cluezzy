/* eslint-disable prettier/prettier */
import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import transaction from './transaction';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transaction,
});

export default reducer;
