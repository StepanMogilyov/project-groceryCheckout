// import { GET_USER, LOGOUT_USER } from './actionTypes';

const initialState = []

export default function productReducer(state = initialState, action) {

  switch (action.type) {
    case 'GET_PRODUCT': {
      return [state, ...action.payload]
    }
    default:
      return state;
  }
}
