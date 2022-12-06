// import { GET_USER, LOGOUT_USER } from './actionTypes';

export function getProductAC(newProduct) {
  console.log('newProduct: ', newProduct);
  return { type: 'GET_PRODUCT', payload: newProduct };
}
