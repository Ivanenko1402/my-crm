import { put, takeEvery } from 'redux-saga/effects';
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  update
} from 'firebase/database';
import {
  setTrips,
  setIsLoading,
  setError,
  GET_TRIPS,
  DELETE_TRIP,
  CREATE_TRIP,
  EDIT_TRIP,
  GET_TARGET_TRIP,
  setTargetTrip
} from '../store/slices/tripsSlice';
import { useDispatch } from 'react-redux';

const db = getDatabase();

function* deleteTripWorker({ payload }) {
  put(setIsLoading(true));
  const response = yield set(ref(db, `trips/${payload.id}`), null)
  .then(() => put(setIsLoading(false)))
  .catch(err => put(setError(err.message)));
  yield fetchTripsWorker();

  return response;
}

function* updateTripWorker({ payload }) {
  put(setIsLoading(true));
  
  yield update(ref(db, `trips/${payload.id}`), payload)
    .then(() => console.log('ok'))
    .catch(err => put(setError(err.message)));
  yield fetchTripsWorker();

  put(setIsLoading(false));
}

function* createTripWorker({ payload }) {
  put(setIsLoading(true));

  yield set(ref(db, `trips/${payload.id}`), payload)
    .then(() => console.log('ok'))
    .catch(err => put(setError(err.message)));
  yield fetchTripsWorker();

  put(setIsLoading(false));
}

function* getTargetTrip({ payload }) {
  const dbRef = ref(getDatabase());

  yield put(setIsLoading(true));

  try {
    const snapshot = yield get(child(dbRef, `trips/${payload}`));
    if (snapshot.exists()) {
      console.log('snapshot.val()', snapshot.val());
      yield put(setTargetTrip(snapshot.val()));
    } else {
      yield put(setError('No data available'));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setIsLoading(false));
    yield fetchTripsWorker();
  }
}

function* fetchTripsWorker() {
  put(setIsLoading(true));

  const dbRef = ref(getDatabase());

  const payload = yield get(child(dbRef, `trips`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val() || []); 
      } else {
        setError("No data available");
        return [];
      }
    })
    .catch(error => setError(error));

  yield put(setTrips(payload));
  yield put(setIsLoading(false));
}

export function* tripsWatcher() {
  yield takeEvery(GET_TRIPS, fetchTripsWorker);
  yield takeEvery(GET_TARGET_TRIP, getTargetTrip);
  yield takeEvery(DELETE_TRIP, deleteTripWorker);
  yield takeEvery(EDIT_TRIP, updateTripWorker);
  yield takeEvery(CREATE_TRIP, createTripWorker);
};
