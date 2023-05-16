import { createSlice } from '@reduxjs/toolkit';
const trips = [
  {
    id: 1,
    from: 'Kyiv',
    to: 'Boryspil',
    driver: {
      userId: 4,
      displayName: 'name4',
      email: 'test1@test.com',
      phoneNumber: '01101010101',
      role: 'Driver',
    },
    passengers: [
      {
        userId: 6,
        displayName: 'name6',
        email: 'test3@test.com',
        phoneNumber: '01101010101',
        role: 'Passenger',
      },
    ],
    cost: 100,
  }
];
const initialState = {
  trips,
};
const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addNewTrip: (state, action) => {
      state.trips = [...state.trips, action.payload];
    },
    removeTrip: (state, action) => {
      state.trips = (state.trips).filter(t => t.id !== action.payload);
    },
    editTrip: (state, action) => {
      state.trips = (state.trips).map(
        trip => {
          if (trip.id === action.payload.id) {
            return action.payload;
          }
          return trip;
        }
      );
    },
  },
});

export const { addNewTrip, removeTrip, editTrip } = tripsSlice.actions;
export default tripsSlice.reducer;