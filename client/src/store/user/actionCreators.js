import { GET_USER, LOGOUT_USER } from './actionTypes';

export function getUser(objectUser) {
  return { type: GET_USER, payload: objectUser };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
