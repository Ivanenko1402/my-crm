import { call, delay, put, takeEvery } from "redux-saga/effects";
import { GET_AUTH, LOGIN_AUTH, LOGOUT_AUTH, REGISTR_AUTH, setAuth, setError, setIsLoading } from "../store/slices/authSlice";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
const auth = getAuth();

function* logOutWorker() {
  yield put(setIsLoading(true));

  try {
    signOut(auth);
    yield put(setAuth(null));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setIsLoading(false));
  }
}

function* getAuthWorker() {
  yield put(setIsLoading(true));

  try {
    const user = yield call(onAuthStateChanged, auth);

    if (user) {
      console.log(user)
    } else {
      logOutWorker();
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* loginAuthWorker({ payload }) {
  const { email, password } = payload;
  yield put(setIsLoading(true));
  yield delay(2000);

  try {
    const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
    const user = userCredential.user;

    const { displayName, phoneNumber } = user;

    yield put(setAuth({ email, displayName, phoneNumber }));
  } catch (error) {
    const code = error.code;

    switch (code) {
      case 'auth/user-not-found':
        yield put(setError('user is not found please go to registration form'));
        break;

      case 'auth/wrong-password':
        yield put(setError('password is wrong'));
        break;

      default:
        yield put(setError(error.message));
        break;
    }
  } finally {
    yield put(setIsLoading(false));
  }
}

function* createAuthWorker({ payload }) {
  const { email, password, displayName, phoneNumber } = payload;
  yield put(setIsLoading(true));
  yield delay(2000);

  try {
    const userCredential = yield createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    yield put(setAuth({ email, displayName, phoneNumber }));
    yield updateProfile(user, { displayName });
    yield updateProfile(user, { phoneNumber });
  } catch (error) {
    yield put(setError(error.message))
  } finally {
    yield put(setIsLoading(false));
  }
};

export function* authWatcher() {
  yield takeEvery(GET_AUTH, getAuthWorker);
  yield takeEvery(LOGIN_AUTH, loginAuthWorker);
  yield takeEvery(LOGOUT_AUTH, logOutWorker);
  yield takeEvery(REGISTR_AUTH, createAuthWorker);
};
