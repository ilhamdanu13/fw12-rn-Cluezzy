/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

import reducer from './reducers';

export const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
