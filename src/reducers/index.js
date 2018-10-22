import { combineReducers } from 'redux';
import definitionReducer from './definitionReducer';
import readerReducer from './readerReducer';
import userReducer from './userReducer';
import wordListReducer from './wordListReducer';
import booksReducer from './booksReducer';
import navReducer from './navReducer';

const reducer = combineReducers({
  definition: definitionReducer,
  reader: readerReducer,
  user: userReducer,
  wordlist: wordListReducer,
  books: booksReducer,
  nav: navReducer
});

export default reducer;
