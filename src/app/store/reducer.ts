import { itemReducer } from './items/reducer';
import { authReducer } from './auth/reducer';


export const ROOT_REDUCERS = {
  items: itemReducer,
  auth: authReducer
};