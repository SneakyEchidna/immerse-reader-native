import {
  fork,
  call,
  put,
  all,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import { DrawerActions } from 'react-navigation';
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
import {
  getDefinitionState,
  getDefinitionWord
} from '../reducers/definitionReducer';

const db = new Db();
function* callGetDefinitions({ payload }) {
  const lastWord = yield select(getDefinitionWord);

  const callApi = async word => {
    let body;
    const getWordDefinition = wordId =>
      fetch(`https://dictionary-parser.herokuapp.com/api/definitions/${wordId}`)
        .then(a => a)
        .then(a => a.json())
        .catch(e => console.log(e));
    // const firebaseRes = db.getWordFromStore(word);
    // console.log('out of firebase', db);
    // body = await firebaseRes;
    // console.log('fire body', body);
    // if (!body) {
    const response = await getWordDefinition(word);
    if (response) {
      body = response;
    } else body = [];
    return body;
  };

  if (payload !== lastWord) {
    const def = yield call(callApi, payload);
    yield put(setDefinitions(payload || [], def));
    const isOpen = yield select(getDefinitionState);
    yield put(DrawerActions.openDrawer());
    if (!isOpen) {
      yield put(toggleDefinition());
    }
  }
}

function* callSetLocation({ payload }) {
  const key = yield select(getKey);
  const location = payload;
  // yield localStorage.setItem(key, JSON.stringify(location));
}

function* getdefinitionsSaga() {
  yield takeLatest(GET_DEFINITIONS, callGetDefinitions);
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
