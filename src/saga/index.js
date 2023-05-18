import { all } from 'redux-saga/effects';
import { personWatcher } from './personSaga';
import { tripsWatcher } from './tripsSaga';

export function* rootWatcher() {
  yield all([personWatcher(), tripsWatcher()])
};


