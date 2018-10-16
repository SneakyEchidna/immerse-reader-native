import { takeEvery, select, put, take } from 'redux-saga/effects';
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

const storage = new Storage();

function* callLoadBooksList() {
  const getBooksList = async uid => {
    const data = await storage.getBooks(uid);
    const entries = Object.entries(data);
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
  let uid = yield select(getUid);

  while (!uid) {
    yield take(SET_USER);
    uid = yield select(getUid);
  }

  const book = yield storage.getBook(uid, payload.key);
  yield put(
    openBookSuccess(
      payload.name,
      payload.author,
      book,
      payload.key,
      payload.bookmark
    )
  );
  yield put(setLocation(payload.bookmark));
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
  yield takeEvery(OPEN_BOOK, callOpenBook);
}
export function* deleteBookSaga() {
  yield takeEvery(DELETE_BOOK, callDeleteBook);
}
export function* saveBookmarkSaga() {
  yield takeEvery(SET_LOCATION, callSaveBookmark);
}
