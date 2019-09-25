// Action Types
import {CHANGE_USER_IS_LOGIN, CHANGE_USER_DATA} from '../actionTypes';

const initialState = {
  data: {},
  isFetching: false,
  isLogin: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      };

    case CHANGE_USER_DATA:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}
