import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';
import readerReducer from './readerReducer';
import userReducer from './userReducer';
import wordListReducer from './wordListReducer';
import booksReducer from './booksReducer';

const reducer = combineReducers({
  definition: definitionReducer,
  reader: readerReducer,
  user: userReducer,
  wordlist: wordListReducer,
  books: booksReducer
});

export default reducer;
