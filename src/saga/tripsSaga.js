import { put, takeEvery } from 'redux-saga/effects';
import {
  child,
  get,
  getDatabase,
  ref
} from 'firebase/database';
import { workingWithDB } from './workingWithDB';
import {
  setTrips,
  setIsLoading,
  setError,
  GET_TRIPS,
  DELETE_TRIP,
  CREATE_OR_EDIT_TRIP
} from '../store/slices/tripsSlice';

function* deleteTripWorker({ payload }) {
  yield workingWithDB(`trips/${payload.id}`, null);
  yield fetchTripsWorker();
}

function* createOrEditTripWorker({ payload }) {
  yield workingWithDB(`trips/${payload.id}`, payload);
  yield fetchTripsWorker();
}

function* fetchTripsWorker() {
  yield put(setIsLoading(true));

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
  yield takeEvery(DELETE_TRIP, deleteTripWorker);
  yield takeEvery(CREATE_OR_EDIT_TRIP, createOrEditTripWorker);
};
