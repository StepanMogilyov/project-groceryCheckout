import { GET_PRODUCT, RESET_PODUCTS } from "./actionTypes";

const initialState = [];

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT: {
      return [...state, action.payload];
    }
    case RESET_PODUCTS: {
      return []
    }
    default:
      return state;
  }
}
