import { GET_PRODUCT } from "./actionTypes";

export function getProductAC(newProduct) {
  return { type: GET_PRODUCT, payload: newProduct };
}
