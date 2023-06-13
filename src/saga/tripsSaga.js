import { put, takeEvery, delay } from 'redux-saga/effects';
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
  setTargetTrip,
  GET_TRIPS,
  DELETE_TRIP,
  CREATE_TRIP,
  EDIT_TRIP,
  GET_TARGET_TRIP,
  setShowSpiner,
} from '../store/slices/tripsSlice';

const db = getDatabase();
const dbRef = ref(getDatabase());

function* deleteTripWorker({ payload }) {
  yield put(setIsLoading(true));

  try {
    yield set(ref(db, `trips/${payload.id}`), null);
    yield fetchTripsWorker();
  } catch (error) {
    yield put(setError(error.message))
  } finally {
    yield put(setIsLoading(false))
  }
}

function* updateTripWorker({ payload }) {
  yield put(setIsLoading(true));
  yield delay(2000);
  
  try {
    yield update(ref(db, `trips/${payload.id}`), payload.data);
  } catch (error) {
    yield put(setError(error.message))
  } finally {
    yield put(setIsLoading(false));
  }
}

function* createTripWorker({ payload }) {
  yield put(setIsLoading(true));
  yield delay(2000);
  
  try {
    yield set(ref(db, `trips/${payload.id}`), payload);
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setIsLoading(false))
  }
}

function* getTargetTrip({ payload }) {
  yield put(setShowSpiner(true));
  yield delay(1000);

  try {
    const snapshot = yield get(child(dbRef, `trips/${payload}`));
  
    if (snapshot.exists()) {
      yield put(setTargetTrip(snapshot.val()));
    } else {
      yield put(setError('No data available'));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setShowSpiner(false));
  }
}

function* fetchTripsWorker() {
  yield put(setIsLoading(true));

  const payload = yield get(child(dbRef, `trips`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val() || []); 
      } else {
        setError("No data available");
        return [];
      }
    })
    .catch(error => setError(error.message));

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
