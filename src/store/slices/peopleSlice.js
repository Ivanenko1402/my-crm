import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  people: [],
  isLoading: true,
  error: '',
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const GET_PERSONS = 'people/getPersons';
export const DELETE_PESON = 'people/deletePerson';
export const CREATE_OR_EDIT_PESON = 'people/createOrEditPerson';

export const getPersons = createAction(GET_PERSONS);
export const deletePerson = createAction(DELETE_PESON);
export const createOrEditPerson = createAction(CREATE_OR_EDIT_PESON);

export const { setPeople, setError, setIsLoading } = peopleSlice.actions;
export default peopleSlice.reducer;