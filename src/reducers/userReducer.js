import { SET_USER, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  userName: null,
  uid: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      userName: action.payload.userName,
      uid: action.payload.uid
    };
  case SIGN_OUT:
    return {
      ...initialState
    };
  default:
    return state;
  }
};
export const getUid = state => state.user.uid;
export default userReducer;
