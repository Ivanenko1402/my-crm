import { put, takeEvery } from 'redux-saga/effects';
import {
  setError,
  setPeople,
  setIsLoading,
  GET_PERSONS,
  DELETE_PESON,
  CREATE_OR_EDIT_PESON,
} from '../store/slices/peopleSlice';
import {
  child,
  get,
  getDatabase,
  ref
} from 'firebase/database';
import { workingWithDB } from './workingWithDB';

function* deletePersonWorker({ payload }) {
  yield workingWithDB(`people/${payload.userId}`, null);
  yield fetchPersonsWorker();
}

function* createOrEditPersonWorker({ payload }) {
  yield workingWithDB(`people/${payload.userId}`, payload);
  yield fetchPersonsWorker();
}

function* fetchPersonsWorker() {
  yield put(setIsLoading(true));

  const dbRef = ref(getDatabase());

  const payload = yield get(child(dbRef, `people`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()); 
      } else {
        setError("No data available");
        return [];
      }
    })
    .catch(error => setError(error));

  yield put(setPeople(payload));
  yield put(setIsLoading(false));
}

export function* personWatcher() {
  yield takeEvery(GET_PERSONS, fetchPersonsWorker);
  yield takeEvery(DELETE_PESON, deletePersonWorker);
  yield takeEvery(CREATE_OR_EDIT_PESON, createOrEditPersonWorker);
};
