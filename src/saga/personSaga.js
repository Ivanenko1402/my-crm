import { put, takeEvery } from 'redux-saga/effects';
import {
  setError,
  setPeople,
  setIsLoading,
  GET_PERSONS,
  DELETE_PESON,
  setTargetPerson,
  GET_TARGET_PERSON,
  CREATE_PESON,
  UPDATE_PESON,
} from '../store/slices/peopleSlice';
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  update
} from 'firebase/database';

const db = getDatabase();
const dbRef = ref(getDatabase());

function* getTargetPerson({ payload }) {
  yield put(setIsLoading(true));

  try {
    const snapshot = yield get(child(dbRef, `people/${payload}`));
    if (snapshot.exists()) {
      yield put(setTargetPerson(snapshot.val()));
    } else {
      yield put(setError('No data available'));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setIsLoading(false));
    yield fetchPersonsWorker();
  }
}

function* deletePersonWorker({ payload }) {
  put(setIsLoading(true));
  const response = yield set(ref(db, `people/${payload.userId}`), null)
    .then(() => put(setIsLoading(false)))
    .catch(err => put(setError(err.message)));

  yield fetchPersonsWorker();

  return response;
}

function* updatePersonWorker({ payload }) {
  put(setIsLoading(true));
  
  yield update(ref(db, `people/${payload.userId}`), payload)
    .then(() => console.log('ok'))
    .catch(err => put(setError(err.message)));

  yield fetchPersonsWorker();

  put(setIsLoading(false));
}

function* createTripWorker({ payload }) {
  put(setIsLoading(true));

  yield set(ref(db, `people/${payload.userId}`), payload)
    .then(() => console.log('ok'))
    .catch(err => put(setError(err.message)));

  yield fetchPersonsWorker();

  put(setIsLoading(false));
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
  yield takeEvery(GET_TARGET_PERSON, getTargetPerson);
  yield takeEvery(DELETE_PESON, deletePersonWorker);
  yield takeEvery(UPDATE_PESON, updatePersonWorker);
  yield takeEvery(CREATE_PESON, createTripWorker);
};
