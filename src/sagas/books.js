import {
  takeEvery,
  takeLatest,
  select,
  put,
  take,
  call
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import { getUid } from '../reducers/userReducer';
import {
  LOAD_BOOKS_LIST,
  SET_USER,
  UPLOAD_BOOK,
  OPEN_BOOK,
  DELETE_BOOK,
  SET_LOCATION
} from '../actions/actionTypes';
import {
  setBooksList,
  loadBooksList,
  openBookSuccess,
  setLocation,
  uploadBookSuccess
} from '../actions';
import { Storage } from '../api';
import { getKey } from '../reducers/booksReducer';
import Streamer from '../api/Streamer';

const storage = new Storage();
const streamer = new Streamer();

function* callLoadBooksList() {
  const getBooksList = async uid => {
    const data = await storage.getBooks(uid);
    const entries = Object.entries(data || {});
    const books = entries.map(([key, value]) => ({
      name: value.name,
      author: value.author,
      key,
      bookmark: value.bookmark
    }));
    return books;
  };
  let uid = yield select(getUid);
  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  const booksList = yield getBooksList(uid);
  yield put(setBooksList(booksList));
}

function* callUploadBook({ payload }) {
  let uid = yield select(getUid);
  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  try {
    yield storage.addBook(uid, payload);
  } catch (e) {
    console.log(e);
  }
  yield put(uploadBookSuccess());
  yield put(loadBooksList());
}
function* callOpenBook({ payload }) {
  streamer.kill();
  let stream;
  async function unpackBook(url) {
    stream = await streamer.start();
    const src = await streamer.get(url);
    return src;
  }
  let uid = yield select(getUid);

  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  const book = yield storage.getBook(uid, payload.key);
  const re = /[^\%2]+(?=\?)/g;
  const unpacked = yield call(unpackBook, book);
  yield put(
    openBookSuccess(
      payload.name,
      payload.author,
      unpacked,
      payload.key,
      payload.bookmark,
      stream
    )
  );
  yield put(setLocation(payload.bookmark));
  yield put(NavigationActions.navigate({ routeName: 'Reader' }));
}

function* callDeleteBook({ payload }) {
  let uid = yield select(getUid);

  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }
  try {
    yield storage.deleteBook(uid, payload);
  } catch (e) {
    console.log(e);
  }
  yield put(loadBooksList());
}
function* callSaveBookmark({ payload }) {
  if (payload) {
    let uid = yield select(getUid);
    const key = yield select(getKey);
    while (!uid) {
      yield take(SET_USER);
      uid = yield select(getUid);
    }
    try {
      storage.saveBookmark(uid, key, payload);
    } catch (e) {
      console.log(e);
    }
  }
}

export function* uploadBookSaga() {
  yield takeEvery(UPLOAD_BOOK, callUploadBook);
}
export function* loadBooksListSaga() {
  yield takeEvery(LOAD_BOOKS_LIST, callLoadBooksList);
}
export function* openBookSaga() {
  yield takeLatest(OPEN_BOOK, callOpenBook);
}
export function* deleteBookSaga() {
  yield takeEvery(DELETE_BOOK, callDeleteBook);
}
export function* saveBookmarkSaga() {
  yield takeEvery(SET_LOCATION, callSaveBookmark);
}
