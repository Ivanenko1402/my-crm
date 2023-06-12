import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  people: [],
  targetPerson: null,
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

    setTargetPerson: (state, action) => {
      state.targetPerson = action.payload;
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
export const GET_TARGET_PERSON = 'people/getTargetPerson';
export const DELETE_PESON = 'people/deletePerson';
export const UPDATE_PESON = 'people/updatePerson';
export const CREATE_PESON = 'people/createPerson';

export const getPersons = createAction(GET_PERSONS);
export const getTargetPerson = createAction(GET_TARGET_PERSON);
export const deletePerson = createAction(DELETE_PESON);
export const updatePerson = createAction(UPDATE_PESON);
export const createPerson = createAction(CREATE_PESON);

export const { setPeople, setTargetPerson, setError, setIsLoading } = peopleSlice.actions;
export default peopleSlice.reducer;