import { createSlice } from '@reduxjs/toolkit';

const people = [
  {
    userId: 1,
    displayName: 'name1',
    email: 'test1@test.com',
    phoneNumber: '01101010101',
    role: 'Admin',
  },
  {
    userId: 2,
    displayName: 'name2',
    email: 'test2@test.com',
    phoneNumber: '01101010101',
    role: 'Driver',
  },
  {
    userId: 3,
    displayName: 'name3',
    email: 'test3@test.com',
    phoneNumber: '01101010101',
    role: 'Passenger',
  },
  {
    userId: 4,
    displayName: 'name4',
    email: 'test1@test.com',
    phoneNumber: '01101010101',
    role: 'Driver',
  },
  {
    userId: 5,
    displayName: 'name5',
    email: 'test2@test.com',
    phoneNumber: '01101010101',
    role: 'Passenger',
  },
  {
    userId: 6,
    displayName: 'name6',
    email: 'test3@test.com',
    phoneNumber: '01101010101',
    role: 'Passenger',
  },
  {
    userId: 7,
    displayName: 'name7',
    email: 'test1@test.com',
    phoneNumber: '01101010101',
    role: 'Passenger',
  },
  {
    userId: 8,
    displayName: 'name8',
    email: 'test2@test.com',
    phoneNumber: '01101010101',
    role: 'Driver',
  },
  {
    userId: 9,
    displayName: 'name9',
    email: 'test3@test.com',
    phoneNumber: '01101010101',
    role: 'Passenger',
  },
]

const initialState = {
  people,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.people = [...state.people, action.payload];
    },
    editPerson: (state, action) => {
      const editPerson = action.payload;

      state.people = state.people.map(person => {
        if (person.userId === editPerson.userId) {
          return editPerson;
        }

        return person;
      });
    },
    deletePerson: (state, action) => {
      state.people = state.people.filter(
        person => person.userId !== action.payload.userId,
      );
    },
  },
});

export const { actions } = peopleSlice;
export default peopleSlice.reducer;
