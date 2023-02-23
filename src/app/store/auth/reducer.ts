import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as AuthActions from './actions';

export type AuthState = {
  user: User | null;
  logged: boolean
};

export const initialState: AuthState = {
  user: null,
  logged: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    logged: true,
    user: { ...action },
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    logged: false,
    user: null,
  }))
);
