import {
  SET_BOOKS_LIST,
  SIGN_OUT,
  OPEN_BOOK_SUCCESS,
  UPLOAD_BOOK,
  UPLOAD_BOOK_SUCCESS,
  TOGGLE_BOOK_UPLOAD
} from '../actions/actionTypes';

const initialState = {
  booksList: [],
  currentBook: null,
  loading: false,
  showBookUpload: false
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_LIST:
      return {
        ...state,
        booksList: action.payload
      };
    case OPEN_BOOK_SUCCESS:
      return {
        ...state,
        currentBook: {
          name: action.payload.name,
          book: action.payload.book,
          author: action.payload.author,
          key: action.payload.key,
          bookmark: action.payload.bookmark,
          origin: action.payload.origin
        }
      };
    case TOGGLE_BOOK_UPLOAD:
      return {
        ...state,
        showBookUpload: !state.showBookUpload
      };
    case UPLOAD_BOOK:
      return {
        ...state,
        loading: !state.loading
      };
    case UPLOAD_BOOK_SUCCESS:
      return {
        ...state,
        loading: !state.loading
      };
    case SIGN_OUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export const getKey = state => state.books.currentBook.key;
export default booksReducer;
