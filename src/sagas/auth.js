import { takeEvery } from 'redux-saga/effects';
import { SIGN_IN, SIGN_OUT } from '../actions/actionTypes';
import { auth } from '../firebase';
import Db from '../api';

const db = new Db();

function* callSignIn() {
  try {
    const result = yield auth.authWithGoogle();
    const user = yield result.user;

    yield db.addUser(user.uid, user.displayName, user.email, user.photoURL);
  } catch (e) {
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log(errorCode, errorMessage);
  }
}
function* callSignOut() {
  yield auth.signOut();
}

export function* signInSaga() {
  yield takeEvery(SIGN_IN, callSignIn);
}
export function* signOutSaga() {
  yield takeEvery(SIGN_OUT, callSignOut);
}
