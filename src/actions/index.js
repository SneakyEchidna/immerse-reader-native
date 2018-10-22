import {
  GET_DEFINITIONS,
  SET_DEFINITIONS,
  BOOK_LOADED,
  EVENTS_LOADED,
  SET_IDENTIFIER,
  SET_LOCATION,
  SIGN_IN,
  SIGN_OUT,
  APP_STARTED,
  SET_USER,
  ADD_TO_WORD_LIST,
  LOAD_WORD_LIST,
  SET_WORD_LIST,
  LOAD_BOOKS_LIST,
  SET_BOOKS_LIST,
  UPLOAD_BOOK,
  OPEN_BOOK,
  OPEN_BOOK_SUCCESS,
  DELETE_BOOK,
  TOGGLE_DEFINITION,
  SET_FONT_SIZE,
  UPLOAD_BOOK_SUCCESS,
  TOGGLE_BOOK_UPLOAD
} from './actionTypes';

export const getDefinitions = word => ({
  type: GET_DEFINITIONS,
  payload: word
});

export const setDefinitions = (word, definitions) => ({
  type: SET_DEFINITIONS,
  payload: { definitions, word }
});

export const toggleDefinition = () => ({
  type: TOGGLE_DEFINITION
});

export const bookLoaded = () => ({
  type: BOOK_LOADED
});

export const eventsLoaded = () => ({
  type: EVENTS_LOADED
});

export const setIdentifier = identifier => ({
  type: SET_IDENTIFIER,
  payload: identifier
});

export const setLocation = location => ({
  type: SET_LOCATION,
  payload: location
});

export const signIn = () => ({
  type: SIGN_IN
});

export const signOut = () => ({
  type: SIGN_OUT
});
export const appStarted = () => ({
  type: APP_STARTED
});
export const setUser = (userName, uid) => ({
  type: SET_USER,
  payload: { userName, uid }
});

export const addWordToWordList = (word, definitions) => ({
  type: ADD_TO_WORD_LIST,
  payload: { word, definitions }
});

export const loadWordList = () => ({
  type: LOAD_WORD_LIST
});

export const setWordList = wordlist => ({
  type: SET_WORD_LIST,
  payload: wordlist
});

export const loadBooksList = () => ({
  type: LOAD_BOOKS_LIST
});

export const setBooksList = booksList => ({
  type: SET_BOOKS_LIST,
  payload: booksList
});

export const toggleBookUpload = () => ({
  type: TOGGLE_BOOK_UPLOAD
});
export const uploadBook = data => ({
  type: UPLOAD_BOOK,
  payload: data
});

export const uploadBookSuccess = () => ({
  type: UPLOAD_BOOK_SUCCESS
});

export const openBook = book => ({
  type: OPEN_BOOK,
  payload: book
});

export const openBookSuccess = (name, author, book, key, bookmark, origin) => ({
  type: OPEN_BOOK_SUCCESS,
  payload: { name, author, book, key, bookmark, origin }
});

export const deleteBook = key => ({
  type: DELETE_BOOK,
  payload: key
});

export const setFontSize = size => ({
  type: SET_FONT_SIZE,
  payload: size
});
