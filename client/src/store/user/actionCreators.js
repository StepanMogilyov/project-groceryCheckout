// import { GET_USER, LOGOUT_USER } from './actionTypes';

import { useDispatch } from 'react-redux';

export function useGetProductAC(newProduct) {
  console.log('newProduct: ', newProduct);

  return { type: 'GET_PRODUCT', payload: newProduct };
}

// export function logoutUser() {
//   return { type: LOGOUT_USER };
// }
