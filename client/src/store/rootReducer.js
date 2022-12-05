import { combineReducers } from 'redux';
import userReducer from './user/productReducer';

export default combineReducers({
  user: userReducer,
});
