// import { GET_USER, LOGOUT_USER } from './actionTypes';

const initialState = []

export default function userReducer(state = initialState, action) {
console.log(33333333333333);
  switch (action.type) {
    case 'GET_PRODUCT': {
      console.log(action);
      // return action.payload;
    }

    default:
      return state;
  }
}
