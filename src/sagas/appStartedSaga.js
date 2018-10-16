import { takeEvery, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { firebase } from '../firebase';
import { setUser } from '../actions';
import { APP_STARTED } from '../actions/actionTypes';

function* callAppStarted() {
  const channel = eventChannel(emitter => {
console.log(firebase.auth)
    firebase.auth.onAuthStateChanged(authUser =>
      emitter(authUser || { displayName: null, uid: null })
    );
    return () => {};
  });
  while (true) {
    const authUser = yield take(channel);
    yield put(setUser(authUser.displayName, authUser.uid));
  }
}
export default function* appStartedSaga() {
  yield takeEvery(APP_STARTED, callAppStarted);
}
