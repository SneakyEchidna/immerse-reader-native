import {
  SET_DEFINITIONS,
  GET_DEFINITIONS,
  TOGGLE_DEFINITION,
  SIGN_OUT
} from '../actions/actionTypes';

const initialState = {
  showDefinition: false,
  word: null,
  definitions: [],
  loading: false
};

const definitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFINITIONS:
      return {
        ...state,
        definitions: action.payload.definitions,
        word: action.payload.word,
        loading: false
      };
    case GET_DEFINITIONS:
      return { ...state, loading: true };
    case SIGN_OUT:
      return {
        ...initialState
      };
    case TOGGLE_DEFINITION:
      return {
        ...state,
        showDefinition: !state.showDefinition
      };
    default:
      return state;
  }
};
export const getDefinitionState = state => state.definition.showDefinition;
export const getDefinitionWord = state => state.definition.word;

export default definitionReducer;
