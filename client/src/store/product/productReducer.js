// import { GET_USER, LOGOUT_USER } from './actionTypes';

const initialState = []

export default function productReducer(state = initialState, action) {
  console.log('productReducer');

  switch (action.type) {
    case 'GET_PRODUCT': {
      return [...state, action.payload]
      // return [...state, {a:Math.random()}]
    }
    default:
      return state;
  }
}
