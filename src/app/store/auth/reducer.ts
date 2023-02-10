import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as AuthActions from './actions';

export type AuthState = {
  user: User | null
};

export const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: {...action}
    };
  }),
);
