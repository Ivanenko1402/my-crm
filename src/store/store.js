import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './slices/peopleSlice';
import tripsReducer from './slices/tripsSlice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    trips: tripsReducer,
  },
});
