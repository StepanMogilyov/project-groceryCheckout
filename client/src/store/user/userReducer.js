import { GET_USER, LOGOUT_USER } from './actionTypes';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return {};
    }
    default:
      return state;
  }
}
