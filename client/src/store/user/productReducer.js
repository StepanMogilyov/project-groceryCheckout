// import { GET_USER, LOGOUT_USER } from './actionTypes';

const initialState = []

export default function userReducer(state = initialState, action) {

  console.log(state, 8888888888);
  switch (action.type) {
    case 'GET_PRODUCT': {
      return [state, ...action.payload]
      // return action.payload;
    }

    default:
      return state;
  }
}
