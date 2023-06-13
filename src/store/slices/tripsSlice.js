import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  targetTrip: null,
  isLoading: true,
  showSpiner: false,
  error: '',
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },

    setTargetTrip: (state, action) => {
      state.targetTrip = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setShowSpiner: (state, action) => {
      state.showSpiner = action.payload;
    },
  },
});

export const GET_TRIPS = 'trips/getTrips';
export const GET_TARGET_TRIP = 'trips/getTrip';
export const DELETE_TRIP = 'trips/deleteTrip';
export const EDIT_TRIP = 'trips/editTrip';
export const CREATE_TRIP = 'trips/createTrip';

export const getTrips = createAction(GET_TRIPS);
export const getTargetTrip = createAction(GET_TARGET_TRIP);
export const deleteTrip = createAction(DELETE_TRIP);
export const editTrip = createAction(EDIT_TRIP);
export const createTrip = createAction(CREATE_TRIP);

export const {
  setTargetTrip,
  setTrips,
  setError,
  setIsLoading,
  setShowSpiner,
} = tripsSlice.actions;
export default tripsSlice.reducer;