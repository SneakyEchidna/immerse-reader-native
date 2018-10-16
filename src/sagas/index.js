import { fork, put, all, select, takeEvery } from 'redux-saga/effects';
import {
  GET_DEFINITIONS,
  SET_LOCATION,
  SET_IDENTIFIER
} from '../actions/actionTypes';
import { setDefinitions, setLocation, toggleDefinition } from '../actions';
import { signInSaga, signOutSaga } from './auth';
import appStartedSaga from './appStartedSaga';
import Db from '../api';
import { addToWordListSaga, loadWordListSaga } from './wordlist';
import {
  loadBooksListSaga,
  uploadBookSaga,
  openBookSaga,
  deleteBookSaga,
  saveBookmarkSaga
} from './books';
import { getKey } from '../reducers/booksReducer';
import { getDefinitionState } from '../reducers/definitionReducer';

const db = new Db();
function* callGetDefinitions({ payload }) {
  const callApi = async word => {
    let body;
    const firebaseRes = db.getWordFromStore(word);
    body = await firebaseRes;
    if (!body) {
      const response = await fetch(`/api/definitions/${word}`).catch(() => [
        `No exact matches found for "${word}"`
      ]);
      body = response;
      try {
        body = await response.json();
      } catch (error) {
        body = [`No exact matches found for "${word}"`];
      }
    }
    return body;
  };

  const def = yield callApi(payload);
  yield put(setDefinitions(payload, def));
  const isOpen = yield select(getDefinitionState);
  if (!isOpen) {
    yield put(toggleDefinition());
  }
}

function* callSetLocation({ payload }) {
  const key = yield select(getKey);
  const location = payload;
  yield localStorage.setItem(key, JSON.stringify(location));
}

function* getdefinitionsSaga() {
  yield takeEvery(GET_DEFINITIONS, callGetDefinitions);
}
function* setLocationSaga() {
  yield takeEvery(SET_LOCATION, callSetLocation);
}
function* callSetIdentifier({ payload }) {
  const identifier = payload;
  let location = localStorage.getItem(identifier);
  try {
    yield (location = JSON.parse(location));
  } catch (e) {
    console.log('json parse error');
  }
  if (typeof location !== 'string') {
    location = null;
  }

  yield put(setLocation(location));
}
function* setIdentifierSaga() {
  yield takeEvery(SET_IDENTIFIER, callSetIdentifier);
}

export default function* rootSaga() {
  yield all([
    fork(appStartedSaga),
    fork(signInSaga),
    fork(signOutSaga),
    fork(setIdentifierSaga),
    fork(getdefinitionsSaga),
    fork(setLocationSaga),
    fork(addToWordListSaga),
    fork(loadWordListSaga),
    fork(loadBooksListSaga),
    fork(uploadBookSaga),
    fork(openBookSaga),
    fork(deleteBookSaga),
    fork(saveBookmarkSaga)
  ]);
}
