import { takeEvery, select, put, take } from 'redux-saga/effects';
import { getUid } from '../reducers/userReducer';
import { setWordList } from '../actions';
import {
  ADD_TO_WORD_LIST,
  LOAD_WORD_LIST,
  SET_USER
} from '../actions/actionTypes';
import Db from '../api';

const db = new Db();
function* callAddToWordList({ payload: { word }, payload: { definitions } }) {
  const user = yield select(getUid);
  yield db.addWord(user, word, definitions);
}
function* callLoadWordList() {
  let user = yield select(getUid);
  while (!user) {
    yield take(SET_USER);
    user = yield select(getUid);
  }
  const wordlist = yield db.getWordList(user);
  yield put(setWordList(wordlist));
}
export function* addToWordListSaga() {
  yield takeEvery(ADD_TO_WORD_LIST, callAddToWordList);
}

export function* loadWordListSaga() {
  yield takeEvery(LOAD_WORD_LIST, callLoadWordList);
}
