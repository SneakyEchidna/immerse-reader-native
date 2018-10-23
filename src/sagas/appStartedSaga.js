import { takeLatest, select, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import { firebase } from '../firebase';
import { setUser } from '../actions';
import { APP_STARTED } from '../actions/actionTypes';
import { getUid } from '../reducers/userReducer';

function* callAppStarted() {
  if (firebase.auth.currentUser) {
    yield put(NavigationActions.navigate({ routeName: 'App' }));
  } else {
    yield put(NavigationActions.navigate({ routeName: 'Auth' }));
  }

  const channel = eventChannel(emitter => {
    firebase.auth.onAuthStateChanged(authUser =>
      emitter(authUser || { displayName: null, uid: null })
    );
    return () => {};
  });
  while (true) {
    const authUser = yield take(channel);
    yield put(setUser(authUser.displayName, authUser.uid));
    if (authUser === null) {
      yield put(NavigationActions.navigate({ routeName: 'Auth' }));
    } else {
      yield put(NavigationActions.navigate({ routeName: 'App' }));
    }
  }
}
export default function* appStartedSaga() {
  yield takeLatest(APP_STARTED, callAppStarted);
}
