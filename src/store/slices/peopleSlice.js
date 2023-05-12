import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatabase, onValue, ref } from 'firebase/database';

const initialState = {
  peopleList: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk(
  'people/fetch',
  async () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const starCountRef = ref(db, 'people/');
      onValue(starCountRef, (snapshot) => {
        const data = Object.values(snapshot.val());

        resolve(data);
      }, (error) => {
        reject(error);
      })
    })
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoading = false;
      state.peopleList = action.payload
    });
    builder.addCase(init.rejected, (state) => {
      state.isLoading = false;
      state.error = 'something went wrong';
    });
  },
});

export const { actions } = peopleSlice;
export default peopleSlice.reducer;
