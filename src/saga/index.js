import { all } from 'redux-saga/effects';
import { personWatcher } from './personSaga';
import { tripsWatcher } from './tripsSaga';
import { authWatcher } from './authSaga';

export function* rootWatcher() {
  yield all([personWatcher(), tripsWatcher(), authWatcher()])
};
