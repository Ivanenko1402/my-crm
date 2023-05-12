import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatabase, onValue, ref } from 'firebase/database';

const initialState = {
  trips: [],
  isTripsLoading: false,
  error: '',
};

export const init = createAsyncThunk(
  'trips/fetch',
  async () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const starCountRef = ref(db, 'trips/');
      onValue(starCountRef, (snapshot) => {
        const data = Object.values(snapshot.val());
        resolve(data);
      }, (error) => {
        reject(error);
      })
    })
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isTripsLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.isTripsLoading = false;
      state.trips = action.payload
    });
    builder.addCase(init.rejected, (state) => {
      state.isTripsLoading = false;
      state.error = 'something went wrong';
    });
  },
});

export default tripsSlice.reducer;
