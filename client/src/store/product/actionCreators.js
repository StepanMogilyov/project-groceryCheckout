import { GET_PRODUCT, RESET_PODUCTS } from "./actionTypes";

export function getProductAC(newProduct) {
  return { type: GET_PRODUCT, payload: newProduct };
}

export function resetProductsAC() {
  return { type: RESET_PODUCTS };
}
