import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const subscribeLogin = createAction('[Auth] Subscribe login');
export const subscribeLoginSuccess = createAction(
  '[Auth] Subscribe login Success'
);
export const subscribeLoginFailure = createAction(
  '[Auth] Subscribe Login Failure'
);

export const login = createAction('[Auth] Login', props<User>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

export const refreshAuthToken = createAction('[Auth] Refresh Auth Token');
export const refreshAuthTokenSuccess = createAction(
  '[Auth] Refresh Auth Token Success'
);
export const refreshAuthTokenFailure = createAction(
  '[Auth] Refresh Auth Token Failure'
);
