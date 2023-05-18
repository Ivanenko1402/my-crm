import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  isLoading: true,
  error: '',
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const GET_TRIPS = 'people/getTrips';
export const DELETE_TRIP = 'people/deleteTrip';
export const CREATE_OR_EDIT_TRIP = 'people/createOrEditTrip';

export const getTrips = createAction(GET_TRIPS);
export const deleteTrip = createAction(DELETE_TRIP);
export const createOrEditTrip = createAction(CREATE_OR_EDIT_TRIP);

export const { setTrips, setError, setIsLoading } = tripsSlice.actions;
export default tripsSlice.reducer;