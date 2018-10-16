import { SET_WORD_LIST, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  wordlist: []
};

const wordListReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_WORD_LIST:
    return {
      ...state,
      wordlist: action.payload
    };
  case SIGN_OUT:
    return {
      ...initialState
    };
  default:
    return state;
  }
};

export default wordListReducer;
