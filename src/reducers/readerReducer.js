import {
  BOOK_LOADED,
  EVENTS_LOADED,
  RESET_READER,
  SET_IDENTIFIER,
  SET_LOCATION,
  OPEN_BOOK,
  SIGN_OUT,
  SET_FONT_SIZE
} from '../actions/actionTypes';

const initialState = {
  bookLoaded: false,
  eventsLoaded: false,
  location: null,
  identifier: null,
  fontSize: 100
};

const readerReducer = (state = initialState, action) => {
  switch (action.type) {
  case BOOK_LOADED:
    return { ...state, bookLoaded: true };
  case EVENTS_LOADED:
    return { ...state, eventsLoaded: true };
  case RESET_READER:
    return { ...state, bookLoaded: false, eventsLoaded: false };
  case SET_IDENTIFIER:
    return { ...state, identifier: action.payload };
  case SET_LOCATION:
    return { ...state, location: action.payload };
  case OPEN_BOOK:
    return { ...initialState };
  case SIGN_OUT:
    return {
      ...initialState
    };
  case SET_FONT_SIZE:
    return {
      ...state,
      fontSize: action.payload
    };
  default:
    return state;
  }
};
export const getIdentifier = state => state.reader.identifier;
export default readerReducer;
