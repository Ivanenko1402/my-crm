import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import peopleReducer from './slices/peopleSlice';
import tripsReducer from './slices/tripsSlice';
import authReducer from './slices/authSlice';
import { rootWatcher } from '../saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    trips: tripsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
   [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootWatcher);

export default store;